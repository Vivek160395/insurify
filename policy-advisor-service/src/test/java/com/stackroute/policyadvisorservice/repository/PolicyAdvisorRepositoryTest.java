// package com.stackroute.policyadvisorservice.repository;

// import com.stackroute.policyadvisorservice.model.PolicyAdvisor;
// import com.stackroute.policyadvisorservice.model.Rating;
// import org.junit.Test;
// import org.junit.jupiter.api.AfterEach;
// import org.junit.jupiter.api.BeforeEach;
// import org.junit.jupiter.api.extension.ExtendWith;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.test.context.junit.jupiter.SpringExtension;

// import java.util.ArrayList;
// import java.util.Arrays;
// import java.util.List;

// @ExtendWith(SpringExtension.class)
// public class PolicyAdvisorRepositoryTest {

// @Autowired
// private PolicyAdvisorRepository policyAdvisorRepository;

// private PolicyAdvisor policyAdvisor;
// private Rating ratings;

// @BeforeEach
// public void setUp(){
// List<Rating> ratingList = new ArrayList<>();
// ratings = new Rating();
// ratings.setRating(3.F);
// ratings.setUserEmailId("hbhv@gmiakn");
// ratingList.add(ratings);
// List<String> category = Arrays.asList("life insurance", "health insurance");
// policyAdvisor = new PolicyAdvisor("olympia@gmail.com","Qwerty123", "As Policy
// Advisor", "Olympia",
// " +918276346677", 'F',"15/10/2000", 43219876542L, "CHG32W1", 3,
// category,null,
// ratingList, 3.2F);
// }

// @AfterEach
// public void tearDown(){
// ratings = null;
// policyAdvisor = null;
// policyAdvisorRepository.deleteAll();
// }

// @Test
// public void givenAdvisorToRegisterMustReturnRegisteredAdvisor(){}

// @Test
// public void givenListOfAdvisorsShouldReturnAllAdvisors(){}

// @Test
// public void givenIdShouldReturnAdvisorOfThatId(){}

// @Test
// public void givenIdShouldDeleteAdvisorOfThatId(){}

// @Test
// public void givenIdShouldUpdateAdvisorOfThatId(){}

// @Test
// public void givenIdShouldReturnAverageRatingOfAdvisor(){}

// }
