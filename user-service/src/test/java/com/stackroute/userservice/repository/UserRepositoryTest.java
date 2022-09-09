package com.stackroute.userservice.repository;

import com.stackroute.userservice.model.Address;
import com.stackroute.userservice.model.User;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.data.mongo.DataMongoTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

@ExtendWith(SpringExtension.class)
@DataMongoTest
public class UserRepositoryTest {

    @Autowired
    private UserRepository userRepository;
    private User user;
    private Address address;

    @BeforeEach
    public void setUp(){
        address=new Address(637,"gali no. 1","st mary school","panipat","haryana",132101);
        user=new User("ajay123@gmail.com","ajay123","insurer","Ajay Kumar","male",24,"23-01-1999",9991119990l,address,123456789098l,"ABCD234");
    }

    @AfterEach
    public void tearDown(){
        address=null;
        user=null;
        userRepository.deleteAll();
    }

    @Test
    public void givenUserToSaveShouldReturnUser(){
        userRepository.insert(user);
        User user1 = userRepository.findById(user.getEmailId()).get() ;
        assertNotNull(user1);
        assertEquals(user.getEmailId(),user1.getEmailId());
    }

    @Test
    public void givenProductToDeleteShouldDeleteProduct(){
        userRepository.insert(user);
        User user1 = userRepository.findById(user.getEmailId()).get() ;
        userRepository.delete(user1);
        Optional obj = userRepository.findById(user.getEmailId());
        assertEquals(Optional.empty(),obj);
    }

    @Test
    public void givenProductReturnGetAllProducts(){
        userRepository.insert(user);
        Address address1=new Address(637,"gali no. 1","st mary school","panipat","haryana",132101);
        User user1=new User("aman123@gmail.com","ajay123","insurer","Ajay Kumar","male",24,"23-01-1999",9991119990l,address,123456789098l,"ABCD234");
        userRepository.insert(user1);

        List<User> list = userRepository.findAll();
        assertEquals(2,list.size());
        assertEquals("aman123@gmail.com",list.get(1).getEmailId());
    }

}
