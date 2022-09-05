package com.stackroute.recommendationservice.repository;

import com.stackroute.recommendationservice.model.Occupation;
import org.springframework.data.neo4j.repository.Neo4jRepository;

public interface Occupation_Repository extends Neo4jRepository<Occupation,String> {
}
