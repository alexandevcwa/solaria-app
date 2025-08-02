package com.solaria.app.model;

import jakarta.persistence.Embeddable;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.util.Objects;

@Embeddable
@Getter
@Setter
public class PensumEstudianteId implements Serializable {

    private int pensumCodigo;

    private String estudianteCui;

    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        PensumEstudianteId that = (PensumEstudianteId) o;
        return pensumCodigo == that.pensumCodigo && Objects.equals(estudianteCui, that.estudianteCui);
    }

    @Override
    public int hashCode() {
        return Objects.hash(pensumCodigo, estudianteCui);
    }
}
