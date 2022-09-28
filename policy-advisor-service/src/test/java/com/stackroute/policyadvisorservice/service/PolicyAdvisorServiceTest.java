package com.stackroute.policyadvisorservice.service;

import com.stackroute.policyadvisorservice.model.PolicyAdvisor;
import com.stackroute.policyadvisorservice.model.Rating;
import com.stackroute.policyadvisorservice.repository.PolicyAdvisorRepository;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.junit.Test;


@ExtendWith(MockitoExtension.class)
public class PolicyAdvisorServiceTest {

    @Mock
    private PolicyAdvisorRepository policyAdvisorRepository;

    @Autowired
    @InjectMocks
    private PolicyAdvisorServiceImpl policyAdvisorService;
    private PolicyAdvisor policyAdvisor1, policyAdvisor2;
    private Rating ratings1, ratings2;



    @BeforeEach
    public void setUp(){
        //ratings1 = new Rating([3.5f, "xyz@gmail.com"]);
        //policyAdvisor1 = new PolicyAdvisor("olympia@gmail.com","Qwerty123", "As Policy Advisor", "Olympia",
        //      " +918276346677", 'F',"15/10/2000", 43219876542L, "CHG32W1", 3, ["lifeinsurance", "health inurance"],
        //       null, ratings1);

        //ratings2 = new Rating();
       // policyAdvisor2 = new PolicyAdvisor();


    }

    @AfterEach
    public void tearDown(){
        ratings1 = ratings2 = null;
        policyAdvisor1 = policyAdvisor2 = null;

    }

    //@Test
    //public void

    //@Test

    //@Test




}
