import TableCellComponent from "./table-cell";
import TableRowActionComponent from "./table-row-action";

/**
 * Crea una fila de tabla (<tr>) basada en un objeto y un orden de columnas,
 * permitiendo la actualización reactiva de los valores de las celdas mediante un Proxy.
 *
 * @param {Object} object - El objeto que contiene los datos para cada celda de la fila.
 * @param {string[]} order - Un arreglo que define el orden y las claves de las columnas a mostrar.
 * @param {number[]} actions	 - Un arreglo que define las acciones disponibles para cada fila.
 * @returns {{ tr: HTMLTableRowElement, reactive: Proxy }} Un objeto que contiene el elemento <tr> creado y un Proxy reactivo para actualizar las celdas.
 */
export default function TableRowComponent({ object, order, actions }) {
	const tr = document.createElement("tr");
	tr.className =
		"border-b border-gray-200 hover:bg-gray-50 transition duration-150";

	order.forEach((o) => {
		const value = Object.keys(object).includes(o)
			? Object.entries(object).find(([key]) => key === o)?.[1]
			: "";
		const td = TableCellComponent(value);
		td.id = o;
		tr.appendChild(td);
	});

	const reactive = new Proxy(object, {
		set(target, prop, value) {
			target[prop] = value;
			const exists = order.includes(prop);
			if (exists) {
				tr.querySelector(`#${prop}`).textContent = value;
			}
			return true;
		},
	});

	if (undefined !== actions || null !== actions || actions.length > 0) {
		const rowActions = renderActions({ actions, reactive, tr });
		tr.appendChild(rowActions);
	}

	return { tr, reactive };
}

function renderActions({ actions, reactive, tr }) {
	const actionContainer = document.createElement("td");
	actionContainer.className = "px-3 py-2  space-x-2";

	actions.forEach((action) => {
		const actionButton = TableRowActionComponent({
			callback: action.onClick,
			type: action.type,
			label: action.label,
			reactive: reactive,
			tr: tr,
		});
		actionContainer.appendChild(actionButton);
	});

	return actionContainer;
}
