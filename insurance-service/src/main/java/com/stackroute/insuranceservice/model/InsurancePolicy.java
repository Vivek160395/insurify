package com.stackroute.insuranceservice.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;

@Document(indexName = "InsurancePolicy")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class InsurancePolicy {

    @Id
    Integer policyId;
    String policyName;
    String policyDescription;
    Integer policyDuration;
    String insuranceType;
}
