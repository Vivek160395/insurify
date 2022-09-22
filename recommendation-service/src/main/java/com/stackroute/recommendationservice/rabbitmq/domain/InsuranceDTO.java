package com.stackroute.recommendationservice.rabbitmq.domain;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
public class InsuranceDTO {
    String policyId;
    String policyName;
    String insuranceType;
    String description;
    byte[] picByte;
    String picType;
}
