package com.solaria.app.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "sedes_carreras")
public class SedeCarrera {

    @EmbeddedId
    private SedeCarreraId id;

    @MapsId("sedeCodigo")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "sede_cod")
    private Sede sede;

    @MapsId("carreraCodigo")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "carr_cod")
    private Carrera carrera;
}
