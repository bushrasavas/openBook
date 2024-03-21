package com.example.Dashboard1;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:3000") // Replace with your frontend URL
@RestController
@RequestMapping("/api/reviews")
public class ReviewController {

    private final ReviewService reviewService;
    private final BookReviewRepository bookReviewRepository;

    @Autowired
    public ReviewController(ReviewService reviewService, BookReviewRepository bookReviewRepository) {
        this.reviewService = reviewService;
        this.bookReviewRepository = bookReviewRepository;
    }

    @GetMapping("/byBook/{bookId}")
    public List<Review> getReviewsByBookId(@PathVariable Long bookId, @RequestParam(defaultValue = "date") String sort) {
        List<Review> reviews;
        if (sort.equals("rating")) {
            reviews = reviewService.getReviewsByBookIdSortedByRating(bookId);
        } else if (sort.equals("date")) {
            reviews = reviewService.getReviewsByBookIdSortedByDate(bookId);
        } else {
            // Handle invalid or unsupported sort options
            throw new IllegalArgumentException("Invalid sort option: " + sort);
        }
        return reviews;
    }

    @PostMapping("/addReview/{bookId}")
    public ResponseEntity<String> addReview(@PathVariable Long bookId, @RequestBody ReviewDTO reviewDTO) {
        try {
            // You need to convert ReviewDTO to Review entity
            // (you may use ModelMapper or manually create an instance)
            Review review = new Review();
            review.setRating(reviewDTO.getRating());
            review.setReview(reviewDTO.getReview());
            // Set user (you may fetch user by userId from the database)
            User user = new User();
            user.setId(reviewDTO.getUserId());
            review.setUser(user);
            review.setDate(reviewDTO.getDate());
            review.setReviewSubject(reviewDTO.getReviewSubject());

            // Find the BookReview entity based on the bookId
            BookReview bookReview = bookReviewRepository.findByBook_Id(bookId);
            
            if (bookReview == null) {
                // Handle the case when BookReview is not found
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("BookReview not found");
            }

            review.setBookReview(bookReview);

            // Save the review
            reviewService.saveReview(review);

            return ResponseEntity.ok("Review added successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to add review");
        }
    }
    @GetMapping("/byBook/{bookId}/sort")
    public List<Review> getReviewsByBookIdSorted(@PathVariable Long bookId, @RequestParam(defaultValue = "date") String sort) {
        List<Review> reviews;
        if (sort.equals("rating")) {
            reviews = reviewService.getReviewsByBookIdSortedByRating(bookId);
        } else if (sort.equals("date")) {
            reviews = reviewService.getReviewsByBookIdSortedByDate(bookId);
        } else {
            // Handle invalid or unsupported sort options
            throw new IllegalArgumentException("Invalid sort option: " + sort);
        }
        return reviews;
    }
    

    
    
}
