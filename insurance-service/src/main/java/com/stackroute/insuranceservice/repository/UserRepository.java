package com.stackroute.insuranceservice.repository;

import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.stereotype.Repository;

import com.stackroute.insuranceservice.model.User;

@Repository
public interface UserRepository extends ElasticsearchRepository<User, String> {

}
