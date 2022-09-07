package com.stackroute.recommendationservice.controller;

import com.stackroute.recommendationservice.exception.AgeAlreadyThere;
import com.stackroute.recommendationservice.exception.InsuranceAlreadyExists;
import com.stackroute.recommendationservice.exception.UserAlreadyPosted;
import com.stackroute.recommendationservice.model.Insurance;
import com.stackroute.recommendationservice.model.InsuranceProfile;
import com.stackroute.recommendationservice.model.User;
import com.stackroute.recommendationservice.service.Recommendation_service;
import lombok.extern.java.Log;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

// you need to add the method for suggesting on the basis of the no of insurances bought

@RestController
@Slf4j
@RequestMapping("/Recommendation")
public class Recommendation_Controller {
    private final Recommendation_service recommendation_service;

    @Autowired
    public Recommendation_Controller(Recommendation_service recommendation_service) {
        log.debug("Recommendation_service");
        this.recommendation_service = recommendation_service;
    }

    @PostMapping("/user")
    public ResponseEntity<?> registerUser(@RequestBody User user){
        try {
            User user1 = recommendation_service.addUser(user);
            if(user1 !=null){
                return new ResponseEntity<>("User Registered",HttpStatus.CREATED);
            }else {
                return new ResponseEntity<>("User Not Registered",HttpStatus.CREATED);
            }
        }
        catch (UserAlreadyPosted e){
            log.error("User Already Exists");
//            e.printStackTrace();
            return new ResponseEntity<>("User Already Exists",HttpStatus.CONFLICT);
        }
    }
    @PostMapping("/Insurance")
    public ResponseEntity<?> registerInsurance(@RequestBody InsuranceProfile insuranceProfile) {
        try {
            recommendation_service.addAge(insuranceProfile.getAge());
            recommendation_service.addInsuranceType(insuranceProfile.getInsuranceType());
            recommendation_service.addOccupation(insuranceProfile.getOccupation());
            Insurance insurance = recommendation_service.addInsurance(insuranceProfile);
            if(insurance != null){
                return new ResponseEntity<>("Insurance Added",HttpStatus.CREATED);
            }else{
                return new ResponseEntity<>("Insurance Not added",HttpStatus.OK);
            }
        }catch (InsuranceAlreadyExists e){
            log.error("Insurance Already Exists");
//            e.printStackTrace();
            return new ResponseEntity<>("Insurance Already Exists", HttpStatus.CONFLICT);
        }
    }

    @GetMapping("{age}/InsuranceByAge")
    public ResponseEntity<?> getInsuranceByAge(@PathVariable int age){
        List<Insurance> insurances = recommendation_service.getAllInsuranceOnBasisOfAge(age);
        if(insurances.size() == 0){
            return new ResponseEntity<>("No Insurance Found",HttpStatus.NOT_FOUND);
        }else {
            log.error("No Insurance Found");
            return new ResponseEntity<>(insurances,HttpStatus.FOUND);
        }
    }
    @GetMapping("{occupation}/InsuranceByOccupation")
    public ResponseEntity<?> getInsuranceByOccupation(@PathVariable String occupation){
        List<Insurance> insurances = recommendation_service.getAllInsuranceOnBasisOfOccupation(occupation);
        if(insurances.size() == 0){
            log.error("No Insurance Found");
            return new ResponseEntity<>("No Insurance Found",HttpStatus.NOT_FOUND);
        }else {
            return new ResponseEntity<>(insurances,HttpStatus.FOUND);
        }

    }

    @GetMapping("{insuranceType}/InsuranceByType")
    public ResponseEntity<?> getInsuranceByType(@PathVariable String insuranceType){
        List<Insurance> insurances = recommendation_service.getAllInsuranceOnBasisOfType(insuranceType);
        if(insurances.size() == 0){
            log.error("No Insurance Found");
            return new ResponseEntity<>("No Insurance Found",HttpStatus.NOT_FOUND);
        }else {
            return new ResponseEntity<>(insurances,HttpStatus.FOUND);
        }
    }

    @GetMapping("/Insurances")
    public ResponseEntity<?> getAllInsurances(){
        List<Insurance> insurances = recommendation_service.getAllInsurance();
        if(insurances.size() == 0){
            log.error("No Insurance Found");
            return new ResponseEntity<>("No Insurance Found",HttpStatus.NOT_FOUND);
        }else {
            return new ResponseEntity<>(insurances,HttpStatus.FOUND);
        }
    }

    @PostMapping("{userEmail}/{insuranceId}/buyInsurance")
    public ResponseEntity<?> userBuyInsurance(@PathVariable int insuranceId,@PathVariable String userEmail){
        if(recommendation_service.createUserToInsuranceRelation(insuranceId,userEmail)){
            return new ResponseEntity<>("Insurance Bought Successfully",HttpStatus.CREATED);
        }else {
            log.error("Insurance Already Bought");
            return new ResponseEntity<>("Insurance Already Bought",HttpStatus.CREATED);
        }
    }
    @GetMapping("/NoOfUsersBoughtInsurances")
    public ResponseEntity<?> getNoOfInsurancesBought(){
        List<Insurance> insurances = recommendation_service.getAllInsurance();
        if(insurances.size() == 0){
            log.error("No Insurance Found");
            return new ResponseEntity<>("No Insurance Found",HttpStatus.NOT_FOUND);
        }else {
            List<Integer> totalUsersOfEveryInsurance = new ArrayList<>();
            for(int i=0;i<insurances.size();i++){
                totalUsersOfEveryInsurance.add(insurances.get(i).getNoOfUsersBought());
            }
            return new ResponseEntity<>(totalUsersOfEveryInsurance,HttpStatus.FOUND);
        }
    }
}
