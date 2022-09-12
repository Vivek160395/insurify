package com.stackroute.insuranceservice.service;

import com.stackroute.insuranceservice.exceptions.PolicyAlreadyExistException;
import com.stackroute.insuranceservice.exceptions.PolicyNotFoundException;
import com.stackroute.insuranceservice.model.*;
import com.stackroute.insuranceservice.repository.AutomobilesInsurancePolicyRepository;
import org.junit.Test;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.mockito.Mockito.times;

@ExtendWith(MockitoExtension.class)
public class AutomobileInsuranceServiceTest {

    @Mock
    private AutomobilesInsurancePolicyRepository automobilesInsurancePolicyRepository;
    @InjectMocks
    private AutomobileInsuranceServiceImpl policyService;
    public AutomobileInsurancePolicy policy1, policy2;
    List<AutomobileInsurancePolicy> policyList;
    List<Details> detailsList = new ArrayList<>();
    List<AddOnDetails> addOnDetailsList = new ArrayList<>();
    List<Benefits> benefitsList = new ArrayList<>();

    @BeforeEach
    public  void setUp(){
        AddOnDetails addOnDetails = new AddOnDetails("addOn",15000);
        addOnDetailsList.add(addOnDetails);

        Details details = new Details(10000,9,1000,1,2,2550,50000);
        detailsList.add(details);

        Benefits benefits = new Benefits("desc","brief");
        benefitsList.add(benefits);

        policy1 = new AutomobileInsurancePolicy("123","NameOfThePolicy","Health","descriptionAboutThePolicy",detailsList, benefitsList ,addOnDetailsList,"documentsAboutThePolicy");

        AddOnDetails addOnDetails1 = new AddOnDetails("addOn",17000);
        addOnDetailsList.add(addOnDetails1);

        Details details1 = new Details(20000,12,1500,1,2,2753,50000);
        detailsList.add(details1);

        Benefits benefits1 = new Benefits("desc","brief");
        benefitsList.add(benefits1);

        policy2 = new AutomobileInsurancePolicy("124","NameOfThePolicy2","Health2","descriptionAboutThePolicy",detailsList, benefitsList ,addOnDetailsList,"documentsAboutThePolicy");

        policyList = Arrays.asList(policy1,policy2);
    }

    @AfterEach
    public void tearDown(){
        policy1 = null;
        policy2 = null;
    }

    @Test
    public void givenPolicyToSaveReturnSuccess() throws PolicyAlreadyExistException {
        when(automobilesInsurancePolicyRepository.findById(policy1.getPolicyId())).thenReturn(Optional.ofNullable(null));
        when(automobilesInsurancePolicyRepository.save(any())).thenReturn(policy1);
        AutomobileInsurancePolicy policy = policyService.savePolicy(policy1);
        System.out.println(policy);
        assertEquals(policy1,policy);

        verify(automobilesInsurancePolicyRepository,times(1)).findById(policy1.getPolicyId());
        verify(automobilesInsurancePolicyRepository,times(1)).save(any());
    }

    @Test
    public void givenPolicyToSaveReturnFailure(){
        when(automobilesInsurancePolicyRepository.findById(policy1.getPolicyId())).thenReturn(Optional.ofNullable(policy1));

        assertThrows(PolicyAlreadyExistException.class,()-> policyService.savePolicy(any()));

        verify(automobilesInsurancePolicyRepository,times(1)).findById(any());
        verify(automobilesInsurancePolicyRepository,times(0)).save(any());
    }

    @Test
    public void givenPolicyToDeleteShouldReturnDeleteSuccess() throws PolicyNotFoundException {
        when(automobilesInsurancePolicyRepository.findById(policy1.getPolicyId())).thenReturn(Optional.ofNullable(policy1));
        boolean result = policyService.deletePolicyByPolicyId(policy1.getPolicyId());
        assertEquals(true,result);

        verify(automobilesInsurancePolicyRepository,times(1)).deleteById(any());
        verify(automobilesInsurancePolicyRepository,times(1)).findById(any());
    }

    @Test
    public void givenPolicyToDeleteShouldReturnDeleteFailure() throws PolicyNotFoundException {
        when(automobilesInsurancePolicyRepository.findById(policy1.getPolicyId())).thenReturn(Optional.empty());
        assertThrows(PolicyNotFoundException.class,()-> policyService.deletePolicyByPolicyId(policy1.getPolicyId()));

        verify(automobilesInsurancePolicyRepository,times(0)).deleteById(any());
        verify(automobilesInsurancePolicyRepository,times(1)).findById(any());
    }

    @Test
    public void givenPolicyShouldReturnPolicyList(){
        List<AutomobileInsurancePolicy> policies = policyList;
        assertEquals(2,policies.size());
    }
}
