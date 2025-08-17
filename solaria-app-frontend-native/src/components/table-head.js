export default function TableHeadComponent(headers) {
	const thead = document.createElement('thead');
	const tr = document.createElement('tr');
	headers.forEach(header => {
		const th = document.createElement('th');
		th.className = "px-3 py-3 text-left font-semibold text-gray-700 uppercase bg-gray-100 border-b border-gray-300";
		th.textContent = header;
		tr.appendChild(th);
	});
	thead.appendChild(tr);
	return thead;
}
