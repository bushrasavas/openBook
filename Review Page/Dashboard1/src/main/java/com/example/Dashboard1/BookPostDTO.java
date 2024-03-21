package com.example.Dashboard1;

public class BookPostDTO {
	
	String title;
	String author;
	String genre;
	String publisher;
	String ownerName;
	
	public BookPostDTO(String title, String author, String genre, String publisher) {
		super();
		this.title = title;
		this.author = author;
		this.genre = genre;
		this.publisher = publisher;
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


	
	
}
