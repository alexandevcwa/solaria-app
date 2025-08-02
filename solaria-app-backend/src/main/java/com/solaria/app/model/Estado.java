package com.solaria.app.model;

public enum Estado {
    A("Activo"),
    I("Inactivo"),
    AN("Anulado"),
    AC("Aceptado"),
    RE("Rechazado"),
    PE("Pendiente"),
    CO("Completado"),
    CA("Cancelado"),
    PR("Procesado"),
    AP("Aprobado"),
    REA("Reactivado"),
    PA("Pagado"),
    NA("No Aprobado"),
    EN("Enviado"),
    EX("Exento");

    @SuppressWarnings("unused")
    private final String descripcion;

    Estado(String descripcion) {
        this.descripcion = descripcion;
    }
}
