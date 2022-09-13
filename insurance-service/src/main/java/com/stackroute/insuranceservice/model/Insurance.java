package com.stackroute.insuranceservice.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(indexName = "insurance")
public class Insurance {

    @Id
    private String policyId;
    private String policyName;
    private String insuranceType;
    private String policyDescription;
    private String category;
    private byte[] picByte;
    private PolicyDetails[] policyDetails;
    private PolicyBenefits[] policyBenefits;
    private AddOnDetails[] addOnDetails;
    private String policyDocuments;
    private List<String> modelsAllowed;
}
