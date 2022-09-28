package com.stackroute.paymentservice.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.Date;

@Document
@Data
public class PaymentDetails {

    private String emailId;
    private long mobileNo;
    @Id
    private String razorpayOrderId;
    private String customerPolicyId;
    private int amount;
    private LocalDate paymentDate;
    private LocalTime paymentTime;

}
