package com.solaria.app.model;

import jakarta.persistence.Embeddable;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.util.Objects;

@Embeddable
@Getter
@Setter
public class SedeCarreraId implements Serializable {
    private int sedeCodigo;
    private int carreraCodigo;


    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        SedeCarreraId that = (SedeCarreraId) o;
        return sedeCodigo == that.sedeCodigo && carreraCodigo == that.carreraCodigo;
    }

    @Override
    public int hashCode() {
        return Objects.hash(sedeCodigo, carreraCodigo);
    }
}
