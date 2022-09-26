package com.stackroute.insuranceservice.model;

import java.util.List;

import org.springframework.data.elasticsearch.annotations.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@Document(indexName = "user")
public class User {
    String userEmail;
    List<String> insuranceBought;
}
