package com.stackroute.authentication.service;

import com.stackroute.authentication.service.controller.UserCredentialsController;
import com.stackroute.authentication.service.model.UserCredentials;
import com.stackroute.authentication.service.service.UserCredentialsService;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.Arrays;
import java.util.List;

@ExtendWith(MockitoExtension.class)
public class Controller {
    @Autowired
    private MockMvc mockMvc;

    @Mock
    private UserCredentialsService userCredentialsService;
    private UserCredentials user1, user2, user3;
    List<UserCredentials> userList;

    @InjectMocks
    private UserCredentialsController userController;

    @BeforeEach
    public void setup() {
        user1 = new UserCredentials();
        user2 = new UserCredentials();
        user3 = new UserCredentials();
        userList = Arrays.asList(user1, user2, user3);
        mockMvc = MockMvcBuilders.standaloneSetup(userController).build();
    }

    @AfterEach
    public void tearDown() {
        user1 = null;
        user2 = null;
        user3 = null;
    }
}
