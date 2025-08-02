package com.solaria.app.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Table(name = "asignaciones")
@NoArgsConstructor
@AllArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class Asignacion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "aign_cod")
    private int codigo;

    @CreatedDate
    @Column(name = "asign_fecha")
    private LocalDate fechaAsignacion;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "asign_semes")
    private Semestre semestre;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "asign_insc")
    private Inscripcion inscripcion;

    @Enumerated(EnumType.STRING)
    @Column(name = "asign_est", length = 3, nullable = false)
    private Estado estado;

    @Column(name = "asign_modif")
    private LocalDateTime fechaModificacion;

}
