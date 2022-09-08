package com.stackroute.insuranceservice.service;

import com.stackroute.insuranceservice.config.Producer;
import com.stackroute.insuranceservice.exceptions.PolicyAlreadyExistException;
import com.stackroute.insuranceservice.exceptions.PolicyNotFoundException;
import com.stackroute.insuranceservice.model.LifeInsurancePolicy;
import com.stackroute.insuranceservice.rabbitMq.domain.DTO;
import com.stackroute.insuranceservice.repository.LifeInsurancePolicyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Optional;

@Service
public class LifeInsurancePolicyImpl implements LifeInsurancePolicyService{

    public LifeInsurancePolicyRepository policyRepository;

    @Autowired
    Producer producer;

    @Autowired
    public LifeInsurancePolicyImpl(LifeInsurancePolicyRepository policyRepository) {
        this.policyRepository = policyRepository;
    }
    @Override
    public LifeInsurancePolicy savePolicy(LifeInsurancePolicy policy, MultipartFile file) throws PolicyAlreadyExistException, IOException {
        DTO dto = new DTO();
        dto.setInsuranceType(policy.getInsuranceType());
        dto.setPolicyName(policy.getPolicyName());

        if(policyRepository.findById(policy.getPolicyId()).isEmpty()) {
            //policy = new LifeInsurancePolicy(docName, file.getContentType(), file.getBytes());
            policy.setPolicyDocuments(file.getBytes());
            policyRepository.save(policy);
            producer.sendingMessageToRabbitMQServer(dto);
            return policy;
        }else {
            throw new PolicyAlreadyExistException();
        }

    }

    @Override
    public Iterable<LifeInsurancePolicy> getAllPolicies() {
        return policyRepository.findAll();
    }

    @Override
    public LifeInsurancePolicy getPolicyByPolicyName(String policyName) {
        return policyRepository.findByPolicyName(policyName);
    }

    @Override
    public Optional<LifeInsurancePolicy> getPolicyByPolicyId(Integer policyId) throws PolicyNotFoundException {
        if (policyRepository.findById(policyId).isPresent()){
            return policyRepository.findById(policyId);
        }else {
            throw new PolicyNotFoundException();
        }
    }

    @Override
    public boolean deletePolicyByPolicyId(Integer policyId) throws PolicyNotFoundException {
        if (policyRepository.findById(policyId).isPresent()){
            policyRepository.deleteById(policyId);
            return true;
        }else {
            throw new PolicyNotFoundException();
        }
    }
}
