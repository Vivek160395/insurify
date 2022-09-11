package com.stackroute.userservice.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.stackroute.userservice.exception.UserAlreadyExistsException;
import com.stackroute.userservice.exception.UserNotRegisteredException;
import com.stackroute.userservice.model.Address;
import com.stackroute.userservice.model.User;
import com.stackroute.userservice.service.UserService;
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
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.mockito.Mockito.times;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith(MockitoExtension.class)
public class UserControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Mock
    private UserService userService;
    private Address address1,address2;
    private User user1, user2;

    @InjectMocks
    private UserController userController;

    @BeforeEach
    public void setUp(){
        address1=new Address(637,"gali no. 1","st mary school","panipat","haryana",132101);
        user1=new User("ajay123@gmail.com","ajay123","insurer","Ajay Kumar","male",24,"23-01-1999",9991119990l,address1,123456789098l,"ABCD234",null);

        address2=new Address(637,"gali no. 1","st mary school","panipat","haryana",132101);
        user2=new User("aman123@gmail.com","ajay123","insurer","Ajay Kumar","male",24,"23-01-1999",9991119990l,address2,123456789098l,"ABCD234", null);
        mockMvc = MockMvcBuilders.standaloneSetup(userController).build();
    }

    @AfterEach
    public void tearDown(){
        user1=null;
        user2=null;
    }

    private static String jsonToString(final Object ob) throws JsonProcessingException {
        String result;
        try {
            ObjectMapper mapper = new ObjectMapper();
            String jsonContent = mapper.writeValueAsString(ob);
            result = jsonContent;
        } catch(JsonProcessingException e) {
            result = "JSON processing error";
        }
        return result;
    }

    @Test
    public void givenUserToRegisterPass() throws UserAlreadyExistsException, Exception {
        //record the exception
        when(userService.registerUser(any())).thenReturn(user1);
        //verify the exception(matching)
        mockMvc.perform(post("/api/v1/user")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(jsonToString(user1)))
//                .andExpect( status().isCreated() )
                .andDo(MockMvcResultHandlers.print());
        verify(userService,times(1)).registerUser(any());
    }

    @Test
    public void givenUserToRegisterFail() throws Exception{
        //record the exception
        when(userService.registerUser(any())).thenThrow(UserAlreadyExistsException.class);
        //verify the exception(matching)
        mockMvc.perform(post("/api/v1/user")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(jsonToString(user1)))
                .andExpect( status().isConflict() )
                .andDo(MockMvcResultHandlers.print());
        verify(userService,times(1)).registerUser(any());
    }

    @Test
    public void givenEmailIdToUpdateUserPass() throws UserNotRegisteredException, Exception {
        //record the exception
        when(userService.updateUser(any(),anyString(),any())).thenReturn(user1);
        //verify the exception(matching)
        mockMvc.perform(put("/api/v1/updateUser/ajay123@gmail.com")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(jsonToString(user1)))
                .andExpect( status().isOk() )
                .andDo(MockMvcResultHandlers.print());
        verify(userService,times(1)).updateUser(any(),anyString(),any());
    }

    @Test
    public void givenEmailIdDeleteUserPass() throws Exception {
        when(userService.deleteUser(anyString())).thenReturn(true);
        mockMvc.perform(delete("/api/v1/removeUser/ajay123@gmail.com"))
                .andExpect(status().isOk())
                .andDo(MockMvcResultHandlers.print());
        verify(userService,times(1)).deleteUser(anyString());
    }

    @Test
    public void givenEmailIdDeleteUserFail() throws Exception {
        when(userService.deleteUser(anyString())).thenThrow(UserNotRegisteredException.class);
        mockMvc.perform(delete("/api/v1/removeUser/ajay123@gmail.com"))
                .andExpect(status().isNotFound())
                .andDo(MockMvcResultHandlers.print());
        verify(userService,times(1)).deleteUser(anyString());
    }

}
