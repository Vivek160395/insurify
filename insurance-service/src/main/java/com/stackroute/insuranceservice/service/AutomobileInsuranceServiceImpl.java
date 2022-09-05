package com.stackroute.insuranceservice.service;

import com.stackroute.insuranceservice.exceptions.PolicyAlreadyExistException;
import com.stackroute.insuranceservice.exceptions.PolicyNotFoundException;
import com.stackroute.insuranceservice.model.AutomobileInsurancePolicy;
import com.stackroute.insuranceservice.repository.AutomobilesInsurancePolicyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AutomobileInsuranceServiceImpl implements AutoMobileInsurancePolicyService{

    private final AutomobilesInsurancePolicyRepository policyRepository;

    @Autowired
    public AutomobileInsuranceServiceImpl(AutomobilesInsurancePolicyRepository policyRepository) {
        this.policyRepository = policyRepository;
    }

    @Override
    public AutomobileInsurancePolicy savePolicy(AutomobileInsurancePolicy policy) throws PolicyAlreadyExistException {
        if (policyRepository.findById(policy.getPolicyId()).isPresent()){
            throw new PolicyAlreadyExistException();
        }
        else {
            return policyRepository.save(policy);
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
    public Optional<AutomobileInsurancePolicy> getPolicyByPolicyId(Integer policyId) throws PolicyNotFoundException {
        if (policyRepository.findById(policyId).isEmpty()) {
            throw new PolicyNotFoundException();
        }
        return policyRepository.findById(policyId);
    }

    @Override
    public boolean deletePolicyByPolicyId(Integer policyId) throws PolicyNotFoundException {
        if (policyRepository.findById(policyId).isEmpty()){
            throw new PolicyNotFoundException();
        }
        policyRepository.deleteById(policyId);
        return true;
    }
}
