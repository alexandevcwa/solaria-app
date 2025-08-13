package com.solaria.app.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Getter
@Setter
@Entity
@Builder
@Table(name = "profesiones")
@NoArgsConstructor
@AllArgsConstructor
public class Profesion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "prof_cod")
    private int codigo;

    @Column(name = "prof_nom", unique = true, nullable = false, length = 50)
    private String nombre;

    @Column(name = "prof_est", columnDefinition = "BOOLEAN DEFAULT TRUE", insertable = false)
    private boolean estado;

    @ManyToMany(fetch = FetchType.LAZY, mappedBy = "profesiones")
    private List<Catedratico> catedraticos;
}
