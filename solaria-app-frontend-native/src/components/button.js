export default function ButtonComponent({ type, icon, label, onClick }) {
	const button = document.createElement("button");
	button.type = type;
	button.className =
		"flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500";
	button.innerHTML = `
        ${icon ? `<span class="mr-2">${icon}</span>` : ""}
        ${label}
    `;
	button.addEventListener("click", onClick);
	return button;
}
