package com.stackroute.recommendationservice.service;

import com.stackroute.recommendationservice.exception.InsuranceAlreadyExists;
import com.stackroute.recommendationservice.exception.NoInsurancesFound;
import com.stackroute.recommendationservice.exception.UserAlreadyPosted;
import com.stackroute.recommendationservice.model.Insurance;
import com.stackroute.recommendationservice.model.InsuranceProfile;
import com.stackroute.recommendationservice.model.User;
import java.util.List;

public interface Recommendation_service {
    Insurance addInsurance(InsuranceProfile insurance) throws InsuranceAlreadyExists;

    // void addAge(int age);
    void addInsuranceType(String insurance_Type);

    // void addOccupation(String occupation);
    User addUser(User user) throws UserAlreadyPosted;

    // void addVehicle(String vehicle);
    boolean createInsuranceTypeRelation(String insuranceId, String insuranceType);

    // boolean createAgeRelation(String insuranceId,int age);
    // boolean createOccupationRelation(String insuranceId,String occupationName);
    boolean createUserToInsuranceRelation(String insuranceId, String occupationName);

    // void createVehicleRelation(String insuranceId,String vehicleType);
    // List<Insurance> getAllInsuranceOnBasisOfAge(int age) throws
    // NoInsurancesFound;
    // List<Insurance> getAllInsuranceOnBasisOfOccupation(String
    // occupationName)throws NoInsurancesFound;
    List<Insurance> getAllInsuranceOnBasisOfType(String insuranceType) throws NoInsurancesFound;

    // List<Insurance> getAllInsuranceOnBasisOfVehicle(String vehicleType);
    List<Insurance> getAllInsurance() throws NoInsurancesFound;

    List<Insurance> getAllInsurancesWhichAreTrending() throws NoInsurancesFound;
}
