package com.solaria.app.model;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Builder
@Table(name = "inscripciones")
@NoArgsConstructor
@AllArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class Inscripcion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "insc_cod")
    private int codigo;

    @CreatedDate
    @Column(name = "insc_regis")
    private LocalDateTime registro;

    @LastModifiedDate
    @Column(name = "insc_modif")
    private LocalDateTime modificacion;

    @Enumerated(EnumType.STRING)
    @Column(name = "insc_est", length = 3, nullable = false)
    private Estado estado;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumns({
            @JoinColumn(name = "insc_estu", referencedColumnName = "estu_cui"),
            @JoinColumn(name = "insc_pems", referencedColumnName = "pems_cod")
    })
    private PensumEstudiante pensumEstudiante;
}
