export default function TableHeadComponent(headers) {
	const thead = document.createElement('thead');
	const tr = document.createElement('tr');
	tr.className = "sticky top-0 bg-white z-10 border-b-2 border-gray-300";

	headers.forEach(header => {
		const th = document.createElement('th');
		th.className = "pl-3 py-3 text-left font-semibold text-gray-700 uppercase bg-gray-100";

		th.textContent = header;
		tr.appendChild(th);
	});
	thead.appendChild(tr);
	return thead;
}
