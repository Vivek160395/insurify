package com.stackroute.policyadvisorservice.rabbitMq.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class DTO {
    private String emailId;
    private String password;
    private String userType;

}
