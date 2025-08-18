import TableRowComponent from "./table-row";

const reactiveObjects = [];

export default function TableBodyComponent({ objects, order, actions = null }) {
	const tbody = document.createElement("tbody");
	tbody.className = "divide-gray-300 bg-white";

	// TODO: hacer la siguientes funcion, los actions, son botones que afectan las columnas fisicamente,
	// cada actions debe de tener un tipo de operacion definida como, DELETE, UPDATE, INSERT y SELECT.
	// Cuando es OTHER, no tiene dominio sobre la fila, solo puede obtener los datos
	// Por cada tipo de acción, se debe crear un botón correspondiente y se debe de recibir el tipo de accion, la funcion a ejecutar
	// por cada tipo de accion, la funcion correcpondiente debe de tener parametros obligatorios,
	// como la de insert, debe de traer el objeto a insertar, el delete, debe de traer el id del objeto a eliminar
	// el update, debe de traer el id y el nuevo objeto
	objects.forEach((element) => {
		const component = TableRowComponent({
			object: element,
			order: order,
			
		});
		tbody.appendChild(component.tr);
		reactiveObjects.push(component.reactive);
	});
	return tbody;
}
