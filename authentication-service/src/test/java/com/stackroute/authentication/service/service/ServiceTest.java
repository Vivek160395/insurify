package com.stackroute.authentication.service.service;

import com.stackroute.authentication.service.controller.UserCredentialsController;
import com.stackroute.authentication.service.exception.UserAlreadyExistException;
import com.stackroute.authentication.service.model.UserCredentials;
import com.stackroute.authentication.service.repository.UserCredentialsRepository;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.mockito.Mockito.times;

@ExtendWith(MockitoExtension.class)
public class ServiceTest {

    @Mock
    private UserCredentialsRepository userCredentialsRepository;


    @InjectMocks
    private UserCredentialsServiceImpl userCredentialsServiceImpl;
    private UserCredentials userCredentials1, userCredentials2;
    List<UserCredentials> userList;
    @InjectMocks
    private UserCredentialsController userCredentialsController;

    @BeforeEach
    public void setUp() {

        userCredentials1 = new UserCredentials("raj@gmail.com", "1234");
        userCredentials2 = new UserCredentials("kumar@gmail.com", "1234");

        userList = Arrays.asList(userCredentials1, userCredentials2);
    }

    @AfterEach
    public void tearDown() {
        userCredentials1 = null;
        userCredentials2 = null;
    }

    @Test
    public void givenUserToSaveReturnUserSuccess() throws UserAlreadyExistException {
        when(userCredentialsRepository.findById(userCredentials1.getEmailId())).thenReturn(Optional.ofNullable(null));
        when(userCredentialsRepository.save(any())).thenReturn(userCredentials1);

        assertEquals(userCredentials1, userCredentialsServiceImpl.saveUser(userCredentials1));

        verify(userCredentialsRepository, times(1)).findById(any());
        verify(userCredentialsRepository, times(1)).save(any());
    }

    @Test
    public void givenUserToSaveReturnUserFailure() throws  UserAlreadyExistException{
        when(userCredentialsRepository.findById(userCredentials1.getEmailId())).thenReturn(Optional.ofNullable(userCredentials1));
        assertThrows(UserAlreadyExistException.class,()-> userCredentialsServiceImpl.saveUser(userCredentials1));

        verify(userCredentialsRepository,times(1)).findById(any());
        verify(userCredentialsRepository,times(0)).save(any());
    }
    @Test
    public void givenShouldReturnUserList(){

        List<UserCredentials> userCredentials =  userList;
        assertEquals(2,userCredentials.size());
    }
}