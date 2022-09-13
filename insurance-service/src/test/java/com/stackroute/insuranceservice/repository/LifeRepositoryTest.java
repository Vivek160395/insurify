//package com.stackroute.insuranceservice.repository;
//
//import com.stackroute.insuranceservice.model.*;
//import org.junit.jupiter.api.AfterEach;
//import org.junit.jupiter.api.BeforeEach;
//import org.junit.jupiter.api.Test;
//import org.junit.jupiter.api.extension.ExtendWith;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.test.context.junit.jupiter.SpringExtension;
//
//import java.util.ArrayList;
//import java.util.List;
//
//import static org.junit.jupiter.api.Assertions.assertEquals;
//
//@ExtendWith(SpringExtension.class)
//public class LifeRepositoryTest {
//
//    @Autowired
//    private final LifeInsurancePolicyRepository lifeInsurancePolicyRepository;
//    public LifeInsurancePolicy policy;
//    List<PolicyDetails> policyDetailsList = new ArrayList<>();
//    List<AddOnDetails> addOnDetailsList = new ArrayList<>();
//    List<Benefits> benefitsList = new ArrayList<>();
//
//    public LifeRepositoryTest(LifeInsurancePolicyRepository lifeInsurancePolicyRepository) {
//        this.lifeInsurancePolicyRepository = lifeInsurancePolicyRepository;
//    }
//
//    @BeforeEach
//    public void setup(){
//        AddOnDetails addOnDetails = new AddOnDetails("addOn",15000);
//        addOnDetailsList.add(addOnDetails);
//
//        PolicyDetails policyDetails = new PolicyDetails(10000,9,1000,1,2,2550,50000);
//        policyDetailsList.add(policyDetails);
//
//        Benefits benefits = new Benefits("desc","brief");
//        benefitsList.add(benefits);
//
//        policy = new LifeInsurancePolicy("123","NameOfThePolicy","Health","descriptionAboutThePolicy", policyDetailsList, benefitsList ,addOnDetailsList,"documentsAboutThePolicy");
//    }
//
//    @AfterEach
//    public void tearDown(){
//        policy = null;
//        lifeInsurancePolicyRepository.deleteAll();
//    }
//
//    @Test
//    public void givenPolicyToSaveShouldReturnPolicy(){
//        lifeInsurancePolicyRepository.save(policy);
//        LifeInsurancePolicy policy1 = lifeInsurancePolicyRepository.findById(policy.getPolicyId()).get();
//        assertEquals(policy1.getPolicyId(),policy1.getPolicyId());
//    }
//}
