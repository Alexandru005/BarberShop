package com.example.backend.repository;

import com.example.backend.model.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {

    List<Reservation> findByBarberId(Long barberId);

    // Găsește rezervările care se suprapun cu un interval dat
    @Query("SELECT r FROM Reservation r WHERE r.barber.id = :barberId " +
            "AND r.startDateTime < :end AND r.endDateTime > :start")
    List<Reservation> findOverlapping(
            @Param("barberId") Long barberId,
            @Param("start") LocalDateTime start,
            @Param("end") LocalDateTime end
    );
}