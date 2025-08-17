import { createRouter } from "../src/core/router";
import '@fortawesome/fontawesome-free/css/all.min.css';
import "animate.css"


// ================ DEMO / EJEMPLO DE USO =================
// Quita o adapta esta sección en tu proyecto.
// HTML esperado: <div id="app"></div>

// Componentes de ejemplo
// function Home() {
// 	return {
// 		html: `
//       <section class="container" style="font: 16px/1.4 system-ui; padding: 1rem;">
//         <h1>Inicio</h1>
//         <p>Bienvenido a la SPA 👋</p>
//         <nav style="display:flex; gap:.75rem; flex-wrap:wrap">
//           <a href="/users" data-link>Usuarios</a>
//           <a href="/users/42?tab=info" data-link>Usuario 42</a>
//           <a href="/acceso" data-link>Sección protegida</a>
//           <a href="/no-existe" data-link>404</a>
//         </nav>
//       </section>
//     `,
// 	};
// }

// function UsersList() {
// 	const users = [
// 		{ id: 1, name: "Ada" },
// 		{ id: 2, name: "Linus" },
// 		{ id: 3, name: "Guido" },
// 	];
// 	const html = `
//     <section style="font: 16px/1.4 system-ui; padding: 1rem;">
//       <h1>Usuarios</h1>
//       <ul>
//         ${users
// 					.map(
// 						(u) =>
// 							`<li><a href="/users/${u.id}" data-link>#${u.id} — ${u.name}</a></li>`
// 					)
// 					.join("")}
//       </ul>
//       <p><a href="/" data-link>Volver</a></p>
//     </section>
//   `;
// 	return { html };
// }

// function UserDetail(ctx) {
// 	const { id } = ctx.params;
// 	const { tab = "info" } = ctx.query;
// 	return {
// 		html: `
//       <section style="font: 16px/1.4 system-ui; padding: 1rem;">
//         <h1>Usuario ${id}</h1>
//         <p>Tab activo: <strong>${tab}</strong></p>
//         <nav style="display:flex; gap:.5rem;">
//           <a href="/users/${id}?tab=info" data-link>Info</a>
//           <a href="/users/${id}?tab=posts" data-link>Posts</a>
//         </nav>
//         <p style="margin-top:1rem"><a href="/users" data-link>Volver a lista</a></p>
//       </section>
//     `,
// 	};
// }

// function NotFound() {
// 	return {
// 		html: `
//       <section style="font: 16px/1.4 system-ui; padding: 2rem; text-align:center">
//         <h1>404</h1>
//         <p>Ruta no encontrada.</p>
//         <a href="/" data-link>Ir al inicio</a>
//       </section>
//     `,
// 	};
// }

// Middleware global de ejemplo (logger)
async function logger(ctx) {
	// eslint-disable-next-line no-console
	console.debug("[router] →", ctx.path, ctx.params, ctx.query);
}

// // Guard de ejemplo para ruta protegida
// async function requireAuth(ctx) {
// 	const isLogged = Boolean(localStorage.getItem("demo_auth"));
// 	if (!isLogged) {
// 		// Redirigir a login con next
// 		return `/login?next=${encodeURIComponent(ctx.path)}`;
// 	}
// }

// // Componentes para auth demo
// function Login(ctx) {
// 	const params = new URLSearchParams(ctx.url.search);
// 	const next = params.get("next") || "/";
// 	return {
// 		html: `
//       <section style="font: 16px/1.4 system-ui; padding: 1rem; max-width:380px; margin:auto;">
//         <h1>Login (demo)</h1>
//         <button id="btnLogin">Iniciar sesión</button>
//       </section>
//     `,
// 		onMount(root) {
// 			const btn = root.querySelector("#btnLogin");
// 			btn.addEventListener("click", () => {
// 				localStorage.setItem("demo_auth", "1");
// 				history.pushState({}, "", next);
// 				window.dispatchEvent(new PopStateEvent("popstate"));
// 			});
// 			return () => btn.removeEventListener("click", () => {});
// 		},
// 	};
// }

// function PrivateArea() {
// 	return {
// 		html: `<div style="font: 16px/1.4 system-ui; padding: 1rem;">Zona privada ✅ <p><a href="/" data-link>Home</a></p></div>`,
// 	};
// }

// Crear router cuando el DOM está listo

import Navbar from "../src/components/navbar";
import { ROUTES } from "../src/constants/routes";
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css'

var notyf = new Notyf

window.addEventListener("DOMContentLoaded", () => {
	
	const header = document.getElementById("header-container");
	if (!header) return;

	const navbar = Navbar({
		userName: "Usuario",
		role: "ADMIN",
	});

	header.appendChild(navbar);

	const outlet = document.getElementById('app');


	const router = createRouter({
		outlet,
		base: "/",
		middlewares: [logger],
		routes: ROUTES 
		// [
		// 	{ path: "/catalogo/profesiones", name: "profesiones", component: {
		// 		html: '<h1>Catálogo de Profesiones</h1>'
		// 	} },
		// 	// { path: "/users", name: "users", component: UsersList },
		// 	// { path: "/users/:id", name: "user-detail", component: UserDetail },
		// 	// {
		// 	// 	path: "/acceso",
		// 	// 	name: "private",
		// 	// 	beforeEnter: requireAuth,
		// 	// 	component: PrivateArea,
		// 	// },
		// 	// { path: "/login", name: "login", component: Login },
		// 	// { path: "*", name: "404", component: NotFound }, // catch-all
		// ],
	});

	// Exponer global para pruebas en consola
	window.appRouter = router;
});

// Fin del archivo
