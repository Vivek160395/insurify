package com.stackroute.recommendationservice.service;
import com.stackroute.recommendationservice.exception.InsuranceAlreadyExists;
import com.stackroute.recommendationservice.exception.UserAlreadyPosted;
import com.stackroute.recommendationservice.model.Insurance;
import com.stackroute.recommendationservice.model.InsuranceProfile;
import com.stackroute.recommendationservice.model.User;

import java.util.List;

public interface Recommendation_service {
    Insurance addInsurance(InsuranceProfile insurance) throws InsuranceAlreadyExists;
    void addAge(int age);
    void addInsuranceType(String insurance_Type);
    void addOccupation(String occupation);
    User addUser(User user) throws UserAlreadyPosted;
//    void addVehicle(String vehicle);
    void createInsuranceTypeRelation(int insuranceId,String insuranceType);
    void createAgeRelation(int insuranceId,int age);
    void createOccupationRelation(int insuranceId,String occupationName);
    boolean createUserToInsuranceRelation(int insuranceId,String occupationName);
//    void createVehicleRelation(int insuranceId,String vehicleType);
    List<Insurance> getAllInsuranceOnBasisOfAge(int age);
    List<Insurance> getAllInsuranceOnBasisOfOccupation(String occupationName);
    List<Insurance> getAllInsuranceOnBasisOfType(String insuranceType);
//    List<Insurance> getAllInsuranceOnBasisOfVehicle(String vehicleType);
    List<Insurance> getAllInsurance();
    List<Insurance> getAllInsurancesWhichAreTrending();
}
