// Maestros
import { FacturaDetalle } from "../components/FacturaDetalle.js";
import { FacturasLista } from "../components/FacturasLista.js";

export const ROUTES = [
	{ path: "/factura/:id", name: "factura-detalle", component: FacturaDetalle },
	{ path: "/facturas", name: "facturas-lista", component: FacturasLista },
];