package com.stackroute.purchaseinsuranceservice.config;

import com.stackroute.purchaseinsuranceservice.domain.Insurance;
import com.stackroute.purchaseinsuranceservice.service.PurchaseService;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;

public class Consumer {
    @Autowired
    private PurchaseService purchaseService;
    @RabbitListener(queues = "user_queues")
    public void receiveDataFromRabbitmq(Insurance insurance)  {
//        Insurance receivedInsurance=new ();
//        user.setName(userDTO.getUserName());
//        user.setPassword(userDTO.getPassword());
//        userService.saveUser(user);
    }

}
