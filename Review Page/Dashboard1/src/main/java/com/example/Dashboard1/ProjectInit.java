package com.example.Dashboard1;

import com.example.Dashboard1.Book;
import com.example.Dashboard1.User;
import com.example.Dashboard1.UserRepository;

import java.time.LocalDate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;


@Component
public class ProjectInit implements CommandLineRunner{
	@Autowired 
	private BookRepository bookRepository;
	
	@Autowired 
	private UserRepository userRepository;
	
	@Autowired
    private ReviewRepository reviewRepository;

    @Autowired
    private BookReviewRepository bookReviewRepository;
	
	@Override
	 public void run(String... args) throws Exception {
		reviewRepository.deleteAll();
		bookReviewRepository.deleteAll();
		bookRepository.deleteAll();
		userRepository.deleteAll();
		
		
		User user1 = new User("Joe Tuffee", "joe@gmail.com");
		userRepository.save(user1);
		
		Book book1 = new Book("The Hidden Dimension","Edward T. Hall", "Fiction", "Knopf Doubleday Publishing Group",user1);
		bookRepository.save(book1);
		
		BookReview bookReview1 = new BookReview();
        bookReview1.setBook(book1);
        bookReview1 = bookReviewRepository.save(bookReview1);
        
        
        Review review1 = new Review();
        review1.setReviewSubject("Meh");
        review1.setReview("It made me feel something but it wasn't that good.");
        review1.setRating(2);
        review1.setUser(user1);
        review1.setBookReview(bookReview1);
        LocalDate currentDate = LocalDate.now();
        review1.setDate(java.sql.Date.valueOf(currentDate));
        reviewRepository.save(review1);
        
		
		User user2 = new User("Daniel M", "dan@outlook.com");
		userRepository.save(user2);
		
		
		Review review2 = new Review();
        review2.setRating(4);
        review2.setReviewSubject("Enjoyed it!");
        review2.setReview("I feel smarter after readign this book.");
        review2.setUser(user2);
        review2.setBookReview(bookReview1);
        LocalDate customDate = LocalDate.of(2022, 11, 12);
        review2.setDate(java.sql.Date.valueOf(customDate));
        
        reviewRepository.save(review2);
		
		
		Book book2 = new Book("Harry Potter and the Sorcerer's Stone","J. K. Rowling", "Fantasy", "Bloomsbury",user2);
		bookRepository.save(book2);

		
		
		//Book book3 = new Book("Harry Potter and the Sorcerer's Stone","J. K. Rowling", "Fantasy", "Bloomsbury",user2);
		//bookRepository.save(book3);
		//Book book4 = new Book("Harry Potter and the Sorcerer's Stone","J. K. Rowling", "Fantasy", "Bloomsbury",user2);
		//bookRepository.save(book4);
		//Book book5 = new Book("Harry Potter and the Sorcerer's Stone","J. K. Rowling", "Fantasy", "Bloomsbury",user2);
		//bookRepository.save(book5);
		//Book book6 = new Book("Harry Potter and the Sorcerer's Stone","J. K. Rowling", "Fantasy", "Bloomsbury",user2);
		//bookRepository.save(book6);
		//Book book7 = new Book("Harry Potter and the Sorcerer's Stone","J. K. Rowling", "Fantasy", "Bloomsbury",user2);
		//bookRepository.save(book7);
		//Book book8 = new Book("Harry Potter and the Sorcerer's Stone","J. K. Rowling", "Fantasy", "Bloomsbury",user2);
		//bookRepository.save(book8);
		//Book book9 = new Book("Harry Potter and the Sorcerer's Stone","J. K. Rowling", "Fantasy", "Bloomsbury",user2);
		//bookRepository.save(book9);
	}
}
