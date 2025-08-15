package com.solaria.app.service;

import com.solaria.app.dto.ProfesionDto;
import com.solaria.app.exception.ServiceException;
import com.solaria.app.mapper.ProfesionMapper;
import com.solaria.app.model.Profesion;
import com.solaria.app.repository.ProfesionRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProfesionServiceImpl implements ProfesionService {

    private final ProfesionRepository profesionRepository;

    @Override
    public ProfesionDto save(ProfesionDto entity) {
        Profesion profesion = ProfesionMapper.toEntity(entity);
        Profesion persisted = profesionRepository.save(profesion);
        return ProfesionMapper.toDto(persisted);
    }

    @Override
    @Transactional
    public ProfesionDto update(Integer id, ProfesionDto entity) {
        Profesion profesion = profesionRepository.findById(id).orElse(null);
        if (null == profesion) {
            throw new ServiceException(HttpStatus.BAD_REQUEST, "Profesión no existe para actualizar");
        }
        return ProfesionMapper.toDto(profesion);
    }

    @Override
    @Transactional
    public void delete(Integer id) {

        Profesion profesion = profesionRepository.findById(id).orElse(null);
        if (null == profesion) {
            throw new ServiceException(HttpStatus.BAD_REQUEST, "Profesión no existe para eliminar");
        }
        profesion.setEstado(false);
        profesionRepository.save(profesion);
    }

    @Override
    public ProfesionDto findById(Integer id) {
        Profesion profesion = profesionRepository.findById(id)
                .orElseThrow(() -> new ServiceException(HttpStatus.NOT_FOUND, "Profesión no encontrada"));
        return ProfesionMapper.toDto(profesion);
    }

    @Override
    public Iterable<ProfesionDto> findAll() {
        List<Profesion> profesiones = profesionRepository.getAllByEstado(true);
        if (profesiones.isEmpty()) {
            throw new ServiceException(HttpStatus.NOT_FOUND, "No existen profesiones registradas");
        }
        return profesiones.stream().map(ProfesionMapper::toDto).toList();
    }

    @Override
    @Transactional
    public void changeStatus(int id, boolean status) {
        Profesion profesion = profesionRepository.findById(id).orElse(null);
        if (null == profesion) {
            throw new ServiceException(HttpStatus.BAD_REQUEST, "Profesión no existe para cambiar estado");
        }
        if (status == profesion.isEstado()) {
            String msgEstado = status ? "activada" : "desactivada";
            throw new ServiceException(HttpStatus.BAD_REQUEST, "La profesión ya se encuentra " + msgEstado);
        }
        profesion.setEstado(status);
        profesionRepository.save(profesion);
    }

    @Override
    public Iterable<ProfesionDto> getAllByStatus(boolean status) {

        List<Profesion> profesiones = profesionRepository.getAllByEstado(status);
        if (!profesiones.isEmpty()) {
            throw new ServiceException(HttpStatus.NOT_FOUND, "No existen profesiones registradas");
        }
        return profesiones.stream().map(ProfesionMapper::toDto).toList();
    }
}
