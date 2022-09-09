package com.stackroute.recommendationservice.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.stackroute.recommendationservice.model.Insurance;
import com.stackroute.recommendationservice.model.InsuranceProfile;
import com.stackroute.recommendationservice.model.User;
import com.stackroute.recommendationservice.service.Recommendation_service;
import org.junit.jupiter.api.*;
import org.junit.jupiter.api.extension.*;
import org.mockito.*;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.*;
import org.springframework.test.web.servlet.setup.*;

import java.util.ArrayList;
import java.util.List;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith(MockitoExtension.class)
public class InsuranceRecommendationControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Mock
    private Recommendation_service recommendation_service;

    private User user;
    private InsuranceProfile insuranceProfile;
    private List<Insurance> insurances;
    private Insurance insurance;
    @InjectMocks
    private Recommendation_Controller recommendation_controller;


    @BeforeEach
    public void setup(){
        insurances = new ArrayList<>();
        user = new User("gritvik97@gmail.com","Ritvik");
        insuranceProfile = new InsuranceProfile(1,"Life Insurance",22,"Life Insurance","Service","");
        insurance = new Insurance(insuranceProfile.getInsuranceId(),insuranceProfile.getInsuranceName(),0);
        insurances.add(insurance);
        mockMvc = MockMvcBuilders.standaloneSetup(recommendation_controller).build();
    }

    @AfterEach
    public void tearDown(){
        user =null;
        insuranceProfile = null;
        insurances = null;
    }

    @Test
    public void returnUserRegisteredOnSaveSuccess() throws Exception {
        when(recommendation_service.addUser(any())).thenReturn(user);
        mockMvc.perform(post("/Recommendation/user").contentType(MediaType.APPLICATION_JSON).content(jsonToString(user))).andExpect(status().isCreated()).andDo(print());
        verify(recommendation_service,times(1)).addUser(any());
    }

    @Test
    public void returnInsuranceOnSaveSuccess() throws Exception{
//        Insurance insurance = new Insurance(insuranceProfile.getInsuranceId(),insuranceProfile.getInsuranceName(),0);
        when(recommendation_service.addInsurance(any())).thenReturn(insurance);
        mockMvc.perform(post("/Recommendation/Insurance").contentType(MediaType.APPLICATION_JSON).content(jsonToString(insuranceProfile))).andExpect(status().isCreated()).andDo(print());
        verify(recommendation_service,times(1)).addInsurance(any());
    }

    @Test
    public void returnAllInsurancesByAge() throws Exception{
        when(recommendation_service.getAllInsuranceOnBasisOfAge(any())).thenReturn(insurances);
        mockMvc.perform(get("/Recommendation/22/InsuranceByAge").contentType(MediaType.APPLICATION_JSON).contentType(jsonToString(insurances))).andExpect(status().isFound());
        verify(recommendation_service,times(1)).getAllInsuranceOnBasisOfAge(any());
    }

    @Test
    public void returnAllInsurancesByOccupation() throws Exception{
        when(recommendation_service.getAllInsuranceOnBasisOfOccupation(any())).thenReturn(insurances);
        mockMvc.perform(get("/Recommendation/Service/InsuranceByOccupation").contentType(MediaType.APPLICATION_JSON).contentType(jsonToString(insurances))).andExpect(status().isFound());
        verify(recommendation_service,times(1)).getAllInsuranceOnBasisOfOccupation(any());
    }

    @Test
    public void returnAllInsurancesByType() throws Exception{
        when(recommendation_service.getAllInsuranceOnBasisOfType(any())).thenReturn(insurances);
        mockMvc.perform(get("/Recommendation/Life Insurance/InsuranceByType").contentType(MediaType.APPLICATION_JSON).contentType(jsonToString(insurances))).andExpect(status().isFound());
        verify(recommendation_service,times(1)).getAllInsuranceOnBasisOfType(any());
    }


//    @Test
//    public void returnInsuranceIfUserBuys() throws Exception{
//        when(recommendation_service.createUserToInsuranceRelation(insuranceProfile.getInsuranceId(),user.getUserEmail())).thenReturn(true);
//        mockMvc.perform(get("/Recommendation/gritvik97@gmail.com/1/buyInsurance").contentType(MediaType.APPLICATION_JSON).contentType(jsonToString(true))).andExpect(status().isCreated());
//        verify(recommendation_service,times(1)).createUserToInsuranceRelation(any(),any());
//    }

    @Test
    public void returnAllInsurances() throws Exception{
        when(recommendation_service.getAllInsurance()).thenReturn(insurances);
        mockMvc.perform(get("/Recommendation/Insurances").contentType(MediaType.APPLICATION_JSON).contentType(jsonToString(insurances))).andExpect(status().isFound());
        verify(recommendation_service,times(1)).getAllInsurance();
    }

    @Test
    public void returnAllTrendingInsurances() throws Exception{
        when(recommendation_service.getAllInsurancesWhichAreTrending()).thenReturn(insurances);
        mockMvc.perform(get("/Recommendation/TrendingInsurances").contentType(MediaType.APPLICATION_JSON).contentType(jsonToString(insurances))).andExpect(status().isFound());
        verify(recommendation_service,times(1)).getAllInsurancesWhichAreTrending();
    }

    public static String jsonToString(final Object obj) throws JsonProcessingException {
        String result;
        try{
            ObjectMapper objectMapper = new ObjectMapper();
            result = objectMapper.writeValueAsString(obj);
        }catch (JsonProcessingException js){
            result = "JSON Processing error";
        }
        return result;
    }
}
