package com.stackroute.insuranceservice.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;

import java.util.List;

@Document(indexName = "automobileinsurance")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AutomobileInsurancePolicy {

    @Id
    private String policyId;
    private String policyName;
    private String insuranceType;
    private String policyDescription;
    private String category;
    private byte[] image;
    private List<PolicyDetails> policyDetails;
    private List<PolicyBenefits> policyBenefits;
    private List<AddOnDetails> addOnDetails;
    private String policyDocuments;
}
