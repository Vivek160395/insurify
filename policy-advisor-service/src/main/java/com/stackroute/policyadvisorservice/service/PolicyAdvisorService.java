package com.stackroute.policyadvisorservice.service;

import com.stackroute.policyadvisorservice.exception.PolicyAdvisorAlreadyExists;
import com.stackroute.policyadvisorservice.exception.PolicyAdvisorNotRegisteredException;
import com.stackroute.policyadvisorservice.model.PolicyAdvisor;
import com.stackroute.policyadvisorservice.model.Rating;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

public interface PolicyAdvisorService {


    public PolicyAdvisor registerPolicyAdvisor(PolicyAdvisor policyAdvisor)
            throws PolicyAdvisorAlreadyExists;
    public Optional<PolicyAdvisor> getPolicyAdvisorByEmail(String emailId);

    public List<PolicyAdvisor> findAllPolicyAdvisors();

   public PolicyAdvisor changePassword(PolicyAdvisor policyAdvisor, String emailId)
           throws PolicyAdvisorNotRegisteredException;

    public PolicyAdvisor update(PolicyAdvisor policyAdvisor, String emailId, MultipartFile file)
            throws PolicyAdvisorNotRegisteredException, IOException;
    public PolicyAdvisor update(PolicyAdvisor policyAdvisor, String emailId)
            throws PolicyAdvisorNotRegisteredException;
    public boolean deletePolicyAdvisor(String emailId)
            throws PolicyAdvisorNotRegisteredException;

  public PolicyAdvisor calculateRating( Rating ratings, String emailId)
          throws PolicyAdvisorNotRegisteredException;
}
