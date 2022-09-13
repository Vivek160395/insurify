package com.stackroute.userservice.rabbitmq.domain;

import com.stackroute.userservice.model.Address;
import lombok.Data;

@Data
public class UserDTO
{
    private String emailId;
    private String password;
    private String userType;
    private String name;
    private String gender;
    private int age;
    private String dateOfBirth;
    private long mobileNo;
    private Address address;
    private long aadharNo;
    private String panNo;
    private byte[] profilePic;

}
