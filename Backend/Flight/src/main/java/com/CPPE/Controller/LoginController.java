package com.CPPE.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.CPPE.Credential.LoginCredential;
import com.CPPE.JpaRepository.LoginRepo;

@RestController
//it is used to receive the request from the frontend port no 3000
@CrossOrigin(origins = { "http://localhost:3000"})
public class LoginController {
	
	@Autowired
	LoginRepo repo;
	
	//this function is used to fetch the login detail of user
	@PostMapping("/login")
	public ResponseEntity<String> loginService(@RequestBody LoginCredential cred)
	{
		
		
		boolean output=repo.existsById(cred.getUsername());
		// if username exist then it will send status login
		if(output==true)
		{
			LoginCredential data=repo.findById(cred.getUsername()).get();
			if(data.getPassword().equals(cred.getPassword()))
			{
				
			return new ResponseEntity<>("login",HttpStatus.ACCEPTED);
			}
			else
			{
				return new ResponseEntity<>("invalid",HttpStatus.ACCEPTED);
			}
		}
		// else it will send status invalid
		else if(output==false)
		{
			return new ResponseEntity<>("invalid",HttpStatus.ACCEPTED);
		}
		
		return null;
	}
	
	

}
