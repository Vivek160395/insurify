package com.stackroute.insuranceservice.repository;

import com.stackroute.insuranceservice.model.LifeInsurancePolicy;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LifeInsurancePolicyRepository extends ElasticsearchRepository<LifeInsurancePolicy,Integer> {
    public LifeInsurancePolicy findByPolicyName(String policyName);
}
