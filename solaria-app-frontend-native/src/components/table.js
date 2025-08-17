import TableHeadComponent from "./table-head";
import TableBodyComponent from "./table-body";
import TableFunctionComponent from "./table-function";

export default function TableComponent({
	headers,
	objects,
	name,
	order,
	actions = null,
	functions = null,
}) {
	// Contenedor principal de la tabla
	const container = document.createElement("div");
	container.className = "container px-2 py-6";

	// Sub conteoedor de la tabla
	const subContainer = document.createElement("div");
	subContainer.className =
		"bg-gray-50 border border-gray-300 rounded-xl shadow-lg overflow-hidden";
	container.appendChild(subContainer);

	// Nombre de la tabla y funcinoes persoanlizadas para la tabla
	const tableInfo = document.createElement("div");
	tableInfo.className =
		"px-4 py-3 border-b border-gray-300 flex items-center justify-between bg-gray-100";

	// Nombre de la tabla
	const title = document.createElement("h2");
	title.className = "text-xl font-semibold text-gray-800 tracking-wide";
	title.textContent = name;
	tableInfo.appendChild(title);

	// Funciones especiales para la tabla
	if (functions) {
		const functionsContainer = document.createElement("div");
		functions.forEach((f) => {
			const button = TableFunctionComponent({name: f.name, onClick: f.onClick});
			functionsContainer.appendChild(button);
		});
		tableInfo.appendChild(functionsContainer);
	}
	subContainer.appendChild(tableInfo);

	// Tabla header (fija)
	// const headerTable = document.createElement("table");
	// headerTable.className =
	// 	"min-w-full text-sm text-left text-gray-700 table-fixed";
	const thead = TableHeadComponent(headers);
	// headerTable.appendChild(thead);
	// subContainer.appendChild(headerTable);

	// Contenedor con scroll para el body
	const scrollContainer = document.createElement("div");
	scrollContainer.className = "max-h-96 overflow-y-auto -mt-px";
	
	// Tabla body (con scroll)
	const bodyTable = document.createElement("table");
	bodyTable.className =
		"min-w-full text-sm text-left text-gray-700 table-fixed";
	
	const tbody = TableBodyComponent({
		objects: objects,
		order: order,
		actions: actions,
	});
	bodyTable.appendChild(thead);
	bodyTable.appendChild(tbody);
	scrollContainer.appendChild(bodyTable);

	// Asignar al sub container
	subContainer.appendChild(scrollContainer);

	return container;
}

function tableInfo(functions){
	if(functions){
		const functionsContainer = document.createElement("div");
		functions.forEach((f) => {
			const button = TableFunctionComponent({name: f.name, onClick: f.onClick});
			functionsContainer.appendChild(button);
		});
		return functionsContainer;
	}
}