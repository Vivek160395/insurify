package com.stackroute.policyadvisorservice.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.stackroute.policyadvisorservice.exception.PolicyAdvisorAlreadyExists;
import com.stackroute.policyadvisorservice.exception.PolicyAdvisorNotRegisteredException;
import com.stackroute.policyadvisorservice.model.PolicyAdvisor;
import com.stackroute.policyadvisorservice.service.PolicyAdvisorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")

@RequestMapping("api/v1/")
public class PolicyAdvisorController {

    @Autowired
    private PolicyAdvisorService policyAdvisorService;

    @Autowired
    public PolicyAdvisorController(PolicyAdvisorService policyAdvisorService){
        this.policyAdvisorService = policyAdvisorService;
    }

    @PostMapping("policyAdvisor")
    public PolicyAdvisor registerPolicyAdvisor(@RequestBody PolicyAdvisor policyAdvisor) throws PolicyAdvisorAlreadyExists {
           try {
               return policyAdvisorService.registerPolicyAdvisor(policyAdvisor);
           }
           catch (PolicyAdvisorAlreadyExists e) {
               e.getMessage();
               throw e;
           }
    }

    @GetMapping("policyAdvisors")
    public ResponseEntity<?> findAllPolicyAdvisor() {

        return new ResponseEntity<>(policyAdvisorService.findAllPolicyAdvisors(), HttpStatus.OK);
    }

    @GetMapping("/policyAdvisor/{name}")
    public ResponseEntity<?> getPolicyAdvisorByName(@PathVariable String name) {
        policyAdvisorService.getPolicyAdvisorByName(name);
        return new ResponseEntity<>(policyAdvisorService.getPolicyAdvisorByName(name), HttpStatus.OK);
    }

    @PutMapping("/updatePolicyAdvisorDetails/{emailId}")
    public ResponseEntity<?> updatePolicyAdvisor(@RequestBody PolicyAdvisor policyAdvisor, @PathVariable String emailId) throws PolicyAdvisorNotRegisteredException {
        try {
            return new ResponseEntity<>(policyAdvisorService.updatePolicyAdvisor(policyAdvisor, emailId), HttpStatus.OK);
        } catch (PolicyAdvisorNotRegisteredException e) {
            e.getMessage();
            throw e;
        }
    }

    @DeleteMapping("/removePolicyAdvisor/{emailId}")
    public ResponseEntity<?> deletePolicyAdvisor(@PathVariable String emailId) throws PolicyAdvisorNotRegisteredException {
       try {
           if ( policyAdvisorService.deletePolicyAdvisor(emailId))
               return new ResponseEntity<>("Policy Advisor with emailId = " + emailId + " is Deleted successfully.",
                       HttpStatus.OK);
           else
           return new ResponseEntity<>("Policy Advisor Not Deleted", HttpStatus.OK);
       }
           catch(PolicyAdvisorNotRegisteredException e){
           e.getMessage();
           throw e;

           }
    }

//    @PutMapping("/changePassword/{emailId}")
//    public ResponseEntity<?> changePassword(@RequestBody PolicyAdvisor policyAdvisor, @PathVariable String emailId) throws PolicyAdvisorNotRegisteredException{
//        try {
//            return new ResponseEntity<>(policyAdvisorService.changePassword(policyAdvisor, emailId), HttpStatus.OK);
//        } catch (PolicyAdvisorNotRegisteredException e) {
//            e.getMessage();
//            throw e;
//        }
//    }



}
