package com.stackroute.recommendationservice.config;

import com.stackroute.recommendationservice.exception.InsuranceAlreadyExists;
import com.stackroute.recommendationservice.exception.UserAlreadyPosted;
import com.stackroute.recommendationservice.model.Insurance;
import com.stackroute.recommendationservice.model.InsuranceProfile;
import com.stackroute.recommendationservice.model.InsuranceType;
import com.stackroute.recommendationservice.model.User;
import com.stackroute.recommendationservice.rabbitmq.domain.InsuranceDTO;
import com.stackroute.recommendationservice.rabbitmq.domain.UserDTO;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;

import com.stackroute.recommendationservice.service.Recommendation_Service_Impl;
import org.springframework.stereotype.Component;

@Component
public class Consumer {
    @Autowired
    public Recommendation_Service_Impl recommendation_service;

//    @RabbitListener(queues = "queue_6")
//    public void registerInsuranceFromRabbitMq(InsuranceDTO insuranceDTO) throws InsuranceAlreadyExists {
//        InsuranceProfile insurance = new InsuranceProfile();
//        insurance.setPolicyId(insuranceDTO.getPolicyId());
//        insurance.setPolicyName(insuranceDTO.getPolicyName());
//        insurance.setPicType(insuranceDTO.getPicType());
//        insurance.setInsuranceType(insuranceDTO.getInsuranceType());
//        insurance.setPicByte(insuranceDTO.getPicByte());
//        insurance.setDescription(insuranceDTO.getDescription());
//        insurance.setNoOfUsersBought(0);
//        recommendation_service.addInsurance(insurance);
//    }

    @RabbitListener(queues = "queue2")
    public void registerUser(UserDTO userDTO) throws UserAlreadyPosted {
        User user = new User();
        user.setUserEmail(userDTO.getEmailId());
        recommendation_service.addUser(user);
    }
}
