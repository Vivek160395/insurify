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

import static org.junit.jupiter.api.Assertions.assertEquals;

@ExtendWith(SpringExtension.class)
public class HealthRepositoryTest {

    @Autowired
    private HealthInsurancePolicyRepository healthInsurancePolicyRepository;

    private HealthInsurancePolicy policy;
    private AddOnDetails addOnDetails;
    private Details details;
    private Benefits benefits;

    @BeforeEach
    public void setup(){
        policy = new HealthInsurancePolicy();
        addOnDetails = new AddOnDetails();
        details = new Details();
        benefits = new Benefits();
    }

    @AfterEach
    public void tearDown(){
        policy = null;
        addOnDetails = null;
        details = null;
        benefits = null;
        healthInsurancePolicyRepository.deleteAll();
    }

    @Test
    public void givenProductToSaveShouldReturnProduct(){
        healthInsurancePolicyRepository.save(policy);
        HealthInsurancePolicy policy1 = healthInsurancePolicyRepository.findById(policy.getPolicyId()).get();
        assertEquals(policy.getPolicyId(),policy1.getPolicyId());
    }
}
