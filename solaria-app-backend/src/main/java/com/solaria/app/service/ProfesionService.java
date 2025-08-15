package com.solaria.app.service;

import com.solaria.app.dto.ProfesionDto;
import com.solaria.app.model.Profesion;

public interface ProfesionService extends ICRUDService<ProfesionDto, Integer> {

    void changeStatus(int id, boolean status);

    Iterable<ProfesionDto> getAllByStatus(boolean status);

}
