//package com.stackroute.recommendationservice.config;
//
//import com.stackroute.recommendationservice.exception.InsuranceAlreadyExists;
//import com.stackroute.recommendationservice.exception.UserAlreadyPosted;
//// import com.stackroute.recommendationservice.model.Insurance;
//import com.stackroute.recommendationservice.model.InsuranceProfile;
//import com.stackroute.recommendationservice.model.User;
//import com.stackroute.recommendationservice.rabbitmq.domain.InsuranceDTO;
//import com.stackroute.recommendationservice.rabbitmq.domain.UserDTO;
//import com.stackroute.recommendationservice.service.Recommendation_service;
//import lombok.extern.slf4j.Slf4j;
//import org.springframework.amqp.rabbit.annotation.RabbitListener;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Component;
//
//@Component
//@Slf4j
//public class Consumer {
//    @Autowired
//    private Recommendation_service recommendation_service;
//
//    @RabbitListener(queues = "queue3")
//    private void gettingDataFromRabbitmq(InsuranceDTO insuranceDTO) throws InsuranceAlreadyExists {
//        InsuranceProfile insuranceProfile = new InsuranceProfile();
//        insuranceProfile.setInsuranceId(insuranceDTO.getInsuranceId());
//        insuranceProfile.setInsuranceName(insuranceDTO.getInsuranceName());
//        insuranceProfile.setInsuranceType(insuranceDTO.getInsuranceType());
//        insuranceProfile.setTypeOfImage(insuranceDTO.getImageType());
//        insuranceProfile.setImageOfInsurance(insuranceDTO.getImage());
//        try {
//            recommendation_service.addInsurance(insuranceProfile);
//            recommendation_service.addInsuranceType(insuranceProfile.getInsuranceType());
//        } catch (InsuranceAlreadyExists e) {
//            log.error(e.getMessage());
//            throw new InsuranceAlreadyExists();
//        }
//    }
//
//    @RabbitListener(queues = "queue2")
//    private void gettingDataFromRabbitMQ(UserDTO userDTO) throws UserAlreadyPosted {
//        User user = new User();
//        user.setUserEmail(userDTO.getUserEmail());
//        user.setUserName(userDTO.getUserName());
//        try {
//            recommendation_service.addUser(user);
//        } catch (UserAlreadyPosted e) {
//            log.error(e.getMessage());
//            throw new UserAlreadyPosted();
//        }
//    }
//}
