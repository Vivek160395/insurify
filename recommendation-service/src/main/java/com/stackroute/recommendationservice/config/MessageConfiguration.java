package com.stackroute.recommendationservice.config;

import org.springframework.amqp.core.Binding;
import org.springframework.amqp.core.BindingBuilder;
import org.springframework.amqp.core.DirectExchange;
import org.springframework.amqp.core.Queue;
import org.springframework.amqp.rabbit.connection.ConnectionFactory;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class MessageConfiguration {
    @Bean
    public DirectExchange directExchange(){
        return new DirectExchange("insurify-user");
    }

    @Bean
    public Queue insurifyQueue(){
        return new Queue("queue2");
    }


    @Bean
    public Binding insurifyBinding( DirectExchange directExchange){
        return BindingBuilder
                .bind(insurifyQueue())
                .to(directExchange)
                .with("routing2");
    }

    // Json converter that uses Json2 library
    @Bean
    public Jackson2JsonMessageConverter producerJackson2JsonMessageConverter(){
        return new Jackson2JsonMessageConverter();
    }

    @Bean
    public RabbitTemplate rabbitTemplate(ConnectionFactory connectionFactory)
    {
        RabbitTemplate rabbitTemp=new RabbitTemplate(connectionFactory);
        rabbitTemp.setMessageConverter(producerJackson2JsonMessageConverter());
        return  rabbitTemp;
    }

}