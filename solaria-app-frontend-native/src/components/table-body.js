import TableRowComponent from "./table-row";

export default function TableBodyComponent({
    objects,
    order,
    actions = null
}){
    const tbody = document.createElement("tbody");
     objects.forEach(element => {
        const tr = TableRowComponent({
            object: element,
            order: order
        })
        tbody.appendChild(tr);
    });
    return tbody;
}