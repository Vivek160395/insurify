package com.stackroute.paymentservice.controller;

import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
//import com.stackroute.paymentservice.model.PaymentDetails;
import com.stackroute.paymentservice.model.PaymentDetails;
import com.stackroute.paymentservice.service.PaymentService;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;


@RestController
@RequestMapping("/pg")
//@CrossOrigin(origins = "*")
public class PaymentController {

    @Autowired
    private PaymentService service;
    private RazorpayClient client;
    private static final String SECRET_ID = "rzp_test_mVwxTMqHL7dIdt";
    private static final String SECRET_KEY = "uQmSyGAgNqCHHT7AWCN94pOZ";

    public PaymentController(PaymentService service) {
        this.service = service;
    }

    @PostMapping("/createOrder")
    public PaymentDetails createOrder(@RequestBody PaymentDetails details) throws RazorpayException {
        PaymentDetails response = new PaymentDetails();
        try{
            client = new RazorpayClient(SECRET_ID, SECRET_KEY);
            Order order = createRazorPayOrder(details.getAmount());
            System.out.println("---------------------------------");
            String orderId = (String) order.get("id");
            System.out.println("Order ID:- "+orderId);
            LocalDate date= java.time.LocalDate.now();
            LocalTime time= java.time.LocalTime.now();
            System.out.println("Date :- "+date+"\nTime :- "+time);
            System.out.println("---------------------------------");

            response.setEmailId(details.getEmailId());
            response.setMobileNo(details.getMobileNo());
            response.setCustomerPolicyId(details.getCustomerPolicyId());
            response.setRazorpayOrderId(orderId);
            response.setAmount(details.getAmount());
            response.setPaymentDate(date);
            response.setPaymentTime(time);

//            response.setSecretKey(SECRET_KEY);
//            response.setSecretId(SECRET_ID);
//            response.setPaymentGatewayName("razorpay");
            service.savePaymentDetails(response);
            return response;
        } catch (RazorpayException e){
            e.printStackTrace();
        }
        return response;

    }


    private Order createRazorPayOrder(int amount) throws RazorpayException{

        JSONObject options = new JSONObject();
        options.put("amount", amount*100);
        options.put("currency","INR");
        options.put("receipt","txn_123456");
        options.put("payment_capture",1); // to enable auto capture
        return client.orders.create(options);
    }

}
