package com.stackroute.userservice.model;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class Address {

    private String houseNo;
    private String street;
    private String landmark;
    private String city;
    private String state;
    private String pinCode;

}
