package com.stackroute.authentication.service.controller;

import com.stackroute.authentication.service.exception.InvalidCredentialException;
import com.stackroute.authentication.service.exception.UserAlreadyExistException;

import com.stackroute.authentication.service.model.UserCredentials;
import com.stackroute.authentication.service.security.SecurityTokenGenerator;
import com.stackroute.authentication.service.service.UserCredentialsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.Map;

@RestController
@RequestMapping()
@CrossOrigin(origins = "http://localhost:4200")
public class UserCredentialsController {

    private UserCredentialsService userCredentialsService;
    private SecurityTokenGenerator securityTokenGenerator;




    @Autowired
    public UserCredentialsController(UserCredentialsService userCredentialsService, SecurityTokenGenerator securityTokenGenerator) {
        this.userCredentialsService = userCredentialsService;
        this.securityTokenGenerator = securityTokenGenerator;
    }

    @PostMapping("/user")
    public ResponseEntity<?> saveUser(@RequestBody UserCredentials user) throws UserAlreadyExistException {
        return new ResponseEntity<>(userCredentialsService.saveUser(user), HttpStatus.OK);
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody UserCredentials user) throws InvalidCredentialException
    {
        UserCredentials retrievedUser = userCredentialsService.findByEmailIdAndPassword(user.getEmailId(),user.getPassword());

        if(retrievedUser==null)
        {
            throw new InvalidCredentialException();
        }
        Map<String,String> map = securityTokenGenerator.generateToken(user);
        return new ResponseEntity<>(map,HttpStatus.OK);
    }

    @GetMapping("/users")
    public ResponseEntity<?> getAllUser()  {
        return new ResponseEntity<>(userCredentialsService.getAllUser(), HttpStatus.CREATED);
    }

    @GetMapping("/")
    public String hello() {
        return "Hello World!";
    }
    @GetMapping("/oauth2/authorization/google")
    public Principal prevent(Principal principal) {
        return principal;
    }


}
