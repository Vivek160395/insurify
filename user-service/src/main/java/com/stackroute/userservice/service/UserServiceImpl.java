package com.stackroute.userservice.service;

import com.stackroute.userservice.config.Producer;
import com.stackroute.userservice.exception.UserAlreadyExistsException;
import com.stackroute.userservice.exception.UserNotRegisteredException;
import com.stackroute.userservice.model.User;
import com.stackroute.userservice.rabbitmq.domain.UserDTO;
import com.stackroute.userservice.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

@Service
public class UserServiceImpl implements UserService{

    private UserRepository userRepository;
    @Autowired
    private Producer producer;

    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public User registerUser(User user) throws UserAlreadyExistsException {

        UserDTO userDTO = new UserDTO();

        userDTO.setEmailId(user.getEmailId());
        userDTO.setPassword(user.getPassword());
        userDTO.setName(user.getName());
        userDTO.setAge(user.getAge());
        userDTO.setGender(user.getGender());
        userDTO.setDateOfBirth(user.getDateOfBirth());
        userDTO.setMobileNo(user.getMobileNo());
        userDTO.setAddress(user.getAddress());
        userDTO.setAadharNo(user.getAadharNo());
        userDTO.setPanNo(user.getPanNo());
        userDTO.setProfilePic(user.getProfilePic());


        if(userRepository.findById(user.getEmailId()).isPresent()){
            throw new UserAlreadyExistsException();
        }
        else {
            userRepository.save(user);
            producer.sendMessageToRabbitMq(userDTO);
            return user;
        }
    }

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public User updateUser(User user, String emailId) throws UserNotRegisteredException {
        if(userRepository.findById(emailId).isEmpty())
        {
            throw new UserNotRegisteredException();
        }
        else
        {
             userRepository.save(user);
        }
        return user;
    }

    @Override
    public boolean deleteUser(String emailId) throws UserNotRegisteredException {
        User user = userRepository.findById(emailId).get();
        if(userRepository.findById(user.getEmailId()).isPresent()){
            userRepository.delete(user);
            return true;
        }
        else
        {
            throw new UserNotRegisteredException();
        }
    }
}
