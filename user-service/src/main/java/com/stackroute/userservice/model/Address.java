package com.stackroute.userservice.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Address {

    private int houseNo;
    private String street;
    private String landmark;
    private String city;
    private String state;
    private int pinCode;

}
