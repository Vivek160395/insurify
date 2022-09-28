package com.stackroute.policyadvisorservice.controller;

import com.stackroute.policyadvisorservice.model.PolicyAdvisor;
import com.stackroute.policyadvisorservice.model.Rating;
import com.stackroute.policyadvisorservice.service.PolicyAdvisorService;
import org.junit.Test;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.web.servlet.MockMvc;

@ExtendWith(MockitoExtension.class)
public class PolicyAdvisorControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @InjectMocks
    private PolicyAdvisorController policyAdvisorController;

    @Mock
    private PolicyAdvisorService policyAdvisorService;

    private PolicyAdvisor policyAdvisor;
    private Rating ratings;


    @BeforeEach
    public void setUp(){
        //ratings = new Rating([3.5f, "xyz@gmail.com"]);
        //policyAdvisor = new PolicyAdvisor("olympia@gmail.com","Qwerty123", "As Policy Advisor", "Olympia",
        //      " +918276346677", 'F',"15/10/2000", 43219876542L, "CHG32W1", 3, ["lifeinsurance", "health inurance"],
        //       null, ratings);
    }

    @AfterEach
    public void tearDown(){
        policyAdvisor = null;
        ratings = null;
    }

    @Test
    public void PostMappingOfAdvisor() throws Exception{}

    @Test
    public void GetMappingOfAllAdvisors(){}

    @Test
    public void GetMappingOfAdvisorWithId(){}

    @Test
    public void DeleteMappingOfAdvisor(){}

    @Test
    public void PutMappingOfAdvisor(){}

    @Test
    public void GetMappingForAdvisorRating(){}



}
