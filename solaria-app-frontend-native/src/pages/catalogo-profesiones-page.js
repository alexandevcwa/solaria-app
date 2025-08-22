import { ProfesionesService } from "../services/catalogo-profesiones-api";
import TableComponent from "../components/table";
import { Notyf } from "notyf";
import { TableRowActionType } from "../components/constants/table-row-action-type";
import AddProfesionForm from "../modules/module-professions/form-add-profession";

const notyf = new Notyf();
const TABLE_CONFIG = {
	headers: ["ID", "NOMBRE PROFESIÓN", "Acciones"],
	order: ["id", "nombre"],
	name: "Catálogo de Profesiones",
	containerId: "catalogo-container",
	addDialogId: "add-profesion-dialog",
	animationClass: "animate__fadeIn",
};

export default function CatalogoProfesiones() {
	return {
		html: `
			<div class="container mx-auto">
				<div id="${TABLE_CONFIG.containerId}" class="overflow-hidden"></div>
			</div>
		`,
		onMount(root) {
			renderTable(root);
			renderAddProfessionForm(root);
		},
	};
}

function renderTable(root) {
	const table = TableComponent({
		headers: TABLE_CONFIG.headers,
		callback: fetchTableData,
		order: TABLE_CONFIG.order,
		name: TABLE_CONFIG.name,
		functions: getTableFunctions(),
		actions: getRowActions(),
	});
	root.querySelector(`#${TABLE_CONFIG.containerId}`).appendChild(table);
}

function renderAddProfessionForm(root) {
	root.appendChild(AddProfesionForm(TABLE_CONFIG.addDialogId));
}

async function fetchTableData() {
	try {
		const profesiones = await ProfesionesService.getAll({page: 0, size: 12});
		notyf.success("Profesiones cargadas exitosamente");
		animateTable(TABLE_CONFIG.containerId, TABLE_CONFIG.animationClass);
		return profesiones;
	} catch (error) {
		handleError(error, "Error al cargar profesiones");
		return null;
	}
}

function getTableFunctions() {
	return [
		{
			label: "+ Agregar Profesión",
			callback: showAddProfessionForm,
		},
		{
			label: "Profesiones Deshabilitadas",
			callback: disableProfession,
		},
	];
}

function getRowActions() {
	return [
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
			label: "Deshabilitar",
			onClick: disableProfession,
			type: TableRowActionType.DELETE,
		},
	];
}

function animateTable(containerId, animationClass) {
	const table = document.getElementById(containerId);
	if (!table) return;
	table.classList.add("animate__animated", animationClass);
	table.addEventListener("animationend", () => {
		table.classList.remove("animate__animated", animationClass);
	}, { once: true });
}

function showProfession(profesion) {
	console.log("Mostrar profesión:", profesion);
}

function editProfession(profesion) {
	// Aquí deberías implementar la lógica real de edición
	notyf.success("Profesión editada exitosamente");
	return profesion;
}

function disableProfession(profesion) {
	notyf.success(`Profesión ${profesion.nombre} deshabilitada exitosamente`);
}

function showAddProfessionForm() {
	const formModal = document.getElementById(TABLE_CONFIG.addDialogId);
	if (formModal) {
		formModal.classList.remove("opacity-0", "pointer-events-none");
		formModal.querySelector("div").classList.remove("scale-95");
	}
}

function handleError(error, defaultMsg) {
	const message = error?.response?.data
		? `${error.response.data.code} - ${error.response.data.message}`
		: defaultMsg;
	notyf.error(message);
	console.error(message, error);
}
