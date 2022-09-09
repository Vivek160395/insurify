package com.stackroute.insuranceservice.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;

import java.util.List;

@Document(indexName = "automobiles")
@Data
@NoArgsConstructor
public class AutomobileInsurancePolicy {

    @Id
    private int policyId;
    private String policyName;
    private String insuranceType;
    private List<Details> policyDetails;
    private List<Benefits> policyBenefits;
    private List<AddOnDetails> policyAddOnDetails;
    private byte[] policyDocuments;

    public AutomobileInsurancePolicy(String docName, String contentType, byte[] bytes) {
    }
}
