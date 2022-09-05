package com.stackroute.insuranceservice.repository;

import com.stackroute.insuranceservice.model.InsurancePolicy;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InsurancePolicyRepository extends ElasticsearchRepository<InsurancePolicy, Integer> {
}
