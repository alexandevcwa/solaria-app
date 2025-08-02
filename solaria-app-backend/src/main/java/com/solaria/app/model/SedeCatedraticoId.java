package com.solaria.app.model;

import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.util.Objects;

@Getter
@Setter
public class SedeCatedraticoId implements Serializable {

    private String catedraticoCui;

    private int sedeCodigo;

    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        SedeCatedraticoId that = (SedeCatedraticoId) o;
        return sedeCodigo == that.sedeCodigo && Objects.equals(catedraticoCui, that.catedraticoCui);
    }

    @Override
    public int hashCode() {
        return Objects.hash(catedraticoCui, sedeCodigo);
    }
}
