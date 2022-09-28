package com.stackroute.chatservice.repository;

import com.stackroute.chatservice.model.Message;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface MsgRepos extends MongoRepository<Message,String> {
}
