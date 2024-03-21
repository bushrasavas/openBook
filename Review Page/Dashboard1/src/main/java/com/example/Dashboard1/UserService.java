package com.example.Dashboard1;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.Dashboard1.User;
import com.example.Dashboard1.UserRepository;
//import com.example.demo.exception.ResourceNotFoundException;

@Service
public class UserService {
	@Autowired
    UserRepository userRepository;
	
	public UserService() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	
	public List<User> getUsers() {
		return (List<User>) userRepository.findAll();
	}
	
	
	public void addUser(User newUser) {
		userRepository.save(newUser);
	}
	
	
	public Optional<User> findByID(Long id) {
		 return userRepository.findById(id);
	}
	
	
	public void deleteUser(Long id) {
	    System.out.println("Deleting user with ID: " + id);
	    User user = userRepository.findById(id)
	              .orElseThrow(() -> new ResourceNotFoundException("User", "id", id));
	    userRepository.delete(user);
	    System.out.println("User deleted successfully.");
	}
	

	
	public User findByEmail(String email) {
		return userRepository.findByEmail(email);
	}

}
