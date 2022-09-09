package com.stackroute.userservice.service;

import com.stackroute.userservice.config.Producer;
import com.stackroute.userservice.exception.UserAlreadyExistsException;
import com.stackroute.userservice.exception.UserNotRegisteredException;
import com.stackroute.userservice.model.User;
import com.stackroute.userservice.rabbitmq.domain.RecommendationDTO;
import com.stackroute.userservice.rabbitmq.domain.UserDTO;
import com.stackroute.userservice.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
public class UserServiceImpl implements UserService{

    private UserRepository userRepository;
    @Autowired
    private Producer producer;

    public UserServiceImpl(UserRepository userRepository, Producer producer) {
        this.userRepository = userRepository;
        this.producer = producer;
    }

    @Override
    public User registerUser(User user) throws UserAlreadyExistsException {

        UserDTO userDTO = new UserDTO();
        RecommendationDTO recommendationDTO = new RecommendationDTO();

        userDTO.setEmailId(user.getEmailId());
        userDTO.setPassword(user.getPassword());
        userDTO.setUserType(user.getUserType());
        userDTO.setName(user.getName());
        userDTO.setAge(user.getAge());
        userDTO.setGender(user.getGender());
        userDTO.setDateOfBirth(user.getDateOfBirth());
        userDTO.setMobileNo(user.getMobileNo());
        userDTO.setAddress(user.getAddress());
        userDTO.setAadharNo(user.getAadharNo());
        userDTO.setPanNo(user.getPanNo());
        userDTO.setProfilePic(user.getProfilePic());

        recommendationDTO.setEmailId(user.getEmailId());
        recommendationDTO.setUserType(user.getUserType());
        recommendationDTO.setAge(user.getAge());

        if(userRepository.findById(user.getEmailId()).isPresent()){
            throw new UserAlreadyExistsException();
        }
        else {
            userRepository.save(user);
            producer.sendMessageToAuthRabbitMq(userDTO, recommendationDTO);
            return user;
        }
    }

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public User updateUser(User user, String emailId, MultipartFile file) throws UserNotRegisteredException, IOException {
        if(userRepository.findById(emailId).isPresent())
        {
            User user1 = userRepository.findById(emailId).get();

            user1.setName(user.getName());
            user1.setName(user.getName());
            user1.setAge(user.getAge());
            user1.setGender(user.getGender());
            user1.setDateOfBirth(user.getDateOfBirth());
            user1.setMobileNo(user.getMobileNo());
            user1.setAddress(user.getAddress());
            user1.setAadharNo(user.getAadharNo());
            user1.setPanNo(user.getPanNo());
            user1.setProfilePic(file.getBytes());

            userRepository.save(user1);
            return user1;
        }
        else
        {
            throw new UserNotRegisteredException();
        }
    }

    @Override
    public boolean deleteUser(String emailId) throws UserNotRegisteredException {
//        User user = userRepository.findById(emailId).get();
        if(userRepository.findById(emailId).isPresent()){
            userRepository.deleteById(emailId);
            return true;
        }
        else
        {
            throw new UserNotRegisteredException();
        }
    }
}
