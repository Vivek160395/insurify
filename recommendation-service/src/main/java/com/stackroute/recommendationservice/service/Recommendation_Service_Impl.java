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
    public Insurance addInsurance(Insurance insurance) throws InsuranceAlreadyExists {
        Insurance insurance2 = new Insurance();
        Optional<Insurance> insurance1 = insurance_repository.findById(insurance.getPolicyId());
        if (insurance1.isPresent()) {
            throw new InsuranceAlreadyExists();
        } else {
            return insurance_repository.save(insurance);
            // insurance2.setInsuranceId(insuranceProfile.getInsuranceId());
            // insurance2.setInsuranceName(insuranceProfile.getInsuranceName());
            // insurance2.setDescription(insuranceProfile.getDescription());
            // insurance2.setNoOfUsersBought(0);
            // insurance2.setImageType(insuranceProfile.getTypeOfImage());
            // insurance2.setImageOfInsurance(insuranceProfile.getImageOfInsurance());
            // insurance_repository.save(insurance2);
            // //
            // createAgeRelation(insuranceProfile.getInsuranceId(),insuranceProfile.getAge());
            // createInsuranceTypeRelation(insuranceProfile.getInsuranceId(),
            // insuranceProfile.getInsuranceType());
            // //
            // createOccupationRelation(insuranceProfile.getInsuranceId(),insuranceProfile.getOccupation());
            // return insurance2;
        }
    }

    // @Override
    // public void addAge(int age) {
    // if(age_repository.findById(age).isEmpty()){
    // age_repository.save(new Age(age));
    // }
    // }

    @Override
    public void addInsuranceType(String insuranceType) {
        if (insurance_type_repository.findById(insuranceType).isEmpty()) {
            insurance_type_repository.save(new InsuranceType(insuranceType));
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
    public boolean createInsuranceTypeRelation(String policyId, String insuranceType) {
        if (!insurance_repository.checkInsuranceTypeRelationship(policyId, insuranceType)) {
            insurance_repository.createInsuranceTypeRelation(policyId, insuranceType);
            return true;
        } else
            return false;
    }

    // @Override
    // public boolean createAgeRelation(String policyId, int age) {
    // if(!insurance_repository.checkAgeRelationship(policyId,age)){
    // insurance_repository.createAgeRelation(policyId,age);
    // return true;
    // }else return false;
    // }

    // @Override
    // public boolean createOccupationRelation(String policyId, String
    // occupationName) {
    // if(!insurance_repository.checkOccupationRelation(policyId,occupationName)){
    // insurance_repository.createOccupationRelation(policyId,occupationName);
    // return true;
    // }return false;
    // }

    @Override
    public boolean createUserToInsuranceRelation(String policyId, String userEmail) {
        System.out.println(insurance_repository.checkUserToInsuranceRelationship(policyId, userEmail));
        if (!insurance_repository.checkUserToInsuranceRelationship(policyId, userEmail)) {
            insurance_repository.createUserToInsuranceRelationship(policyId, userEmail);
            Insurance insurance = insurance_repository.findById(policyId).get();
            insurance.setNoOfUsersBought(insurance.getNoOfUsersBought() + 1);
            insurance_repository.save(insurance);
            return true;
        }
        return false;
    }

    // @Override
    // public void createVehicleRelation(String policyId, String vehicleType) {
    // if(!insurance_repository.checkVehicleRelationship(policyId,vehicleType)){
    // insurance_repository.createVehicleRelation(policyId,vehicleType);
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
