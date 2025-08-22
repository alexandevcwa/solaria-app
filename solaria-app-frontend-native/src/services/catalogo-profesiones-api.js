import axios from "axios";
import { Profesion } from "../models/profesion";
import { API_BASE_URL } from "../constants/api";
import { Response } from "../models/response";

export const ProfesionesService = {
	async getAll({page,size}) {
		const response = await axios.get(`${API_BASE_URL}/profesiones?page=${page}&size=${size}`);
		return response.data.map((profesionData) => new Profesion(profesionData));
	},
	async postProfesion({profesion}) {
		const response = await axios.post(
			`${API_BASE_URL}/profesiones`,
			profesion.toJSON()
		);
		return new Response(response.data);
	},
	async putProfesion(id, profesion) {
		const response = await axios.put(
			`${API_BASE_URL}/profesiones/${id}`,
			profesion.toJSON()
		);
		return new Response(response.data);
	},
	async patchProfesionEstado(id, estado) {
		const response = await axios.patch(
			`${API_BASE_URL}/profesiones/${id}/estado`,
			{ params: { estado } }
		);
		return new Response(response.data);
	},
	async getById(id) {
		const response = await axios.get(`${API_BASE_URL}/profesiones/${id}`);
		return new Profesion(response.data);
	}
};
