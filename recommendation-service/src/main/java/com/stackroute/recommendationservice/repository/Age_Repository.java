package com.stackroute.recommendationservice.repository;

import com.stackroute.recommendationservice.model.Age;
import org.springframework.data.neo4j.repository.Neo4jRepository;

public interface Age_Repository extends Neo4jRepository<Age, Integer> {
}
