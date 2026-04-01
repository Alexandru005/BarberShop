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

    // GET - toate rezervările unui barber (pentru a afișa sloturile ocupate)
    @GetMapping("/barber/{barberId}")
    public ResponseEntity<List<Reservation>> getByBarber(@PathVariable Long barberId) {
        return ResponseEntity.ok(reservationService.getByBarberId(barberId));
    }

    // POST - creează o rezervare nouă
    @PostMapping
    public ResponseEntity<Reservation> create(@RequestBody Reservation reservation) {
        Reservation saved = reservationService.save(reservation);
        return ResponseEntity.ok(saved);
    }
}