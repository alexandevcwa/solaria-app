export default function TableFunctionComponent({
    label, callback
}){
    const button = document.createElement("button");
    button.className = "bg-blue-900 ml-3 hover:bg-blue-700 text-white font-semibold px-3 py-1 rounded shadow transition text-sm";
    button.textContent = label;
    button.type = "button";

    if(typeof callback === 'function'){
        button.addEventListener("click", callback);
    }
    return button;
}