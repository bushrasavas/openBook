package com.example.Dashboard1;


import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;
import com.example.Dashboard1.BookPostDTO;
import com.example.Dashboard1.Book;
import com.example.Dashboard1.BookService;


@RestController  
@CrossOrigin(origins = "http://localhost:3000") // Adjust the origin to match your React.js app's URL
public class BookController {
	
	@Autowired
	BookService bookService;
	
	// Get All Users
    @GetMapping("/book")
    public List<Book> getBook() {
        return bookService.getBook();
    }
    
    @PatchMapping("/book/{id}/availability")
    public ResponseEntity<?> updateBookAvailability(
        @PathVariable Long id, @RequestParam boolean availability) {
      Optional<Book> optionalBook = bookService.findByID(id);

      if (optionalBook.isPresent()) {
        Book book = optionalBook.get();
        book.setAvailability(availability);
        bookService.addBook(book);
        return ResponseEntity.ok(book);
      } else {
        return ResponseEntity.notFound().build();
      }
    }
    
    @PostMapping("/book")
    public ResponseEntity<Optional<Book>> addBook(@RequestBody BookPostDTO newBookDTO) {
    	
    	if (newBookDTO.getTitle()==null || 
    		newBookDTO.getAuthor()==null ||
    		newBookDTO.getGenre()==null ||
    		newBookDTO.getPublisher()==null) {
            return new ResponseEntity<>(Optional.ofNullable(null), HttpStatus.BAD_REQUEST);
        }
    	
    	Book newBook = new Book(newBookDTO.getTitle(), newBookDTO.getAuthor(),
    			newBookDTO.getGenre(), newBookDTO.getPublisher(), null);
    	bookService.addBook(newBook);
    	return new ResponseEntity<>(Optional.ofNullable(newBook),HttpStatus.CREATED);

    }
	 
    
    // Get User by ID
    @GetMapping("/book/{id}")
    public Optional<Book> getUserById(@PathVariable(value = "id") long Id) {
        return bookService.findByID(Id);
    }
	
}