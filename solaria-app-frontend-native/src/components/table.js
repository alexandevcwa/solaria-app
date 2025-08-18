import TableHeadComponent from "./table-head";
import TableBodyComponent from "./table-body";
import TableFunctionComponent from "./table-function";

function createTableInfo(name, functions) {
	const tableInfo = document.createElement("div");
	tableInfo.className =
		"px-4 py-3 border-b border-gray-300 flex items-center justify-between bg-gray-100";

	const title = document.createElement("h2");
	title.className = "text-xl font-semibold text-gray-800 tracking-wide";
	title.textContent = name;
	tableInfo.appendChild(title);

	if (functions) {
		tableInfo.appendChild(createFunctionsContainer(functions));
	}

	return tableInfo;
}

function createFunctionsContainer(functions) {
	const functionsContainer = document.createElement("div");
	functions.forEach((f) => {
		const button = TableFunctionComponent({ label: f.label, callback: f.callback });
		functionsContainer.appendChild(button);
	});
	return functionsContainer;
}

function createTable(headers, callback, order, actions) {
	const table = document.createElement("table");
	table.className = "min-w-full text-sm text-left text-gray-700 table-fixed";
	const thead = TableHeadComponent(headers);
	table.appendChild(thead);

	Promise.resolve(callback()).then((objects) => {
		if (objects) {
			const tbody = TableBodyComponent({ objects, order, actions });
			table.appendChild(tbody);
		}
	});
	return table;
}

/**
 * Crea el componente principal de la tabla, incluyendo el encabezado, cuerpo, acciones y funciones adicionales.
 *
 * @function TableComponent
 * @param {Object} params - Parámetros para configurar la tabla.
 * @param {Array<Object>} params.headers - Lista de encabezados de la tabla.
 * @param {Function} params.callback - Función que retorna los objetos a mostrar en el cuerpo de la tabla.
 * @param {string} params.name - Nombre o título de la tabla.
 * @param {Array<string>} params.order - Orden de las columnas en el cuerpo de la tabla.
 * @param {Array<Object>} [params.actions=null] - Acciones disponibles para cada fila de la tabla.
 * @param {Array<{label: string, callback: Function}>} [params.functions=null] - Funciones adicionales para mostrar en el encabezado de la tabla.
 * @returns {HTMLDivElement} Elemento contenedor principal de la tabla.
 */
export default function TableComponent({
	headers,
	callback,
	name,
	order,
	actions = null,
	functions = null,
}) {
	const container = document.createElement("div");
	container.className = "container px-2 py-6";

	const subContainer = document.createElement("div");
	subContainer.className =
		"bg-gray-50 border border-gray-300 rounded-xl shadow-lg overflow-hidden";
	container.appendChild(subContainer);

	subContainer.appendChild(createTableInfo(name, functions));

	const scrollContainer = document.createElement("div");
	scrollContainer.className = "max-h-96 overflow-y-auto -mt-px";
	scrollContainer.appendChild(createTable(headers, callback, order, actions));

	subContainer.appendChild(scrollContainer);

	return container;
}
