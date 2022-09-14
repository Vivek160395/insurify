package com.stackroute.insuranceservice.controller;

import com.stackroute.insuranceservice.config.Producer;
import com.stackroute.insuranceservice.exceptions.PolicyAlreadyExistException;
import com.stackroute.insuranceservice.exceptions.PolicyNotFoundException;
import com.stackroute.insuranceservice.model.Insurance;
import com.stackroute.insuranceservice.rabbitMq.domain.DTO;
import com.stackroute.insuranceservice.repository.InsuranceRepo;
import com.stackroute.insuranceservice.service.InsuranceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.http.ResponseEntity.BodyBuilder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.Optional;
import java.util.zip.DataFormatException;
import java.util.zip.Deflater;
import java.util.zip.Inflater;

@RestController
@RequestMapping("/api/vk1")
@CrossOrigin(origins ="*")
public class InsuranceController {

    @Autowired
    private InsuranceService insuranceService;
    @Autowired
    private InsuranceRepo insuranceRepo;
    @Autowired
    private Producer producer;
    Insurance lifePolicyObj;

    @PostMapping("/life-policy")
    public ResponseEntity<?> addLifePolicy(@RequestBody Insurance insurance) throws PolicyAlreadyExistException, IOException {

        lifePolicyObj = new Insurance();
        lifePolicyObj.setPolicyId(insurance.getPolicyId());
        lifePolicyObj.setPolicyName(insurance.getPolicyName());
        lifePolicyObj.setInsuranceType(insurance.getInsuranceType());
        lifePolicyObj.setPolicyDescription(insurance.getPolicyDescription());
        lifePolicyObj.setPolicyDetails(insurance.getPolicyDetails());
        lifePolicyObj.setPolicyBenefits(insurance.getPolicyBenefits());
        lifePolicyObj.setAddOnDetails(insurance.getAddOnDetails());
        lifePolicyObj.setPolicyDocuments(insurance.getPolicyDocuments());

        if (insurance.getInsuranceType().equalsIgnoreCase("AutomobileInsurance")) {
            lifePolicyObj.setCategory(insurance.getCategory());
            lifePolicyObj.setModelsAllowed(insurance.getModelsAllowed());
        }
        return new ResponseEntity<>(insuranceService.saveInsurance(lifePolicyObj), HttpStatus.CREATED);
    }

    @PutMapping("/photos/update/{policyId}")
    public BodyBuilder updateImage(@RequestParam("imageFile") MultipartFile imageFile, @RequestParam("policyId") String policyId) throws IOException {

        System.out.println("~~~~~~~~~~~~~~~~~~~~~~~~"+imageFile.getOriginalFilename());
        System.out.println(insuranceRepo.findById(policyId));
        Insurance retrieveInsurance = insuranceRepo.findById(policyId).get();
        System.out.println("Original Image Byte Size - " + imageFile.getBytes().length);

        retrieveInsurance.setPicByte(compressBytes(imageFile.getBytes()));

        DTO dto = new DTO();
        dto.setPolicyId(retrieveInsurance.getPolicyId());
        dto.setPolicyName(retrieveInsurance.getPolicyName());
        dto.setPicByte(retrieveInsurance.getPicByte());
        dto.setInsuranceType(retrieveInsurance.getInsuranceType());
        dto.setDescription(retrieveInsurance.getPolicyDescription());
        dto.setPicType(imageFile.getContentType());
        System.out.println("PolicyId"+policyId);
        insuranceRepo.save(retrieveInsurance);
        producer.sendingMessageToRabbitMQServer(dto);
        return ResponseEntity.status(HttpStatus.OK);
    }
    @GetMapping(path = { "/get/{imageName}" })
    public Insurance getImage(@PathVariable("imageName") String imageName) {

        final Optional<Insurance> retrievedImage = insuranceRepo.findById(imageName);
        Insurance insurance = new Insurance();
        insurance.setPicByte(decompressBytes(retrievedImage.get().getPicByte()));
        return insurance;
    }

    @GetMapping(path = {"/policies"})
    public ResponseEntity<?> getAllInsurance(){
        return new ResponseEntity<>(insuranceService.findAllInsurance(),HttpStatus.OK);
    }

    @GetMapping("/policy-id/{policyId}")
    public ResponseEntity<?> getPolicyByPolicyId(@PathVariable String  policyId) throws PolicyNotFoundException {
        return new ResponseEntity<>(insuranceService.getPolicyByPolicyId(policyId),HttpStatus.OK);
    }

    @DeleteMapping("/policy/delete/{policyId}")
    public ResponseEntity<?> deletePolicyByPolicyId(@PathVariable String policyId) throws PolicyNotFoundException {
        insuranceService.deletePolicyByPolicyId(policyId);
        return new ResponseEntity<>("Deleted successfully",HttpStatus.OK);
    }

    @GetMapping("/policy-name/{policyName}")
    public ResponseEntity<?> getPolicyByPolicyName(@PathVariable String policyName) {
        insuranceService.findPolicyByPolicyName(policyName);
        return new ResponseEntity<>(insuranceService.findPolicyByPolicyName(policyName),HttpStatus.OK);
    }



    // compress the image bytes before storing it in the database
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

    // uncompress the image bytes before returning it to the angular application
    public static byte[] decompressBytes(byte[] data) {
        Inflater inflater = new Inflater();
        inflater.setInput(data);
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream(data.length);
        byte[] buffer = new byte[1024];
        try {
            while (!inflater.finished()) {
                int count = inflater.inflate(buffer);
                outputStream.write(buffer, 0, count);
            }
            outputStream.close();
        } catch (IOException | DataFormatException ioe) {
        }
        return outputStream.toByteArray();
    }
}