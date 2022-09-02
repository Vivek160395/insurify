package com.stackroute.insuranceservice.service;

import com.stackroute.insuranceservice.model.InsurancePolicy;

import java.util.List;

public interface InsurancePolicyService {

    public InsurancePolicy savePolicy(InsurancePolicy policy);

    public List<InsurancePolicy> getAllPolicies();

    public InsurancePolicy getPolicyByPolicyName(String policyName);

    public InsurancePolicy getPolicyByPolicyId(Integer policyId);

    public InsurancePolicy deletePolicyByPolicyId(Integer policyId);
}