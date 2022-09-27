package com.stackroute.paymentservice.service;

import com.razorpay.Order;
import com.stackroute.paymentservice.model.PaymentDetails;

public interface PaymentService {

//    public Order createRazorPayOrder(float amount);

    public PaymentDetails savePaymentDetails(PaymentDetails details);

}
