import tableHeader from "./table-headers";
import tableRow from "./table-row";

export default function table({
	header,
	objects,
	tableName,
	columnOrder,
	buttonsActions = null,
}) {
	return (
		<div className="container mx-auto px-2 py-6">
			<div className="bg-white/80 backdrop-blur-lg border border-gray-200 rounded-xl shadow-lg overflow-hidden">
				<div className="px-4 py-2 border-b border-gray-200 flex items-center justify-between">
					<h2 className="text-lg font-bold text-indigo-700">{tableName}</h2>
				</div>
				<table className="min-w-full text-sm">
					<tr>{tableHeader(header)}</tr>
					<tbody>{objects.map((obj, index) => tableRow(obj, columnOrder))}</tbody>
				</table>
			</div>
		</div>
	);
}
