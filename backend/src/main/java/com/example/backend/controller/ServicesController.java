package com.example.backend.controller;

import com.example.backend.model.Services;
import com.example.backend.service.ServicesService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/services")
@CrossOrigin(origins = "http://localhost:5173")
public class ServicesController {

    private final ServicesService service;

    public ServicesController(ServicesService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<Services> createService(@RequestBody Services shopService) {
        Services created = service.createService(shopService);
        if (created != null) {
            return ResponseEntity.ok(created);
        }
        return ResponseEntity.badRequest().build();
    }
}