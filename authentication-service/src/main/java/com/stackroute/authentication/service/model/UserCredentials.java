package com.stackroute.authentication.service.model;

import lombok.*;


import javax.persistence.*;


@Data
@Entity
@NoArgsConstructor
@Table(name = "User")
public class UserCredentials {

    @Id
    private String emailId;
    private String password;
     private String userType;


    public UserCredentials(String emailId, String password, String userType) {
        this.emailId = emailId;
        this.password = password;
        this.userType = userType;
    }
}
