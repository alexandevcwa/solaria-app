export default function InputComponent({ label, id, type, required = false, regex }) {
	const container = document.createElement("div");

	const labelElement = document.createElement("label");
	labelElement.className = "block text-sm font-medium text-gray-700";
	labelElement.textContent = label;
	labelElement.htmlFor = id;

	const inputElement = document.createElement("input");
	inputElement.id = id;
	inputElement.type = type;
	inputElement.required = required;
	inputElement.className =
		"mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border";
	if (regex) {
		inputElement.pattern = regex.source;
	}

	container.appendChild(labelElement);
	container.appendChild(inputElement);
	return container;
}
