package com.stackroute.recommendationservice.repository;

import com.stackroute.recommendationservice.model.Insurance;
import org.springframework.data.neo4j.repository.Neo4jRepository;

public interface Recommendation_Repository extends Neo4jRepository<Insurance,String> {
}
