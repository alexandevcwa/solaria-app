import TableHeadComponent from "./table-head";
import TableBodyComponent from "./table-body";

export default function TableComponent({
	headers,
	objects,
	name,
	order,
	actions = null,
	functions = null,
}) {
	const container = document.createElement("div");
	container.className = "container mx-auto px-2 py-6";

	const subContainer = document.createElement("div");
	subContainer.className =
		"bg-gray-50 border border-gray-300 rounded-xl shadow-lg overflow-hidden";

	container.appendChild(subContainer);

	const titleContainer = document.createElement("div");
	titleContainer.className =
		"px-4 py-3 border-b border-gray-300 flex items-center justify-between bg-gray-100";

	const title = document.createElement("h2");
	title.className = "text-xl font-semibold text-gray-800 tracking-wide";
	title.textContent = name;

	titleContainer.appendChild(title);
	subContainer.appendChild(titleContainer);

	// Responsive wrapper for the table
	const tableWrapper = document.createElement("div");
	tableWrapper.className = "overflow-x-auto w-full";

	const table = document.createElement("table");
	table.className =
		"min-w-full text-sm text-left text-gray-700 border-separate border-spacing-0";
	table.id = "profesiones-table";

	const thead = TableHeadComponent(headers);
	thead.className =
		"bg-gray-200 text-gray-700 font-semibold";

	table.appendChild(thead);

	const tbody = TableBodyComponent({
		objects: objects,
		order: order,
		actions: actions,
	});
	tbody.className =
		"divide-y divide-gray-300 bg-white";

	table.appendChild(tbody);

	tableWrapper.appendChild(table);
	subContainer.appendChild(tableWrapper);

	return container;
}