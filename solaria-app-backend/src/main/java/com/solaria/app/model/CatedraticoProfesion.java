package com.solaria.app.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "catedraticos_profesiones")
public class CatedraticoProfesion {

    @EmbeddedId
    private CatedraticoProfesionId id;

    @MapsId("catedraticoCui")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "cate_cui")
    private Catedratico catedratico;

    @MapsId("profesionCodigo")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "prof_cod")
    private Profesion profesion;
}
