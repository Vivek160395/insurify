package com.stackroute.insuranceservice.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;

import java.util.List;

@Data
@NoArgsConstructor
@Document(indexName = "insurance-policy")
public class HealthInsurancePolicy {

    @Id
    Integer policyId;
    String policyName;
    String policyDescription;
    String insuranceType;
    String policyBenefits;
    String policyDocuments;
    List<String> sumsInsured;
    List<String> premium;
    List<String> policyDuration;
    List<String> addOns;
    List<String> addOnsPremium;
}
