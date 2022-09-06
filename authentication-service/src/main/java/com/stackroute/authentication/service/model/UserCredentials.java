package com.stackroute.authentication.service.model;

import lombok.*;


import javax.persistence.*;


@Data
@Entity
@Table(name = "User")
public class UserCredentials {
    @Id
    private String emailId;

    private String password;
//@Enumerated(EnumType.STRING)
//@Column(name= "auth_provider")
//    private AuthenticationProvider authenticationProvider;
//


}
