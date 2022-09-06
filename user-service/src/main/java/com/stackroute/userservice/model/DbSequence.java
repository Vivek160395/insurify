package com.stackroute.userservice.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
@Data
public class DbSequence {


    @Id
    private String userId;
    private int seq;
}
