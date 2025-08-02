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
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "cursos")
@NoArgsConstructor
@AllArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class Curso {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "curs_cod")
    private int codigo;

    @Column(name = "curs_nom", nullable = false, length = 50)
    private String nombre;

    @Column(name = "curs_tip", nullable = false, length = 20)
    private String tipo;

    @Column(name = "curs_cred")
    private Short creditos;

    @Column(name = "curs_requi")
    private Integer requerimiento;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "curs_prof")
    private Profesion profesion;

    @ManyToMany(fetch = FetchType.LAZY, mappedBy = "cursos")
    private List<Pensum> pensums;

    @CreatedDate
    @Column(name = "curs_regis")
    private LocalDateTime registro;

    @LastModifiedDate
    @Column(name = "curs_modif")
    private LocalDateTime modificacion;
}
