package com.solaria.app.mapper;

import com.solaria.app.dto.FacultadDto;
import com.solaria.app.model.Facultad;

public final class FacultadMapper {

    public static FacultadDto toDto(Facultad facultad) {
        return new FacultadDto(facultad.getCodigo(), facultad.getNombre(), facultad.getEstado().name());
    }

    public static Facultad toEntity(FacultadDto facultadDto) {
        return new Facultad(facultadDto.codiog(), facultadDto.nombre(), null);
    }
}