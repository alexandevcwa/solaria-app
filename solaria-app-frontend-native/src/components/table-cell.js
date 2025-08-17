export default function TableCellComponent(value, columnWidth) {
	const cell = document.createElement("td");
    cell.className = "px-3 py-2 text-gray-700 font-medium";
    if (columnWidth) {
        cell.style.width = columnWidth;
    }
    cell.textContent = value;
    return cell;
}
