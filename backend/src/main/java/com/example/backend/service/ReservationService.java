package com.example.backend.service;

import com.example.backend.model.Reservation;
import com.example.backend.repository.ReservationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class ReservationService {

    @Autowired
    private ReservationRepository reservationRepository;

    public List<Reservation> getByBarberId(Long barberId) {
        return reservationRepository.findByBarberId(barberId);
    }

    public Reservation save(Reservation reservation) {
        List<Reservation> suprapuse = reservationRepository.findOverlapping(
                reservation.getBarber().getId(),
                reservation.getStartDateTime(),
                reservation.getEndDateTime()
        );

        if (!suprapuse.isEmpty()) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "Acest interval este deja rezervat!"
            );
        }

        return reservationRepository.save(reservation);
    }
}