package com.example.Dashboard1;

import org.springframework.data.jpa.repository.JpaRepository;

public interface BookReviewRepository extends JpaRepository<BookReview, Long> {
    BookReview findByBook_Id(Long bookId);
}