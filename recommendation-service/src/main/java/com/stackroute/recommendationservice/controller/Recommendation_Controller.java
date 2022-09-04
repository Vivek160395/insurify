package com.stackroute.recommendationservice.controller;

import com.stackroute.recommendationservice.exception.AgeAlreadyThere;
import com.stackroute.recommendationservice.exception.InsuranceAlreadyExists;
import com.stackroute.recommendationservice.model.Insurance;
import com.stackroute.recommendationservice.model.InsuranceProfile;
import com.stackroute.recommendationservice.service.Recommendation_service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/Recommendation")
public class Recommendation_Controller {
    private Recommendation_service recommendation_service;

    @Autowired
    public Recommendation_Controller(Recommendation_service recommendation_service) {
        this.recommendation_service = recommendation_service;
    }

    @PostMapping("/Insurance")
    public ResponseEntity<?> RegisterInsurance(@RequestBody InsuranceProfile insuranceProfile) {
        try {
            recommendation_service.addAge(insuranceProfile.getAge());
            recommendation_service.addInsuranceType(insuranceProfile.getInsuranceType());
            recommendation_service.addOccupation(insuranceProfile.getOccupation());
            Insurance insurance = recommendation_service.addInsurance(insuranceProfile);
            if(insurance != null){
                return new ResponseEntity<>("Insurance Added",HttpStatus.CREATED);
            }else{
                return new ResponseEntity<>("Insurance Added",HttpStatus.OK);
            }
        }catch (InsuranceAlreadyExists e){
            return new ResponseEntity<>("Insurance Already Exists", HttpStatus.CONFLICT);
        }
    }

}
