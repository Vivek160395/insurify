//package com.stackroute.recommendationservice.repository;
//
//import com.stackroute.recommendationservice.model.*;
//import lombok.AllArgsConstructor;
//import lombok.NoArgsConstructor;
//import org.junit.jupiter.api.AfterEach;
//import org.junit.jupiter.api.BeforeEach;
//import org.junit.jupiter.api.Test;
//import org.junit.jupiter.api.extension.ExtendWith;
//import org.junit.runner.RunWith;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.autoconfigure.data.neo4j.DataNeo4jTest;
//import org.springframework.boot.test.context.TestConfiguration;
//import org.springframework.test.context.ContextConfiguration;
//import org.springframework.test.context.junit.jupiter.SpringExtension;
//import org.springframework.test.context.junit4.SpringRunner;
//
//import java.util.ArrayList;
//import java.util.List;
//import static org.junit.jupiter.api.Assertions.*;
//
//
//@DataNeo4jTest
//@NoArgsConstructor
//public class InsuranceRepositoryTest {
//
//    @Autowired
//    private Insurance_Repository insurance_repository;
//    @Autowired
//    private Occupation_Repository occupation_repository;
//    @Autowired
//    private Age_Repository age_repository;
//    @Autowired
//    private Insurance_Type_Repository insurance_type_repository;
//
//    private User user;
//    private InsuranceProfile insuranceProfile;
//    private List<Insurance> insurances;
//    private Insurance insurance;
//
//    @BeforeEach
//    public void Entity(){
//        insurances = new ArrayList<>();
//        user = new User("gritvik97@gmail.com","Ritvik");
//        insuranceProfile = new InsuranceProfile(1,"Life Insurance",22,"Life Insurance","Service","");
//        insurance = new Insurance(insuranceProfile.getInsuranceId(),insuranceProfile.getInsuranceName(),0);
//        insurances.add(insurance);
//    }
//    @AfterEach
//    public void TearDown(){
//        user  = null;
//        insuranceProfile = null;
//        insurances = null;
//    }
//
//    @Test
//    public void createInsuranceTypeRelationshipAndCheckInsuranceTypeRelationship(){
//        insurance_repository.save(insurance);
//        insurance_type_repository.save(new InsuranceType(insuranceProfile.getInsuranceType()));
//        insurance_repository.createInsuranceTypeRelation(insuranceProfile.getInsuranceId(), insuranceProfile.getInsuranceType());
//        boolean result = insurance_repository.checkInsuranceTypeRelationship(insuranceProfile.getInsuranceId(), insuranceProfile.getInsuranceType());
//        assertEquals(true,result);
//    }
//
////    @Test
////    public void createOccupationRelationshipAndCheckOccupationRelationship(){
////        insurance_repository.save(insurance);
////        insurance_repository.createOccupationRelation(insuranceProfile.getInsuranceId(), insuranceProfile.getOccupation());
////        boolean result = insurance_repository.checkOccupationRelation(insuranceProfile.getInsuranceId(), insuranceProfile.getOccupation());
////        assertEquals(true,result);
////    }
//
//    @Test
//    public void createAgeRelationshipAndCheckAgeRelationship(){
//        insurance_repository.save(insurance);
//        insurance_repository.createAgeRelation(insuranceProfile.getInsuranceId(), insuranceProfile.getAge());
//        boolean result = insurance_repository.checkAgeRelationship(insuranceProfile.getInsuranceId(), insuranceProfile.getAge());
//        assertEquals(true,result);
//    }
//
//    @Test
//    public void createUserRelationshipAndCheckUserRelationship(){
//        insurance_repository.save(insurance);
//        insurance_repository.createUserToInsuranceRelationship(insuranceProfile.getInsuranceId(), user.getUserEmail());
//        boolean result = insurance_repository.checkUserToInsuranceRelationship(insuranceProfile.getInsuranceId(),user.getUserEmail());
//        assertEquals(true,result);
//    }
//
//    @Test
//    public void getAllInsurances(){
//        List<Insurance> allInsurances = insurance_repository.findAll();
//        List<Insurance> getAllInsurances = insurance_repository.getAllInsurances();
//        assertEquals(allInsurances.size(),getAllInsurances.size());
//    }
//
//    @Test
//    public void getAllInsuranceOnBasisOfOccupation(){
//        insurance_repository.save(insurance);
//        occupation_repository.save(new Occupation(insuranceProfile.getOccupation()));
//        insurance_repository.createOccupationRelation(insuranceProfile.getInsuranceId(),insuranceProfile.getOccupation());
//        List<Insurance> allOccupationInsurances = insurance_repository.getAllInsurancesMatchingWithOccupation(insuranceProfile.getOccupation());
//        assertEquals(allOccupationInsurances.get(0).getInsuranceId(),insurances.get(0).getInsuranceId());
//    }
//    @Test
//    public void getAllInsuranceOnBasisOfAge(){
//        insurance_repository.save(insurance);
//        age_repository.save(new Age(insuranceProfile.getAge()));
//        insurance_repository.checkAgeRelationship(insuranceProfile.getInsuranceId(),insuranceProfile.getAge());
//        List<Insurance> allAgeInsurances = insurance_repository.getAllInsurancesMatchingWithAge(insuranceProfile.getAge());
//        assertEquals(allAgeInsurances.get(0).getInsuranceId(),insurances.get(0).getInsuranceId());
//    }
//    @Test
//    public void getAllInsuranceOnBasisOfType(){
//        insurance_repository.save(insurance);
//        insurance_type_repository.save(new InsuranceType(insuranceProfile.getInsuranceType()));
//        insurance_repository.createInsuranceTypeRelation(insuranceProfile.getInsuranceId(),insuranceProfile.getInsuranceType());
//        List<Insurance> allTypeInsurances = insurance_repository.getAllInsurancesMatchingWithInsuranceType(insuranceProfile.getInsuranceType());
//        System.out.println(allTypeInsurances);
//        System.out.println(insurances);
//        assertEquals(allTypeInsurances.get(1).getInsuranceId(),insurances.get(0).getInsuranceId());
//    }
//}
