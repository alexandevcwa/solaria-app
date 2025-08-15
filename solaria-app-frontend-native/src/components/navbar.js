import Menu from "./menu";

export default function Navbar({ userName, role }) {
	const nav = document.createElement("nav");

	nav.appendChild(Menu({role: role}));
	return nav;
}

function header(){
}