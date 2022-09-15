package com.stackroute.recommendationservice.rabbitmq.domain;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
public class InsuranceDTO {
    private String insuranceName;
    private int insuranceId;
    private String description;
    private byte[] image;
    private String imageType;
    private String insuranceType;
    private int age;
    private String occupation;
}
