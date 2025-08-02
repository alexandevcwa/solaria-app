package com.solaria.app.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;
import java.time.LocalTime;

@Getter
@Setter
@Entity
@Table(name = "secciones")
@NoArgsConstructor
@AllArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class Seccion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "sec_cod")
    private int codigo;

    @Column(name = "sec_letra", length = 1, nullable = false)
    private String letra;

    @CreatedDate
    @Column(name = "sec_regis")
    private LocalDateTime registro;

    @LastModifiedDate
    @Column(name = "sec_modif")
    private LocalDateTime modificacion;

    @Column(name = "sec_hini", nullable = false)
    private LocalTime horaInicial;

    @Column(name = "sec_hfin", nullable = false)
    private LocalTime horaFinal;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumns({
            @JoinColumn(name = "sec_curso", referencedColumnName = "curs_cod"),
            @JoinColumn(name = "sec_pems", referencedColumnName = "pems_cod")
    })
    private PensumCurso pensumCurso;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "sec_cate", referencedColumnName = "cate_cui")
    private Catedratico catedratico;
}
