package com.stackroute.recommendationservice.rabbitmq.domain;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
public class UserDTO {
    private String emailId;
    private String userName;
}
