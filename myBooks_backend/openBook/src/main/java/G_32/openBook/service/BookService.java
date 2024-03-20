package G_32.openBook.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import G_32.openBook.DTO.BookDto;
import G_32.openBook.model.Book;
import G_32.openBook.repository.BookRepository;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class BookService {

	@Autowired
	private BookRepository bookRepository;

	public Book saveBook(BookDto bookDto) {
		Book book = new Book();
		book.setIsbn(bookDto.getIsbn());
		book.setTitle(bookDto.getTitle());
		book.setAuthor(bookDto.getAuthor());
		book.setPublisher(bookDto.getPublisher());
		book.setPublishedYear(bookDto.getPublishedYear());
		book.setBookCondition(bookDto.getBookCondition());
		book.setGenre(bookDto.getGenre());
		book.setDescription(bookDto.getDescription());
		book.setLocation(bookDto.getLocation());
		//book.setContactPreference(bookDto.getContactPreference());
		Book savedBook=bookRepository.save(book);
		return savedBook;
	}

	public void deleteBook (Long bookId) {
		if (bookRepository.existsById(bookId)) {
			bookRepository.deleteById(bookId);
		} else {
			throw new RuntimeException ("Book not found with id: " + bookId);
		}
	}

	public BookDto updateBookAndCover(Long bookId, BookDto bookDto, byte[] coverImageData) {
		Optional<Book> bookOptional = bookRepository.findById(bookId);
		if (!bookOptional.isPresent()) {
			throw new RuntimeException("Book not found with id: " + bookId);
		}

		Book book = bookOptional.get();

		// send info from DTO to book object
		book.setIsbn(bookDto.getIsbn());
		book.setTitle(bookDto.getTitle());
		book.setAuthor(bookDto.getAuthor());
		book.setPublisher(bookDto.getPublisher());
		book.setPublishedYear(bookDto.getPublishedYear());
		book.setBookCondition(bookDto.getBookCondition());
		book.setGenre(bookDto.getGenre());
		book.setDescription(bookDto.getDescription());
		book.setLocation(bookDto.getLocation());
		//book.setContactPreference(bookDto.getContactPreference());

		// update if there is a new cover image
		if (coverImageData != null && coverImageData.length > 0) {
			book.setCoverImage(coverImageData);
		}

		// update the book in database
		book = bookRepository.save(book);

		// convert updated book to DTO and return it
		return convertToDto(book);
	}

	public Book saveOrUpdateBook(Book book) {
		// save book object into database and update it
		return bookRepository.save(book);
	}

	public void updateBookCover(Long bookId, byte[] coverImageData) {
		// find book with related ID
		Optional<Book> bookOptional = bookRepository.findById(bookId);
		if(bookOptional.isPresent()) {
			Book book = bookOptional.get();
			// update cover image 
			book.setCoverImage(coverImageData);
			// save updated book object into database
			bookRepository.save(book);
		} else {
			throw new RuntimeException("Book not found with id: " + bookId);
		}
	}

	public BookDto getBookById(Long bookId) {
		return bookRepository.findById(bookId)
				.map(this::convertToDto)
				.orElseThrow(() -> new RuntimeException("Book not found with id: " + bookId));
	}

	public byte[] getBookCoverById(Long bookId) {
		return bookRepository.findById(bookId)
				.map(Book::getCoverImage)
				.orElseThrow(() -> new RuntimeException("Cover image not found for book with id: " + bookId));
	}

	public List<BookDto> getAllBooks() {
		return bookRepository.findAll().stream()
				.map(this::convertToDto)
				.collect(Collectors.toList());
	}

	public Book findById(Long bookId) {
		Optional<Book> bookOptional = bookRepository.findById(bookId);
		if (!bookOptional.isPresent()) {
			throw new RuntimeException("Book not found with id: " + bookId);
		}
		return bookOptional.get();
	}

	public BookDto convertToDto(Book book) {
		BookDto bookDto = new BookDto();
		bookDto.setId(book.getId());
		bookDto.setIsbn(book.getIsbn());
		bookDto.setTitle(book.getTitle());
		bookDto.setAuthor(book.getAuthor());
		bookDto.setPublisher(book.getPublisher());
		bookDto.setPublishedYear(book.getPublishedYear());
		bookDto.setBookCondition(book.getBookCondition());
		bookDto.setGenre(book.getGenre());
		bookDto.setDescription(book.getDescription());
		bookDto.setLocation(book.getLocation());
		//bookDto.setContactPreference(book.getContactPreference());
		bookDto.setCoverImage(book.getCoverImage()); //add cover image stored as BLOB to DTO

		return bookDto;
	}
}
