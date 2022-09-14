package com.stackroute.recommendationservice.service;
import com.stackroute.recommendationservice.exception.InsuranceAlreadyExists;
import com.stackroute.recommendationservice.exception.NoInsurancesFound;
import com.stackroute.recommendationservice.exception.UserAlreadyPosted;
import com.stackroute.recommendationservice.model.Insurance;
import com.stackroute.recommendationservice.model.InsuranceProfile;
import com.stackroute.recommendationservice.model.User;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface Recommendation_service {
    Insurance addInsurance(InsuranceProfile insurance) throws InsuranceAlreadyExists;
//    void addAge(int age);
    void addInsuranceType(String insurance_Type);
//    void addOccupation(String occupation);
    User addUser(User user) throws UserAlreadyPosted;
//    void addVehicle(String vehicle);
    boolean createInsuranceTypeRelation(int insuranceId,String insuranceType);
//    boolean createAgeRelation(int insuranceId,int age);
//    boolean createOccupationRelation(int insuranceId,String occupationName);
    boolean createUserToInsuranceRelation(int insuranceId,String occupationName);
//    void createVehicleRelation(int insuranceId,String vehicleType);
//    List<Insurance> getAllInsuranceOnBasisOfAge(int age) throws NoInsurancesFound;
//    List<Insurance> getAllInsuranceOnBasisOfOccupation(String occupationName)throws NoInsurancesFound;
    List<Insurance> getAllInsuranceOnBasisOfType(String insuranceType)throws NoInsurancesFound;
//    List<Insurance> getAllInsuranceOnBasisOfVehicle(String vehicleType);
    List<Insurance> getAllInsurance()throws NoInsurancesFound;
    List<Insurance> getAllInsurancesWhichAreTrending()throws NoInsurancesFound;
}
