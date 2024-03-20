package G_32.openBook.model;

import jakarta.persistence.*;

@Entity
public class Book {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String isbn;
	private String title;
	private String author;
	private String publisher;
	private Integer publishedYear;
	private String bookCondition;
	private String genre;
	private String location;
	//private String contactPreference;

	@Lob
	@Column (name= "cover_image", columnDefinition= "MEDIUMBLOB")
	private byte[] coverImage;
	
	@Column(name="description", columnDefinition= "TEXT")
	private String description;
	
	public Book(String isbn, String title, String author, String location, byte[] coverImage)//, String contactPreference)
	{
		this.isbn = isbn;
		this.title = title;
		this.author = author;
		this.location = location;
		this.coverImage= coverImage;
		//this.contactPreference=contactPreference;
	}

	public Book() {
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getIsbn() {
		return isbn;
	}

	public void setIsbn(String isbn) {
		this.isbn = isbn;
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

	public String getPublisher() {
		return publisher;
	}

	public void setPublisher(String publisher) {
		this.publisher = publisher;
	}

	public Integer getPublishedYear() {
		return publishedYear;
	}

	public void setPublishedYear(Integer publishedYear) {
		this.publishedYear = publishedYear;
	}

	public String getBookCondition() {
		return bookCondition;
	}

	public void setBookCondition(String bookCondition) {
		this.bookCondition = bookCondition;
	}

	public String getGenre() {
		return genre;
	}

	public void setGenre(String genre) {
		this.genre = genre;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getLocation() {
		return location;
	}

	public void setLocation(String location) {
		this.location = location;
	}

//	public String getContactPreference() {
//		return contactPreference;
//	}
//
//	public void setContactPreference(String contactPreference) {
//		this.contactPreference = contactPreference;
//	}

	public byte[] getCoverImage() {
		return coverImage;
	}

	public void setCoverImage(byte[] coverImage) {
		this.coverImage=coverImage;
	}


}