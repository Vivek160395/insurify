package com.stackroute.purchaseinsuranceservice.controller;

import com.stackroute.purchaseinsuranceservice.config.Producer;
import com.stackroute.purchaseinsuranceservice.domain.AddOnDetails;
import com.stackroute.purchaseinsuranceservice.domain.Insurance;
import com.stackroute.purchaseinsuranceservice.domain.PolicyBenefits;
import com.stackroute.purchaseinsuranceservice.domain.PolicyDetails;
import com.stackroute.purchaseinsuranceservice.exception.NoInsuranceFoundException;
import com.stackroute.purchaseinsuranceservice.exception.PolicyExpiredException;
import com.stackroute.purchaseinsuranceservice.exception.PolicyIdAlreadyExistsException;
import com.stackroute.purchaseinsuranceservice.exception.PolicyIdNotFoundException;
import com.stackroute.purchaseinsuranceservice.model.CustomerClaim;
import com.stackroute.purchaseinsuranceservice.model.CustomerInsurance;
import com.stackroute.purchaseinsuranceservice.model.CustomerInsurancePurchase;
import com.stackroute.purchaseinsuranceservice.model.CustomerRenewal;
import com.stackroute.purchaseinsuranceservice.service.PurchaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.text.ParseException;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api")
//@CrossOrigin(origins = "*")
public class PurchaseInsuranceController {
    @Autowired
    private PurchaseService purchaseService;

    Producer producer;

    @PostMapping("/add/customer-insurance")
    public ResponseEntity<?> addCustomerInsurancePolicy(@RequestBody CustomerInsurancePurchase insurance)
            throws PolicyIdAlreadyExistsException {
        System.out.println(insurance.getCustomerPolicyId());
        return new ResponseEntity<>(purchaseService.savePurchasedInsurance(insurance), HttpStatus.CREATED);
    }

    @GetMapping("/retrieveall/customerinsurances")
    public ResponseEntity<?> getAll() {
        return new ResponseEntity<>(purchaseService.getCustomerInsurances(), HttpStatus.ACCEPTED);
    }

    @GetMapping("/policies/{insuranceId}")
    public ResponseEntity<?> getPolicyByInsurancePolicyId(@PathVariable String insuranceId) {
        try {
            return new ResponseEntity<>(purchaseService.getCustomerInsurancesByInsuranceId(insuranceId),
                    HttpStatus.ACCEPTED);
        } catch (NoInsuranceFoundException noInsuranceFoundException) {
            return new ResponseEntity<>("No Insurance Found", HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/get/{customerPolicyId}")
    public ResponseEntity<?> getPolicyDetailsByCustomerPolicyID(@PathVariable String customerPolicyId) {
        try {
            return new ResponseEntity<>(purchaseService.getPolicyDetailsByCustomerPolicyID(customerPolicyId),
                    HttpStatus.ACCEPTED);
        } catch (PolicyIdNotFoundException policyIdNotFoundException) {
            return new ResponseEntity<>("No Insurance Found", HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/get/insurances/{email}")
    public ResponseEntity<?> returnInsurancesByCustomerEmail(@PathVariable String email) {
        Iterable<CustomerInsurance> cus = new ArrayList<>();
        try {
            cus = purchaseService.getInsuranceByEmail(email);
        } catch (NoInsuranceFoundException n) {
            n.printStackTrace();
        }
        return new ResponseEntity<>(cus, HttpStatus.OK);
    }

    @GetMapping("/get/check/{email}/{insurancePolicyId}")
    public ResponseEntity<?> checkIfPurchased(@PathVariable String email, @PathVariable String insurancePolicyId) {
        return new ResponseEntity<>(purchaseService.checkIfAlreadyPurchased(email, insurancePolicyId),
                HttpStatus.FOUND);
    }

    @PutMapping("/renew")
    public ResponseEntity<?> renewPolicy(@RequestBody CustomerRenewal customerRenewal) {
        boolean result = false;
        try {
            result = purchaseService.renewCustomerPolicy(customerRenewal);
        } catch (PolicyExpiredException p) {
            p.printStackTrace();
        } catch (PolicyIdNotFoundException pid) {
            pid.printStackTrace();
        } catch (ParseException pe) {
            pe.printStackTrace();
        }
        return new ResponseEntity<>(result, HttpStatus.ACCEPTED);
    }

    @PutMapping("/claim")
    public ResponseEntity<?> claimPolicyBenefit(@RequestBody CustomerClaim customerClaim) {
        String result = "";
        try {
            result = purchaseService.claimInsurance(customerClaim);
        } catch (PolicyIdNotFoundException pid) {
            pid.printStackTrace();
        }
        return new ResponseEntity<>(result, HttpStatus.ACCEPTED);
    }

    @PutMapping("/refresh/{email}")
    public ResponseEntity<?> updateInsuranceAttributesByDate(@PathVariable String email) throws ParseException {
        return new ResponseEntity<>(purchaseService.startUp(email), HttpStatus.ACCEPTED);
    }

    @PutMapping("/upload/documents/{policyId}")
    public ResponseEntity<?> updateImage(@RequestParam("imageFile") MultipartFile imageFile,
            @PathVariable String policyId) {
        int result = 0;
        try {
            result = purchaseService.uploadDocument(imageFile, policyId);

        } catch (IOException e) {
            e.printStackTrace();
        }
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @PutMapping("/update/claim/{customerId}/{status}")
    public ResponseEntity<?> updateClaims(@PathVariable String customerId, @PathVariable String status) {

        return new ResponseEntity<>(purchaseService.updateClaimStatus(customerId, status), HttpStatus.OK);
    }

    @GetMapping("/get/count/{insuranceId}")
    public ResponseEntity<?> returnUserCountForPolicy(@PathVariable String insuranceId) {

        return new ResponseEntity<>(purchaseService.returnUserCount(insuranceId), HttpStatus.OK);
    }

    @PutMapping("/testing/{customerPolicyId}")
    public ResponseEntity<?> returnInsurancePolicyOptionsForRenew(@RequestBody Insurance insurance,
            @PathVariable String customerPolicyId) {
        return new ResponseEntity<>(purchaseService.returnInsuranceForRenewal(insurance, customerPolicyId),
                HttpStatus.OK);
    }

    // checkRenewalStatus
    @PutMapping("/getstatus/{customerPolicyId}")
    public ResponseEntity<?> returnRenewalStatus(@PathVariable String customerPolicyId,
            @RequestBody Insurance insurance) throws ParseException, PolicyIdNotFoundException {

        return new ResponseEntity<>(purchaseService.checkRenewalStatus(customerPolicyId,insurance), HttpStatus.OK);
    }



}
