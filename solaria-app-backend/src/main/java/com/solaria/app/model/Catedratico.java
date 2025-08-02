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

@Entity
@Getter
@Setter
@Table(name = "catedraticos")
@NoArgsConstructor
@AllArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class Catedratico {
    @Id
    @Column(name = "cate_cui", unique = true, nullable = false, length = 13)
    private String cui;

    @Column(name = "cate_nom", nullable = false, length = 50)
    private String nombre;

    @Column(name = "cate_ape", nullable = false, length = 50)
    private String apellido;

    @Column(name = "cate_tel", unique = true, nullable = false, length = 15)
    private String telefono;

    @Column(name = "cate_email", unique = true, nullable = false, length = 50)
    private String correo;

    @Column(name = "cate_umail", unique = true, length = 50)
    private String correoInstitucional;

    @CreatedDate
    @Column(name = "cate_regis")
    private LocalDateTime fechaRegistro;

    @LastModifiedDate
    @Column(name = "cate_modif")
    private LocalDateTime fechaModificacion;

    @ManyToMany(fetch = FetchType.LAZY, mappedBy = "catedraticos")
    private List<Sede> sedes;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "catedraticos_profesiones",
            joinColumns = @JoinColumn(name = "cate_cui"),
            inverseJoinColumns = @JoinColumn(name = "prof_cod")
    )
    private List<Profesion> profesiones;
}
