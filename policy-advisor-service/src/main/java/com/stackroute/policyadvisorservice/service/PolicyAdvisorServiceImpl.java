package com.stackroute.policyadvisorservice.service;

import com.stackroute.policyadvisorservice.exception.PolicyAdvisorAlreadyExists;
import com.stackroute.policyadvisorservice.exception.PolicyAdvisorNotRegisteredException;
import com.stackroute.policyadvisorservice.model.PolicyAdvisor;
import com.stackroute.policyadvisorservice.model.Rating;
import com.stackroute.policyadvisorservice.rabbitMq.domain.DTO;
import com.stackroute.policyadvisorservice.repository.PolicyAdvisorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.util.ArrayList;
import java.util.List;

import java.io.IOException;
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

        DTO dto = new DTO();

        dto.setEmailId(dto.getEmailId());
        dto.setPassword(dto.getPassword());
        dto.setUserType(dto.getUserType());

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
        DTO dto = new DTO();
        dto.setPassword(dto.getPassword());

        if (policyAdvisorRepository.findById(emailId).isPresent()) {
            PolicyAdvisor policyAdvisor1 = policyAdvisorRepository.findById(emailId).get();
            policyAdvisor1.setPassword(policyAdvisor1.getPassword());
            return policyAdvisor1;
        } else {
            throw new PolicyAdvisorNotRegisteredException();
        }
    }


//

    @Override
    public PolicyAdvisor update(PolicyAdvisor policyAdvisor, String emailId, MultipartFile file)
            throws PolicyAdvisorNotRegisteredException, IOException {

        if (policyAdvisorRepository.findById(emailId).isPresent()) {
            PolicyAdvisor policyAdvisor1 = policyAdvisorRepository.findById(emailId).get();

            policyAdvisor1.setProfilePic(file.getBytes());
            policyAdvisorRepository.save(policyAdvisor1);
            return policyAdvisor1;
        } else {
            throw new PolicyAdvisorNotRegisteredException();
        }
    }

    @Override
    public PolicyAdvisor update(PolicyAdvisor policyAdvisor, String emailId)
            throws PolicyAdvisorNotRegisteredException {

        if (policyAdvisorRepository.findById(emailId).isPresent()) {
            PolicyAdvisor policyAdvisor1 = policyAdvisorRepository.findById(emailId).get();

            policyAdvisor1.setName(policyAdvisor.getName());
            policyAdvisor1.setPhoneNumber(policyAdvisor.getPhoneNumber());
            policyAdvisor1.setGender(policyAdvisor.getGender());
            policyAdvisor1.setPhoneNumber(policyAdvisor.getPhoneNumber());
            policyAdvisor1.setAadharNo(policyAdvisor.getAadharNo());
            policyAdvisor1.setPanNo(policyAdvisor.getPanNo());
            policyAdvisor1.setYearsOfExperience(policyAdvisor.getYearsOfExperience());
            policyAdvisor1.setCategory(policyAdvisor.getCategory());
            policyAdvisor1.setRatings(policyAdvisor.getRatings());

            policyAdvisorRepository.save(policyAdvisor1);
            return policyAdvisor1;
        } else {
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
    public PolicyAdvisor calculateRating(Rating ratings,String emailId ) throws PolicyAdvisorNotRegisteredException {
        float sum= 0F;
        float average = 0.0F;

        if( policyAdvisorRepository.findById(emailId).isPresent()) {

            PolicyAdvisor policyAdvisor1 = policyAdvisorRepository.findById(emailId).get();
            List<Rating> ratingList = policyAdvisor1.getRatings();
           // Rating rating = new Rating();
            if (ratingList!= null){
                ratingList.add(ratings);
                for (Rating r: ratingList){
                    sum = sum + r.getRating();
                }

                average = sum/ ratingList.size();
                policyAdvisor1.setAverageRating(average);
                policyAdvisorRepository.save(policyAdvisor1);

                return policyAdvisor1;
            }
            List<Rating> ratingList1 = new ArrayList<>();
            ratingList1.add(ratings);
            policyAdvisor1.setAverageRating(ratings.getRating());
            policyAdvisor1.setRatings(ratingList1);
            policyAdvisorRepository.save(policyAdvisor1);
            return policyAdvisor1;
        }
        else
            throw new PolicyAdvisorNotRegisteredException();
    }


    @Override
    public Optional<PolicyAdvisor> getPolicyAdvisorByEmail(String emailId) {
        return policyAdvisorRepository.findById(emailId);
    }

}
