package com.stackroute.paymentservice.service;

import com.stackroute.paymentservice.model.PaymentDetails;
import com.stackroute.paymentservice.repository.PaymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PaymentServiceImpl implements PaymentService {

    @Autowired
    private PaymentRepository paymentRepository;

    public PaymentServiceImpl(PaymentRepository paymentRepository) {
        this.paymentRepository = paymentRepository;
    }

    //    @Override
//    public PaymentDetails createRazorPayOrder(float amount) {
//        return null;
//    }


    @Override
    public PaymentDetails savePaymentDetails(PaymentDetails details) {
            paymentRepository.save(details);
            return details;
    }
}
