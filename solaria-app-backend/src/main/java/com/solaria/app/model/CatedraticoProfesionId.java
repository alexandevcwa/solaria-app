package com.solaria.app.model;

import jakarta.persistence.Embeddable;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.util.Objects;

@Getter
@Setter
@Embeddable
public class CatedraticoProfesionId implements Serializable {
    private String catedraticoCui;
    private int profesionCodigo;

    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        CatedraticoProfesionId that = (CatedraticoProfesionId) o;
        return profesionCodigo == that.profesionCodigo && Objects.equals(catedraticoCui, that.catedraticoCui);
    }

    @Override
    public int hashCode() {
        return Objects.hash(catedraticoCui, profesionCodigo);
    }
}
