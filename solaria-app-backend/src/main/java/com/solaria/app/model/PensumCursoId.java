package com.solaria.app.model;

import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.util.Objects;

@Getter
@Setter
public class PensumCursoId implements Serializable {

    private int pensumCodigo;
    private int cursoCodigo;

    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        PensumCursoId that = (PensumCursoId) o;
        return pensumCodigo == that.pensumCodigo && cursoCodigo == that.cursoCodigo;
    }

    @Override
    public int hashCode() {
        return Objects.hash(pensumCodigo, cursoCodigo);
    }
}
