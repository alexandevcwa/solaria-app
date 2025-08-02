package com.solaria.app.model;

public enum Genero {
    M("Masculino"),
    F("Femenino");

    private final String descripcion;

    Genero(String descripcion) {
        this.descripcion = descripcion;
    }
}
