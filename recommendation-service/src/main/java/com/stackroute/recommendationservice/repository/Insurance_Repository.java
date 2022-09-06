package com.stackroute.recommendationservice.repository;

import com.stackroute.recommendationservice.model.Insurance;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.data.neo4j.repository.query.Query;

import java.util.List;

public interface Insurance_Repository extends Neo4jRepository<Insurance,Integer> {
    @Query("MATCH (a:Insurance),(b:InsuranceType) WHERE a.insuranceId=$insuranceId AND b.insuranceType=$insuranceType CREATE (a)-[r:TypeOfInsurance]->(b)")
    void createInsuranceTypeRelation(int insuranceId,String insuranceType);

    @Query("MATCH (a:Insurance{insuranceId:$insuranceId}),(b:Age{age:$age}) CREATE (a)-[r:ForAge]->(b)")
    void createAgeRelation(int insuranceId,int age);

    @Query("MATCH (a:Insurance{insuranceId:$insuranceId}),(b:Occupation{occupationName: $occupationName}) CREATE (a)-[:for]->(b)")
    void createOccupationRelation(int insuranceId,String occupationName);

    @Query("MATCH (a:Insurance{insuranceId:$insuranceId}),(b:InsuranceType{insuranceType:$insuranceType}) RETURN exists ((a)<-[:TypeOfInsurance]-(b))")
    boolean checkInsuranceTypeRelationship(int insuranceId,String insuranceType);

    @Query("MATCH (a:Insurance{insuranceId:$insuranceId}),(b:Age{age:$age}) RETURN exists ((a)<-[:ForAge]-(b))")
    boolean checkAgeRelationship(int insuranceId,int age);

    @Query("MATCH (a:Insurance{insuranceId:$insuranceId}),(b:Occupation{occupationName: $occupationName}) RETURN exists ((a)<-[:for]-(b))")
    boolean checkOccupationRelation(int insuranceId,String occupationName);

    @Query("MATCH (a:Insurance),(b:Age{age:$age}) WHERE (b)<-[:ForAge]-(a) RETURN a")
    List<Insurance> getAllInsurancesMatchingWithAge(int age);

    @Query("MATCH (a:Insurance),(b:Occupation{occupationName: $occupationName}) WHERE (b)<-[:for]-(a) RETURN a")
    List<Insurance> getAllInsurancesMatchingWithOccupation(String occupationName);

    @Query("MATCH (a:Insurance),(b:InsuranceType{insuranceType:$insuranceType}) WHERE (b)<-[:TypeOfInsurance]-(a) RETURN a")
    List<Insurance> getAllInsurancesMatchingWithInsuranceType(String insuranceType);

    @Query("MATCH (n:Insurance) RETURN n")
    List<Insurance> getAllInsurances();

    @Query("MATCH (a:User),(b:Insurance) WHERE b.insuranceId = $insuranceId AND a.userEmail=$userEmail CREATE (a)-[r:Bought]->(b)")
    void createUserToInsuranceRelationship(int insuranceId,String userEmail);

    @Query("MATCH (a:User),(b:Insurance) WHERE b.insuranceId = $insuranceId AND a.userEmail=$userEmail RETURN exists ((a)<-[:Bought]-(b))")
    boolean checkUserToInsuranceRelationship(int insuranceId,String userEmail);
}

//    @Query("MATCH (a:Insurance{insuranceId:$insuranceId}),(b:Vehicle{vehicleType:$vehicleType}) RETURN exists ((a)<-[:ForAge]-(b))")
//    boolean checkVehicleRelationship(int insuranceId,String vehicleType);

//    @Query("MATCH (a:Insurance),(b:Vehicle{vehicleType:$vehicleType}) WHERE (b)<-[:TypeOfInsurance]-(a) RETURN a")
//    List<Insurance> getAllInsurancesMatchingWithVehicle(String vehicleType);

//    @Query("MATCH (a:Insurance{insuranceId:$insuranceId}),(b:Vehicle{vehicleType: $vehicleType}) CREATE (a)-[:for]->(b)")
//    void createVehicleRelation(int insuranceId,String vehicleType);
