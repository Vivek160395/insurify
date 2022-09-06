package com.stackroute.insuranceservice.service;

import com.stackroute.insuranceservice.exceptions.PolicyAlreadyExistException;
import com.stackroute.insuranceservice.exceptions.PolicyNotFoundException;
import com.stackroute.insuranceservice.model.HealthInsurancePolicy;
import com.stackroute.insuranceservice.repository.HealthInsurancePolicyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class HealthInsurancePolicyServiceImpl implements HealthInsurancePolicyService {

    HealthInsurancePolicyRepository policyRepository;

    @Autowired
    public HealthInsurancePolicyServiceImpl(HealthInsurancePolicyRepository policyRepository) {
        this.policyRepository = policyRepository;
    }

    @Override
    public HealthInsurancePolicy savePolicy(HealthInsurancePolicy policy) throws PolicyAlreadyExistException {
        if (policyRepository.findById(policy.getPolicyId()).isEmpty()) {
            return policyRepository.save(policy);
        }
        else {
            throw new PolicyAlreadyExistException();
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
    public Optional<HealthInsurancePolicy> getPolicyByPolicyId(Integer policyId) throws PolicyNotFoundException {
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
