export function FacturasLista() {
	return {
		html: `<ul>
			<li><button onclick="window.appRouter.navigate('/factura/101')">Factura 101</button></li>
			<li><button onclick="window.appRouter.navigate('/factura/102')">Factura 102</button></li>
		</ul>`
	};
}
