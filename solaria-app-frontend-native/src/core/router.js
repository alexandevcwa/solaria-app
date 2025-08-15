/**
 * Crea un router SPA sencillo para aplicaciones web.
 *
 * @param {Object} options - Opciones de configuración del router.
 * @param {Array<Object>} [options.routes=[]] - Lista de rutas. Cada ruta debe tener al menos un `path` y un `component`.
 * @param {HTMLElement} options.outlet - Elemento DOM donde se renderizan los componentes de las rutas.
 * @param {string} [options.base="/"] - Base de la URL para el router.
 * @param {Array<Function>} [options.middlewares=[]] - Middlewares globales que se ejecutan antes de cada navegación.
 * @param {boolean} [options.scrollRestoration=true] - Si se debe manejar manualmente la restauración de scroll.
 * @returns {Object} API pública del router.
 *
 * @property {function(string, Object=): void} navigate - Navega a una ruta específica. Recibe la ruta y opciones (por ejemplo, scroll).
 * @property {function(string, Object=): void} replace - Reemplaza la ruta actual en el historial por una nueva. Recibe la ruta y opciones.
 * @property {function(): void} back - Navega hacia atrás en el historial.
 * @property {function(): void} forward - Navega hacia adelante en el historial.
 * @property {Object} current - Obtiene el estado actual de la ruta (path, params, query, etc).
 * @property {function(Array<Object>): void} addRoutes - Agrega nuevas rutas dinámicamente al router.
 * @property {function(): void} refresh - Fuerza un re-match y render de la ruta actual (útil si cambian dependencias externas).
 * @property {function(): void} destroy - Destruye el router, removiendo listeners y limpiando el estado.
 */
export function createRouter({
	routes = [],
	outlet = null,
	base = "/",
	middlewares = [],
	scrollRestoration = true,
}) {
	if (!outlet)
		throw new Error('Debes pasar un elemento "outlet" donde renderizar.');
	base = normalizeBase(base);

	/** Estado interno */
	const state = {
		routes: routes.map(compileRoute),
		middlewares,
		outlet,
		base,
		current: null,
		lastUnmount: null,
	};

	/** API pública */
	const api = {
		navigate,
		replace,
		back: () => history.back(),
		forward: () => history.forward(),
		get current() {
			return state.current;
		},
		addRoutes(newRoutes) {
			state.routes.push(...newRoutes.map(compileRoute));
		},
		/** Permite forzar un re-match/render (útil si cambian dependencias externas) */
		refresh: () => handleRoute(new URL(location.href)),
		destroy,
	};

	// Inicialización
	if (scrollRestoration && "scrollRestoration" in history) {
		history.scrollRestoration = "manual";
	}
	window.addEventListener("popstate", onPopState);
	document.addEventListener("click", onLinkClick, true);
	// Primer render
	handleRoute(new URL(location.href));

	return api;

	// ---------------- Implementación ----------------

	function destroy() {
		window.removeEventListener("popstate", onPopState);
		document.removeEventListener("click", onLinkClick, true);
		if (state.lastUnmount)
			try {
				state.lastUnmount();
			} catch {
				/* noop */
			}
		state.current = null;
	}

	function navigate(to, opts = {}) {
		const url = resolveUrl(to, state.base);
		history.pushState({}, "", url);
		handleRoute(new URL(location.href), {
			scroll: opts.scroll ?? { top: 0, left: 0 },
		});
	}

	function replace(to, opts = {}) {
		const url = resolveUrl(to, state.base);
		history.replaceState({}, "", url);
		handleRoute(new URL(location.href), {
			scroll: opts.scroll ?? { top: 0, left: 0 },
		});
	}

	function onPopState() {
		handleRoute(new URL(location.href));
	}

	/** Intercepta clicks en <a> para navegación SPA */
	function onLinkClick(e) {
		// Solo clicks primarios sin modificadores
		if (
			e.defaultPrevented ||
			e.button !== 0 ||
			e.metaKey ||
			e.ctrlKey ||
			e.shiftKey ||
			e.altKey
		)
			return;

		// Busca el <a> más cercano
		const a = e.target.closest("a");
		if (!a) return;

		// target=_blank o download => dejar pasar
		if (a.target && a.target !== "" && a.target !== "_self") return;
		if (a.hasAttribute("download")) return;

		// data-no-router para saltarse el router
		if (a.hasAttribute("data-no-router")) return;

		const href = a.getAttribute("href");
		if (!href || href.startsWith("#")) return; // intra-página o vacío

		const url = new URL(a.href, location.origin);

		// Solo mismo origen y dentro de la base
		if (url.origin !== location.origin) return;
		if (!url.pathname.startsWith(state.base)) return;

		// Si llegó hasta acá, prevenimos navegación y usamos el router
		e.preventDefault();
		history.pushState({}, "", url);
		handleRoute(new URL(location.href), { scroll: { top: 0, left: 0 } });
	}

	async function handleRoute(url, options = {}) {
		const path = decodeURIComponent(url.pathname);

		// Match route
		let match = null;
		for (const r of state.routes) {
			const m = r.regex.exec(stripBase(path, state.base));
			if (m) {
				match = { route: r, params: extractParams(r, m) };
				break;
			}
		}

		// Si no hay match, buscar ruta 404 declarada como path: '*' o /(.*)/
		if (!match) {
			const notFound = state.routes.find((r) => r.isCatchAll);
			if (!notFound) {
				return renderRaw(
					`<h1 style="font: 16px/1.4 system-ui">404 — No encontrado</h1>`
				);
			}
			match = { route: notFound, params: {} };
		}

		// Contexto de navegación
		const ctx = {
			path: stripBase(path, state.base) || "/",
			fullPath: path,
			base: state.base,
			url,
			params: match.params,
			query: Object.fromEntries(url.searchParams.entries()),
			navigate,
			replace,
			location,
			state: {},
		};

		// Ejecutar middlewares globales (en serie)
		for (const mw of state.middlewares) {
			const res = await mw(ctx);
			if (res === false) return; // Bloqueado por middleware
			if (typeof res === "string") {
				return replace(res);
			} // Redirección
		}

		// Guard por ruta
		if (match.route.beforeEnter) {
			const res = await match.route.beforeEnter(ctx);
			if (res === false) return; // Bloqueado
			if (typeof res === "string") {
				return replace(res);
			} // Redirección
		}

		// Render del componente
		const result = await safeCall(match.route.component, ctx);

		await renderResult(result);

		// Scroll
		if (options.scroll) {
			try {
				window.scrollTo(options.scroll);
			} catch {
				/* noop */
			}
		}

		// Actualizar estado actual
		state.current = {
			...ctx,
			name: match.route.name,
			meta: match.route.meta ?? {},
		};
	}

	async function renderResult(result) {
		// Limpieza del render anterior
		if (state.lastUnmount) {
			try {
				state.lastUnmount();
			} catch {
				/* noop */
			}
			state.lastUnmount = null;
		}

		// Tipos soportados
		// 1) string (HTML) — se inserta como innerHTML
		// 2) Node — se hace append
		// 3) { html, onMount?, onDestroy? }
		// 4) null/undefined => limpia
		const root = state.outlet;
		root.innerHTML = "";

		if (result == null) return;

		if (typeof result === "string") {
			root.innerHTML = result;
			return;
		}

		if (result instanceof Node) {
			root.appendChild(result);
			return;
		}

		if (typeof result === "object") {
			if (typeof result.html === "string") {
				root.innerHTML = result.html;
			} else if (result.html instanceof Node) {
				root.appendChild(result.html);
			}
			if (typeof result.onMount === "function") {
				const cleanup = await safeCall(result.onMount, root);
				if (typeof cleanup === "function") {
					state.lastUnmount = cleanup;
				} else if (typeof result.onDestroy === "function") {
					state.lastUnmount = result.onDestroy;
				}
			} else if (typeof result.onDestroy === "function") {
				state.lastUnmount = result.onDestroy;
			}
			return;
		}

		// Por defecto: toString
		root.textContent = String(result);
	}
}

