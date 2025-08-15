export const MENU_OPTIONS = [
	{
		id: "sec-1",
		name: "Maestros de Catálogos",
		// path: "/profesiones",
		role: ["ADMIN"],
        children: [
			{
				id: "sec-1-1",
				name: "Profesiones",
				path: "/catalogo/profesiones",
				role: ["ADMIN"],
			},
			{
				id: "sec-1-2",
				name: "Facultades",
				path: "/catalogo/facultades",
				role: ["ADMIN"],
			},
			{
				id: "sec-1-3",
				name: "Sedes",
				path: "/catalogo/sedes",
				role: ["ADMIN"],
			},
			{
				id: "sec-1-4",
				name: "Carreras",
				path: "/catalogo/carreras",
				role: ["ADMIN"],
			}
		]
	},
	{
		id: "sec-2",
		name: "Administración de Usuarios",
		role: ["ADMIN"],
		path: "/administracion/usuarios"
	},
	{
		id: "sec-3",
		name: "Administración de Roles",
		role: ["ADMIN"],
		path: "/administracion/roles"
	},
	{
		id: "sec-4",
		name: "Estudiantes",
		role: ["ADMIN"],
		path: "/estudiantes"
	},
	{
		id: "sec-5",
		name: "Inscripciones",
		role: ["ADMIN"],
		path: "/administracion/permisos"
	}

];