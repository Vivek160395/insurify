package com.stackroute.insuranceservice.service;

import com.stackroute.insuranceservice.exceptions.PolicyAlreadyExistException;
import com.stackroute.insuranceservice.exceptions.PolicyNotFoundException;
import com.stackroute.insuranceservice.model.Insurance;
import com.stackroute.insuranceservice.model.User;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

public interface InsuranceService {

    Insurance saveInsurance(Insurance insurance, String userEmail) throws PolicyAlreadyExistException, IOException;

    Iterable<Insurance> findAllInsurance();

    Optional<Insurance> getPolicyByPolicyId(String policyId) throws PolicyNotFoundException;

    boolean deletePolicyByPolicyId(String policyId) throws PolicyNotFoundException;

    Optional<Insurance> findPolicyByPolicyName(String policyName);

    User addUser(User user);

    List<String> getAllInsuranceOfuser(String userEmail);
}
