package com.stackroute.insuranceservice.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;

@Data
@Document(indexName = "insurancepolicy")
public class InsurancePolicy {

    @Id
    Integer policyId;
    String policyName;
    String policyDescription;
    String policyDuration;
    String insuranceType;

    public InsurancePolicy() {
    }
}
