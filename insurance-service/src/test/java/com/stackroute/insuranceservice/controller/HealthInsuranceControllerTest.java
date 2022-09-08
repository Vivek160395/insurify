//package com.stackroute.insuranceservice.controller;
//
//import com.fasterxml.jackson.core.JsonProcessingException;
//import com.fasterxml.jackson.databind.ObjectMapper;
//import com.stackroute.insuranceservice.exceptions.PolicyAlreadyExistException;
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
//import org.springframework.test.web.servlet.MockMvcBuilder;
//import org.springframework.test.web.servlet.result.MockMvcResultHandlers;
//import org.springframework.test.web.servlet.setup.MockMvcBuilders;
//
//import static org.mockito.Mockito.*;
//
//import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
//import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
//
//import java.util.Arrays;
//import java.util.List;
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
//
//    List<HealthInsurancePolicy> policyList;
//
//    byte[] policyDocuments = null;
//    List<String> sumInsured = List.of("fvbfevfev");
//    List<String> premium = List.of("premium");
//    List<String> policyDuration = List.of("7");
//    List<String> addOns = List.of("addOns");
//    List<String> addOnsPremium = List.of("addOnsPremium");
//
//    @InjectMocks
//    private HealthPolicyController policyController;
//
//    @BeforeEach
//    public  void setUp(){
//        policy1 = new HealthInsurancePolicy(101,"policy_1","desc","Health","benefits",policyDocuments,sumInsured,premium,policyDuration,addOns,addOnsPremium);
//
//        policy2 = new HealthInsurancePolicy(102,"policy_2","desc","Health","benefits",policyDocuments,sumInsured,premium,policyDuration,addOns,addOnsPremium);
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
//                        .contentType(MediaType.APPLICATION_OCTET_STREAM)
//                        .content(jsonToString(policy1))
//                        .characterEncoding("utf-8"))
//                .andExpect(status().isOk())
//                .andDo(MockMvcResultHandlers.print());
//
//        verify(policyService,times(1)).savePolicy(any());
//    }
//
//    @Test
//    public void givenProductToSaveReturnSaveProductFailure() throws Exception {
//        when(policyService.savePolicy(any())).thenThrow(PolicyAlreadyExistException.class);
//
//        mockMvc.perform(post("/api/v1/policy")
//                        .contentType(MediaType.MULTIPART_FORM_DATA)
//                        .content(jsonToString(policy1))
//                        )
//                .andExpect(status().isConflict())
//                .andDo(MockMvcResultHandlers.print());
//
//        verify(policyService,times(1)).savePolicy(any());
//    }
//}
