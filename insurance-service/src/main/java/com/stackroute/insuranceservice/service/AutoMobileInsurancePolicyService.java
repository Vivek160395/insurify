package com.stackroute.insuranceservice.service;

import com.stackroute.insuranceservice.exceptions.PolicyAlreadyExistException;
import com.stackroute.insuranceservice.exceptions.PolicyNotFoundException;
import com.stackroute.insuranceservice.model.AutomobileInsurancePolicy;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Optional;

public interface AutoMobileInsurancePolicyService {

    public AutomobileInsurancePolicy savePolicy(AutomobileInsurancePolicy policy, MultipartFile file) throws PolicyAlreadyExistException, IOException;

    public Iterable<AutomobileInsurancePolicy> getAllPolicies();

    public AutomobileInsurancePolicy findPolicyByPolicyName(String policyName);

    public Optional<AutomobileInsurancePolicy> getPolicyByPolicyId(Integer policyId) throws PolicyNotFoundException;

    public boolean deletePolicyByPolicyId(Integer policyId) throws PolicyNotFoundException;
}
