package com.stackroute.purchaseinsuranceservice.controller;

import com.stackroute.purchaseinsuranceservice.config.Producer;
import com.stackroute.purchaseinsuranceservice.domain.AddOnDetails;
import com.stackroute.purchaseinsuranceservice.domain.Insurance;
import com.stackroute.purchaseinsuranceservice.domain.PolicyBenefits;
import com.stackroute.purchaseinsuranceservice.domain.PolicyDetails;
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
        return new ResponseEntity<>(purchaseService.getInsuranceByEmail(email), HttpStatus.FOUND);
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

    @GetMapping("/returnobj")
    public ResponseEntity<?> returnobjasd(){
        Insurance result=new Insurance();
        PolicyDetails policyDetails1=new PolicyDetails(7000,1,1000000,1,2,300000,1000000,25,55);
        PolicyDetails policyDetails2=new PolicyDetails(5000,1,1000000,2,2,200000,1000000,25,55);
        PolicyDetails policyDetails3=new PolicyDetails(3000,2,1000000,1,2,700000,900000,25,55);
        PolicyDetails policyDetails4=new PolicyDetails(4800,2,1000000,2,2,900000,1000000,25,55);
        PolicyDetails policyDetails5=new PolicyDetails(5000,4,1000000,1,1,1200000,1500000,25,55);
        PolicyDetails policyDetails6=new PolicyDetails(3000,2,500000,1,1,600000,900000,30,50);
        PolicyDetails policyDetails7=new PolicyDetails(11000,5,500000,1,0,500000,670000,45,55);
        PolicyDetails policyDetails8=new PolicyDetails(5000,2,500000,1,0,500000,960000,45,55);
        PolicyDetails policyDetails9=new PolicyDetails(3000,5,500000,2,2,600000,900000,30,50);
        PolicyDetails policyDetails10=new PolicyDetails(1000,5,500000,2,2,500000,1000000,45,55);
        PolicyDetails policyDetails11=new PolicyDetails(5000,6,100000,1,0,780000,1000000,45,55);
        PolicyDetails policyDetails12=new PolicyDetails(3400,7,100000,1,0,610000,1500000,30,50);
        PolicyDetails policyDetails13=new PolicyDetails(1000,8,100000,1,0,530000,780000,45,55);
        PolicyDetails policyDetails14=new PolicyDetails(5000,9,100000,1,0,790000,985000,45,55);
        PolicyDetails policyDetails15=new PolicyDetails(3200,7,100000,2,2,620000,650000,30,50);
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
        result.setInsuranceType("HealthInsurance");
//        result.setInsuranceType("AutoMobile Insurance");
//        result.setInsuranceType("LifeInsurance");
        result.setPolicyDescription("This is a message describing the policy");
        result.setCategory("Car");
        result.setPolicyDocuments("This is terms and conditions");
        result.setModelsAllowed(modelsAllowed);
        result.setPolicyDetails(pd);
        result.setPolicyBenefits(pb);
        result.setAddOnDetails(add);

        return new ResponseEntity<>(result, HttpStatus.ACCEPTED);
    }
}
