package com.stackroute.recommendationservice.repository;

import com.stackroute.recommendationservice.model.Insurance;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.data.neo4j.repository.query.Query;

public interface Insurance_Repository extends Neo4jRepository<Insurance,Integer> {
    @Query("MATCH (a:Insurance),(b:InsuranceType) WHERE a.insuranceId=$insuranceId AND b.insuranceType=$insuranceType CREATE (a)-[r:TypeOfInsurance]->(b)")
    void createInsuranceTypeRelation(int insuranceId,String insuranceType);

    @Query("MATCH (a:Insurance{insuranceId:$insuranceId}),(b:Age{age:$age}) CREATE (a)-[r:ForAge]->(b)")
    void createAgeRelation(int insuranceId,Integer age);

    @Query("MATCH (a:Insurance{insuranceId:$insuranceId}),(b:Occupation{occupationName: $occupationName}) CREATE (a)-[:for]->(b)")
    void createOccupationRelation(int insuranceId,String occupationName);

    @Query("MATCH (a:Insurance{insuranceId:$insuranceId}),(b:InsuranceType{insuranceType:$insuranceType}) RETURN exists ((a)<-[:TypeOfInsurance]-(b))")
    boolean checkInsuranceTypeRelationship(int insuranceId,String insuranceType);

    @Query("MATCH (a:Insurance{insuranceId:$insuranceId}),(b:Age{age:$age}) RETURN exists ((a)<-[:ForAge]-(b))")
    boolean checkAgeRelationship(int insuranceId,Integer age);

    @Query("MATCH (a:Insurance{insuranceId:$insuranceId}),(b:Occupation{occupationName: $occupationName}) RETURN exists ((a)<-[:for]-(b))")
    boolean checkOccupationRelation(int insuranceId,String occupationName);
}
