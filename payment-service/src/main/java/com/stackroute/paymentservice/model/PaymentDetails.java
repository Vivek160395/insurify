package com.stackroute.paymentservice.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.Date;

@Document
@Data
public class PaymentDetails {



    private String emailId;
//    private String name;
    private long mobileNo;
    @Id
    private String razorpayOrderId;
    private String customerPolicyId;
    private String policyType;
    private String paymentMode;
    private String currency;
    private float amount;
    private float tax;
    private float discount;
    private Date paymentDate;
    private LocalDateTime paymentTime;
//    private String secretId;
//    private String secretKey;


}
