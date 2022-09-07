package com.stackroute.authentication.service.model;

import lombok.*;


import javax.persistence.*;


@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "User")
public class UserCredentials {
    @Id

    private String emailId;

    private String password;



}
