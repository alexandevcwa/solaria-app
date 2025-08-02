package com.solaria.app.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "asignaciones_detalle")
@NoArgsConstructor
@AllArgsConstructor
public class AsignacionDetalle {

    @Id
    @Column(name = "asigd_cod")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int codigo;

    @Enumerated(EnumType.STRING)
    @Column(name = "asigd_est", length = 3, nullable = false)
    private Estado estadp;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "asigd_asign")
    private Asignacion asignacion;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "asigd_secc")
    private Seccion seccion;
}
