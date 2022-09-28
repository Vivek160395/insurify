package com.stackroute.recommendationservice.config;

import com.stackroute.recommendationservice.exception.InsuranceAlreadyExists;
import com.stackroute.recommendationservice.model.Insurance;
import com.stackroute.recommendationservice.model.InsuranceType;
import com.stackroute.recommendationservice.rabbitmq.domain.InsuranceDTO;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;

import com.stackroute.recommendationservice.service.Recommendation_Service_Impl;
import org.springframework.stereotype.Component;

@Component
public class Consumer {
    @Autowired
    public Recommendation_Service_Impl recommendation_service;

    @RabbitListener(queues = "queue_4")
    public void registerInsuranceFromRabbitMq(InsuranceDTO insuranceDTO) throws InsuranceAlreadyExists {
        Insurance insurance = new Insurance();
        InsuranceType insuranceType = new InsuranceType();
        insurance.setPolicyId(insuranceDTO.getPolicyId());
        insurance.setPolicyName(insuranceDTO.getPolicyName());
        insuranceType.setInsuranceType(insuranceDTO.getInsuranceType());
        insurance.setPicType(insuranceDTO.getPicType());
        insurance.setPicByte(insuranceDTO.getPicByte());
        insurance.setDescription(insuranceDTO.getDescription());
        recommendation_service.addInsurance(insurance);
        recommendation_service.addInsuranceType(insuranceType.getInsuranceType());
        recommendation_service.createInsuranceTypeRelation(insurance.getPolicyId(), insuranceType.getInsuranceType());
    }
}
