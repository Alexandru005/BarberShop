package com.example.backend.controller;

import com.example.backend.model.Reservation;
import com.example.backend.service.ReservationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/rezervari")
@CrossOrigin(origins = "*")
public class ReservationController {

    @Autowired
    private ReservationService reservationService;

    @GetMapping("/barber/{barberId}")
    public ResponseEntity<List<Reservation>> getByBarber(@PathVariable Long barberId) {
        return ResponseEntity.ok(reservationService.getByBarberId(barberId));
    }

    @PostMapping
    public ResponseEntity<Reservation> create(@RequestBody Reservation reservation) {
        return ResponseEntity.ok(reservationService.save(reservation));
    }

    @GetMapping("/barber/{barberId}/castiguri")
    public ResponseEntity<Double> getCastiguriLuna(@PathVariable Long barberId) {
        return ResponseEntity.ok(reservationService.getCastiguriLuna(barberId));
    }
}