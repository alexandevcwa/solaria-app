import { profesionesService } from "../services/catalogo-profesiones-api";
import TableComponent from "../components/table";
import { Notyf } from "notyf";

const notyf = new Notyf();

export default function CatalogoProfesiones() {
	return {
		html: `
            <div class="container mx-auto px-2 py-6">
                <div id="catalogo-container" class="bg-white/80 backdrop-blur-lg border border-gray-200 rounded-xl shadow-lg overflow-hidden">
                </div>
            </div>
    `,
		onMount(root) {
			profesionesService.getAll().then((profesiones) => {
                const tableHtml = render(profesiones);
                root.querySelector("#catalogo-container").innerHTML = tableHtml;
                animateIn();
                notyf.success({
                    message: "Profesiones cargadas exitosamente"
                });

            })
            .catch((error) => {
                notyf.error({
                    message: error.message
                });
            })
		},
	};
}

function render(profesiones) {
	const component = TableComponent({
		headers: TABLE_HEADERS,
		objects: profesiones,
		order: TABLE_ORDER,
		name: "Catálogo de Profesiones",
	});
    return component.innerHTML;
}

function animateIn(){
    const table = document.getElementById("catalogo-container");
    if (table) {
        table.classList.add("animate__animated", "animate__fadeIn");
    }

}

const TABLE_HEADERS = ["ID", "NOMBRE PROFESIÓN", "ACCIONES","DEFINICINOES"];
const TABLE_ORDER = ["id", "nombre"];
