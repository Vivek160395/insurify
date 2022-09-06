package com.stackroute.userservice.service;

import com.stackroute.userservice.exception.UserAlreadyExistsException;
import com.stackroute.userservice.exception.UserNotRegisteredException;
import com.stackroute.userservice.model.User;

import java.util.List;

public interface UserService {

    public User registerUser(User user) throws UserAlreadyExistsException;
    public List<User> getAllUsers();
    public User updateUser(User user, int userId) throws UserNotRegisteredException;
    public boolean deleteUser(int userId) throws UserNotRegisteredException;



}
