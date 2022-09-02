package com.stackroute.insuranceservice.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;

@Data
@Document(indexName = "InsurancePolicy")
public class InsurancePolicy {

    @Id
    Integer policyId;
    String policyName;
    String policyDescription;
    Integer policyDuration;
    String insuranceType;

    public InsurancePolicy() {
    }
}
