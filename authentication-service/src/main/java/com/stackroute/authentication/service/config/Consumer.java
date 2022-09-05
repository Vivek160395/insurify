package com.stackroute.authentication.service.config;

import com.stackroute.authentication.service.exception.UserAlreadyExistException;
import com.stackroute.authentication.service.model.UserCredentials;
import com.stackroute.authentication.service.rabbitmq.domain.UserDTO;
import com.stackroute.authentication.service.service.UserCredentialsServiceImpl;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class Consumer {
    @Autowired
    private UserCredentialsServiceImpl userCredentialsService;

    @RabbitListener(queues="queue1")
    public void getUserDtoFromRabbitMq(UserDTO userDTO) throws UserAlreadyExistException
    {
        UserCredentials userCredentials=new UserCredentials();
        userCredentials.setEmailId(userDTO.getEmailId());
        userCredentials.setPassword(userDTO.getPassword());
        userCredentialsService.saveUser(userCredentials);
    }
}
