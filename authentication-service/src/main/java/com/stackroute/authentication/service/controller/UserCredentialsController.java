package com.stackroute.authentication.service.controller;

import com.stackroute.authentication.service.exception.InvalidCredentialException;
import com.stackroute.authentication.service.exception.UserAlreadyExistException;

import com.stackroute.authentication.service.exception.UserNotFoundException;
import com.stackroute.authentication.service.model.UserCredentials;
import com.stackroute.authentication.service.security.SecurityTokenGenerator;
import com.stackroute.authentication.service.service.UserCredentialsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;


import java.io.IOException;
import java.util.Map;


@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class UserCredentialsController {

    private UserCredentialsService userCredentialsService;
    private SecurityTokenGenerator securityTokenGenerator;
    private ResponseEntity<?> responseEntity;




    @Autowired
    public UserCredentialsController(UserCredentialsService userCredentialsService, SecurityTokenGenerator securityTokenGenerator) {
        this.userCredentialsService = userCredentialsService;
        this.securityTokenGenerator = securityTokenGenerator;
    }

    @RequestMapping("/user")
    public UserCredentials saveUser(@RequestBody UserCredentials user) throws UserAlreadyExistException {

    try {
        return userCredentialsService.saveUser(user);
    }
    catch (UserAlreadyExistException e) {
        e.getMessage();
        throw e;
    }

    }
    @GetMapping("/loginUser")
    public ResponseEntity<?> loginUser(@RequestBody UserCredentials user) throws InvalidCredentialException
    {
        try {
            UserCredentials retrievedUser = userCredentialsService.findByEmailIdAndPassword(user.getEmailId(), user.getPassword());

            if (retrievedUser == null) {
                throw new InvalidCredentialException();
            }
            Map<String, String> map = securityTokenGenerator.generateToken(user);
            return new ResponseEntity<>(map, HttpStatus.OK);
        }
        catch (InvalidCredentialException e) {
            e.getMessage();
            throw e;
        }
    }
    @RequestMapping("/updateUser/{emailId}")
    public ResponseEntity<?> updateUserInfo(@RequestParam("userDetails") UserCredentials user,@PathVariable String emailId ) throws UserNotFoundException {
        try {

            return new ResponseEntity<>(userCredentialsService.updateUser(user,emailId), HttpStatus.OK);
        }
        catch (UserNotFoundException e) {
            e.getMessage();
            throw e;
        }
    }


    @GetMapping("/users")
    public ResponseEntity<?> getAllUser()  {
        return new ResponseEntity<>(userCredentialsService.getAllUser(), HttpStatus.CREATED);
    }

    @GetMapping("/{emailId}")
    public ResponseEntity<?> getUserByEmail(@PathVariable String emailId) throws UserNotFoundException {
        try{
            responseEntity = new ResponseEntity<>(userCredentialsService.getUserByEmailId(emailId), HttpStatus.OK);
        }catch(UserNotFoundException e)
        {
            throw new UserNotFoundException();
        }
        return responseEntity;
    }
    @GetMapping("/list")
    public String viewHomePage(Model model) {

        return "products";
    }
    @GetMapping("/new")
    public String showNewProductForm(Model model) {

        return "products";
    }


}
