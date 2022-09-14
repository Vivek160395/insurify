package com.stackroute.userservice.service;

import com.stackroute.userservice.config.Producer;
import com.stackroute.userservice.exception.UserAlreadyExistsException;
import com.stackroute.userservice.exception.UserNotRegisteredException;
import com.stackroute.userservice.model.Address;
import com.stackroute.userservice.model.User;
import com.stackroute.userservice.repository.UserRepository;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.mock.web.MockMultipartFile;

import java.io.IOException;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.mockito.internal.verification.VerificationModeFactory.times;

@ExtendWith(MockitoExtension.class)
public class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    MockMultipartFile file;

    @Mock
    private Producer producer;

    @InjectMocks
    private UserServiceImpl userService;

    Address address1, address2;
    User user1, user2;

    @BeforeEach
    public void setUp() {
        address1 = new Address(637, "gali no. 1", "st mary school", "panipat", "haryana", 132101);
        user1 = new User("ajay123@gmail.com", "ajay123", "insurer", "Ajay Kumar", "male", 24, "23-01-1999", 9991119990l,
                address1, 123456789098l, "ABCD234", null);

        address2 = new Address(637, "gali no. 1", "st mary school", "panipat", "haryana", 132101);
        user2 = new User("aman123@gmail.com", "ajay123", "insurer", "Ajay Kumar", "male", 24, "23-01-1999", 9991119990l,
                address2, 123456789098l, "ABCD234", null);

    }

    @AfterEach
    public void tearDown() {

        user1 = null;
        user2 = null;
    }

    @Test
        public void registerUserTestPass() throws UserAlreadyExistsException {
//        when(productRepository.findById(prod1.getProductId())).thenReturn(Optional.ofNullable(null));

        when(userRepository.save(any())).thenReturn(user1);
        assertEquals(user1,userService.registerUser(user1));
        verify(userRepository,times(1)).findById(any());
        verify(userRepository,times(1)).save(any());
        verify(userRepository,times(0)).deleteById(any());
    }

    @Test
        public void registerUserTestFail(){
        when(userRepository.findById(user1.getEmailId())).thenReturn(Optional.ofNullable(user1));
        assertThrows(UserAlreadyExistsException.class,()->userService.registerUser(user1));
        verify(userRepository,times(1)).findById(any());
        verify(userRepository,times(0)).save(any());
        verify(userRepository,times(0)).deleteById(any());
    }

    @Test
        public void deleteUserPass() throws UserNotRegisteredException {
        when(userRepository.findById(user1.getEmailId())).thenReturn(Optional.ofNullable(user1));
        boolean flag = userService.deleteUser(user1.getEmailId());
        assertEquals(true,flag);
            verify(userRepository,times(1)).findById(any());
            verify(userRepository,times(0)).save(any());
            verify(userRepository,times(1)).deleteById(any());
    }

    @Test
    public void updateUserPass() throws UserNotRegisteredException, IOException {
        when(userRepository.findById(user1.getEmailId())).thenReturn(Optional.ofNullable(user1));
        userService.updateUser(user1,user1.getEmailId(),file);
        assertEquals(user1,userService.updateUser(user1,user1.getEmailId(),file));
        verify(userRepository,times(4)).findById(any());
        verify(userRepository,times(2)).save(any());
//        verify(userRepository,times(0)).(any());

        verify(userRepository,times(0)).deleteById(any());
    }

}
