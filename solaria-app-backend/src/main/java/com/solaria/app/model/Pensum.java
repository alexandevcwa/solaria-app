package com.solaria.app.model;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@Entity
@Builder
@Table(name = "pensums")
@NoArgsConstructor
@AllArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class Pensum {

    @Id
    @Column(name = "pems_cod")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int codigo;

    @Column(name = "pems_aprof")
    private LocalDate fechaAprobacion;

    @Column(name = "pems_est", length = 3, nullable = false)
    @Enumerated(EnumType.STRING)
    private Estado estado;

    @Column(name = "pems_ini")
    private LocalDate fechaInicio;

    @Column(name = "pems_fin")
    private LocalDate fechaFinal;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumns({
            @JoinColumn(name = "pems_sede", referencedColumnName = "sede_cod"),
            @JoinColumn(name = "pems_carr", referencedColumnName = "carr_cod")
    })
    private SedeCarrera sedeCarrera;

    @CreatedDate
    @Column(name = "pems_regis")
    private LocalDateTime fechaRegistro;

    @LastModifiedDate
    @Column(name = "pems_modif")
    private LocalDateTime fechaModificacion;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "pensums_cursos",
            joinColumns = @JoinColumn(name = "pems_cod"),
            inverseJoinColumns = @JoinColumn(name = "curs_cod")
    )
    private List<Curso> cursos;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "pensums_estudiantes",
            joinColumns = @JoinColumn(name = "pems_cod"),
            inverseJoinColumns = @JoinColumn(name = "estu_cui")
    )
    private List<Estudiante> estudiantes;
}
