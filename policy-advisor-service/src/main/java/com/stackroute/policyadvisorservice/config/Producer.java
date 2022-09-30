package com.stackroute.policyadvisorservice.config;

import com.stackroute.policyadvisorservice.rabbitMq.domain.DTO;
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
        rabbitTemplate.convertAndSend(directExchange.getName(),"routing1",dto);
    }

}
