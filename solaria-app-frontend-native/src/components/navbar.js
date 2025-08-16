import Menu from "./menu";

export default function Navbar({ userName, role }) {
	const nav = document.createElement("nav");

	nav.appendChild(createNav());
	nav.appendChild(Menu({ role: role }));
	return nav;
}

function createNav() {
	const container = document.createElement("div");
	container.className =
		"flex items-center justify-between h-14 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-600 border-b-2 border-gray-800 shadow-lg";
	container.appendChild(createMenuButton());
	container.appendChild(createNavSubContainer());
	return container;
}

function createMenuButton() {
	const button = document.createElement("button");
	button.className = "hover:text-gray-300 fixed top-0 left-0 mt-2 ml-2 z-50";

	const icon = document.createElement("i");
	icon.className = "fa-solid fa-bars text-4xl text-gray-100";
	button.appendChild(icon);
	button.addEventListener("click", openMenu);
	return button;
}

function openMenu() {
	const menuContainer = document.getElementById("menu-container");
	if (!menuContainer) {
		console.error("Menu container not found");
		return;
	}
	// Ensure the container is visible before starting the animation
	menuContainer.style.display = "block";
	menuContainer.classList.remove("animate__fadeOutLeft");
	menuContainer.classList.add("animate__animated", "animate__fadeInLeft");
	menuContainer.addEventListener(
		"animationend",
		() => {
			console.log("Menu opened");
		},
		{ once: true }
	);
}

function createNavSubContainer() {
	const subContainer = document.createElement("div");
	subContainer.className =
		"container mx-auto flex items-center justify-between space-x-4 max-w-full md:max-w-4xl lg:max-w-7xl w-full h-full";
	subContainer.appendChild(createNavLogo());
	return subContainer;
}

function createNavLogo() {
	const logo = document.createElement("p");
	logo.className = "font-title text-5xl text-gray-100 font-semibold";
	logo.textContent = "U-Magic";
	return logo;
}
