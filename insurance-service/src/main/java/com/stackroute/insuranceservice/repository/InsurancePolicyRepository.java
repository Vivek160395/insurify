package com.stackroute.insuranceservice.repository;

import com.stackroute.insuranceservice.model.InsurancePolicy;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

public interface InsurancePolicyRepository extends ElasticsearchRepository<Integer, InsurancePolicy> {
}
