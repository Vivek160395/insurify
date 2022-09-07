package com.stackroute.insuranceservice.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.stackroute.insuranceservice.exceptions.PolicyAlreadyExistException;
import com.stackroute.insuranceservice.exceptions.PolicyNotFoundException;
import com.stackroute.insuranceservice.model.AddOnDetails;
import com.stackroute.insuranceservice.model.Benefits;
import com.stackroute.insuranceservice.model.Details;
import com.stackroute.insuranceservice.model.HealthInsurancePolicy;
import com.stackroute.insuranceservice.service.HealthInsurancePolicyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.List;
import java.util.zip.Deflater;

@RestController
@RequestMapping("/api/v1")
public class HealthPolicyController {

    HealthInsurancePolicyService policyService;


    @Autowired
    public HealthPolicyController(HealthInsurancePolicyService policyService) {
        this.policyService = policyService;
    }

    @PostMapping("/policy")
    public ResponseEntity<?> addPolicy(@RequestParam("policyId") Integer policyId, @RequestParam("policyName") String policyName,
                                       @RequestParam("policyDetails") List<Details> policyDetails, @RequestParam("insuranceType") String insuranceType,
                                       @RequestParam("policyBenefits") List<Benefits> policyBenefits, @RequestParam("file") MultipartFile file,
                                       @RequestParam("policyAddOnDetails") List<AddOnDetails> policyAddOnDetails) throws PolicyAlreadyExistException, IOException {

        HealthInsurancePolicy policy = new HealthInsurancePolicy();
        policy.setPolicyId(policyId);
        policy.setPolicyName(policyName);
        policy.setInsuranceType(insuranceType);
        policy.setPolicyDetails(policyDetails);
        policy.setPolicyBenefits(policyBenefits);
        policy.setPolicyDocuments(file.getBytes());
        policy.setPolicyAddOnDetails(policyAddOnDetails);

        policyService.savePolicy(policy,file);
        return new ResponseEntity<>("Data Saved Successfully",HttpStatus.ACCEPTED);
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

    public static byte[] compressBytes(byte[] data) {
        Deflater deflater = new Deflater();
        deflater.setInput(data);
        deflater.finish();

        ByteArrayOutputStream outputStream = new ByteArrayOutputStream(data.length);
        byte[] buffer = new byte[1024];
        while (!deflater.finished()) {
            int count = deflater.deflate(buffer);
            outputStream.write(buffer, 0, count);
        }
        try {
            outputStream.close();
        } catch (IOException e) {
        }
        System.out.println("Compressed Image Byte Size - " + outputStream.toByteArray().length);

        return outputStream.toByteArray();
    }
}
