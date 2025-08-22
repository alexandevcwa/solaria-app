import ButtonComponent from "../../components/button";
import InputComponent from "../../components/input";
import { BUTTON_STYLE } from "../../components/constants/button-types";
import { ProfesionesService } from "../../services/catalogo-profesiones-api";
import { Profesion } from "../../models/profesion";
import { Notyf } from "notyf";
import DialogFormComponent from "../../components/dialog-form";

const notyf = new Notyf();
const INPUT_NAME_ID = 'profession-name-input';

export default function AddProfesionForm(dialogId) {
    const form = createProfessionForm(dialogId);
    return DialogFormComponent({
        formComponent: form,
        title: "Agregar Profesión",
        id: dialogId,
    });
}

function createProfessionForm(dialogId) {
    const form = document.createElement("form");
    form.className = "space-y-4";

    const nameInput = InputComponent({
        id: INPUT_NAME_ID,
        label: "Nombre de la Profesión",
        type: "text",
        required: true,
        regex: /^[a-zA-Z\s]+$/,
    });

    const buttonsContainer = createButtonsContainer(dialogId, nameInput.querySelector('input'));

    form.appendChild(nameInput);
    form.appendChild(buttonsContainer);

    return form;
}

function createButtonsContainer(dialogId, nameInput) {
    const container = document.createElement("div");
    container.className = "flex justify-end gap-3 pt-4 border-t border-gray-200";

    const cancelButton = ButtonComponent({
        label: "Cancelar",
        onClick: () => closeDialog(dialogId),
        style: BUTTON_STYLE.SECONDARY,
    });

    const submitButton = ButtonComponent({
        label: "Guardar",
        style: BUTTON_STYLE.PRIMARY,
        type: "button",
        onClick: () => handleSaveProfession(dialogId, nameInput),
    });

    container.appendChild(cancelButton);
    container.appendChild(submitButton);

    return container;
}

function closeDialog(dialogId) {
    const formModal = document.getElementById(dialogId);
    if (formModal) {
        formModal.classList.add("opacity-0", "pointer-events-none");
        const innerDiv = formModal.querySelector("div");
        if (innerDiv) innerDiv.classList.add("scale-95");
    }
}

async function handleSaveProfession(dialogId, nameInput) {
    const nameValue = nameInput.value.trim().toUpperCase();
    if (!nameValue) {
        notyf.error("El nombre de la profesión es requerido.");
        return;
    }

    const profession = new Profesion({ nombre: nameValue });

    try {
        const response = await ProfesionesService.postProfesion({ profesion: profession });
        notyf.success(`${response.code} - ${response.message}`);
        closeDialog(dialogId);
    } catch (error) {
        const message = error?.response?.data
            ? `${error.response.data.code} - ${error.response.data.message}`
            : "Error al guardar la profesión";
        notyf.error(message);
    }
}
