package com.stackroute.recommendationservice.controller;

import com.stackroute.recommendationservice.exception.NoInsurancesFound;
import com.stackroute.recommendationservice.model.Insurance;
import com.stackroute.recommendationservice.service.Recommendation_service;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

// you need to add the method for suggesting on the basis of the no of insurances bought

@RestController
@Slf4j
@RequestMapping("/Recommendation")
//@CrossOrigin(origins = "*", allowedHeaders = "*")
public class Recommendation_Controller {
    private final Recommendation_service recommendation_service;

    @Autowired
    public Recommendation_Controller(Recommendation_service recommendation_service) {
        log.debug("Recommendation_service");
        this.recommendation_service = recommendation_service;
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
    // @PostMapping("/Insurance")
    // public ResponseEntity<?> registerInsurance(@RequestBody InsuranceProfile
    // insuranceProfile) {
    // try {
    //// recommendation_service.addAge(insuranceProfile.getAge());
    // recommendation_service.addInsuranceType(insuranceProfile.getInsuranceType());
    //// recommendation_service.addOccupation(insuranceProfile.getOccupation());
    // Insurance insurance = recommendation_service.addInsurance(insuranceProfile);
    // if(insurance != null){
    // return new ResponseEntity<>("Insurance Added",HttpStatus.CREATED);
    // }else{
    // return new ResponseEntity<>("Insurance Not added",HttpStatus.OK);
    // }
    // }catch (InsuranceAlreadyExists e){
    // log.error(e.getMessage());
    // return new ResponseEntity<>("Insurance Already Exists", HttpStatus.CONFLICT);
    // }
    // }

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
