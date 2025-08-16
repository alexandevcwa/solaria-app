export default function tableHeader({ headers }) {
	return (
		<thead>
			<tr>
				{headers.map((header, index) => (
					<th
						key={index}
						className="px-3 py-2 text-left font-bold text-indigo-600 uppercase bg-indigo-50"
					>
						{header}
					</th>
				))}
			</tr>
		</thead>
	);
}
