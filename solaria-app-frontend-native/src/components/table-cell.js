export default function TableCellComponent(value) {
	const cell = document.createElement("td");
    cell.className = "px-3 py-2 text-gray-700 font-medium";
    cell.textContent = value;
    return cell;
}
