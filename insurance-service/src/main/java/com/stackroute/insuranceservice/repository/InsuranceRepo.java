package com.stackroute.insuranceservice.repository;

import com.stackroute.insuranceservice.model.Insurance;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface InsuranceRepo extends ElasticsearchRepository<Insurance,String> {
    Optional<Insurance> findPolicyByPolicyName(String policyName);
}
