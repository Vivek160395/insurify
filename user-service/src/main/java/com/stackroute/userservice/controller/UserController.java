package com.stackroute.userservice.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.stackroute.userservice.exception.UserAlreadyExistsException;
import com.stackroute.userservice.exception.UserNotRegisteredException;
import com.stackroute.userservice.model.User;
import com.stackroute.userservice.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
//@CrossOrigin(origins = "*", allowedHeaders = "*")

@RequestMapping("/api/v1")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/user")
    public User registerUser(@RequestBody User user) throws UserAlreadyExistsException {
        try {
            return userService.registerUser(user);
        } catch (UserAlreadyExistsException e) {
            e.getMessage();
            throw e;
        }
    }

    @GetMapping("/users")
    public ResponseEntity<?> getAllUsers() {
        return new ResponseEntity<>(userService.getAllUsers(), HttpStatus.OK);
    }


//    @PutMapping("/updateUser/{emailId}")
//    public ResponseEntity<?> updateUserInfo(@RequestParam("userDetails") String user, @PathVariable String emailId,
//                                            @RequestParam("imageFile") MultipartFile file) throws UserNotRegisteredException, IOException {
//        try {
//            User user1 = new ObjectMapper().readValue(user,User.class);
//=======
    @PutMapping("/changePass/{emailId}")
    public ResponseEntity<?> changePswrd(@RequestBody User user, @PathVariable String emailId) throws UserNotRegisteredException {
        try {
            return new ResponseEntity<>(userService.changePswrd(user, emailId), HttpStatus.OK);
        } catch (UserNotRegisteredException e) {
            e.getMessage();
            throw e;
        }
    }

    @PutMapping("/updateUserDetails/{emailId}")
    public ResponseEntity<?> updateUserInfo(@RequestBody User user, @PathVariable String emailId) throws UserNotRegisteredException {
        try {
            return new ResponseEntity<>(userService.updateUser(user, emailId), HttpStatus.OK);
        } catch (UserNotRegisteredException e) {
            e.getMessage();
            throw e;
        }
    }


    @PutMapping("/updateUser/{emailId}")
    public ResponseEntity<?> updateUserInfo(@RequestParam("userDetails") String user, @PathVariable String emailId,
            @RequestParam("imageFile") MultipartFile file) throws UserNotRegisteredException, IOException {
        try {
            User user1 = new ObjectMapper().readValue(user, User.class);

            return new ResponseEntity<>(userService.updateUser(user1, emailId, file), HttpStatus.OK);
        } catch (UserNotRegisteredException | IOException e) {
            e.getMessage();
            throw e;
        }
    }



    @DeleteMapping("/removeUser/{emailId}")
    public ResponseEntity<?> deleteUser(@PathVariable String emailId) throws UserNotRegisteredException {
        try {
            if (userService.deleteUser(emailId))
                return new ResponseEntity<>("User with userId = " + emailId + " is Deleted successfully.",
                        HttpStatus.OK);
            else
                return new ResponseEntity<>("User Not Deleted", HttpStatus.OK);
        } catch (UserNotRegisteredException e) {
            e.getMessage();
            throw e;
        }
    }

}
