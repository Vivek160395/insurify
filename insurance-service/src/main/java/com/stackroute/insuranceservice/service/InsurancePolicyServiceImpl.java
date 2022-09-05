package com.stackroute.insuranceservice.service;

import com.stackroute.insuranceservice.exceptions.PolicyAlreadyExistException;
import com.stackroute.insuranceservice.exceptions.PolicyNotFoundException;
import com.stackroute.insuranceservice.model.InsurancePolicy;
import com.stackroute.insuranceservice.repository.InsurancePolicyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class InsurancePolicyServiceImpl implements InsurancePolicyService{

    InsurancePolicyRepository policyRepository;

    @Autowired
    public InsurancePolicyServiceImpl(InsurancePolicyRepository policyRepository) {
        this.policyRepository = policyRepository;
    }

    @Override
    public InsurancePolicy savePolicy(InsurancePolicy policy) throws PolicyAlreadyExistException {
            return policyRepository.save(policy);
    }

    @Override
    public List<InsurancePolicy> getAllPolicies() {
        List<InsurancePolicy>  policyList= (List<InsurancePolicy>) policyRepository.findAll();
        return policyList;
    }

    @Override
    public InsurancePolicy getPolicyByPolicyName(String policyName) {
        return null;
    }

    @Override
    public Optional<InsurancePolicy> getPolicyByPolicyId(Integer policyId) throws PolicyNotFoundException {
        if (policyRepository.findById(policyId).isEmpty()) {
            throw new PolicyNotFoundException();
        }
        return policyRepository.findById(policyId);
    }

    @Override
    public Optional<InsurancePolicy> deletePolicyByPolicyId(Integer policyId) throws PolicyNotFoundException {
        if (policyRepository.findById(policyId).isEmpty()){
            throw new PolicyNotFoundException();
        }
        return policyRepository.findById(policyId);
    }
}
