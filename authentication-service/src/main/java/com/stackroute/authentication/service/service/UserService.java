//package com.stackroute.authentication.service.service;
//
////import com.stackroute.authentication.service.configproducer.Producer;
//import com.stackroute.authentication.service.model.UserCredentials;
//import com.stackroute.authentication.service.rabbitmq.domain.UserDTO;
//import com.stackroute.authentication.service.repository.UserCredentialsRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//
//@Service
//public class UserService {
//
//    @Autowired
//    private UserCredentialsRepository repo;
////    @Autowired
////    Producer producer;
//    public void processOAuthPostLogin(String emailId,String name) {
//        UserCredentials existUser = repo.getUserByEmailId(emailId);
//
//        if (existUser == null) {
//            UserCredentials userCredentials =new UserCredentials();
//            UserDTO userDTO = new UserDTO();
//           userCredentials.setEmailId(emailId);
//            repo.save(userCredentials);
//            userDTO.setEmailId(emailId);
//            System.out.println(name);
//
////            producer.sendMessageToRabbitMq(userDTO);
//
//            System.out.println("Created new user: " + userDTO);
//        }
//
//    }
//
//}