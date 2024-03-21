package com.example.Dashboard1;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.Dashboard1.BookRepository;
import com.example.Dashboard1.Book;

@Service
public class BookService {
	@Autowired
	BookRepository bookRepository;
	
	public BookService() {
		super();
		// TODO Auto-generated constructor stub
	}
    
	
	
	public List<Book> getBook() {
		return (List<Book>) bookRepository.findAll();
	}

	public void addBook(Book newBook) {
		bookRepository.save(newBook);
	}
	
	public Optional<Book> findByID(Long id) {
		 return bookRepository.findById(id);
	}
	
	
}
