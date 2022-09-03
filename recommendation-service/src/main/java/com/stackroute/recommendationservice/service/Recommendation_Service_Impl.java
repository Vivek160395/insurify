package com.stackroute.recommendationservice.service;

import com.stackroute.recommendationservice.exception.AgeAlreadyExists;
import com.stackroute.recommendationservice.exception.InsuranceAlreadyExists;
import com.stackroute.recommendationservice.exception.InsuranceTypeAlreadyExists;
import com.stackroute.recommendationservice.model.Age;
import com.stackroute.recommendationservice.model.Insurance;
import com.stackroute.recommendationservice.model.InsuranceProfile;
import com.stackroute.recommendationservice.model.InsuranceType;
import com.stackroute.recommendationservice.repository.Age_Repository;
import com.stackroute.recommendationservice.repository.Insurance_Repository;
import com.stackroute.recommendationservice.repository.Insurance_Type_Repository;
import com.stackroute.recommendationservice.repository.Occupation_Repository;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Optional;

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
        Optional<Insurance> insurance1 = insurance_repository.findById(insurance.getInsurance().getInsuranceId());
        if(insurance1.isPresent()){
            throw new InsuranceAlreadyExists();
        }
        else {
            return insurance_repository.save(insurance.getInsurance());
        }
    }

    @Override
    public void addAge(Integer age) throws AgeAlreadyExists {
        if(age_repository.findById(age).isPresent()){
            throw new AgeAlreadyExists();
        }
        else age_repository.save(new Age(age));
    }

    @Override
    public void addInsuranceType(String insurance_Type) throws InsuranceTypeAlreadyExists {
        if(insurance_type_repository.findById(insurance_Type).isPresent()){
            throw new InsuranceTypeAlreadyExists();
        }
        else insurance_type_repository.save(new InsuranceType(insurance_Type));
    }
}
