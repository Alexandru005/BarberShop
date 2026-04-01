package com.example.backend.controller;

import com.example.backend.model.Review;
import com.example.backend.service.ReviewService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reviews")
@CrossOrigin(origins = "http://localhost:5173") // Esențial pentru a permite cererile din React
public class ReviewController {

    private final ReviewService service;

    public ReviewController(ReviewService service) {
        this.service = service;
    }

    // CREATE - Adaugă o recenzie nouă
    @PostMapping
    public ResponseEntity<Review> createReview(@RequestBody Review review) {
        Review createdReview = service.createReview(review);
        if (createdReview != null) {
            return ResponseEntity.ok(createdReview);
        }
        return ResponseEntity.badRequest().build();
    }

    // READ - Opțional, în caz că vrei să vezi absolut toate recenziile din sistem
    @GetMapping
    public ResponseEntity<List<Review>> getAllReviews() {
        return ResponseEntity.ok(service.getAllReviews());
    }
}