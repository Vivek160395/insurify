package com.stackroute.recommendationservice.service;

import com.stackroute.recommendationservice.exception.InsuranceAlreadyExists;
import com.stackroute.recommendationservice.exception.NoInsurancesFound;
import com.stackroute.recommendationservice.exception.UserAlreadyPosted;
import com.stackroute.recommendationservice.model.*;
import com.stackroute.recommendationservice.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class Recommendation_Service_Impl implements Recommendation_service {
    private final Insurance_Repository insurance_repository;
    private final Insurance_Type_Repository insurance_type_repository;
    private final UserRepository userRepository;

    // private final Vehicle_Repository vehicle_repository;
    @Autowired
    public Recommendation_Service_Impl(Insurance_Repository insurance_repository,
            Insurance_Type_Repository insurance_type_repository,
            UserRepository userRepository) {
        this.insurance_repository = insurance_repository;
        this.insurance_type_repository = insurance_type_repository;
        this.userRepository = userRepository;
        // this.vehicle_repository =vehicle_repository;
    }

    @Override
    public Insurance addInsurance(InsuranceProfile insuranceProfile) throws InsuranceAlreadyExists {
        Insurance insurance2 = new Insurance();
        Optional<Insurance> insurance1 = insurance_repository.findById(insuranceProfile.getInsuranceId());
        if (insurance1.isPresent()) {
            throw new InsuranceAlreadyExists();
        } else {
            insurance2.setInsuranceId(insuranceProfile.getInsuranceId());
            insurance2.setInsuranceName(insuranceProfile.getInsuranceName());
            insurance2.setDescription(insuranceProfile.getDescription());
            insurance2.setNoOfUsersBought(0);
            insurance2.setImageType(insuranceProfile.getTypeOfImage());
            insurance2.setImageOfInsurance(insuranceProfile.getImageOfInsurance());
            insurance_repository.save(insurance2);
            // createAgeRelation(insuranceProfile.getInsuranceId(),insuranceProfile.getAge());
            createInsuranceTypeRelation(insuranceProfile.getInsuranceId(), insuranceProfile.getInsuranceType());
            // createOccupationRelation(insuranceProfile.getInsuranceId(),insuranceProfile.getOccupation());
            return insurance2;
        }
    }

    // @Override
    // public void addAge(int age) {
    // if(age_repository.findById(age).isEmpty()){
    // age_repository.save(new Age(age));
    // }
    // }

    @Override
    public void addInsuranceType(String insurance_Type) {
        if (insurance_type_repository.findById(insurance_Type).isEmpty()) {
            insurance_type_repository.save(new InsuranceType(insurance_Type));
        }
    }

    // @Override
    // public void addOccupation(String occupation) {
    // if(occupation_repository.findById(occupation).isEmpty()){
    // occupation_repository.save(new Occupation(occupation));
    // }
    // }

    @Override
    public User addUser(User user) throws UserAlreadyPosted {
        if (userRepository.findById(user.getUserEmail()).isEmpty()) {
            return userRepository.save(user);
        } else {
            throw new UserAlreadyPosted();
        }
    }

    // @Override
    // public void addVehicle(String vehicle) {
    // if(vehicle_repository.findById(vehicle).isEmpty()){
    // vehicle_repository.save(new Vehicle(vehicle));
    // }
    // }

    @Override
    public boolean createInsuranceTypeRelation(String insuranceId, String insuranceType) {
        if (!insurance_repository.checkInsuranceTypeRelationship(insuranceId, insuranceType)) {
            insurance_repository.createInsuranceTypeRelation(insuranceId, insuranceType);
            return true;
        } else
            return false;
    }

    // @Override
    // public boolean createAgeRelation(String insuranceId, int age) {
    // if(!insurance_repository.checkAgeRelationship(insuranceId,age)){
    // insurance_repository.createAgeRelation(insuranceId,age);
    // return true;
    // }else return false;
    // }

    // @Override
    // public boolean createOccupationRelation(String insuranceId, String
    // occupationName) {
    // if(!insurance_repository.checkOccupationRelation(insuranceId,occupationName)){
    // insurance_repository.createOccupationRelation(insuranceId,occupationName);
    // return true;
    // }return false;
    // }

    @Override
    public boolean createUserToInsuranceRelation(String insuranceId, String userEmail) {
        System.out.println(insurance_repository.checkUserToInsuranceRelationship(insuranceId, userEmail));
        if (!insurance_repository.checkUserToInsuranceRelationship(insuranceId, userEmail)) {
            insurance_repository.createUserToInsuranceRelationship(insuranceId, userEmail);
            Insurance insurance = insurance_repository.findById(insuranceId).get();
            insurance.setNoOfUsersBought(insurance.getNoOfUsersBought() + 1);
            insurance_repository.save(insurance);
            return true;
        }
        return false;
    }

    // @Override
    // public void createVehicleRelation(String insuranceId, String vehicleType) {
    // if(!insurance_repository.checkVehicleRelationship(insuranceId,vehicleType)){
    // insurance_repository.createVehicleRelation(insuranceId,vehicleType);
    // }
    // }

    // @Override
    // public List<Insurance> getAllInsuranceOnBasisOfAge(int age) throws
    // NoInsurancesFound {
    // List<Insurance> insurances =
    // insurance_repository.getAllInsurancesMatchingWithAge(age);
    // if(insurances.size() ==0){
    // throw new NoInsurancesFound();
    // }else return insurances;
    // }

    // @Override
    // public List<Insurance> getAllInsuranceOnBasisOfOccupation(String
    // occupationName)throws NoInsurancesFound {
    // List<Insurance> insurances =
    // insurance_repository.getAllInsurancesMatchingWithOccupation(occupationName);
    // if(insurances.size() ==0){
    // throw new NoInsurancesFound();
    // }else return insurances;
    // }

    @Override
    public List<Insurance> getAllInsuranceOnBasisOfType(String insuranceType) throws NoInsurancesFound {
        List<Insurance> insurances = insurance_repository.getAllInsurancesMatchingWithInsuranceType(insuranceType);
        if (insurances.size() == 0) {
            throw new NoInsurancesFound();
        } else
            return insurances;
    }

    @Override
    public List<Insurance> getAllInsurance() throws NoInsurancesFound {
        List<Insurance> insurances = insurance_repository.getAllInsurances();
        if (insurances.size() == 0) {
            throw new NoInsurancesFound();
        } else
            return insurances;
    }

    @Override
    public List<Insurance> getAllInsurancesWhichAreTrending() throws NoInsurancesFound {
        List<Insurance> insurances = insurance_repository.getAllInsurancesWhichAreTrending();
        if (insurances.size() == 0) {
            throw new NoInsurancesFound();
        } else
            return insurances;
    }
}
