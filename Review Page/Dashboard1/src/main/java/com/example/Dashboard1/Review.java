package com.example.Dashboard1;

import java.sql.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import jakarta.validation.constraints.Size;
import jakarta.persistence.JoinColumn;

@Entity
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int rating;

    @Column(length = 20000000)
    private String review;
    
    
    @Temporal(TemporalType.DATE)
    private Date date;

    @Column(name = "review_subject")
    private String reviewSubject;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "book_review_id")
    private BookReview bookReview;
    
    public void setDate(Date date) {
        this.date = date;
    }

    public void setReviewSubject(String reviewSubject) {
        this.reviewSubject = reviewSubject;
    }

    public Date getDate() {
        return date;
    }

    public String getReviewSubject() {
        return reviewSubject;
    }
    
    public void setBookReview(BookReview bookReview) {
        this.bookReview = bookReview;
    }
    
    public void setRating(int rating) {
        this.rating = rating;
    }

    public void setReview(String review) {
        this.review = review;
    }

    public void setUser(User user) {
        this.user = user;
    }
    public String getReview() {
        return review;
    }

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public int getRating() {
		return rating;
	}

	public User getUser() {
		return user;
	}
    
    // getters and setters
}