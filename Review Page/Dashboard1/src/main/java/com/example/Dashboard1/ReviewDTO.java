package com.example.Dashboard1;

import java.sql.Date;

public class ReviewDTO {
    private int rating;
    private String review;
    private Long userId;
    private Date date;
    private String reviewSubject;
    
    
	public int getRating() {
		return rating;
	}
	public void setRating(int rating) {
		this.rating = rating;
	}
	public String getReview() {
		return review;
	}
	public void setReview(String review) {
		this.review = review;
	}
	public Long getUserId() {
		return userId;
	}
	public void setUserId(Long userId) {
		this.userId = userId;
	}
	public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public String getReviewSubject() {
        return reviewSubject;
    }

    public void setReviewSubject(String reviewSubject) {
        this.reviewSubject = reviewSubject;
    }

    // Getters and setters
    
}