package com.example.Dashboard1;

import com.example.Dashboard1.Book;
import org.springframework.data.repository.CrudRepository;

public interface BookRepository extends CrudRepository<Book,Long>{
	
}