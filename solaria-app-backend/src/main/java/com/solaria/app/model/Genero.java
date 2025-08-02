package com.solaria.app.model;

public enum Genero {
    M("Masculino"),
    F("Femenino");

    @SuppressWarnings("unused")
    private final String descripcion;

    Genero(String descripcion) {
        this.descripcion = descripcion;
    }
}
