package com.stackroute.insuranceservice.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;

<<<<<<< HEAD
@Data
@Document(indexName = "insurancepolicy")
=======
@Document(indexName = "InsurancePolicy")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
>>>>>>> 80029c5fa4a7b2fc8abc6d214307ff5a27c3e005
public class InsurancePolicy {

    @Id
    Integer policyId;
    String policyName;
    String policyDescription;
    String policyDuration;
    String insuranceType;
}
