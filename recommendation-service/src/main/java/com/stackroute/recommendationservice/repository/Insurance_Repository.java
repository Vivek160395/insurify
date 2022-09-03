package com.stackroute.recommendationservice.repository;

import com.stackroute.recommendationservice.model.Insurance;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.data.neo4j.repository.query.Query;

public interface Insurance_Repository extends Neo4jRepository<Insurance,Integer> {
    @Query("MATCH (a:Insurance(id:$id)),(b:InsuranceType(insuranceType:$insuranceType)) MERGE (a)-[r:TypeOfInsurance]->(b)")
    void createInsuranceTypeRelation(int id,String insuranceType);
}
