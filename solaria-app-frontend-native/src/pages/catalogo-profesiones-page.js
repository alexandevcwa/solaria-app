import { profesionesService } from "../services/catalogo-profesiones-api";
import TableComponent from "../components/table";
import { Notyf } from "notyf";
import { TableRowActionType } from "../components/constants/table-row-action-type";

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
		functions: TABLE_FUNCTIONS,
		actions: ROW_ACTIONS
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
		animateTableInit();
		return profesiones;
	} catch (error) {
		console.error("Error al cargar profesiones:", error);
		const message = `${error.response.data.code} - ${error.response.data.message}`;
		notyf.error(message || "Error al cargar profesiones");
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
		callback: disableProfession,
	},
];

const ROW_ACTIONS = [
	{
		label: "Ver",
		onClick: showProfession,
		type: TableRowActionType.SELECT,
	},
	{
		label: "Editar",
		onClick: editProfession,
		type: TableRowActionType.EDIT,
	},
	{
		label: "Desabilitar",
		onClick: disableProfession,
		type: TableRowActionType.DELETE,
	},
];

function animateTableInit() {
	const table = document.getElementById("catalogo-container");
	if (table) {
		table.classList.add("animate__animated", "animate__fadeIn");
	}
	table.addEventListener("animationend", () => {
		table.classList.remove("animate__animated", "animate__fadeIn");
	});
}

function showProfession(reactiveValue){
	console.log("Mostrar", reactiveValue);

}

function editProfession(reactive) {
	reactive.id = 10;
	notyf.success("Profesión editada exitosamente");
	return reactive;
}

function disableProfession(reactive) {
	notyf.success(`Profesión ${reactive.nombre} deshabilitada exitosamente`);
}

function addNewProfession(){

}