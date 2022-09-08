package com.stackroute.insuranceservice.model;

import com.carrotsearch.hppc.Generated;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;

import java.util.List;

@Data
@NoArgsConstructor
@Document(indexName = "insurance-policy")
public class HealthInsurancePolicy {

    @Id
    private int policyId;
    private String policyName;
    private String insuranceType;
    private List<Details> policyDetails;
    private List<Benefits> policyBenefits;
    private List<AddOnDetails> policyAddOnDetails;
    private byte[] policyDocuments;

    public HealthInsurancePolicy(String fileName, String contentType, byte[] bytes) {
    }
}
