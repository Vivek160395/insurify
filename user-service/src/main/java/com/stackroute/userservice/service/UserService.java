package com.stackroute.userservice.service;

import com.stackroute.userservice.exception.UserAlreadyExistsException;
import com.stackroute.userservice.exception.UserNotRegisteredException;
import com.stackroute.userservice.model.User;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface UserService {

    public User registerUser(User user) throws UserAlreadyExistsException;
    public List<User> getAllUsers();
//    public User changePswrd(User user, String emailId) throws UserNotRegisteredException;
    public User updateUser(User user, String emailId, MultipartFile file) throws UserNotRegisteredException, IOException;

    public boolean deleteUser(String emailId) throws UserNotRegisteredException;



}
