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
        Optional<Insurance> insurance1 = insurance_repository.findById(insurance.getPolicyId());
        if (insurance1.isPresent()) {
            throw new InsuranceAlreadyExists();
        } else {
            return insurance_repository.save(insurance);
        }
    }

    @Override
    public void addInsuranceType(String insuranceType) {
        if (insurance_type_repository.findById(insuranceType).isEmpty()) {
            insurance_type_repository.save(new InsuranceType(insuranceType));
        }
    }

    @Override
    public User addUser(User user) throws UserAlreadyPosted {
        if (userRepository.findById(user.getUserEmail()).isEmpty()) {
            return userRepository.save(user);
        } else {
            throw new UserAlreadyPosted();
        }
    }

    @Override
    public boolean createInsuranceTypeRelation(String policyId, String insuranceType) {
        if (!insurance_repository.checkInsuranceTypeRelationship(policyId, insuranceType)) {
            insurance_repository.createInsuranceTypeRelation(policyId, insuranceType);
            return true;
        } else
            return false;
    }

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
