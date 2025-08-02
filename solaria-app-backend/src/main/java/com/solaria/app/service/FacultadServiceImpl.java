package com.solaria.app.service;

import com.solaria.app.dto.FacultadDto;
import com.solaria.app.mapper.FacultadMapper;
import com.solaria.app.model.Estado;
import com.solaria.app.model.Facultad;
import com.solaria.app.repository.FacultadRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class FacultadServiceImpl implements FacultadService {

    private final FacultadRepository facultadRepository;

    @Override
    public FacultadDto guardar(FacultadDto facultadDto) {
        Facultad persisted = facultadRepository.save(FacultadMapper.toEntity(facultadDto));
        persisted.setEstado(Estado.A);
        return FacultadMapper.toDto(persisted);
    }

    @Override
    public FacultadDto actualizar(FacultadDto facultadDto) {
        Facultad facultad = facultadRepository.findById(facultadDto.codiog())
                .orElseThrow(() -> new RuntimeException("Facultad no encontrado"));
        facultad.setNombre(facultadDto.nombre());
        facultad = facultadRepository.save(facultad);
        FacultadDto modified = FacultadMapper.toDto(facultad);
        return modified;
    }

    @Override
    public void cambiarEstado(int codigo, boolean estado) {

    }

    @Override
    public FacultadDto obtenerPorCodigo(int codigo) {
        return null;
    }

    @Override
    public List<FacultadDto> obtenerTodos() {
        return List.of();
    }

    @Override
    public List<FacultadDto> obtenerTodosPorEstado(boolean estado) {
        return List.of();
    }
}
