package com.stackroute.insuranceservice.config;

import com.stackroute.insuranceservice.rabbitMq.domain.DTO;
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

    public void sendingMessageToRabbitMQServer(DTO dto){
        rabbitTemplate.convertAndSend(directExchange.getName(),"Nehitha",dto);
    }
}
