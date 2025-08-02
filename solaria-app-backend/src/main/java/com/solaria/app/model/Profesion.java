package com.solaria.app.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Entity
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

    @ManyToMany(fetch = FetchType.LAZY, mappedBy = "profesiones")
    private List<Catedratico> catedraticos;
}
