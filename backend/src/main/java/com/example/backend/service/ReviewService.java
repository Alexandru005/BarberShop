package com.example.backend.service;

import com.example.backend.model.Review;
import com.example.backend.repository.ReviewRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReviewService {

    private final ReviewRepository repository;

    public ReviewService(ReviewRepository repository) {
        this.repository = repository;
    }

    // Creare recenzie nouă
    public Review createReview(Review review) {
        return repository.save(review);
    }

    // Citire toate recenziile
    public List<Review> getAllReviews() {
        return repository.findAll();
    }
}