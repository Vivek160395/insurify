package com.stackroute.policyadvisorservice.service;

import com.stackroute.policyadvisorservice.exception.PolicyAdvisorAlreadyExists;
import com.stackroute.policyadvisorservice.exception.PolicyAdvisorNotRegisteredException;
import com.stackroute.policyadvisorservice.model.PolicyAdvisor;
import com.stackroute.policyadvisorservice.model.Rating;
import com.stackroute.policyadvisorservice.repository.PolicyAdvisorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

@Service
public class PolicyAdvisorServiceImpl implements PolicyAdvisorService{


    private PolicyAdvisorRepository policyAdvisorRepository;

    public PolicyAdvisorServiceImpl(PolicyAdvisorRepository policyAdvisorRepository) {
        this.policyAdvisorRepository = policyAdvisorRepository;
    }

    @Override
    public PolicyAdvisor registerPolicyAdvisor(PolicyAdvisor policyAdvisor) throws PolicyAdvisorAlreadyExists {

        if (policyAdvisorRepository.findById(policyAdvisor.getEmailId()).isPresent()) {
            throw new PolicyAdvisorAlreadyExists();
        } else {
            policyAdvisorRepository.save(policyAdvisor);
            return policyAdvisor;
        }
    }

    @Override
    public List<PolicyAdvisor> findAllPolicyAdvisors(){

        return policyAdvisorRepository.findAll();
    }

    @Override
    public PolicyAdvisor changePassword(PolicyAdvisor policyAdvisor, String emailId) throws PolicyAdvisorNotRegisteredException {
        return null;
    }


    @Override
    public PolicyAdvisor updatePolicyAdvisor(PolicyAdvisor policyAdvisor, String emailId) throws PolicyAdvisorNotRegisteredException {

        if (policyAdvisorRepository.findById(emailId).isPresent()) {
            PolicyAdvisor policyAdvisor1 = policyAdvisorRepository.findById(emailId).get();

            policyAdvisor1.setName(policyAdvisor1.getName());
            policyAdvisor1.setGender(policyAdvisor1.getGender());
            policyAdvisor1.setDateOfBirth(policyAdvisor1.getDateOfBirth());
            policyAdvisor1.setPhoneNumber(policyAdvisor1.getPhoneNumber());
            policyAdvisor1.setAadharNo(policyAdvisor.getAadharNo());
            policyAdvisor1.setPanNo(policyAdvisor1.getPanNo());
            // policyAdvisor1.setProfilePic(file);
            policyAdvisor1.setCategory(policyAdvisor1.getCategory());
            policyAdvisor1.setYearsOfExperience(policyAdvisor1.getYearsOfExperience());

            policyAdvisorRepository.save(policyAdvisor1);
            return policyAdvisor1;
        }
        else{
            throw new PolicyAdvisorNotRegisteredException();
        }
    }

    @Override
    public boolean deletePolicyAdvisor(String emailId) throws PolicyAdvisorNotRegisteredException {
           if( policyAdvisorRepository.findById(emailId).isPresent()) {
               policyAdvisorRepository.deleteById(emailId);
               return true;
           }
           else
               throw new PolicyAdvisorNotRegisteredException();
    }

    @Override
    public float calculateRating(Rating rating) {
        float average;
        return 0;
    }


    @Override
    public Optional<PolicyAdvisor> getPolicyAdvisorByName(String name) {
        return policyAdvisorRepository.findById(name);
    }

}
