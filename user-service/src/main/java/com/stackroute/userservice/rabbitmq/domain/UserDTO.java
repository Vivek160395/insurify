package com.stackroute.userservice.rabbitmq.domain;

import com.stackroute.userservice.model.Address;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;

import java.util.Date;
import java.util.List;

@Data
@NoArgsConstructor
public class UserDTO
{
    private String emailId;
    private String password;
    private String name;
    private String gender;
    private int age;
    private String dateOfBirth;
    private long mobileNo;
    private List<Address> address;
    private long aadharNo;
    private String panNo;
    private String profilePic;

}
