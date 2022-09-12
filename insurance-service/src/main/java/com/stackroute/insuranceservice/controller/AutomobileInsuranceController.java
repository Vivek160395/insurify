package com.stackroute.insuranceservice.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.stackroute.insuranceservice.exceptions.PolicyAlreadyExistException;
import com.stackroute.insuranceservice.exceptions.PolicyNotFoundException;
import com.stackroute.insuranceservice.model.AutomobileInsurancePolicy;
import com.stackroute.insuranceservice.service.AutoMobileInsurancePolicyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/api/automobiles")
//@CrossOrigin("localhost:4200")
public class AutomobileInsuranceController {

    private final AutoMobileInsurancePolicyService autoMobileInsurancePolicyService;

    @Autowired
    public AutomobileInsuranceController(AutoMobileInsurancePolicyService autoMobileInsurancePolicyService) {
        this.autoMobileInsurancePolicyService = autoMobileInsurancePolicyService;
    }

    @PostMapping("/policy")
    public ResponseEntity<?> savePolicy(@RequestParam("data") String  data, @RequestParam("file") MultipartFile file) throws PolicyAlreadyExistException, IOException {
       AutomobileInsurancePolicy policy = new ObjectMapper().readValue(data,AutomobileInsurancePolicy.class);

        autoMobileInsurancePolicyService.savePolicy(policy, file);
        return new ResponseEntity<>(autoMobileInsurancePolicyService.savePolicy(policy, file), HttpStatus.OK);
    }

    @GetMapping("/policy")
    public ResponseEntity<?> getAllPolicies(){
        return new ResponseEntity<>(autoMobileInsurancePolicyService.getAllPolicies(),HttpStatus.OK);
    }

    @GetMapping("/policyname/{policyName}")
    public ResponseEntity<?> getPolicyByPolicyName(@PathVariable String policyName){
        return new ResponseEntity<>(autoMobileInsurancePolicyService.findPolicyByPolicyName(policyName),HttpStatus.OK);
    }

    @GetMapping("/policyid/{policyId}")
    public ResponseEntity<?> getPolicyByPolicyId(@PathVariable String policyId) throws PolicyNotFoundException {
        return new ResponseEntity<>(autoMobileInsurancePolicyService.getPolicyByPolicyId(policyId),HttpStatus.OK);
    }

    @DeleteMapping("/policy/delete/{policyId}")
    public ResponseEntity<?> deletePolicyByPolicyId(@PathVariable String policyId) throws PolicyNotFoundException {
        autoMobileInsurancePolicyService.deletePolicyByPolicyId(policyId);
        return new ResponseEntity<>("Deleted successfully",HttpStatus.OK);
    }
}
