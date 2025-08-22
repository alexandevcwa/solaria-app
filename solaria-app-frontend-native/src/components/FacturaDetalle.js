export function FacturaDetalle(ctx) {
	const { id } = ctx.params;
	return {
		html: `<h1>Factura #${id}</h1>
			<button id="volver">Volver</button>`,
		onMount(root) {
			root.querySelector("#volver").onclick = () => window.appRouter.navigate("/facturas");
		}
	};
}
