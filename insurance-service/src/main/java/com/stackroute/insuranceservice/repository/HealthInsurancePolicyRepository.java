package com.stackroute.insuranceservice.repository;

import com.stackroute.insuranceservice.model.HealthInsurancePolicy;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HealthInsurancePolicyRepository extends ElasticsearchRepository<HealthInsurancePolicy, Integer> {
    public HealthInsurancePolicy getPolicyByPolicyName(String policyName);
}
