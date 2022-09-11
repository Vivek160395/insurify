package com.stackroute.insuranceservice.repository;

import com.stackroute.insuranceservice.model.AddOnDetails;
import com.stackroute.insuranceservice.model.Benefits;
import com.stackroute.insuranceservice.model.Details;
import com.stackroute.insuranceservice.model.HealthInsurancePolicy;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;

@ExtendWith(SpringExtension.class)
public class HealthRepositoryTest {

    @Autowired
    private final HealthInsurancePolicyRepository healthInsurancePolicyRepository;

    private HealthInsurancePolicy policy;
    private List<AddOnDetails> addOnDetailsList;
    private List<Details> detailsList;
    private List<Benefits> benefitsList;

    public HealthRepositoryTest(HealthInsurancePolicyRepository healthInsurancePolicyRepository) {
        this.healthInsurancePolicyRepository = healthInsurancePolicyRepository;
    }

    @BeforeEach
    public void setup(){
        AddOnDetails addOnDetails = new AddOnDetails("addOn",15000);
        addOnDetailsList.add(addOnDetails);

        Details details = new Details(10000,9,1000,1,2,2550,50000);
        detailsList.add(details);

        Benefits benefits = new Benefits("desc","brief");
        benefitsList.add(benefits);

        policy = new HealthInsurancePolicy("123","NameOfThePolicy","Health","descriptionAboutThePolicy",detailsList, benefitsList ,addOnDetailsList,"documentsAboutThePolicy");

    }

    @AfterEach
    public void tearDown(){
        policy = null;
        addOnDetailsList = null;
        detailsList = null;
        benefitsList = null;
        healthInsurancePolicyRepository.deleteAll();
    }

    @Test
    public void givenPolicyToSaveShouldReturnPolicy(){
        healthInsurancePolicyRepository.save(policy);
        HealthInsurancePolicy policy1 = healthInsurancePolicyRepository.findById(policy.getPolicyId()).get();
        assertEquals(policy.getPolicyId(),policy1.getPolicyId());
    }
}
