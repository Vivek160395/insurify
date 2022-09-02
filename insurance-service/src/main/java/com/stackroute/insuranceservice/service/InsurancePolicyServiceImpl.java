package com.stackroute.insuranceservice.service;

import com.stackroute.insuranceservice.model.InsurancePolicy;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class InsurancePolicyServiceImpl implements InsurancePolicyService{
    @Override
    public InsurancePolicy savePolicy(InsurancePolicy policy) {
        return null;
    }

    @Override
    public List<InsurancePolicy> getAllPolicies() {
        return null;
    }

    @Override
    public InsurancePolicy getPolicyByPolicyName(String policyName) {
        return null;
    }

    @Override
    public InsurancePolicy getPolicyByPolicyId(Integer policyId) {
        return null;
    }

    @Override
    public InsurancePolicy deletePolicyByPolicyId(Integer policyId) {
        return null;
    }
}
