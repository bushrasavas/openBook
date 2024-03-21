package com.example.Dashboard1;

import java.io.Serializable;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;


@Entity
@Table(name = "Book")
@EntityListeners(AuditingEntityListener.class)
public class Book implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	Long id;
	
	@NotBlank
	String title;
	
	@NotBlank
	String author;
	
	@NotBlank
	String genre;
	
	@NotBlank
	String publisher;
	
	Boolean availability;
	
	@Column(name = "user_id")
    private Long ownerId;
	
	//review delte this only
	@OneToOne(mappedBy = "book")
    private BookReview bookReview;
	
	 public Book() {
			super();
			// TODO Auto-generated constructor stub
	}
		
	 
	 public Book(String title, String author, String genre, String publisher, User user) {
		super();
		this.title = title;
		this.author = author;
		this.genre = genre;
		this.publisher = publisher;
		this.ownerId = user.getId();
		this.availability = true;
		
	}
	 

	 
	 
	 
	public Boolean getAvailability() {
		return availability;
	}


	public void setAvailability(Boolean availability) {
		this.availability = availability;
	}


	public Long getId() {
		return id;
	}


	public void setId(Long id) {
		this.id = id;
	}


	public String getTitle() {
		return title;
	}


	public void setTitle(String title) {
		this.title = title;
	}


	public String getAuthor() {
		return author;
	}


	public void setAuthor(String author) {
		this.author = author;
	}


	public String getGenre() {
		return genre;
	}


	public void setGenre(String genre) {
		this.genre = genre;
	}


	public String getPublisher() {
		return publisher;
	}


	public void setPublisher(String publisher) {
		this.publisher = publisher;
	}

	
	


	public Long getOwnerId() {
		return ownerId;
	}


	public void setOwnerId(Long ownerId) {
		this.ownerId = ownerId;
	}


	@Override
	public String toString() {
		return "Book [id=" + id + ", title=" + title + ", author=" + author + ", genre=" + genre + ", publisher="
				+ publisher + "]";
	}
	

	
	
	
}