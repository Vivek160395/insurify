package com.stackroute.userservice.config;

import com.stackroute.userservice.rabbitmq.domain.RecommendationDTO;
import com.stackroute.userservice.rabbitmq.domain.UserDTO;
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

    public void sendMessageToAuthRabbitMq(UserDTO userDTO, RecommendationDTO recommendationDTO){
        rabbitTemplate.convertAndSend(directExchange.getName(),"routing1",userDTO);
        rabbitTemplate.convertAndSend(directExchange.getName(),"routing2",recommendationDTO);
    }


}
