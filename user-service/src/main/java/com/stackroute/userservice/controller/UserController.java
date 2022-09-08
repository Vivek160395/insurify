package com.stackroute.userservice.controller;

import com.stackroute.userservice.exception.UserAlreadyExistsException;
import com.stackroute.userservice.exception.UserNotRegisteredException;
import com.stackroute.userservice.model.User;
import com.stackroute.userservice.service.SequenceGeneratorService;
import com.stackroute.userservice.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api/v1")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private SequenceGeneratorService sequenceGeneratorService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }



    @PostMapping("/user")
    public User registerUser(@RequestBody User user) throws UserAlreadyExistsException {
        try {
            user.setUserId(sequenceGeneratorService.getSequenceNumber(User.SEQUENCE_NAME));
            return userService.registerUser(user);
        }
        catch (UserAlreadyExistsException e) {
            e.getMessage();
            throw e;
        }
    }


    @GetMapping("/users")
    public ResponseEntity<?> getAllUsers() {
        return new ResponseEntity<>(userService.getAllUsers(), HttpStatus.OK);
    }

    @PutMapping("/updateUser/{emailId}")
    public ResponseEntity<?> updateUserInfo(@PathVariable String emailId, @RequestBody User user) throws UserNotRegisteredException {
        try {
            return new ResponseEntity<>(userService.updateUser(user, emailId), HttpStatus.OK);
        } catch (UserNotRegisteredException e) {
            e.getMessage();
            throw e;
        }
    }

    @DeleteMapping("/removeUser/{emailId}")
    public ResponseEntity<?> deleteUser(@PathVariable String emailId) throws UserNotRegisteredException {
        try {
            if (userService.deleteUser(emailId))
                return new ResponseEntity<>("User with userId = "+emailId+" is Deleted successfully.", HttpStatus.OK);
            else
                return new ResponseEntity<>("User Not Deleted", HttpStatus.OK);
        }
        catch (UserNotRegisteredException e) {
            e.getMessage();
            throw e;
        }
    }

}
