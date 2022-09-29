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
@CrossOrigin(origins = "*")
public class PurchaseInsuranceController {
    @Autowired
    private PurchaseService purchaseService;

    Producer producer;

    @PostMapping("/add/customer-insurance")
    public ResponseEntity<?> addCustomerInsurancePolicy(@RequestBody CustomerInsurancePurchase insurance) throws PolicyIdAlreadyExistsException
    {
        System.out.println(insurance.getCustomerPolicyId());
      return new ResponseEntity<>(purchaseService.savePurchasedInsurance(insurance), HttpStatus.CREATED);
    }
    @GetMapping("/retrieveall/customerinsurances")
     public ResponseEntity<?> getAll()
    {
        return new ResponseEntity<>(purchaseService.getCustomerInsurances(),HttpStatus.ACCEPTED);
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
    public ResponseEntity<?> returnInsurancesByCustomerEmail(@PathVariable String email)
    {
        Iterable<CustomerInsurance> cus=new ArrayList<>();
        try
          {
           cus=purchaseService.getInsuranceByEmail(email);
          }
      catch(NoInsuranceFoundException n)
      {
        n.printStackTrace();
      }
        return new ResponseEntity<>(cus, HttpStatus.FOUND);
    }

    @GetMapping("/get/check/{email}/{insurancePolicyId}")
    public ResponseEntity<?> checkIfPurchased(@PathVariable String email,@PathVariable String insurancePolicyId)
    {
        return new ResponseEntity<>(purchaseService.checkIfAlreadyPurchased(email,insurancePolicyId), HttpStatus.FOUND);
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
        return new ResponseEntity<>(result, HttpStatus.ACCEPTED);
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
        return new ResponseEntity<>(result, HttpStatus.ACCEPTED);
    }

    @PutMapping("/refresh/{email}")
    public ResponseEntity<?> updateInsuranceAttributesByDate(@PathVariable String email) throws ParseException {
        return new ResponseEntity<>(purchaseService.startUp(email), HttpStatus.ACCEPTED);
    }
    @PutMapping("/upload/documents/{policyId}")
    public ResponseEntity<?> updateImage(@RequestParam("documentFile") MultipartFile documentFile,
                                         @PathVariable String policyId)  {
     int result=0;
           try {
               result=purchaseService.uploadDocument(documentFile, policyId);

           }
           catch(IOException e)
           {
               e.printStackTrace();
           }
        return new ResponseEntity<>(result,HttpStatus.OK);
    }
    @PutMapping("/update/claim/{customerId}/{status}")
    public ResponseEntity<?> updateClaims(@PathVariable String customerId,@PathVariable String status)  {

        return new ResponseEntity<>(purchaseService.updateClaimStatus(customerId,status),HttpStatus.OK);
    }
 @GetMapping("/get/count/{insuranceId}")
 public ResponseEntity<?> returnUserCountForPolicy(@PathVariable String insuranceId)  {

     return new ResponseEntity<>(purchaseService.returnUserCount(insuranceId),HttpStatus.OK);
 }
@PutMapping("/testing/{customerPolicyId}")
public ResponseEntity<?> returnInsurancePolicyOptionsForRenew(@RequestBody Insurance insurance,@PathVariable String customerPolicyId){
    return new ResponseEntity<>(purchaseService.returnInsuranceForRenewal(insurance,customerPolicyId),HttpStatus.OK);
}


    @GetMapping("/returnobj")
    public ResponseEntity<?> returnobj(){
        Insurance result=new Insurance();
        PolicyDetails policyDetails1 =new PolicyDetails(3000,1,1000000,8000,12400,13000,14000,300000,1000000);
        PolicyDetails policyDetails2 =new PolicyDetails(2400,2,1000000,7300,11400,12000,13000,200000,1000000);
        PolicyDetails policyDetails3 =new PolicyDetails(2300,3,1000000,7200,10800,11500,12500,700000,900000);
        PolicyDetails policyDetails4 =new PolicyDetails(2200,4,1000000,6600,9600,10800,12200,900000,1000000);
        PolicyDetails policyDetails5 =new PolicyDetails(2000,5,1000000,6000,9000,10500,11800,1200000,1500000);
        PolicyDetails policyDetails6 =new PolicyDetails(1700,1,500000,5000,7000,7000,8000,600000,900000);
        PolicyDetails policyDetails7 =new PolicyDetails(1400,2,500000,4500,6400,6800,7600,500000,670000);
        PolicyDetails policyDetails8 =new PolicyDetails(1300,3,500000,4000,6100,6500,7100,500000,960000);
        PolicyDetails policyDetails9 =new PolicyDetails(1100,4,500000,3750,5800,6300,6800,600000,900000);
        PolicyDetails policyDetails10=new PolicyDetails(1000,5,500000,3600,5500,6000,6500,500000,1000000);
        PolicyDetails policyDetails11=new PolicyDetails(800,1,100000,1500,1800,2400,3000,780000,1000000);
        PolicyDetails policyDetails12=new PolicyDetails(600,2,100000,1200,1600,2140,2400,610000,1500000);
        PolicyDetails policyDetails13=new PolicyDetails(400,3,100000,900,1500,1940,2100,530000,780000);
        PolicyDetails policyDetails14=new PolicyDetails(200,4,100000,700,1200,1800,1900,790000,985000);
        PolicyDetails policyDetails15=new PolicyDetails(100,5,100000,500,1000,1500,1600,620000,650000);
        PolicyDetails[] pd={policyDetails1,policyDetails2,policyDetails3,policyDetails4,policyDetails5,policyDetails6,policyDetails7,policyDetails8,policyDetails9,policyDetails10,policyDetails11,policyDetails12,policyDetails13,policyDetails14,policyDetails15};
        PolicyBenefits pb1=new PolicyBenefits("brief1","description1");
        PolicyBenefits pb2=new PolicyBenefits("brief2","description2");
        PolicyBenefits pb3=new PolicyBenefits("brief3","description3");
        PolicyBenefits pb4=new PolicyBenefits("brief4","description4");
        PolicyBenefits[] pb={pb1,pb2,pb3,pb4};
        AddOnDetails add1=new AddOnDetails("name1","description1",1000);
        AddOnDetails add2=new AddOnDetails("name2","description2",2000);
        AddOnDetails add3=new AddOnDetails("name3","description3",4000);
        AddOnDetails add4=new AddOnDetails("name4","description4",800);
        AddOnDetails add5=new AddOnDetails("name5","description5",1500);
        AddOnDetails[] add={add1,add2,add3,add4,add5};
//        private AddOnDetails[] addOnDetails;
//        private String policyDocuments;
//        private List<String> modelsAllowed;
        List<String> modelsAllowed=new ArrayList<>();
        modelsAllowed.add("ABC-1");
        modelsAllowed.add("XYZ-2");
        result.setPolicyId("123456");
        result.setPolicyName("ABCDEFGH");
//        result.setInsuranceType("HealthInsurance");
//        result.setInsuranceType("AutoMobileInsurance");
        result.setInsuranceType("LifeInsurance");
        result.setPolicyDescription("This is a message describing the policy");
//        result.setCategory("Bike");
        result.setPolicyDocuments("This is terms and conditions");
        result.setModelsAllowed(modelsAllowed);
        result.setPolicyDetails(pd);
        result.setPolicyBenefits(pb);
        result.setAddOnDetails(add);
        System.out.println(result.getCategory());
        return new ResponseEntity<>(result, HttpStatus.ACCEPTED);
    }
}
