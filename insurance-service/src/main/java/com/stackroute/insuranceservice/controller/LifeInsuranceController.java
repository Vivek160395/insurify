package com.stackroute.insuranceservice.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.stackroute.insuranceservice.exceptions.PolicyAlreadyExistException;
import com.stackroute.insuranceservice.exceptions.PolicyNotFoundException;
import com.stackroute.insuranceservice.model.AddOnDetails;
import com.stackroute.insuranceservice.model.Benefits;
import com.stackroute.insuranceservice.model.Details;
import com.stackroute.insuranceservice.model.LifeInsurancePolicy;
import com.stackroute.insuranceservice.service.LifeInsurancePolicyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/lifeInsurance")
public class LifeInsuranceController {

    public LifeInsurancePolicyService policyService;

    @Autowired
    public LifeInsuranceController(LifeInsurancePolicyService policyService) {
        this.policyService = policyService;
    }

    @PostMapping("/policy")
    public ResponseEntity<?> addPolicy( @RequestParam("file") MultipartFile file,
                                       @RequestParam("details") String policyDetails) throws PolicyAlreadyExistException, IOException {
        LifeInsurancePolicy policy= new ObjectMapper().readValue(policyDetails,LifeInsurancePolicy.class);

        policyService.savePolicy(policy,file);
        return new ResponseEntity<>(policyService.savePolicy(policy,file), HttpStatus.ACCEPTED);
    }

    @GetMapping("/policy")
    public ResponseEntity<?> getAllPolicies(){
        return new ResponseEntity<>(policyService.getAllPolicies(),HttpStatus.OK);
    }

    @GetMapping("/policy/{policyName}")
    public ResponseEntity<?> getPolicyByPolicyName(@PathVariable String policyName){
        return new ResponseEntity<>(policyService.getPolicyByPolicyName(policyName),HttpStatus.OK);
    }

    @GetMapping("/policy/{policyId}")
    public ResponseEntity<?> getPolicyByPolicyId(@PathVariable Integer policyId) throws PolicyNotFoundException {
        return new ResponseEntity<>(policyService.getPolicyByPolicyId(policyId),HttpStatus.OK);
    }

    @DeleteMapping("/policy/delete/{policyId}")
    public ResponseEntity<?> deletePolicyByPolicyId(@PathVariable Integer policyId) throws PolicyNotFoundException {
        policyService.deletePolicyByPolicyId(policyId);
        return new ResponseEntity<>("Deleted successfully",HttpStatus.OK);
    }
}
