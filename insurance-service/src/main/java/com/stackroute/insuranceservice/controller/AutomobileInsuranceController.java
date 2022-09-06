package com.stackroute.insuranceservice.controller;

import com.stackroute.insuranceservice.exceptions.PolicyAlreadyExistException;
import com.stackroute.insuranceservice.exceptions.PolicyNotFoundException;
import com.stackroute.insuranceservice.model.AutomobileInsurancePolicy;
import com.stackroute.insuranceservice.service.AutoMobileInsurancePolicyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/automobiles")
public class AutomobileInsuranceController {

    private final AutoMobileInsurancePolicyService autoMobileInsurancePolicyService;

    @Autowired
    public AutomobileInsuranceController(AutoMobileInsurancePolicyService autoMobileInsurancePolicyService) {
        this.autoMobileInsurancePolicyService = autoMobileInsurancePolicyService;
    }

    @PostMapping("/policy")
    public ResponseEntity<?> savePolicy(@RequestBody AutomobileInsurancePolicy automobileInsurancePolicy) throws PolicyAlreadyExistException {
        return new ResponseEntity<>(autoMobileInsurancePolicyService.savePolicy(automobileInsurancePolicy), HttpStatus.OK);
    }

    @GetMapping("/policy")
    public ResponseEntity<?> getAllPolicies(){
        return new ResponseEntity<>(autoMobileInsurancePolicyService.getAllPolicies(),HttpStatus.OK);
    }

    @GetMapping("/policy/{policyName}")
    public ResponseEntity<?> getPolicyByPolicyName(@PathVariable String policyName){
        return new ResponseEntity<>(autoMobileInsurancePolicyService.findPolicyByPolicyName(policyName),HttpStatus.OK);
    }

    @GetMapping("/policy/{policyId}")
    public ResponseEntity<?> getPolicyByPolicyId(@PathVariable Integer policyId) throws PolicyNotFoundException {
        return new ResponseEntity<>(autoMobileInsurancePolicyService.getPolicyByPolicyId(policyId),HttpStatus.OK);
    }

    @DeleteMapping("/policy/delete/{policyId}")
    public ResponseEntity<?> deletePolicyByPolicyId(@PathVariable Integer policyId) throws PolicyNotFoundException {
        autoMobileInsurancePolicyService.deletePolicyByPolicyId(policyId);
        return new ResponseEntity<>("Deleted successfully",HttpStatus.OK);
    }
}
