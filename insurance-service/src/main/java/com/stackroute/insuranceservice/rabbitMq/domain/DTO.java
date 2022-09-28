package com.stackroute.insuranceservice.rabbitMq.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class DTO {
    String policyId;
    String policyName;
    String insuranceType;
    String description;
    byte[] picByte;
    String picType;
}
