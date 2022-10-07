package com.stackroute.policyadvisorservice.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.stackroute.policyadvisorservice.exception.PolicyAdvisorAlreadyExists;
import com.stackroute.policyadvisorservice.exception.PolicyAdvisorNotRegisteredException;
import com.stackroute.policyadvisorservice.model.PolicyAdvisor;
import com.stackroute.policyadvisorservice.model.Rating;
import com.stackroute.policyadvisorservice.repository.PolicyAdvisorRepository;
import com.stackroute.policyadvisorservice.service.PolicyAdvisorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
// @CrossOrigin(origins = "*", allowedHeaders = "*")

@RequestMapping("api/v1/")
public class PolicyAdvisorController {

    @Autowired
    private PolicyAdvisorService policyAdvisorService;

    @Autowired
    public PolicyAdvisorController(PolicyAdvisorService policyAdvisorService) {
        this.policyAdvisorService = policyAdvisorService;
    }

    @PostMapping("policyAdvisor")
    public PolicyAdvisor registerPolicyAdvisor(@RequestBody PolicyAdvisor policyAdvisor)
            throws PolicyAdvisorAlreadyExists {
        try {
            return policyAdvisorService.registerPolicyAdvisor(policyAdvisor);
        } catch (PolicyAdvisorAlreadyExists e) {
            e.getMessage();
            throw e;
        }
    }

    @GetMapping("policyAdvisors")
    public ResponseEntity<?> findAllPolicyAdvisor() {

        return new ResponseEntity<>(policyAdvisorService.findAllPolicyAdvisors(), HttpStatus.OK);
    }

    @GetMapping("policyAdvisor/{emailId}")
    public ResponseEntity<?> getPolicyAdvisorByEmail(@PathVariable String emailId) {
        policyAdvisorService.getPolicyAdvisorByEmail(emailId);
        return new ResponseEntity<>(policyAdvisorService.getPolicyAdvisorByEmail(emailId), HttpStatus.OK);
    }

    @PutMapping("update/{emailId}")
    public ResponseEntity<?> updateInfo(@RequestBody PolicyAdvisor policyAdvisor, @PathVariable String emailId)
            throws PolicyAdvisorNotRegisteredException {
        try {
            return new ResponseEntity<>(policyAdvisorService.update(policyAdvisor, emailId), HttpStatus.OK);
        } catch (PolicyAdvisorNotRegisteredException e) {
            e.getMessage();
            throw e;
        }
    }

    @PutMapping("/updateDetails/{emailId}")
    public ResponseEntity<?> updatePicture(@RequestParam("updateInfo") String policyAdvisor,
            @PathVariable String emailId, @RequestParam("imageFile") MultipartFile file)
            throws PolicyAdvisorNotRegisteredException, IOException {
        try {
            PolicyAdvisor policyAdvisor1 = new ObjectMapper().readValue(policyAdvisor, PolicyAdvisor.class);

            return new ResponseEntity<>(policyAdvisorService.update(policyAdvisor1, emailId, file), HttpStatus.OK);
        } catch (PolicyAdvisorNotRegisteredException | IOException e) {
            e.getMessage();
            throw e;
        }
    }

    @DeleteMapping("removePolicyAdvisor/{emailId}")
    public ResponseEntity<?> deletePolicyAdvisor(@PathVariable String emailId)
            throws PolicyAdvisorNotRegisteredException {
        try {
            if (policyAdvisorService.deletePolicyAdvisor(emailId))
                return new ResponseEntity<>("Policy Advisor with emailId = " + emailId + " is Deleted successfully.",
                        HttpStatus.OK);
            else
                return new ResponseEntity<>("Policy Advisor Not Deleted", HttpStatus.OK);
        } catch (PolicyAdvisorNotRegisteredException e) {
            e.getMessage();
            throw e;

        }
    }

    @PutMapping("policyAdvisorRating/{emailId}")
    public ResponseEntity<?> findRatingOfAdvisor(@RequestBody Rating ratings, @PathVariable String emailId) {

        try {
            policyAdvisorService.getPolicyAdvisorByEmail(emailId);
            return new ResponseEntity<>(policyAdvisorService.calculateRating(ratings, emailId), HttpStatus.OK);
        } catch (PolicyAdvisorNotRegisteredException e) {
            e.getMessage();
            return new ResponseEntity<>("Policy advisor does not exist", HttpStatus.NOT_FOUND);
        }

    }

    @PutMapping("changePassword/{emailId}")
    public ResponseEntity<?> changePassword(@RequestBody PolicyAdvisor policyAdvisor, @PathVariable String emailId)
            throws PolicyAdvisorNotRegisteredException {
        try {
            return new ResponseEntity<>(policyAdvisorService.changePassword(policyAdvisor, emailId), HttpStatus.OK);
        } catch (PolicyAdvisorNotRegisteredException e) {
            e.getMessage();
            throw e;
        }
    }

}
