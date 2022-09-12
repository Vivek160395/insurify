package com.stackroute.insuranceservice.controller;

import com.stackroute.insuranceservice.exceptions.PolicyAlreadyExistException;
import com.stackroute.insuranceservice.model.Insurance;
import com.stackroute.insuranceservice.repository.InsuranceRepo;
import com.stackroute.insuranceservice.service.InsuranceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.ResponseEntity.BodyBuilder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

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
        }

        return new ResponseEntity<>(insuranceService.saveInsurance(lifePolicyObj), HttpStatus.CREATED);
    }

    @PutMapping("/life-pic")
    public ResponseEntity<?> savePic(@RequestBody Insurance insurance) throws PolicyAlreadyExistException, IOException {

        lifePolicyObj = new Insurance();
        lifePolicyObj.setPolicyId(insurance.getPolicyId());
        lifePolicyObj.setPolicyName(insurance.getPolicyName());
        lifePolicyObj.setInsuranceType(insurance.getInsuranceType());
        lifePolicyObj.setPolicyDescription(insurance.getPolicyDescription());
        lifePolicyObj.setPolicyDetails(insurance.getPolicyDetails());
        lifePolicyObj.setPolicyBenefits(insurance.getPolicyBenefits());
        lifePolicyObj.setAddOnDetails(insurance.getAddOnDetails());
        lifePolicyObj.setPolicyDocuments(insurance.getPolicyDocuments());

        return new ResponseEntity<>(insuranceService.saveInsurance(lifePolicyObj), HttpStatus.CREATED);
    }

    @PostMapping("/photos/update/{policyId}")
    public BodyBuilder updateImage(@RequestParam("imageFile") MultipartFile imageFile, @RequestParam("policyId") String policyId) throws IOException {
        System.out.println("~~~~~~~~~~~~~~~~~~~~~~~~"+imageFile.getOriginalFilename());
        System.out.println(insuranceRepo.findById(policyId));
        Insurance retrieveInsurance = insuranceRepo.findById(policyId).get();
        System.out.println("Original Image Byte Size - " + imageFile.getBytes().length);

        retrieveInsurance.setPicByte(compressBytes(imageFile.getBytes()));
        System.out.println("PolicyId"+policyId);
        insuranceRepo.save(retrieveInsurance);
        return ResponseEntity.status(HttpStatus.OK);
    }
    @GetMapping(path = { "/get/{imageName}" })
    public Insurance getImage(@PathVariable("imageName") String imageName) throws IOException {

        final Optional<Insurance> retrievedImage = insuranceRepo.findById(imageName);
        Insurance insurance = new Insurance();
        insurance.setPicByte(decompressBytes(retrievedImage.get().getPicByte()));
        return insurance;
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



//    @PostMapping("/health-policy")
//    public ResponseEntity<?> addHealthPolicy(@RequestParam("policyId") String policyId, @RequestParam("insuranceType") String insuranceType,
//                                       @RequestParam("policyName") String policyName, @RequestParam("policyDescription") String policyDescription) {
//        Insurance lmn = new Insurance();
//        lmn.setPolicyId(policyId);
//        lmn.setInsuranceType(insuranceType);
//        lmn.setPolicyName(policyName);
//        lmn.setPolicyDescription(policyDescription);
//
//        return new ResponseEntity<>(repo.save(lmn), HttpStatus.CREATED);
//    }
//
//    @PostMapping("/automobile-policy")
//    public ResponseEntity<?> addAutomobilePolicy(@RequestParam("policyId") String policyId, @RequestParam("insuranceType") String insuranceType,
//                                             @RequestParam("policyName") String policyName, @RequestParam("policyDescription") String policyDescription) {
//        Insurance lmn = new Insurance();
//        lmn.setPolicyId(policyId);
//        lmn.setInsuranceType(insuranceType);
//        lmn.setPolicyName(policyName);
//        lmn.setPolicyDescription(policyDescription);
//
//        return new ResponseEntity<>(repo.save(lmn), HttpStatus.CREATED);
//    }

}
