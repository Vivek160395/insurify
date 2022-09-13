//package com.stackroute.insuranceservice.controller;
//
//import com.fasterxml.jackson.core.JsonProcessingException;
//import com.fasterxml.jackson.databind.ObjectMapper;
//import com.stackroute.insuranceservice.exceptions.PolicyAlreadyExistException;
//import com.stackroute.insuranceservice.model.AddOnDetails;
//import com.stackroute.insuranceservice.model.Benefits;
//import com.stackroute.insuranceservice.model.PolicyDetails;
//import com.stackroute.insuranceservice.model.HealthInsurancePolicy;
//import com.stackroute.insuranceservice.service.HealthInsurancePolicyService;
//import org.junit.jupiter.api.AfterEach;
//import org.junit.jupiter.api.BeforeEach;
//import org.junit.jupiter.api.Test;
//import org.junit.jupiter.api.extension.ExtendWith;
//import org.mockito.InjectMocks;
//import org.mockito.Mock;
//import org.mockito.junit.jupiter.MockitoExtension;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.MediaType;
//import org.springframework.test.web.servlet.MockMvc;
//import org.springframework.test.web.servlet.result.MockMvcResultHandlers;
//import org.springframework.test.web.servlet.setup.MockMvcBuilders;
//
//import static org.mockito.Mockito.*;
//
//import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
//import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
//
//import java.util.ArrayList;
//import java.util.Arrays;
//import java.util.List;
//import java.util.Optional;
//
//@ExtendWith(MockitoExtension.class)
//public class HealthInsuranceControllerTest {
//
//    @Autowired
//    private MockMvc mockMvc;
//
//    @Mock
//    private HealthInsurancePolicyService policyService;
//
//    private HealthInsurancePolicy policy1, policy2;
//    List<HealthInsurancePolicy> policyList;
//    List<PolicyDetails> policyDetailsList = new ArrayList<>();
//    List<AddOnDetails> addOnDetailsList = new ArrayList<>();
//    List<Benefits> benefitsList = new ArrayList<>();
//    @InjectMocks
//    private HealthPolicyController policyController;
//
//    @BeforeEach
//    public  void setUp(){
//        AddOnDetails addOnDetails = new AddOnDetails("addOn",15000);
//        addOnDetailsList.add(addOnDetails);
//
//        PolicyDetails policyDetails = new PolicyDetails(10000,9,1000,1,2,2550,50000);
//        policyDetailsList.add(policyDetails);
//
//        Benefits benefits = new Benefits("desc","brief");
//        benefitsList.add(benefits);
//
//        policy1 = new HealthInsurancePolicy("123","NameOfThePolicy","Health","descriptionAboutThePolicy", policyDetailsList, benefitsList ,addOnDetailsList,"documentsAboutThePolicy");
//
//        AddOnDetails addOnDetails1 = new AddOnDetails("addOn",17000);
//        addOnDetailsList.add(addOnDetails1);
//
//        PolicyDetails policyDetails1 = new PolicyDetails(20000,12,1500,1,2,2753,50000);
//        policyDetailsList.add(policyDetails1);
//
//        Benefits benefits1 = new Benefits("desc","brief");
//        benefitsList.add(benefits1);
//
//        policy2 = new HealthInsurancePolicy("124","NameOfThePolicy2","Health2","descriptionAboutThePolicy", policyDetailsList, benefitsList ,addOnDetailsList,"documentsAboutThePolicy");
//
//        policyList = Arrays.asList(policy1,policy2);
//
//        mockMvc = MockMvcBuilders.standaloneSetup(policyController).build();
//    }
//
//    @AfterEach
//    public void tearDown(){
//        policy1 = null;
//        policy2 = null;
//    }
//
//    private static String jsonToString(final Object ob) throws JsonProcessingException {
//        String result;
//
//        try {
//            ObjectMapper mapper = new ObjectMapper();
//            String jsonContent = mapper.writeValueAsString(ob);
//            result = jsonContent;
//        } catch(JsonProcessingException e) {
//            result = "JSON processing error";
//        }
//        return result;
//    }
//
//    @Test
//    public void givenProductToSaveReturnSaveProductSuccess() throws Exception {
//        when(policyService.savePolicy(any())).thenReturn(policy1);
//
//        mockMvc.perform(post("/api/v1/policy")
//                        .contentType(MediaType.APPLICATION_JSON)
//                        .content(jsonToString(policy1))
//                        .characterEncoding("utf-8"))
//                .andExpect(status().isAccepted())
//                .andDo(MockMvcResultHandlers.print());
//
//        verify(policyService,times(2)).savePolicy(any());
//    }
//
//    @Test
//    public void givenPolicyToSaveReturnSavePolicyFailure() throws Exception {
//        when(policyService.savePolicy(any())).thenThrow(PolicyAlreadyExistException.class);
//
//        mockMvc.perform(post("/api/v1/policy")
//                        .contentType(MediaType.APPLICATION_JSON)
//                        .content(jsonToString(policy1))
//                        )
//                .andExpect(status().isConflict())
//                .andDo(MockMvcResultHandlers.print());
//
//        verify(policyService,times(1)).savePolicy(any());
//    }
//
//    @Test
//    public void givenPolicyToDeletePolicySuccess() throws Exception {
//        when(policyService.deletePolicyByPolicyId(policy1.getPolicyId())).thenReturn(true);
//        mockMvc.perform(delete("/api/v1/policy/delete/123"))
//                .andExpect(status().isOk())
//                .andDo(MockMvcResultHandlers.print());
//        verify(policyService,times(1)).deletePolicyByPolicyId(anyString());
//    }
//
//    @Test
//    public void givenPolicyToDeletePolicyFailure() throws Exception {
//        when(policyService.deletePolicyByPolicyId(policy1.getPolicyId())).thenReturn(false);
//        mockMvc.perform(delete("/api/v1/policy/delete/123"))
//                .andExpect(status().isOk())
//                .andDo(MockMvcResultHandlers.print());
//        verify(policyService,times(1)).deletePolicyByPolicyId(anyString());
//    }
//
//    @Test
//    public void givenPolicyToGetPolicyByIdSuccess() throws Exception {
//        when(policyService.getPolicyByPolicyId(anyString())).thenReturn(Optional.ofNullable(policy1));
//        mockMvc.perform(get("/api/v1/policyid/123"))
//                .andExpect(status().isOk())
//                .andDo(MockMvcResultHandlers.print());
//        verify(policyService,times(1)).getPolicyByPolicyId(anyString());
//    }
//
//    @Test
//    public void givenPolicyToGetPolicyByIdFailure() throws Exception {
//        when(policyService.getPolicyByPolicyId(anyString())).thenReturn(Optional.empty());
//        mockMvc.perform(get("/api/v1/policyid/124"))
//                .andExpect(status().isOk())
//                .andDo(MockMvcResultHandlers.print());
//        verify(policyService,times(1)).getPolicyByPolicyId(anyString());
//    }
//
//    @Test
//    public void givenPolicyToGetPolicyByNameSuccess() throws Exception {
//        when(policyService.getPolicyByPolicyName(anyString())).thenReturn(policy1);
//        mockMvc.perform(get("/api/v1/policyname/p7"))
//                .andExpect(status().isOk())
//                .andDo(MockMvcResultHandlers.print());
//        verify(policyService,times(1)).getPolicyByPolicyName(anyString());
//    }
//
//    @Test
//    public void givenPolicyToGetAllPolicyReturnSuccess() throws Exception {
//
//        when(policyService.getAllPolicies()).thenReturn(policyList);
//        mockMvc.perform(get("/api/v1/policy"))
//                .andExpect(status().isOk())
//                .andDo(MockMvcResultHandlers.print());
//        verify(policyService,times(1)).getAllPolicies();
//    }
//}
