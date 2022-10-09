package com.stackroute.recommendationservice.service;

import com.stackroute.recommendationservice.exception.InsuranceAlreadyExists;
import com.stackroute.recommendationservice.exception.NoInsurancesFound;
import com.stackroute.recommendationservice.exception.UserAlreadyPosted;
import com.stackroute.recommendationservice.model.*;
import com.stackroute.recommendationservice.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
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
    public Insurance addInsurance(InsuranceProfile insurance) throws InsuranceAlreadyExists {
        Optional<Insurance> insurance2 = insurance_repository.findById(insurance.getPolicyId());
        Insurance insurance1 = new Insurance();
        InsuranceType insuranceType = new InsuranceType();
        insurance1.setPolicyId(insurance.getPolicyId());
        insurance1.setPolicyName(insurance.getPolicyName());
        insuranceType.setInsuranceType(insurance.getInsuranceType());
        insurance1.setPicType(insurance.getPicType());
        insurance1.setPicByte(insurance.getPicByte());
        insurance1.setDescription(insurance.getPolicyDescription());
        insurance1.setNoOfUsersBought(0);
        if (insurance2.isEmpty()) {
            insurance_type_repository.save(insuranceType);
            insurance_repository.save(insurance1);
            System.out.println(insurance1.getPolicyId());
            System.out.println(insuranceType.getInsuranceType());
            createInsuranceTypeRelation(insurance1.getPolicyId(), insuranceType.getInsuranceType());
            return insurance1;
        } else {
            throw new InsuranceAlreadyExists();
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

    @Override
    public boolean addInsuranceImage(String policyId, MultipartFile file) throws NoInsurancesFound, IOException {
        Insurance insurance = insurance_repository.findById(policyId).get();
        System.out.println(insurance.getPolicyId());
        insurance.setPicByte(file.getBytes());
        insurance.setPicType(file.getContentType());
        Insurance insurance2 = insurance_repository.save(insurance);
        if (insurance2.getPolicyId().equals(insurance.getPolicyId())) {
            return true;
        } else {
            return false;
        }
    }

    @Override
    public Insurance editInsurance(InsuranceProfile insuranceProfile) {
        Insurance insurance1 = insurance_repository.findById(insuranceProfile.getPolicyId()).get();
        if (insurance1 != null) {
            insurance_repository.save(insurance1);
        }
        return null;
    }
}
