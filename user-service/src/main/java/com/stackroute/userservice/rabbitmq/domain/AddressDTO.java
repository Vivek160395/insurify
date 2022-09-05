package com.stackroute.userservice.rabbitmq.domain;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class AddressDTO {

    private String houseNo;
    private String street;
    private String landmark;
    private String city;
    private String state;
    private String pinCode;

}