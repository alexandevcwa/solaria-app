package com.solaria.app.repository;

import com.solaria.app.model.Profesion;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProfesionRepository extends JpaRepository<Profesion, Integer> {
    List<Profesion> getAllByEstado(boolean status, Pageable pageable);
}
