package com.stackroute.recommendationservice.controller;

import com.stackroute.recommendationservice.exception.AgeAlreadyThere;
import com.stackroute.recommendationservice.exception.InsuranceAlreadyExists;
import com.stackroute.recommendationservice.model.Insurance;
import com.stackroute.recommendationservice.model.InsuranceProfile;
import com.stackroute.recommendationservice.service.Recommendation_service;
import lombok.extern.java.Log;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Slf4j
@RequestMapping("/Recommendation")
public class Recommendation_Controller {
    private Recommendation_service recommendation_service;

    @Autowired
    public Recommendation_Controller(Recommendation_service recommendation_service) {
        log.debug("Recommendation_service");
        this.recommendation_service = recommendation_service;
    }

    @PostMapping("/Insurance")
    public ResponseEntity<?> registerInsurance(@RequestBody InsuranceProfile insuranceProfile) {
        try {
            recommendation_service.addAge(insuranceProfile.getAge());
            recommendation_service.addInsuranceType(insuranceProfile.getInsuranceType());
            recommendation_service.addOccupation(insuranceProfile.getOccupation());
//            recommendation_service.addVehicle(insuranceProfile.getVehicle());
            Insurance insurance = recommendation_service.addInsurance(insuranceProfile);
            if(insurance != null){
                return new ResponseEntity<>("Insurance Added",HttpStatus.CREATED);
            }else{
                return new ResponseEntity<>("Insurance Not added",HttpStatus.OK);
            }
        }catch (InsuranceAlreadyExists e){
            log.error("Insurance Already Exists");
            e.printStackTrace();
            return new ResponseEntity<>("Insurance Already Exists", HttpStatus.CONFLICT);
        }
    }

    @GetMapping("{age}/InsuranceByAge")
    public ResponseEntity<?> getInsuranceByAge(@PathVariable int age){
        List<Insurance> insurances = recommendation_service.getAllInsuranceOnBasisOfAge(age);
        if(insurances.size() ==0){
            return new ResponseEntity<>("No Insurance Found",HttpStatus.NOT_FOUND);
        }else {
            log.error("Insurance Already Exists");
            return new ResponseEntity<>(insurances,HttpStatus.FOUND);
        }
    }
    @GetMapping("{occupation}/InsuranceByOccupation")
    public ResponseEntity<?> getInsuranceByOccupation(@PathVariable String occupation){
        List<Insurance> insurances = recommendation_service.getAllInsuranceOnBasisOfOccupation(occupation);
        if(insurances.size() ==0){
            return new ResponseEntity<>("No Insurance Found",HttpStatus.NOT_FOUND);
        }else {
            log.error("Insurance Already Exists");
            return new ResponseEntity<>(insurances,HttpStatus.FOUND);
        }

    }
    @GetMapping("{insuranceType}/InsuranceByType")
    public ResponseEntity<?> getInsuranceByType(@PathVariable String insuranceType){
        List<Insurance> insurances = recommendation_service.getAllInsuranceOnBasisOfType(insuranceType);
        if(insurances.size() ==0){
            return new ResponseEntity<>("No Insurance Found",HttpStatus.NOT_FOUND);
        }else {
            return new ResponseEntity<>(insurances,HttpStatus.FOUND);
        }
    }
}
