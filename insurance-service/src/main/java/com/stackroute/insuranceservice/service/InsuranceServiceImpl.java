package com.stackroute.insuranceservice.service;

import com.stackroute.insuranceservice.config.Producer;
import com.stackroute.insuranceservice.exceptions.PolicyAlreadyExistException;
import com.stackroute.insuranceservice.exceptions.PolicyNotFoundException;
import com.stackroute.insuranceservice.model.Insurance;
import com.stackroute.insuranceservice.rabbitMq.domain.DTO;
import com.stackroute.insuranceservice.repository.InsuranceRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.Optional;

@Service
public class InsuranceServiceImpl implements InsuranceService{

    InsuranceRepo insuranceRepo;
    @Autowired
    Producer producer;

    @Autowired
    public InsuranceServiceImpl(InsuranceRepo insuranceRepo) {
        this.insuranceRepo = insuranceRepo;
    }

    @Override
    public Insurance saveInsurance(Insurance insurance) throws PolicyAlreadyExistException, IOException {
//        DTO dto = new DTO();
//        dto.setPolicyId(dto.getPolicyId());
//        dto.setPolicyName(dto.getPolicyName());
//        dto.setInsuranceType(dto.getInsuranceType());
//        dto.setDescription(dto.getDescription());

        if (insuranceRepo.findById(insurance.getPolicyId()).isPresent()){
            throw new PolicyAlreadyExistException();
        }
        else {
            insuranceRepo.save(insurance);
//            producer.sendingMessageToRabbitMQServer(dto);
            return insurance;
        }
    }

    @Override
    public Iterable<Insurance> findAllInsurance() {
        return insuranceRepo.findAll();
    }

    @Override
    public Optional<Insurance> getPolicyByPolicyId(String policyId) throws PolicyNotFoundException {
        if (insuranceRepo.findById(policyId).isPresent()){
            return insuranceRepo.findById(policyId);
        }else {
            throw new PolicyNotFoundException();
        }
    }

    @Override
    public boolean deletePolicyByPolicyId(String policyId) throws PolicyNotFoundException {
        if (insuranceRepo.findById(policyId).isPresent()){
            insuranceRepo.deleteById(policyId);
            return true;
        }else {
            throw new PolicyNotFoundException();
        }
    }

    @Override
    public Optional<Insurance> findPolicyByPolicyName(String policyName) {
        return insuranceRepo.findPolicyByPolicyName(policyName);
    }
}
