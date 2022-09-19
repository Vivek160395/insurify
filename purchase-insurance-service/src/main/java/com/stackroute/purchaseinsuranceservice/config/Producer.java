package com.stackroute.purchaseinsuranceservice.config;

import com.stackroute.purchaseinsuranceservice.model.CustomerInsurance;
import org.springframework.amqp.core.DirectExchange;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class Producer {
    @Autowired
    private RabbitTemplate rabbitTemplate;
    @Autowired
    private DirectExchange directExchange;

    public void sendMessageToRabbitMq(CustomerInsurance customerInsurance){
        rabbitTemplate.convertAndSend(directExchange.getName(),"recommendation_routing",customerInsurance);
    }
}
