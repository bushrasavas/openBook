package com.example.Dashboard1;

//src/main/java/com/example/Dashboard1/ReviewService.java

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReviewService {

    private final ReviewRepository reviewRepository;

    @Autowired
    public ReviewService(ReviewRepository reviewRepository) {
        this.reviewRepository = reviewRepository;
    }

    public List<Review> getReviewsByBookId(Long bookId) {
        return reviewRepository.findByBookReview_Book_Id(bookId);
    }

    public Review saveReview(Review review) {
        return reviewRepository.save(review);
    }

    // Add a method to get reviews by userId if needed
    public List<Review> getReviewsByUserId(Long userId) {
        return reviewRepository.findByUser_Id(userId);
    }
    
    public List<Review> getReviewsByBookIdSortedByRating(Long bookId) {
        return reviewRepository.findByBookReview_Book_IdOrderByRatingDesc(bookId);
    }
    public List<Review> getReviewsByBookIdSortedByDate(Long bookId) {
        return reviewRepository.findByBookReview_Book_IdOrderByDateDesc(bookId);
    }
}

