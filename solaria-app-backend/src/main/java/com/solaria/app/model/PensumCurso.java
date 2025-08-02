package com.solaria.app.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "pensums_cursos")
@NoArgsConstructor
@AllArgsConstructor
public class PensumCurso {

    @EmbeddedId
    private PensumCursoId id;

    @MapsId("pensumCodigo")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "pems_cod")
    private Pensum pensum;

    @MapsId("cursoCodigo")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "curs_cod")
    private Curso curso;
}
