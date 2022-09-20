package com.stackroute.authentication.service.service;

import com.stackroute.authentication.service.exception.InvalidCredentialException;
import com.stackroute.authentication.service.exception.UserAlreadyExistException;
import com.stackroute.authentication.service.exception.UserNotFoundException;
import com.stackroute.authentication.service.model.UserCredentials;

import java.util.List;
import java.util.Optional;

public interface UserCredentialsService {
    UserCredentials saveUser(UserCredentials user) throws UserAlreadyExistException;
    UserCredentials findByEmailIdAndPassword(String emailId, String password) throws InvalidCredentialException;
    List<UserCredentials> getAllUser();
    UserCredentials updateUser(UserCredentials user,String emailId) throws UserNotFoundException;
    Optional<UserCredentials> getUserByEmailId(String emailId) throws UserNotFoundException;
}

