import { profesionesService } from "../services/catalogo-profesiones-api";
import TableComponent from "../components/table";
import { Notyf } from "notyf";

const notyf = new Notyf();
const TABLE_HEADERS = ["ID", "NOMBRE PROFESIÓN", "Acciones"];
const TABLE_ORDER = ["id", "nombre"];

export default function CatalogoProfesiones() {
	return {
		html: `
            <div class="container mx-auto">
                <div id="catalogo-container" class="overflow-hidden">
                </div>
            </div>
    `,
		onMount(root) {
			render(root);
		},
	};
}

/**
 * Renders the "Catálogo de Profesiones" table component inside the specified root element.
 *
 * @param {HTMLElement} root - The root DOM element where the table component will be appended.
 */
function render(root) {
	const component = TableComponent({
		headers: TABLE_HEADERS,
		callback: getTableData,
		order: TABLE_ORDER,
		name: "Catálogo de Profesiones",
		functions: TABLE_FUNCTIONS
	});

	root.querySelector("#catalogo-container").appendChild(component);
}

/**
 * Obtiene los datos de la tabla de profesiones llamando al servicio correspondiente.
 * Muestra una notificación de éxito si la carga es exitosa, o una notificación de error si ocurre algún problema.
 *
 * @async
 * @function
 * @returns {Promise<Array<Object>|null>} Retorna un arreglo de profesiones si la carga es exitosa, o null si ocurre un error.
 */
async function getTableData() {
	try {
		const profesiones = await profesionesService.getAll();
		notyf.success("Profesiones cargadas exitosamente");
		return profesiones;
	} catch (error) {
		notyf.error(error.message || "Error al cargar profesiones");
		return null;
	}
}

const TABLE_FUNCTIONS = [
	{
		label: "+ Agregar Profesión",
		callback: addNewProfession,
	},
	{
		label: "Profesiones Desabilitadas",
		callback: disableProfession
	},
];

function addNewProfession() {}

function editProfession() {}

function disableProfession() {}
