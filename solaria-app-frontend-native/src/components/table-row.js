import TableCellComponent from "./table-cell";

export default function TableRowComponent({object, order}) {
	const tr = document.createElement("tr");
	tr.className = "bg-white border-b border-gray-200 hover:bg-gray-100 transition duration-150";

	order.forEach((o) => {
		const value = Object.keys(object).includes(o)
			? Object.entries(object).find(([key]) => key === o)?.[1]
			: "";
		const td = TableCellComponent(value);
		tr.appendChild(td);
	});

	return tr;
}
