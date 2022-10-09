package com.stackroute.insuranceservice.service;

import com.stackroute.insuranceservice.config.Producer;
import com.stackroute.insuranceservice.exceptions.PolicyAlreadyExistException;
import com.stackroute.insuranceservice.exceptions.PolicyNotFoundException;
import com.stackroute.insuranceservice.model.Insurance;
import com.stackroute.insuranceservice.repository.InsuranceRepo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.io.IOException;
import java.util.Optional;

@Service
public class InsuranceServiceImpl implements InsuranceService {

    InsuranceRepo insuranceRepo;

    @Autowired
    Producer producer;

    @Autowired
    public InsuranceServiceImpl(InsuranceRepo insuranceRepo) {
        this.insuranceRepo = insuranceRepo;
    }

    @Override
    public Insurance saveInsurance(Insurance insurance)
            throws PolicyAlreadyExistException, IOException {
        if (insuranceRepo.findById(insurance.getPolicyId()).isPresent()) {
            throw new PolicyAlreadyExistException();
        } else {
            return insuranceRepo.save(insurance);
        }
    }

    @Override
    public Iterable<Insurance> findAllInsurance() {
        return insuranceRepo.findAll();
    }

    @Override
    public Iterable<Insurance> findAllPolicyByEmail(String userEmail) {
        return insuranceRepo.findPolicyByUserEmail(userEmail);
    }

    @Override
    public Optional<Insurance> getPolicyByPolicyId(String policyId) throws PolicyNotFoundException {
        if (insuranceRepo.findById(policyId).isPresent()) {
            return insuranceRepo.findById(policyId);
        } else {
            throw new PolicyNotFoundException();
        }
    }

    @Override
    public boolean deletePolicyByPolicyId(String policyId) throws PolicyNotFoundException {
        if (insuranceRepo.findById(policyId).isPresent()) {
            insuranceRepo.deleteById(policyId);
            return true;
        } else {
            throw new PolicyNotFoundException();
        }
    }

    @Override
    public Optional<Insurance> findPolicyByPolicyName(String policyName) {
        return insuranceRepo.findPolicyByPolicyName(policyName);
    }

    @Override
    public Insurance editInsurance(@RequestBody Insurance insurance)
    {
        if(!insuranceRepo.findById(insurance.getPolicyId()).isPresent())
        {
            return null;
        }
        Insurance insurancePolicyObj = insuranceRepo.findById(insurance.getPolicyId()).get();
        insurancePolicyObj.setPolicyDescription(insurance.getPolicyDescription());
        insurancePolicyObj.setPolicyDetails(insurance.getPolicyDetails());
        insurancePolicyObj.setPolicyBenefits(insurance.getPolicyBenefits());
        insurancePolicyObj.setAddOnDetails(insurance.getAddOnDetails());
        insurancePolicyObj.setPolicyDocuments(insurance.getPolicyDocuments());
        insurancePolicyObj.setUserEmail(insurance.getUserEmail());
        if (insurance.getInsuranceType().equalsIgnoreCase("AutoMobileInsurance")) {
            insurancePolicyObj.setCategory(insurance.getCategory());
            insurancePolicyObj.setModelsAllowed(insurance.getModelsAllowed());
        } else {
            insurancePolicyObj.setCategory(null);
            insurancePolicyObj.setModelsAllowed(null);
        }
<<<<<<< HEAD
<<<<<<< HEAD
        // insuranceRepo.save(insurance);
=======
//        insuranceRepo.save(insurance);
>>>>>>> 0e564c3d9f7d0f2ebfc13cd801be91711926476b
=======
//        insuranceRepo.save(insurance);
>>>>>>> 0e564c3d9f7d0f2ebfc13cd801be91711926476b
        return insuranceRepo.save(insurancePolicyObj);
    }
}
