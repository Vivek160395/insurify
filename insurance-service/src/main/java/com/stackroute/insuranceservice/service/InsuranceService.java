package com.stackroute.insuranceservice.service;

import com.stackroute.insuranceservice.exceptions.PolicyAlreadyExistException;
import com.stackroute.insuranceservice.exceptions.PolicyNotFoundException;
import com.stackroute.insuranceservice.model.Insurance;
import org.springframework.web.bind.annotation.RequestBody;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

public interface InsuranceService {

    Insurance saveInsurance(Insurance insurance) throws PolicyAlreadyExistException, IOException;

    Iterable<Insurance> findAllInsurance();

    Iterable<Insurance> findAllPolicyByEmail(String userEmail) throws PolicyNotFoundException;

    Optional<Insurance> getPolicyByPolicyId(String policyId) throws PolicyNotFoundException;

    boolean deletePolicyByPolicyId(String policyId) throws PolicyNotFoundException;

    Optional<Insurance> findPolicyByPolicyName(String policyName);



    Insurance editInsurance(@RequestBody Insurance insurance);
}
