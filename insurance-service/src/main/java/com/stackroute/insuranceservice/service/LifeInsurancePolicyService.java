package com.stackroute.insuranceservice.service;

import com.stackroute.insuranceservice.exceptions.PolicyAlreadyExistException;
import com.stackroute.insuranceservice.exceptions.PolicyNotFoundException;
import com.stackroute.insuranceservice.model.HealthInsurancePolicy;
import com.stackroute.insuranceservice.model.LifeInsurancePolicy;

import java.util.Optional;

public interface LifeInsurancePolicyService {

    public LifeInsurancePolicy savePolicy(LifeInsurancePolicy policy) throws PolicyAlreadyExistException;

    public Iterable<LifeInsurancePolicy> getAllPolicies();

    public LifeInsurancePolicy getPolicyByPolicyName(String policyName);

    public Optional<LifeInsurancePolicy> getPolicyByPolicyId(Integer policyId) throws PolicyNotFoundException;

    public boolean deletePolicyByPolicyId(Integer policyId) throws PolicyNotFoundException;
}
