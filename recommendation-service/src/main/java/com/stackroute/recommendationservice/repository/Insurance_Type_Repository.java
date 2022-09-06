package com.stackroute.recommendationservice.repository;

import com.stackroute.recommendationservice.model.InsuranceType;
import org.springframework.data.neo4j.repository.Neo4jRepository;

public interface Insurance_Type_Repository extends Neo4jRepository<InsuranceType,String> {

}
