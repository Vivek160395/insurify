package com.stackroute.userservice.rabbitmq.domain;

import lombok.Data;


@Data
public class AddressDTO {

    private String houseNo;
    private String street;
    private String landmark;
    private String city;
    private String state;
    private String pinCode;

}