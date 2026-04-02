package com.example.backend.service;

import com.example.backend.model.Reservation;
import com.example.backend.repository.ReservationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
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

    public Double getCastiguriLuna(Long barberId) {
        LocalDateTime startOfMonth = LocalDateTime.now()
                .withDayOfMonth(1)
                .withHour(0).withMinute(0).withSecond(0).withNano(0);
        LocalDateTime now = LocalDateTime.now();

        List<Reservation> rezervari = reservationRepository.findByBarberId(barberId);

        return rezervari.stream()
                .filter(r -> r.getStartDateTime().isAfter(startOfMonth)
                        && r.getStartDateTime().isBefore(now))
                .mapToDouble(r -> r.getService() != null
                        ? r.getService().getPrice().doubleValue() : 0)
                .sum();
    }
}