package com.stackroute.insuranceservice.service;

import com.stackroute.insuranceservice.config.Producer;
import com.stackroute.insuranceservice.exceptions.PolicyAlreadyExistException;
import com.stackroute.insuranceservice.exceptions.PolicyNotFoundException;
import com.stackroute.insuranceservice.model.HealthInsurancePolicy;
import com.stackroute.insuranceservice.rabbitMq.domain.DTO;
import com.stackroute.insuranceservice.repository.HealthInsurancePolicyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Optional;

@Service
public class HealthInsurancePolicyServiceImpl implements HealthInsurancePolicyService {

    HealthInsurancePolicyRepository policyRepository;
    @Autowired
    Producer producer;

    @Autowired
    public HealthInsurancePolicyServiceImpl(HealthInsurancePolicyRepository policyRepository) {
        this.policyRepository = policyRepository;
    }

    @Override
    public HealthInsurancePolicy savePolicy(HealthInsurancePolicy policy) throws PolicyAlreadyExistException {
        DTO dto = new DTO();
        dto.setPolicyName(policy.getPolicyName());
        dto.setInsuranceType(policy.getInsuranceType());

        if(policyRepository.findById(policy.getPolicyId()).isPresent()) {
            throw new PolicyAlreadyExistException();
        }
        else {
            policyRepository.save(policy);
            producer.sendingMessageToRabbitMQServer(dto);
            return policy;
        }

    }

    @Override
    public Iterable<HealthInsurancePolicy> getAllPolicies() {
        return policyRepository.findAll();
    }

    @Override
    public HealthInsurancePolicy getPolicyByPolicyName(String policyName) {
        return policyRepository.getPolicyByPolicyName(policyName);
    }

    @Override
    public Optional<HealthInsurancePolicy> getPolicyByPolicyId(String policyId) throws PolicyNotFoundException {
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
