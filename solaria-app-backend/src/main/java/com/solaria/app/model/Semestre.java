package com.solaria.app.model;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@Entity
@Table(name = "semestres")
@NoArgsConstructor
@AllArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class Semestre {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "sem_cod")
    private int codigo;

    @Column(name = "sen_ini", nullable = false)
    private LocalDate fechaInicio;

    @Column(name = "semn_fin", nullable = false)
    private LocalDate fechaFinal;

    @Column(name = "sen_insini")
    private LocalDate fechaInicioInscripcion;

    @Column(name = "sem_insfin")
    private LocalDate fechaFinalInscripcion;

    @CreatedDate
    @Column(name = "sem_regis")
    private LocalDateTime fechaRegistro;

    @LastModifiedDate
    @Column(name = "sem_modif")
    private LocalDateTime fechaModificacion;
}
