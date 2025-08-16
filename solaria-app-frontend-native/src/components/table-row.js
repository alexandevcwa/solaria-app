import tableCell from "./table-cell";

export default function tableRow(object, order) {
	return (
		<tr className="hover:bg-indigo-50 transition">
			{order.map((ord, index) => getCellContent(object, ord, index))}
		</tr>
	);
}

function getCellContent(object, ord, index) {
	if (Object.keys(object).includes(ord)) {
		const entry = Object.entries(object).find(([key]) => key === ord)?.[1];
		return tableCell(entry);
	}
	return "";
}