// ---------- Utilidades ----------

function compileRoute(r) {
	const { path, component, beforeEnter, name, meta } = r;
	if (!path) throw new Error('Cada ruta debe tener un "path"');
	if (!component) throw new Error(`Ruta "${path}" debe tener "component"`);

	let { regex, keys, isCatchAll } = pathToRegex(path);
	return { path, component, beforeEnter, name, meta, regex, keys, isCatchAll };
}

function pathToRegex(path) {
	if (path === "*" || path === "(.*)" || path === "/(.*)") {
		return { regex: /^.*$/u, keys: [], isCatchAll: true };
	}

	const keys = [];
	// 1) primero convertir :params
	let pattern = path.replace(/:(\w+)/gu, (_, key) => {
		keys.push(key);
		return "([^/]+)";
	});

	// 2) luego comodines *
	pattern = pattern.replace(/\*/gu, ".*");

	// 3) escapar el resto de caracteres especiales de regex
	pattern = pattern.replace(/([.+?^=!:${}()|\[\]\\\\])/gu, "\\$1");

	const regex = new RegExp("^" + pattern + "$", "u");
	return { regex, keys, isCatchAll: false };
}

function extractParams(route, match) {
	const params = {};
	route.keys.forEach(
		(k, i) => (params[k] = decodeURIComponent(match[i + 1] ?? ""))
	);
	return params;
}

function normalizeBase(base) {
	if (!base.startsWith("/")) base = "/" + base;
	if (!base.endsWith("/")) base += "/";
	return base;
}

function stripBase(pathname, base) {
	if (pathname.startsWith(base)) return pathname.slice(base.length - 1) || "/";
	return pathname;
}

function resolveUrl(to, base) {
	// Acepta rutas absolutas (mismo origen) o relativas a la base
	if (to instanceof URL) return to.toString();
	if (typeof to !== "string")
		throw new Error("navigate/replace requiere un string o URL");
	if (to.startsWith("http://") || to.startsWith("https://")) return to;
	if (to.startsWith("/")) return to; // absoluto en el host actual
	// relativo a la ruta actual
	const current = new URL(location.href);
	const rel = new URL(to, current);
	// si no está dentro de base, forzar a base
	if (!rel.pathname.startsWith(base)) {
		rel.pathname = base.replace(/\/$/, "") + "/" + to.replace(/^\//, "");
	}
	return rel.toString();
}

async function safeCall(fn, ...args) {
	if (typeof fn !== "function") return fn;
	return await fn(...args);
}

function renderRaw(html) {
	const div = document.createElement("div");
	div.innerHTML = html;
	return div;
}