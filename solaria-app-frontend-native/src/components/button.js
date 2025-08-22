export default function ButtonComponent({
	type,
	style,
	icon,
	label,
	onClick,
}) {
	const button = document.createElement("button");
	button.type = type;
	button.className = style;
	button.textContent = label;
	const i = document.createElement("i");

	if (icon) {
		i.className = icon;
		button.appendChild(i);
	}

	button.addEventListener("click", onClick);
	return button;
}
