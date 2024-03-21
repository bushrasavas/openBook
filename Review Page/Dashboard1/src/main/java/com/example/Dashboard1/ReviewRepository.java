package com.example.Dashboard1;

import java.util.List;

//src/main/java/com/example/Dashboard1/ReviewRepository.java

import org.springframework.data.jpa.repository.JpaRepository;

public interface ReviewRepository extends JpaRepository<Review, Long> {
	List<Review> findByBookReview_Book_Id(Long bookId);
    List<Review> findByUser_Id(Long userId);
    
    List<Review> findByBookReview_Book_IdOrderByRatingDesc(Long bookId);
    List<Review> findByBookReview_Book_IdOrderByDateDesc(Long bookId);
}
