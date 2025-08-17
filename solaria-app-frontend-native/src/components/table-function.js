export default function TableFunctionComponent({
    name, onClick
}){
    const button = document.createElement("button");
    button.className = "bg-blue-900 ml-3 hover:bg-blue-700 text-white font-semibold px-3 py-1 rounded shadow transition text-sm";
    button.textContent = name;
    button.type = "button";

    if(typeof onClick === 'function'){
        button.addEventListener("click", onClick);
    }
    return button;
}