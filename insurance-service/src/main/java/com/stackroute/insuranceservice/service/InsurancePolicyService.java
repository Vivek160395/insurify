package com.stackroute.insuranceservice.service;

import com.stackroute.insuranceservice.exceptions.PolicyAlreadyExistException;
import com.stackroute.insuranceservice.exceptions.PolicyNotFoundException;
import com.stackroute.insuranceservice.model.InsurancePolicy;

import java.util.List;
import java.util.Optional;

public interface InsurancePolicyService {

    public InsurancePolicy savePolicy(InsurancePolicy policy) throws PolicyAlreadyExistException;

    public List<InsurancePolicy> getAllPolicies();

    public InsurancePolicy getPolicyByPolicyName(String policyName);

    public Optional<InsurancePolicy> getPolicyByPolicyId(Integer policyId) throws PolicyNotFoundException;

    public Optional<InsurancePolicy> deletePolicyByPolicyId(Integer policyId) throws PolicyNotFoundException;
}