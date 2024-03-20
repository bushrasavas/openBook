package G_32.openBook.controller;

import org.springframework.http.MediaType;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import G_32.openBook.DTO.BookDto;
import G_32.openBook.model.Book;
import G_32.openBook.service.BookService;
import jakarta.validation.Valid;
import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/books")
public class BookController {
	private static final Logger logger = LoggerFactory.getLogger(BookController.class);

	@Autowired
	private BookService bookService;

	@GetMapping
	public ResponseEntity<List<BookDto>> getAllBooks() {
		List<BookDto> books = bookService.getAllBooks();
		return ResponseEntity.ok().body(books);
	}

	@GetMapping("/{bookId}")
	public ResponseEntity<BookDto> getBookById(@PathVariable Long bookId) {
		BookDto book = bookService.getBookById(bookId);
		if (book == null) {
			return ResponseEntity.notFound().build();
		}
		return ResponseEntity.ok(book);
	}

	@GetMapping("/cover/{bookId}")
	public ResponseEntity<byte[]> getBookCover(@PathVariable Long bookId) {
		byte[] coverImage = bookService.getBookCoverById(bookId);
		if (coverImage == null) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}

		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.IMAGE_PNG);

		return new ResponseEntity<>(coverImage, headers, HttpStatus.OK);
	}

	@PostMapping("/addBookInfo")	//sent book details without cover image
	public ResponseEntity<Book> addBookInfo(@Valid @RequestBody BookDto bookDto){
		Book savedBook = bookService.saveBook(bookDto);
		//update BookDto with details of recently added book
		bookDto.setId(savedBook.getId());
		//return updated bookDto
		return ResponseEntity.status(HttpStatus.CREATED).body(savedBook);
	}

	@PostMapping("/uploadCover/{bookId}")	//sent cover image
	public ResponseEntity<String> uploadCover(@PathVariable Long bookId, @RequestParam("coverImage") MultipartFile coverImage) {
		if (coverImage.isEmpty()) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Cover image cannot be empty.");
		}

		try {
			byte[] coverImageData = coverImage.getBytes();
			bookService.updateBookCover(bookId, coverImageData); 
			return ResponseEntity.ok("Cover uploaded successfully.");
		} catch (IOException e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error processing cover image: " + e.getMessage());
		}
	}

	@PutMapping("/updateBookInfo/{bookId}")	//update book details without cover image
	public ResponseEntity<BookDto> updateBookInfo(@PathVariable Long bookId, @Valid @RequestBody BookDto bookDto){
		// search database with given id
		Book existingBook = bookService.findById(bookId);

		//update book details
		existingBook.setTitle(bookDto.getTitle());
		existingBook.setAuthor(bookDto.getAuthor());
		existingBook.setIsbn(bookDto.getIsbn());
		existingBook.setPublisher(bookDto.getPublisher());
		existingBook.setPublishedYear(bookDto.getPublishedYear());
		existingBook.setBookCondition(bookDto.getBookCondition());
		existingBook.setGenre(bookDto.getGenre());
		existingBook.setDescription(bookDto.getDescription());
		existingBook.setLocation(bookDto.getLocation());
		//existingBook.setContactPreference(bookDto.getContactPreference());

		// save updated book
		Book updatedBook = bookService.saveOrUpdateBook(existingBook);
		// create DTO for updated book
		BookDto updatedBookDto = bookService.convertToDto(updatedBook);
		// return bookDto which includes updated details
		return ResponseEntity.ok(updatedBookDto);
	}

	@PutMapping("/updateCover/{bookId}")	//update cover image
	public ResponseEntity<String> updateCover(@PathVariable Long bookId, @RequestParam("coverImage") MultipartFile coverImage) {
		try {
			logger.info("Cover image update started for bookId: {}", bookId);
			bookService.updateBookCover(bookId, coverImage.getBytes());
			logger.info("Cover image updated successfully for bookId: {}", bookId);
			return ResponseEntity.ok("Cover image updated successfully.");
		} catch (IOException e) {
			e.printStackTrace();
			logger.error("An error occurred while updating the cover image for bookId: {}", bookId, e);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred while updating the cover image.");
		} catch (RuntimeException e) {
			logger.error("A runtime error occurred while updating the cover image for bookId: {}", bookId, e);
			return ResponseEntity.badRequest().body(e.getMessage());
		}
	}

	@DeleteMapping("/{bookId}")
	public ResponseEntity<?> deleteBook(@PathVariable Long bookId){
		try {
			bookService.deleteBook(bookId);
			return ResponseEntity.ok().body("Book with ID " + bookId + " was deleted successfully.");
		} catch (RuntimeException e) {
			return ResponseEntity.badRequest().body("Error deleting book: " + e.getMessage());
		}
	}
}
