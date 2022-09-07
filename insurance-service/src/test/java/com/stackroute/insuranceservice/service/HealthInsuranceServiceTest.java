//package com.stackroute.insuranceservice.service;
//
//import com.stackroute.insuranceservice.exceptions.PolicyAlreadyExistException;
//import com.stackroute.insuranceservice.exceptions.PolicyNotFoundException;
//import com.stackroute.insuranceservice.model.HealthInsurancePolicy;
//import com.stackroute.insuranceservice.repository.HealthInsurancePolicyRepository;
//import org.junit.Test;
//import org.junit.jupiter.api.AfterEach;
//import org.junit.jupiter.api.BeforeEach;
//import org.junit.jupiter.api.extension.ExtendWith;
//import org.mockito.InjectMocks;
//import org.mockito.Mock;
//import org.mockito.junit.jupiter.MockitoExtension;
//
//import java.util.Arrays;
//import java.util.List;
//import java.util.Optional;
//
//import static org.junit.jupiter.api.Assertions.assertEquals;
//import static org.junit.jupiter.api.Assertions.assertThrows;
//import static org.mockito.Mockito.*;
//
//@ExtendWith(MockitoExtension.class)
//public class HealthInsuranceServiceTest {
//    @Mock
//    private HealthInsurancePolicyRepository healthInsurancePolicyRepository;
//
//    @InjectMocks
//    private HealthInsurancePolicyServiceImpl policyService;
//
//    public HealthInsurancePolicy policy1, policy2;
//
//    byte[] policyDocuments = null;
//    List<String> sumInsured = List.of("fvbfevfev");
//    List<String> premium = List.of("premium");
//    List<String> policyDuration = List.of("7");
//    List<String> addOns = List.of("addOns");
//    List<String> addOnsPremium = List.of("addOnsPremium");
//    List<HealthInsurancePolicy> policyList;
//
//
//    @BeforeEach
//    public  void setUp(){
//        policy1 = new HealthInsurancePolicy(101,"policy_1","desc","Health","benefits",policyDocuments,sumInsured,premium,policyDuration,addOns,addOnsPremium);
//
//        policy2 = new HealthInsurancePolicy(102,"policy_2","desc","Health","benefits",policyDocuments,sumInsured,premium,policyDuration,addOns,addOnsPremium);
//
//        policyList = Arrays.asList(policy1,policy2);
//    }
//
//    @AfterEach
//    public void tearDown(){
//        policy1 = null;
//        policy2 = null;
//    }
//
//    @Test
//    public void givenPolicyToSaveReturnSuccess() throws PolicyAlreadyExistException {
//        when(healthInsurancePolicyRepository.findById(policy1.getPolicyId())).thenReturn(Optional.empty());
//        when(healthInsurancePolicyRepository.save(any())).thenReturn(policy1);
//
//        assertEquals(policy1,policyService.savePolicy(policy1));
//
//        verify(healthInsurancePolicyRepository,times(1)).findById(policy1.getPolicyId());
//        verify(healthInsurancePolicyRepository,times(1)).save(any());
//    }
//
//    @Test
//    public void givenPolicyToSaveReturnFailure(){
//        when(healthInsurancePolicyRepository.findById(policy1.getPolicyId())).thenReturn(Optional.ofNullable(policy1));
//
//        assertThrows(PolicyAlreadyExistException.class,()-> policyService.savePolicy(any()));
//
//        verify(healthInsurancePolicyRepository,times(1)).findById(any());
//        verify(healthInsurancePolicyRepository,times(0)).save(any());
//    }
//
//    @Test
//    public void givenPolicyToDeleteShouldReturnDeleteSuccess() throws PolicyNotFoundException {
//        when(healthInsurancePolicyRepository.findById(policy1.getPolicyId())).thenReturn(Optional.ofNullable(policy1));
//        boolean result = policyService.deletePolicyByPolicyId(policy1.getPolicyId());
//        assertEquals(true,result);
//
//        verify(healthInsurancePolicyRepository,times(1)).deleteById(any());
//        verify(healthInsurancePolicyRepository,times(1)).findById(any());
//    }
//
//    @Test
//    public void givenPolicyToDeleteShouldReturnDeleteFailure() throws PolicyNotFoundException {
//        when(healthInsurancePolicyRepository.findById(policy1.getPolicyId())).thenReturn(Optional.empty());
//        assertThrows(PolicyNotFoundException.class,()-> policyService.deletePolicyByPolicyId(policy1.getPolicyId()));
//
//        verify(healthInsurancePolicyRepository,times(0)).deleteById(any());
//        verify(healthInsurancePolicyRepository,times(1)).findById(any());
//    }
//
//    @Test
//    public void givenPolicyShouldReturnPolicyList(){
//        List<HealthInsurancePolicy> policies = policyList;
//        assertEquals(2,policies.size());
//    }
//}
