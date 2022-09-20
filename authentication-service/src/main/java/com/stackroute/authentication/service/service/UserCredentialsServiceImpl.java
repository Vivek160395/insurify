package com.stackroute.authentication.service.service;

import com.stackroute.authentication.service.exception.InvalidCredentialException;
import com.stackroute.authentication.service.exception.UserAlreadyExistException;
import com.stackroute.authentication.service.exception.UserNotFoundException;
import com.stackroute.authentication.service.model.UserCredentials;
import com.stackroute.authentication.service.repository.UserCredentialsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserCredentialsServiceImpl implements UserCredentialsService {

    private UserCredentialsRepository userCredentialsRepository;

    @Autowired
    public UserCredentialsServiceImpl(UserCredentialsRepository userCredentialsRepository) {
        this.userCredentialsRepository = userCredentialsRepository;
    }

    @Override
    public UserCredentials saveUser(UserCredentials user) throws UserAlreadyExistException {
        if(userCredentialsRepository.findById(user.getEmailId()).isPresent())
        {
            throw new UserAlreadyExistException();
        }
        System.out.println(user);
        return userCredentialsRepository.save(user);
    }

    @Override
    public UserCredentials findByEmailIdAndPassword(String emailId, String password) throws InvalidCredentialException {
        System.out.println("emailId :- "+emailId);
        System.out.println("password :- "+password);
        UserCredentials loggedInUser = userCredentialsRepository.findByEmailIdAndPassword(emailId,password);
        System.out.println(loggedInUser);
        if(loggedInUser == null)
        {
            throw new InvalidCredentialException();
        }
        return loggedInUser;
    }



    @Override
    public List<UserCredentials> getAllUser() {
        List<UserCredentials>  userList= (List<UserCredentials>) userCredentialsRepository.findAll();
        return userList;
    }

    @Override
    public UserCredentials updateUser(UserCredentials user,String emailId) throws UserNotFoundException {
        if(userCredentialsRepository.findById(emailId).isPresent())
        {
            UserCredentials user1 = userCredentialsRepository.findById(emailId).get();
            user1.setUserType(user.getUserType());
            userCredentialsRepository.save(user1);
            return user1;
        }
        else
        {
            throw new UserNotFoundException();
        }

    }

    @Override
    public Optional<UserCredentials> getUserByEmailId(String emailId) throws UserNotFoundException {
        if(userCredentialsRepository.findById(emailId).isEmpty())
        {
            throw new UserNotFoundException();
        }
        return userCredentialsRepository.findById(emailId);
    }


}


