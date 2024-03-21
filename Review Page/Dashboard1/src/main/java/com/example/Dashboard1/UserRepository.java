package com.example.Dashboard1;

import com.example.Dashboard1.User;
import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<User,Long>{
	User findByEmail(String email);
}

