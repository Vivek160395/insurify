package com.stackroute.insuranceservice.repository;

import com.stackroute.insuranceservice.model.*;
import org.elasticsearch.client.ElasticsearchClient;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;

@ExtendWith(SpringExtension.class)
public class AutomobileRepositoryTest {

    @Autowired
    private final AutomobilesInsurancePolicyRepository automobilesInsurancePolicyRepository;
    public AutomobileInsurancePolicy policy;
    List<Details> detailsList = new ArrayList<>();
    List<AddOnDetails> addOnDetailsList = new ArrayList<>();
    List<Benefits> benefitsList = new ArrayList<>();

    public AutomobileRepositoryTest(AutomobilesInsurancePolicyRepository automobilesInsurancePolicyRepository) {
        this.automobilesInsurancePolicyRepository = automobilesInsurancePolicyRepository;
    }

    @BeforeEach
    public void setup(){
        AddOnDetails addOnDetails = new AddOnDetails("addOn",15000);
        addOnDetailsList.add(addOnDetails);

        Details details = new Details(10000,9,1000,1,2,2550,50000);
        detailsList.add(details);

        Benefits benefits = new Benefits("desc","brief");
        benefitsList.add(benefits);

        policy = new AutomobileInsurancePolicy("123","NameOfThePolicy","Health","descriptionAboutThePolicy",detailsList, benefitsList ,addOnDetailsList,"documentsAboutThePolicy");
    }

    @AfterEach
    public void tearDown(){
        policy = null;
        automobilesInsurancePolicyRepository.deleteAll();
    }

    @Test
    public void givenPolicyToSaveShouldReturnPolicy(){
        automobilesInsurancePolicyRepository.save(policy);
        AutomobileInsurancePolicy policy1 = automobilesInsurancePolicyRepository.findById(policy.getPolicyId()).get();
        assertEquals(policy1.getPolicyId(),policy1.getPolicyId());
    }

    @Test
    public void givenPolicyShouldReturnPolicyByPolicyNameSuccess(){
        automobilesInsurancePolicyRepository.findPolicyByPolicyName(policy.getPolicyName());
        AutomobileInsurancePolicy policy1 = automobilesInsurancePolicyRepository.findById(policy.getPolicyId()).get();
        assertEquals(policy1.getPolicyId(),policy1.getPolicyId());
    }
}
