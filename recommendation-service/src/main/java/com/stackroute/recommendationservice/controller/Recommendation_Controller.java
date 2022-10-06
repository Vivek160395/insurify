package com.stackroute.recommendationservice.controller;

import com.stackroute.recommendationservice.exception.InsuranceAlreadyExists;
import com.stackroute.recommendationservice.exception.NoInsurancesFound;
import com.stackroute.recommendationservice.model.Insurance;
import com.stackroute.recommendationservice.model.InsuranceProfile;
import com.stackroute.recommendationservice.repository.Insurance_Repository;
import com.stackroute.recommendationservice.service.Recommendation_service;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

// you need to add the method for suggesting on the basis of the no of insurances bought

@RestController
@Slf4j
@RequestMapping("/Recommendation")
// @CrossOrigin(origins = "*", allowedHeaders = "*")
public class Recommendation_Controller {
    private final Recommendation_service recommendation_service;
    private final Insurance_Repository insurance_Repository;

    @Autowired
    public Recommendation_Controller(Recommendation_service recommendation_service,
            Insurance_Repository insurance_Repository) {
        log.debug("Recommendation_service");
        this.recommendation_service = recommendation_service;
        this.insurance_Repository = insurance_Repository;
    }

    // @PostMapping("/user")
    // public ResponseEntity<?> registerUser(@RequestBody User user){
    // try {
    // User user1 = recommendation_service.addUser(user);
    // if(user1 !=null){
    // return new ResponseEntity<>(user1,HttpStatus.CREATED);
    // }else {
    // return new ResponseEntity<>("User Not Registered",HttpStatus.BAD_GATEWAY);
    // }
    // }
    // catch (UserAlreadyPosted e){
    // log.error(e.getMessage());
    // return new ResponseEntity<>("User Already Exists",HttpStatus.CONFLICT);
    // }
    // }
    //
    //
    @PostMapping("/Insurance")
    public ResponseEntity<?> registerInsurance(@RequestBody InsuranceProfile insuranceProfile) {
        try {
            System.out.println(insuranceProfile.getPolicyId());
            System.out.println(insuranceProfile.getPolicyDescription());
            System.out.println(insuranceProfile.getPolicyName());
            System.out.println(insuranceProfile.getInsuranceType());
            Insurance insurance = recommendation_service.addInsurance(insuranceProfile);
            if (insurance != null) {
                return new ResponseEntity<>("Insurance Added", HttpStatus.OK);
            } else {
                return new ResponseEntity<>("Insurance Not added", HttpStatus.OK);
            }
        } catch (InsuranceAlreadyExists e) {
            log.error(e.getMessage());
            return new ResponseEntity<>("Insurance Already Exists", HttpStatus.CONFLICT);
        }
    }

    @PostMapping("/insurance/{policyId}")
    public ResponseEntity<?> addImage(@PathVariable String policyId, @RequestParam("imageFile") MultipartFile file)
            throws NoInsurancesFound {
        try {
            if (recommendation_service.addInsuranceImage(policyId, file)) {
                return new ResponseEntity<>("Image Updated", HttpStatus.OK);
            } else {
                return new ResponseEntity<>("Image Not Updated", HttpStatus.BAD_REQUEST);
            }
        } catch (IOException e) {
            log.error(e.getMessage());
            return new ResponseEntity<>("Insurance Not Found", HttpStatus.NOT_FOUND);
        }

    }
    // @GetMapping("/InsuranceByAge/{age}")
    // public ResponseEntity<?> getInsuranceByAge(@PathVariable int age) throws
    // NoInsurancesFound {
    // try {
    // List<Insurance> insurances =
    // recommendation_service.getAllInsuranceOnBasisOfAge(age);
    // return new ResponseEntity<>(insurances,HttpStatus.OK);
    // } catch(NoInsurancesFound e){
    // log.error(e.getMessage());
    // return new ResponseEntity<>("No Insurance Found",HttpStatus.NOT_FOUND);
    // }
    // }

    // @GetMapping("{occupation}/InsuranceByOccupation")
    // public ResponseEntity<?> getInsuranceByOccupation(@PathVariable String
    // occupation) throws NoInsurancesFound {
    // try{
    // List<Insurance> insurances =
    // recommendation_service.getAllInsuranceOnBasisOfOccupation(occupation);
    // return new ResponseEntity<>(insurances,HttpStatus.OK);
    // }catch (NoInsurancesFound e){
    // log.error(e.getMessage());
    // return new ResponseEntity<>("No Insurance Found",HttpStatus.NOT_FOUND);
    // }
    // }

    @GetMapping("{insuranceType}/InsuranceByType")
    public ResponseEntity<?> getInsuranceByType(@PathVariable String insuranceType) {
        try {
            List<Insurance> insurances = recommendation_service.getAllInsuranceOnBasisOfType(insuranceType);
            return new ResponseEntity<>(insurances, HttpStatus.OK);
        } catch (NoInsurancesFound e) {
            log.error(e.getMessage());
            return new ResponseEntity<>("No Insurance Found", HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/Insurances")
    public ResponseEntity<?> getAllInsurances() {
        try {
            List<Insurance> insurances = recommendation_service.getAllInsurance();
            return new ResponseEntity<>(insurances, HttpStatus.OK);
        } catch (NoInsurancesFound e) {
            log.error(e.getMessage());
            return new ResponseEntity<>("No Insurance Found", HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("{userEmail}/{insuranceId}/buyInsurance")
    public ResponseEntity<?> userBuyInsurance(@PathVariable String insuranceId, @PathVariable String userEmail) {
        if (recommendation_service.createUserToInsuranceRelation(insuranceId, userEmail)) {
            return new ResponseEntity<>("Insurance Bought Successfully", HttpStatus.CREATED);
        } else {
            log.error("Insurance Already Bought");
            return new ResponseEntity<>("Insurance Already Bought", HttpStatus.CREATED);
        }
    }

    @GetMapping("/TrendingInsurances")
    public ResponseEntity<?> getNoOfInsurancesBought() {
        try {
            List<Insurance> insurances = recommendation_service.getAllInsurancesWhichAreTrending();
            return new ResponseEntity<>(insurances, HttpStatus.OK);
        } catch (NoInsurancesFound e) {
            log.error("No Insurance Found");
            return new ResponseEntity<>("No Insurance Found", HttpStatus.NOT_FOUND);
        }
    }

}
