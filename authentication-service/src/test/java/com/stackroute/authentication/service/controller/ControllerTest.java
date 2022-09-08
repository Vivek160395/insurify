package com.stackroute.authentication.service.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.stackroute.authentication.service.exception.UserAlreadyExistException;
import com.stackroute.authentication.service.model.UserCredentials;
import com.stackroute.authentication.service.service.UserCredentialsService;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.Arrays;
import java.util.List;


import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.mockito.Mockito.times;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith(MockitoExtension.class)
public class ControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Mock
    private UserCredentialsService userCredentialsService;

    private UserCredentials userCredentials1, userCredentials2;
    List<UserCredentials> userList;

    @InjectMocks
    private UserCredentialsController userCredentialsController;

    @BeforeEach
    public void setUp() {

        userCredentials1 = new UserCredentials("raj@gmail.com", "1234");
        userCredentials2 = new UserCredentials("kumar@gmail.com", "1234");

        userList = Arrays.asList(userCredentials1, userCredentials2);

        mockMvc = MockMvcBuilders.standaloneSetup(userCredentialsController).build();
    }

    @AfterEach
    public void tearDown() {
        userCredentials1 = null;
        userCredentials2 = null;
    }

    private static String jsonToString(final Object ob) throws JsonProcessingException {
        String result;

        try {
            ObjectMapper mapper = new ObjectMapper();
            String jsonContent = mapper.writeValueAsString(ob);
            result = jsonContent;
        } catch (JsonProcessingException e) {
            result = "JSON processing error";
        }

        return result;
    }

    @Test
    public void givenUserToSaveReturnSaveUserSuccess() throws Exception {
        when(userCredentialsService.saveUser(any())).thenReturn(userCredentials1);

        mockMvc.perform(post("/api/v1/user")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(jsonToString(userCredentials1))
                        .characterEncoding("utf-8"))
                .andExpect(status().isOk())
                .andDo(MockMvcResultHandlers.print());

        verify(userCredentialsService, times(1)).saveUser(any());
    }

    @Test
    public void givenUserToSaveReturnSaveUserFailure() throws Exception {
        when(userCredentialsService.saveUser(any())).thenThrow(UserAlreadyExistException.class);

        mockMvc.perform(post("/api/v1/user")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(jsonToString(userCredentials1))
                        .characterEncoding("utf-8"))
                .andExpect(status().isConflict())
                .andDo(MockMvcResultHandlers.print());

        verify(userCredentialsService, times(1)).saveUser(any());
    }
    @Test
    public void givenShouldReturnUserList(){

        List<UserCredentials> userCredentials =  userList;
        assertEquals(2,userCredentials.size());
    }

}
