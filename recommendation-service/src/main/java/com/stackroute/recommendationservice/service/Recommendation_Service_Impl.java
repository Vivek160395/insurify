package com.stackroute.recommendationservice.service;
import com.stackroute.recommendationservice.exception.InsuranceAlreadyExists;
import com.stackroute.recommendationservice.exception.UserAlreadyPosted;
import com.stackroute.recommendationservice.model.*;
import com.stackroute.recommendationservice.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class Recommendation_Service_Impl implements Recommendation_service{
    private final Age_Repository age_repository;
    private final Insurance_Repository insurance_repository;
    private final Insurance_Type_Repository insurance_type_repository;
    private final Occupation_Repository occupation_repository;
    private final UserRepository userRepository;
//    private final Vehicle_Repository vehicle_repository;
    @Autowired
    public Recommendation_Service_Impl(Age_Repository age_repository, Insurance_Repository insurance_repository, Insurance_Type_Repository insurance_type_repository, Occupation_Repository occupation_repository,UserRepository userRepository) {
        this.age_repository = age_repository;
        this.insurance_repository = insurance_repository;
        this.insurance_type_repository = insurance_type_repository;
        this.occupation_repository = occupation_repository;
        this.userRepository = userRepository;
//        this.vehicle_repository =vehicle_repository;
    }

    @Override
    public Insurance addInsurance(InsuranceProfile insurance) throws InsuranceAlreadyExists {
        Insurance insurance2 = new Insurance();
        Optional<Insurance> insurance1 = insurance_repository.findById(insurance.getInsuranceId());
        if(insurance1.isPresent()){
            throw new InsuranceAlreadyExists();
        }
        else {
            insurance2.setInsuranceId(insurance.getInsuranceId());
            insurance2.setInsuranceName(insurance.getInsuranceName());
            insurance_repository.save(insurance2);
            createAgeRelation(insurance.getInsuranceId(),insurance.getAge());
            createInsuranceTypeRelation(insurance.getInsuranceId(),insurance.getInsuranceType());
            createOccupationRelation(insurance.getInsuranceId(),insurance.getOccupation());
//            createVehicleRelation(insurance.getInsuranceId(),insurance.getVehicle());
            return insurance2;
        }
    }

    @Override
    public void addAge(int age) {
        if(age_repository.findById(age).isEmpty()){
            age_repository.save(new Age(age));
        }
    }

    @Override
    public void addInsuranceType(String insurance_Type){
        if(insurance_type_repository.findById(insurance_Type).isEmpty()){
            insurance_type_repository.save(new InsuranceType(insurance_Type));
        }
    }

    @Override
    public void addOccupation(String occupation) {
        if(occupation_repository.findById(occupation).isEmpty()){
            occupation_repository.save(new Occupation(occupation));
        }
    }

    @Override
    public User addUser(String userEmail) throws UserAlreadyPosted {
        if(userRepository.findById(userEmail).isEmpty()){
          return userRepository.save(new User(userEmail));
        }else {
            throw new UserAlreadyPosted();
        }
    }

//    @Override
//    public void addVehicle(String vehicle) {
//        if(vehicle_repository.findById(vehicle).isEmpty()){
//            vehicle_repository.save(new Vehicle(vehicle));
//        }
//    }

    @Override
    public void createInsuranceTypeRelation(int insuranceId, String insuranceType) {
        if(!insurance_repository.checkInsuranceTypeRelationship(insuranceId,insuranceType)){
            insurance_repository.createInsuranceTypeRelation(insuranceId,insuranceType);
        }
    }

    @Override
    public void createAgeRelation(int insuranceId, int age) {
        if(!insurance_repository.checkAgeRelationship(insuranceId,age)){
            insurance_repository.createAgeRelation(insuranceId,age);
        }
    }

    @Override
    public void createOccupationRelation(int insuranceId, String occupationName) {
        if(!insurance_repository.checkOccupationRelation(insuranceId,occupationName)){
            insurance_repository.createOccupationRelation(insuranceId,occupationName);
        }
    }

    @Override
    public boolean createUserToInsuranceRelation(int insuranceId, String userEmail) {
        if(!insurance_repository.checkUserToInsuranceRelationship(insuranceId,userEmail)){
            insurance_repository.createUserToInsuranceRelationship(insuranceId,userEmail);
            return true;
        }return false;
    }

//    @Override
//    public void createVehicleRelation(int insuranceId, String vehicleType) {
//        if(!insurance_repository.checkVehicleRelationship(insuranceId,vehicleType)){
//            insurance_repository.createVehicleRelation(insuranceId,vehicleType);
//        }
//    }

    @Override
    public List<Insurance> getAllInsuranceOnBasisOfAge(int age) {
         List<Insurance> insurances = insurance_repository.getAllInsurancesMatchingWithAge(age);
        return insurances;
    }

    @Override
    public List<Insurance> getAllInsuranceOnBasisOfOccupation(String occupationName) {
        List<Insurance> insurances = insurance_repository.getAllInsurancesMatchingWithOccupation(occupationName);
        return insurances;
    }

    @Override
    public List<Insurance> getAllInsuranceOnBasisOfType(String insuranceType) {
        List<Insurance> insurances = insurance_repository.getAllInsurancesMatchingWithInsuranceType(insuranceType);
        return insurances;
    }

    @Override
    public List<Insurance> getAllInsurance() {
        return insurance_repository.getAllInsurances();
    }

//    @Override
//    public List<Insurance> getAllInsuranceOnBasisOfVehicle(String vehicle) {
//        List<Insurance> insurances = insurance_repository.getAllInsurancesMatchingWithVehicle(vehicle);
//        return insurances;
//    }
}
