package com.stackroute.policyadvisorservice.repository;

import com.stackroute.policyadvisorservice.model.PolicyAdvisor;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface PolicyAdvisorRepository extends MongoRepository<PolicyAdvisor, String> {
}
