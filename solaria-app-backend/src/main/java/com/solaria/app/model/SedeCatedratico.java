package com.solaria.app.model;

import jakarta.persistence.*;

@Entity
@Table(name = "sedes_catedraticos")
public class SedeCatedratico {

    @EmbeddedId
    private SedeCatedraticoId id;

    @MapsId("sedeCodigo")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "sede_cod")
    private Sede sede;

    @MapsId("catedraticoCui")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "cate_cui")
    private Catedratico catedratico;
}
