package com.solaria.app.model;


import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@Builder
@Entity
@Table(name = "pensums_estudiantes")
@NoArgsConstructor
@AllArgsConstructor
public class PensumEstudiante {

    @EmbeddedId
    private PensumEstudianteId pensumEstudianteId;

    @MapsId("pensumCodigo")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "pems_cod")
    private Pensum pensum;

    @MapsId("estudianteCui")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "estu_cui")
    private Estudiante estudiante;
}
