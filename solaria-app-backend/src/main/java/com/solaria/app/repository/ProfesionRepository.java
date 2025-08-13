package com.solaria.app.repository;

import com.solaria.app.model.Profesion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProfesionRepository extends JpaRepository<Profesion, Integer> {

}
