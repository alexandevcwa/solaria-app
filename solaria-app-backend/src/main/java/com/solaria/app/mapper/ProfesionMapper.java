package com.solaria.app.mapper;

import com.solaria.app.dto.ProfesionDto;
import com.solaria.app.model.Profesion;

public final class ProfesionMapper {

    public static ProfesionDto toDto(Profesion entity) {
        return new ProfesionDto(entity.getCodigo(),entity.getNombre());
    }

    public static  Profesion toEntity(ProfesionDto dto) {
        return Profesion.builder()
                .codigo(dto.id())
                .nombre(dto.nombre().toUpperCase())
                .build();
    }

}
