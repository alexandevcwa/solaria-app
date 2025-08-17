import { profesionesService } from "../services/catalogo-profesiones-api";
import TableComponent from "../components/table";
import { Notyf } from "notyf";

const notyf = new Notyf();

export default function CatalogoProfesiones() {
	return {
		html: `
            <div class="container mx-auto">
                <div id="catalogo-container" class="overflow-hidden">
                </div>
            </div>
    `,
		onMount(root) {
			profesionesService
				.getAll()
				.then((profesiones) => {
					const component = render(profesiones);
					root.querySelector("#catalogo-container").appendChild(component);
					animateIn();
					notyf.success({
						message: "Profesiones cargadas exitosamente",
					});
				})
				.catch((error) => {
					notyf.error({
						message: error.message,
					});
				});
		},
	};
}

function render(profesiones) {
	const component = TableComponent({
		headers: TABLE_HEADERS,
		objects: profesiones,
		order: TABLE_ORDER,
		name: "Catálogo de Profesiones",
		functions: [
			{
				name: "+ Agrear Profesión",
				onClick: () => {
					notyf.success({
						message: "Funcionalidad en desarrollo",
					});
				},
			},
			{
				name: "Profesioines Desactivadas",
				onClick: () => {
					console.log("Agregar Profesión");
				},
			},
		],
	});
	return component;
}

function animateIn() {
	const table = document.getElementById("catalogo-container");
	if (table) {
		table.classList.add("animate__animated", "animate__fadeIn");
	}
}

const TABLE_HEADERS = ["ID", "NOMBRE PROFESIÓN"];
const TABLE_ORDER = ["id", "nombre"];
