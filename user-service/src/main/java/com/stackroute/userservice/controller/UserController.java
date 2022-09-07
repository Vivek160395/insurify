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

    @PutMapping("/updateUser/{userId}")
    public ResponseEntity<?> updateUserInfo(@PathVariable int userId, @RequestBody User user) throws UserNotRegisteredException {
        try {
            return new ResponseEntity<>(userService.updateUser(user, userId), HttpStatus.OK);
        } catch (UserNotRegisteredException e) {
            e.getMessage();
            throw e;
        }
    }

    @DeleteMapping("/removeUser/{userId}")
    public ResponseEntity<?> deleteUser(@PathVariable int userId) throws UserNotRegisteredException {
        try {
            if (userService.deleteUser(userId))
                return new ResponseEntity<>("User with userId = "+userId+" is Deleted successfully.", HttpStatus.OK);
            else
                return new ResponseEntity<>("User Not Deleted", HttpStatus.OK);
        }
        catch (UserNotRegisteredException e) {
            e.getMessage();
            throw e;
        }
    }

}
