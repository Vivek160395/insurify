package com.stackroute.recommendationservice.service;
import com.stackroute.recommendationservice.exception.InsuranceAlreadyExists;
import com.stackroute.recommendationservice.model.*;
import com.stackroute.recommendationservice.repository.Age_Repository;
import com.stackroute.recommendationservice.repository.Insurance_Repository;
import com.stackroute.recommendationservice.repository.Insurance_Type_Repository;
import com.stackroute.recommendationservice.repository.Occupation_Repository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class Recommendation_Service_Impl implements Recommendation_service{
    private Age_Repository age_repository;
    private Insurance_Repository insurance_repository;
    private Insurance_Type_Repository insurance_type_repository;
    private Occupation_Repository occupation_repository;

    @Autowired
    public Recommendation_Service_Impl(Age_Repository age_repository, Insurance_Repository insurance_repository, Insurance_Type_Repository insurance_type_repository, Occupation_Repository occupation_repository) {
        this.age_repository = age_repository;
        this.insurance_repository = insurance_repository;
        this.insurance_type_repository = insurance_type_repository;
        this.occupation_repository = occupation_repository;
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
            insurance_repository.createAgeRelation(insurance.getInsuranceId(),insurance.getAge());
            insurance_repository.createInsuranceTypeRelation(insurance.getInsuranceId(),insurance.getInsuranceType());
            insurance_repository.createOccupationRelation(insurance.getInsuranceId(),insurance.getOccupation());
            return insurance_repository.save(insurance2);
        }
    }

    @Override
    public void addAge(Integer age) {
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
}
