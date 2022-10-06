package com.stackroute.recommendationservice.config;

import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class MessageConfiguration {
    @Bean
    public Jackson2JsonMessageConverter consumerJackson2JsonMessageConverter() {
        return new Jackson2JsonMessageConverter();
    }

}