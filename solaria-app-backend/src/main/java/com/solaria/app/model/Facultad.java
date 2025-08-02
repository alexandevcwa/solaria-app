package com.solaria.app.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "facultades")
@NoArgsConstructor
@AllArgsConstructor
public class Facultad {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "facu_cod")
    private int codigo;

    @Column(name = "facu_nom", unique = true, nullable = false)
    private String nombre;

    @Enumerated(EnumType.STRING)
    @Column(name = "facu_est", nullable = false)
    private Estado estado;
}
