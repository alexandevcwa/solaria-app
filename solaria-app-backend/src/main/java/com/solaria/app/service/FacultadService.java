package com.solaria.app.service;

import com.solaria.app.dto.FacultadDto;

import java.util.List;

public interface FacultadService {

    FacultadDto guardar(FacultadDto facultadDto);

    FacultadDto actualizar(FacultadDto facultadDto);

    void cambiarEstado(int codigo, boolean estado);

    FacultadDto obtenerPorCodigo(int codigo);

    List<FacultadDto> obtenerTodos();

    List<FacultadDto> obtenerTodosPorEstado(boolean estado);
}