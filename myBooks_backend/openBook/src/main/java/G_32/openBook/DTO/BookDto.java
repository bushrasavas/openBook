package G_32.openBook.DTO;

import jakarta.validation.constraints.NotBlank;


public class BookDto {
	private Long id;
	
	@NotBlank(message = "ISBN cannot be blank")
    private String isbn;

    @NotBlank(message = "Title cannot be blank")
    private String title;

    @NotBlank(message = "Author cannot be blank")
    private String author;
    
    private String publisher;
    private Integer publishedYear;
    private String bookCondition;
    private String genre;
    private String description;
    
    @NotBlank(message = "Location cannot be blank")
    private String location;
    
//    @NotBlank(message = "Contact preference cannot be blank")
//    private String contactPreference;
    
    private byte[] coverImage;
    private String coverImageBase64;
    private String coverImageUrl;

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

//    public String getContactPreference() {
//        return contactPreference;
//    }
//
//    public void setContactPreference(String contactPreference) {
//        this.contactPreference = contactPreference;
//    }
    
    public byte[] getCoverImage() {
        return coverImage;
    }
    
    public void setCoverImage(byte[] coverImage) {
        this.coverImage = coverImage;
    }
    
    public String getCoverImageUrl() {
		return coverImageUrl;
	}

	public void setCoverImageUrl(String coverImageUrl) {
		this.coverImageUrl = coverImageUrl;
	}
	
    public String getCoverImageBase64() {
        return coverImageBase64;
    }

    public void setCoverImageBase64(String coverImageBase64) {
        this.coverImageBase64 = coverImageBase64;
    }

}
