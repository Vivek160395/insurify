package com.stackroute.authentication.service.model;

import lombok.*;

import javax.persistence.*;
import java.util.List;

@Data
@Entity
@NoArgsConstructor
@Table(name = "User")
public class UserCredentials {
    @Id
    private String emailId;
    private String password;
}
