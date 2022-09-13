package com.stackroute.insuranceservice.service;

import com.stackroute.insuranceservice.config.Producer;
import com.stackroute.insuranceservice.exceptions.PolicyAlreadyExistException;
import com.stackroute.insuranceservice.exceptions.PolicyNotFoundException;
import com.stackroute.insuranceservice.model.AutomobileInsurancePolicy;
import com.stackroute.insuranceservice.rabbitMq.domain.DTO;
import com.stackroute.insuranceservice.repository.AutomobilesInsurancePolicyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Optional;

@Service
public class AutomobileInsuranceServiceImpl implements AutoMobileInsurancePolicyService{

    private final AutomobilesInsurancePolicyRepository policyRepository;

    @Autowired
    Producer producer;

    @Autowired
    public AutomobileInsuranceServiceImpl(AutomobilesInsurancePolicyRepository policyRepository) {
        this.policyRepository = policyRepository;
    }

    @Override
    public AutomobileInsurancePolicy savePolicy(AutomobileInsurancePolicy policy, MultipartFile file) throws PolicyAlreadyExistException, IOException {
        DTO dto = new DTO();
        dto.setPolicyId(dto.getPolicyId());
        dto.setPolicyName(dto.getPolicyName());
        dto.setInsuranceType(dto.getInsuranceType());
        dto.setDescription(dto.getDescription());

        if (policyRepository.findById(policy.getPolicyId()).isPresent()){
            throw new PolicyAlreadyExistException();
        }
        else {
            String docName = file.getOriginalFilename();
            System.out.println("Image Name is :"+docName);
            policy.setImage(file.getBytes());
            producer.sendingMessageToRabbitMQServer(dto);
            policyRepository.save(policy);
            return policy;
        }
    }

    @Override
    public Iterable<AutomobileInsurancePolicy> getAllPolicies() {
        return policyRepository.findAll();
    }

    @Override
    public AutomobileInsurancePolicy findPolicyByPolicyName(String policyName) {
        return policyRepository.findPolicyByPolicyName(policyName);
    }

    @Override
    public Optional<AutomobileInsurancePolicy> getPolicyByPolicyId(String policyId) throws PolicyNotFoundException {
        if (policyRepository.findById(policyId).isEmpty()) {
            throw new PolicyNotFoundException();
        }
        return policyRepository.findById(policyId);
    }

    @Override
    public boolean deletePolicyByPolicyId(String policyId) throws PolicyNotFoundException {
        if (policyRepository.findById(policyId).isEmpty()){
            throw new PolicyNotFoundException();
        }
        policyRepository.deleteById(policyId);
        return true;
    }
}
