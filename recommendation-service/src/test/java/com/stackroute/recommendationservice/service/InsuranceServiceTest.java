//package com.stackroute.recommendationservice.service;
//
//import com.stackroute.recommendationservice.exception.AgeAlreadyThere;
//import com.stackroute.recommendationservice.exception.InsuranceAlreadyExists;
//import com.stackroute.recommendationservice.exception.NoInsurancesFound;
//import com.stackroute.recommendationservice.exception.UserAlreadyPosted;
//import com.stackroute.recommendationservice.model.*;
//import com.stackroute.recommendationservice.repository.*;
//import lombok.AllArgsConstructor;
//import lombok.NoArgsConstructor;
//import org.junit.jupiter.api.AfterEach;
//import org.junit.jupiter.api.BeforeEach;
//import org.junit.jupiter.api.Test;
//import org.junit.jupiter.api.extension.ExtendWith;
//import org.mockito.InjectMocks;
//import org.mockito.Mock;
//import org.mockito.junit.jupiter.MockitoExtension;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.test.web.servlet.MockMvc;
//import org.springframework.test.web.servlet.MockMvcBuilder;
//import org.springframework.test.web.servlet.setup.MockMvcBuilders;
//import static org.mockito.Mockito.*;
//import java.util.ArrayList;
//import java.util.List;
//import java.util.Optional;
//import static org.junit.jupiter.api.Assertions.*;
//
//@ExtendWith(MockitoExtension.class)
//@NoArgsConstructor
//
//public class InsuranceServiceTest {
//
//    @Mock
//    private Insurance_Repository insurance_repository;
//    @Mock
//    private UserRepository userRepository;
//    @Mock
//    private Insurance_Type_Repository insurance_type_repository;
//
//    @InjectMocks
//    private Recommendation_Service_Impl recommendation_service_Impl;
//
//    private Insurance insurance;
//    private InsuranceProfile insuranceProfile;
//    List<Insurance> insuranceList;
//    private User user;
//
//
//    @BeforeEach
//    public void Entity(){
//        insuranceList = new ArrayList<>();
//        user = new User("gritvik97@gmail.com","Ritvik");
//        insuranceProfile = new InsuranceProfile(1,"Life Insurance",22,"Life Insurance","Service","");
//        insurance = new Insurance(insuranceProfile.getInsuranceId(),insuranceProfile.getInsuranceName(),0);
//        insuranceList.add(insurance);
//    }
//    @AfterEach
//    public void TearDown(){
//        insuranceProfile = null;
//        insuranceList = null;
//        user = null;
//    }
//
//    @Test
//    public void checkAddInsurance() throws InsuranceAlreadyExists {
//        when(insurance_repository.findById(insuranceProfile.getInsuranceId())).thenReturn(Optional.ofNullable(null));
//        when(insurance_repository.save(any())).thenReturn(insurance);
//        Insurance insurance1 = recommendation_service_Impl.addInsurance(insuranceProfile);
//        assertEquals(insurance.getInsuranceId(),insurance1.getInsuranceId());
//        verify(insurance_repository,times(1)).save(any());
//        verify(insurance_repository,times(1)).findById(any());
//    }
//
//    @Test
//    public void checkAddUser() throws UserAlreadyPosted {
//        when(userRepository.findById(user.getUserEmail())).thenReturn(Optional.ofNullable(null));
//        when(userRepository.save(any())).thenReturn(user);
//        User user1 = recommendation_service_Impl.addUser(user);
//        assertEquals(user.getUserEmail(),user1.getUserEmail());
//        verify(userRepository,times(1)).save(any());
//        verify(userRepository,times(1)).findById(any());
//    }
//
//    @Test
//    public void createInsuranceTypeRelationshipAndCheckInsuranceTypeRelationship(){
//        when(insurance_repository.save(insurance)).thenReturn(insurance);
//        when(insurance_type_repository.save(new InsuranceType(insuranceProfile.getInsuranceType()))).thenReturn(new InsuranceType(insuranceProfile.getInsuranceType()));
//        recommendation_service_Impl.createInsuranceTypeRelation(insuranceProfile.getInsuranceId(), insuranceProfile.getInsuranceType());
//        verify(insurance_repository,times(1)).checkInsuranceTypeRelationship(any(),any());
//        verify(insurance_repository,times(1)).createInsuranceTypeRelation(any(),any());
//
//    }
//
//
//}
