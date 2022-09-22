package com.stackroute.purchaseinsuranceservice.controller;

import com.stackroute.purchaseinsuranceservice.config.Producer;
import com.stackroute.purchaseinsuranceservice.exception.PolicyExpiredException;
import com.stackroute.purchaseinsuranceservice.exception.PolicyIdAlreadyExistsException;
import com.stackroute.purchaseinsuranceservice.exception.PolicyIdNotFoundException;
import com.stackroute.purchaseinsuranceservice.model.CustomerClaim;
import com.stackroute.purchaseinsuranceservice.model.CustomerInsurancePurchase;
import com.stackroute.purchaseinsuranceservice.model.CustomerRenewal;
import com.stackroute.purchaseinsuranceservice.service.PurchaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class PurchaseInsuranceController {
    @Autowired
    private PurchaseService purchaseService;

    Producer producer;

    @PostMapping("/add/customer-insurance")
    public ResponseEntity<?> addCustomerInsurancePolicy(@RequestBody CustomerInsurancePurchase insurance) throws PolicyIdAlreadyExistsException
    {
        System.out.println(insurance.getCustomerPolicyId());
      return new ResponseEntity(purchaseService.savePurchasedInsurance(insurance), HttpStatus.CREATED);
    }
    @GetMapping("/retrieveall/customerinsurances")
     public ResponseEntity<?> getAll()
    {
        return new ResponseEntity(purchaseService.getCustomerInsurances(),HttpStatus.ACCEPTED);
    }

    @GetMapping("/get/{customerPolicyId}")
    public ResponseEntity<?> getPolicyDetailsByCustomerPolicyID(@PathVariable String customerPolicyId)
    {
      try{
          return new ResponseEntity<>(purchaseService.getPolicyDetailsByCustomerPolicyID(customerPolicyId),HttpStatus.ACCEPTED);
      }
      catch (PolicyIdNotFoundException policyIdNotFoundException)
      {
          return new ResponseEntity<>("No Insurance Found",HttpStatus.NOT_FOUND);
      }
    }


    @GetMapping("/get/insurances/{email}")
    public ResponseEntity<?> returnInsurancesByCustomerEmail(@PathVariable String email) throws PolicyIdAlreadyExistsException
    {

        return new ResponseEntity(purchaseService.getInsuranceByEmail(email), HttpStatus.FOUND);
    }

    @GetMapping("/get/check/{email}/{insurancePolicyId}")
    public ResponseEntity<?> checkIfPurchased(@PathVariable String email,@PathVariable String insurancePolicyId)
    {

        return new ResponseEntity(purchaseService.checkIfAlreadyPurchased(email,insurancePolicyId), HttpStatus.FOUND);
    }

    @PutMapping("/renew")
    public ResponseEntity<?> renewPolicy(@RequestBody CustomerRenewal customerRenewal){
        boolean result=false;
        try {
            result=purchaseService.renewCustomerPolicy(customerRenewal);
        }
        catch (PolicyExpiredException p)
        {
         p.printStackTrace();
        }
        catch (PolicyIdNotFoundException pid)
        {
            pid.printStackTrace();
        }
        catch (ParseException pe)
        {
            pe.printStackTrace();
        }
        return new ResponseEntity(result, HttpStatus.ACCEPTED);
    }

    @PutMapping("/claim")
    public ResponseEntity<?> claimPolicyBenefit(@RequestBody CustomerClaim customerClaim){
        String result="";
        try {
            result=purchaseService.claimInsurance(customerClaim);
        }
        catch (PolicyIdNotFoundException pid)
        {
            pid.printStackTrace();
        }
        return new ResponseEntity(result, HttpStatus.ACCEPTED);
    }


}
