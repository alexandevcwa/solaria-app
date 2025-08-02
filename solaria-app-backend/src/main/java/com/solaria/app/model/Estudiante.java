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
@Builder
@Entity
@Table(name = "estudiantes")
@NoArgsConstructor
@AllArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class Estudiante {

    @Id
    @Column(name = "estu_cui", length = 13)
    private String cui;

    @Column(name = "estu_nom", length = 50, nullable = false)
    private String nombre;

    @Column(name = "estu_ape", length = 50, nullable = false)
    private String apellido;

    @Column(name = "estu_tel", length = 15, unique = true, nullable = false)
    private String telefono;

    @Column(name = "estu_email", length = 50, unique = true, nullable = false)
    private String email;

    @Column(name = "estu_umail", length = 50, unique = true)
    private String uniEmail;

    @Enumerated(EnumType.STRING)
    @Column(name = "estu_gen", length = 1, nullable = false)
    private Genero genero;

    @Column(name = "estu_naci", nullable = false)
    private LocalDate fechaNacimiento;

    @Column(name = "estu_dire", length = 75, nullable = false)
    private String direccion;

    @Enumerated(EnumType.STRING)
    @Column(name = "estu_est", length = 3, nullable = false)
    private Estado estado;

    @CreatedDate
    @Column(name = "estu_regis")
    private LocalDateTime fechaRegistro;

    @LastModifiedDate
    @Column(name = "estu_modif")
    private LocalDateTime fechaModificacion;

    @ManyToMany(fetch = FetchType.LAZY, mappedBy = "estudiantes")
    private List<Pensum> pensums;
}
