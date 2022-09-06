package com.stackroute.authentication.service.rabbitmq.domain;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
public class UserDTO {

    private String emailId;
    private String password;

}
