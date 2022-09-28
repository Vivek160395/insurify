package com.stackroute.recommendationservice.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.neo4j.core.schema.Id;
import org.springframework.data.neo4j.core.schema.Node;

@Node
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Insurance {
    @Id
    String policyId;
    String policyName;
    int noOfUsersBought;
    byte[] picByte;
    String picType;
    String description;
}
