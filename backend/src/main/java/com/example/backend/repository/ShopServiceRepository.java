package com.example.backend.repository;

import com.example.backend.model.Services; // Ai grijă să imporți modelul tău
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ShopServiceRepository extends JpaRepository<Services, Long> {
}