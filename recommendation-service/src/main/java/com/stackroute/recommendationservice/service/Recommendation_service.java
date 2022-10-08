package com.stackroute.recommendationservice.service;

import com.stackroute.recommendationservice.exception.InsuranceAlreadyExists;
import com.stackroute.recommendationservice.exception.NoInsurancesFound;
import com.stackroute.recommendationservice.exception.UserAlreadyPosted;
import com.stackroute.recommendationservice.model.Insurance;
import com.stackroute.recommendationservice.model.InsuranceProfile;
import com.stackroute.recommendationservice.model.User;

import java.io.IOException;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

public interface Recommendation_service {
    Insurance addInsurance(InsuranceProfile insurance) throws InsuranceAlreadyExists;

    // void addAge(int age);
    void addInsuranceType(String insuranceType);

    // void addOccupation(String occupation);
    User addUser(User user) throws UserAlreadyPosted;

    // void addVehicle(String vehicle);
    boolean createInsuranceTypeRelation(String policyId, String insuranceType);

    // boolean createAgeRelation(String policyId,int age);
    // boolean createOccupationRelation(String policyId,String occupationName);
    boolean createUserToInsuranceRelation(String policyId, String userEmail);

    // void createVehicleRelation(String policyId,String vehicleType);
    // List<Insurance> getAllInsuranceOnBasisOfAge(int age) throws
    // NoInsurancesFound;
    // List<Insurance> getAllInsuranceOnBasisOfOccupation(String
    // occupationName)throws NoInsurancesFound;
    List<Insurance> getAllInsuranceOnBasisOfType(String insuranceType) throws NoInsurancesFound;

    // List<Insurance> getAllInsuranceOnBasisOfVehicle(String vehicleType);
    List<Insurance> getAllInsurance() throws NoInsurancesFound;

    List<Insurance> getAllInsurancesWhichAreTrending() throws NoInsurancesFound;

    boolean addInsuranceImage(String policyId, MultipartFile file) throws NoInsurancesFound, IOException;
}
