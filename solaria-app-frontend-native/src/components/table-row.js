import TableCellComponent from "./table-cell";

/**
 * Crea una fila de tabla (<tr>) basada en un objeto y un orden de columnas, 
 * permitiendo la actualización reactiva de los valores de las celdas mediante un Proxy.
 *
 * @param {Object} object - El objeto que contiene los datos para cada celda de la fila.
 * @param {string[]} order - Un arreglo que define el orden y las claves de las columnas a mostrar.
 * @param {number[]} columnWidth - Un arreglo que define el ancho de cada columna.
 * @returns {{ tr: HTMLTableRowElement, reactive: Proxy }} Un objeto que contiene el elemento <tr> creado y un Proxy reactivo para actualizar las celdas.
 */
export default function TableRowComponent({ object, order, columnWidth }) {
	const tr = document.createElement("tr");
	tr.className =
		"border-b border-gray-200 hover:bg-gray-50 transition duration-150";

	order.forEach((o) => {
		const value = Object.keys(object).includes(o)
			? Object.entries(object).find(([key]) => key === o)?.[1]
			: "";
		const td = TableCellComponent(value, columnWidth);
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
	return { tr, reactive };
}
