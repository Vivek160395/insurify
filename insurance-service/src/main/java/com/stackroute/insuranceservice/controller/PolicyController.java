package com.stackroute.insuranceservice.controller;

import com.stackroute.insuranceservice.exceptions.PolicyAlreadyExistException;
import com.stackroute.insuranceservice.model.InsurancePolicy;
import com.stackroute.insuranceservice.service.InsurancePolicyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1")
public class PolicyController {

    InsurancePolicyService policyService;

    @Autowired
    public PolicyController(InsurancePolicyService policyService) {
        this.policyService = policyService;
    }

    @PostMapping("/policy")
    public ResponseEntity<?> addPolicy(@RequestBody InsurancePolicy policy) throws PolicyAlreadyExistException {
        return new ResponseEntity<>(policyService.savePolicy(policy), HttpStatus.ACCEPTED);
    }

    @GetMapping("/policy")
    public ResponseEntity<?> getAllPolicies(){
        return new ResponseEntity<>(policyService.getAllPolicies(),HttpStatus.OK);
    }
}
