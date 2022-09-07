package com.stackroute.userservice.rabbitmq.domain;

import lombok.Data;

@Data
public class RecommendationDTO {

    private String emailId;
    private String userType;
    private int age;

}
