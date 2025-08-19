import { TableRowActionType } from "./constants/table-row-action-type";

// Centralized icon config for easy maintenance
const ICON_CONFIG = Object.freeze({
	[TableRowActionType.SELECT]: {
		icon: "fa-regular fa-eye",
		label: "Seleccionar",
	},
	[TableRowActionType.EDIT]: {
		icon: "fa-regular fa-pen-to-square",
		label: "Editar",
	},
	[TableRowActionType.DELETE]: {
		icon: "fa-regular fa-trash-can",
		label: "Eliminar",
	},
	[TableRowActionType.DISABLE]: {
		icon: "fa-regular fa-eye-slash",
		label: "Deshabilitar",
	},
});

// Utility to create a button element
function createButton({ iconClass, label, onClick }) {
	const button = document.createElement("button");
	button.className =
		"hover:bg-gray-800 hover:text-gray-200 text-gray-600 py-1 px-2 rounded shadow transition text-xs";
	button.type = "button";
	button.title = label;
	button.addEventListener("click", onClick);

	const icon = document.createElement("i");
	icon.className = iconClass;
	button.appendChild(icon);

	return button;
}

// Action handlers
const actionHandlers = {
	[TableRowActionType.SHOW]: ({ callback, reactive }) => callback(reactive),
	[TableRowActionType.EDIT]: ({ callback, reactive }) => {
		const newReactiveValue = callback(reactive);
		if (newReactiveValue) {
			Object.assign(reactive, newReactiveValue);
		} else {
			throw new Error("Error al editar el valor reactivo");
		}
	},
	[TableRowActionType.DELETE]: ({ callback, tr, reactive }) => {
		callback(reactive);
		if (reactive) {
			delete reactive[reactive.id];
			tr.remove();
		} else {
			throw new Error("Error al eliminar el valor reactivo");
		}
	},
	// Add more handlers as needed
};

export default function TableRowActionComponent({
	callback,
	type,
	label,
	reactive,
	tr,
}) {
	const config = ICON_CONFIG[type];
	if (!config) throw new Error("Tipo de acción no soportado");

	const button = createButton({
		iconClass: config.icon,
		label: label || config.label,
		onClick: () => {
			const handler = actionHandlers[type];
			if (handler) {
				handler({ callback, reactive, tr });
			}
		},
	});

	return button;
}
