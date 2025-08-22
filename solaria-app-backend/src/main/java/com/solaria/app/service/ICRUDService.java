package com.solaria.app.service;

import org.springframework.data.domain.Pageable;

public interface ICRUDService <T,ID>{

    T save(T entity);

    T update(ID id, T entity);

    void delete(ID id);

    T findById(ID id);

    Iterable<T> findAll(Pageable pageable);

}
