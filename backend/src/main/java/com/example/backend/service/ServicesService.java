package com.example.backend.service;

import com.example.backend.model.Services;
import com.example.backend.repository.ShopServiceRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ServicesService {

    private final ShopServiceRepository repository;

    public ServicesService(ShopServiceRepository repository) {
        this.repository = repository;
    }

    // Creare serviciu nou (ex: Tuns)
    public Services createService(Services service) {
        return repository.save(service);
    }

    // Citire toate serviciile (opțional, pentru testare)
    public List<Services> getAllServices() {
        return repository.findAll();
    }
}