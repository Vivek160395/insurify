package com.stackroute.recommendationservice.service;
import com.stackroute.recommendationservice.exception.InsuranceAlreadyExists;
import com.stackroute.recommendationservice.model.Age;
import com.stackroute.recommendationservice.model.Insurance;
import com.stackroute.recommendationservice.model.InsuranceProfile;

public interface Recommendation_service {
    Insurance addInsurance(InsuranceProfile insurance) throws InsuranceAlreadyExists;
    void addAge(Integer age);
    void addInsuranceType(String insurance_Type);
    void addOccupation(String occupation);
}
