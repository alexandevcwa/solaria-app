package com.solaria.app.service;

public interface ICRUDService <T,ID>{

    T save(T entity);

    T update(ID id, T entity);

    void delete(ID id);

    T findById(ID id);

    Iterable<T> findAll();

}
