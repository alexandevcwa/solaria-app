package com.solaria.app.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Getter
@Setter
@Builder
@Entity
@Table(name = "sedes")
@NoArgsConstructor
@AllArgsConstructor
public class Sede {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "sede_cod")
    private int codigo;

    @Column(name = "sede_nom", nullable = false, length = 75)
    private String nombre;

    @Column(name = "sede_dir", nullable = false, length = 75)
    private String direccion;

    @Column(name = "sede_tel", nullable = false, length = 15)
    private String telefono;

    @Column(name = "sede_corre", unique = true)
    private String correo;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "sedes_carreras",
            joinColumns = @JoinColumn(name = "sede_cod"),
            inverseJoinColumns = @JoinColumn(name = "carr_cod")
    )
    private List<Carrera> carreras;


    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "sedes_catedraticos",
            joinColumns = @JoinColumn(name = "sede_cod"),
            inverseJoinColumns = @JoinColumn(name = "cate_cui")
    )
    private List<Catedratico> catedraticos;
}
