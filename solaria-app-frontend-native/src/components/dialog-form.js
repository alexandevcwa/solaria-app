export default function DialogFormComponent({ title, formComponent, id }) {
	const modal = document.createElement("div");
	modal.id = id;
	modal.className =
		"fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50 opacity-0 pointer-events-none transition-opacity duration-300";
	const container = document.createElement("div");
	container.className =
		"bg-white rounded-2xl shadow-lg max-w-md w-full p-6 transform scale-95 transition-transform duration-300";

	const titleElement = document.createElement("h2");
	titleElement.className = "text-xl font-semibold mb-4";
	titleElement.textContent = title;

	container.appendChild(titleElement);
	container.appendChild(formComponent);
	modal.appendChild(container);
	return modal;
}
