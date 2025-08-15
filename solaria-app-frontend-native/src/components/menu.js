import { MENU_OPTIONS } from "../constants/const-menu";

/**
 * Filtra las opciones de menú según el rol y construye el menú.
 * @param {Object} props
 * @param {string} props.role
 * @returns {HTMLElement}
 */
export default function Menu({ role }) {
	const filteredMenu = MENU_OPTIONS.filter((item) => item.role.includes(role));
	return createMenuContainer(filteredMenu);
}

function createMenuContainer(menu) {
	const container = createElement("div");
	const nav = createElement("section", {
		className:
			"h-screen max-w-xs overflow-y-scroll scroll-smooth scroll-m-0 scroll-p-0 bg-cyan-900",
	});
	const menuList = createElement("ul", { id: "menu", className: "p-2" });

	container.appendChild(nav);
	nav.appendChild(createMenuHeader());
	nav.appendChild(menuList);

	menu.forEach((option) => {
		menuList.appendChild(createMenuOption(option));
	});
	return container;
}

/**
 * Crea el encabezado del menú con el título y un botón para cerrar.
 *
 * @returns {HTMLElement} El elemento contenedor del encabezado del menú.
 */
function createMenuHeader() {
	const container = createElement("div", {
		className: "flex justify-between items-center px-2 py-1",
	});
	const title = createElement("p", {
		className: "text-2xl text-gray-100 font-semibold",
		textContent: "U-Solaria",
	});
	const icon = createElement("i", {
		className: "fa-solid fa-xmark text-3xl text-gray-100",
	});
	const button = createElement("button", {
		className: "text-gray-100 hover:text-white",
	});

	button.prepend(icon);
	button.addEventListener("click", () => closeMenu(container));
	container.appendChild(title);
	container.appendChild(button);
	return container;
}

/**
 * Cierra el menú animando su desaparición.
 *
 * Elimina la clase de animación de entrada y agrega las clases de animación de salida.
 * Cuando la animación termina, oculta el elemento estableciendo su propiedad `display` en "none".
 *
 * @param {HTMLElement} headerContainer - El contenedor del encabezado dentro del menú a cerrar.
 */
function closeMenu(headerContainer) {
	const nav = headerContainer.parentElement;
	nav.classList.remove("animate__fadeInLeft");
	nav.classList.add("animate__animated", "animate__fadeOutLeft");
	nav.addEventListener(
		"animationend",
		() => {
			nav.style.display = "none";
		},
		{ once: true }
	);
}

/**
 * Crea un elemento de opción de menú basado en el objeto proporcionado.
 *
 * @param {Object} option - Objeto que representa la opción del menú.
 * @param {string} option.id - Identificador único para el elemento de la opción.
 * @param {string} option.name - Nombre o texto que se mostrará en la opción.
 * @param {string} [option.path] - Ruta de navegación asociada a la opción (opcional).
 * @param {Array<Object>} [option.children] - Lista de opciones hijas para submenús (opcional).
 * @returns {HTMLElement} Elemento <li> que representa la opción del menú.
 */
function createMenuOption(option) {
	const li = createElement("li", {
		id: option.id,
		className: "w-full bg-cyan-800 rounded mb-1",
	});
	const a = createElement("a", {
		className:
			"px-4 py-2 block text-gray-100 hover:text-white w-full h-full cursor-pointer",
		textContent: option.name,
	});
	if (option.path) {
		a.href = option.path;
		li.classList.add("hover:bg-cyan-700");
	}
	li.appendChild(a);

	if (option.children?.length) {
		const subMenuUl = createSubMenu(option.children);
		li.appendChild(subMenuUl);
		li.addEventListener("click", (event) => toggleSubMenu(event, subMenuUl));
	}
	return li;
}

/**
 * Crea un submenú como un elemento <ul> con opciones proporcionadas.
 *
 * @param {Array<{name: string, path: string}>} children - Lista de objetos que representan las opciones del submenú, cada uno con nombre y ruta.
 * @returns {HTMLElement} Elemento <ul> que contiene los elementos del submenú.
 */
function createSubMenu(children) {
	const subMenuUl = createElement("ul", { className: "ml-3 hidden" });
	children.forEach((subOption) => {
		const subLi = createElement("li", {
			className: "w-full bg-cyan-700 rounded hover:bg-cyan-600",
		});
		const subA = createElement("a", {
			href: subOption.path,
			className: "px-4 py-2 block text-gray-100 hover:text-white w-full h-full",
			textContent: subOption.name,
		});
		subLi.appendChild(subA);
		subMenuUl.appendChild(subLi);
	});
	return subMenuUl;
}

/**
 * Alterna la visibilidad de un submenú con animaciones.
 *
 * @param {Event} event - El evento de clic que dispara la función.
 * @param {HTMLElement} subMenu - El elemento del submenú a mostrar u ocultar.
 *
 * Si el submenú está oculto (tiene la clase "hidden"), lo muestra con una animación de fadeIn.
 * Si el submenú está visible, lo oculta con una animación de fadeOut y luego agrega la clase "hidden".
 */
function toggleSubMenu(event, subMenu) {
	event.preventDefault();
	if (subMenu.classList.contains("hidden")) {
		subMenu.classList.remove("hidden");
		subMenu.classList.add("block", "animate__animated", "animate__fadeIn");
		subMenu.addEventListener(
			"animationend",
			() => subMenu.classList.remove("animate__fadeOut", "animate__animated"),
			{ once: true }
		);
	} else {
		subMenu.classList.remove("block");
		subMenu.classList.add("animate__animated", "animate__fadeOut");
		subMenu.addEventListener(
			"animationend",
			() => {
				subMenu.classList.remove("animate__fadeOut", "animate__animated");
				subMenu.classList.add("hidden");
			},
			{ once: true }
		);
	}
}

/**
 * Helper para crear elementos con propiedades.
 * @param {string} tag - Nombre del tag HTML a crear.
 * @param {Object} props - Propiedades a asignar al elemento.
 * @returns {HTMLElement}
 */
function createElement(tag, props = {}) {
	const el = document.createElement(tag);
	Object.entries(props).forEach(([key, value]) => {
		if (key === "className") el.className = value;
		else if (key === "textContent") el.textContent = value;
		else el[key] = value;
	});
	return el;
}
