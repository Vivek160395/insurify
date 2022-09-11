package com.stackroute.insuranceservice.repository;

import com.stackroute.insuranceservice.model.AutomobileInsurancePolicy;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AutomobilesInsurancePolicyRepository extends ElasticsearchRepository<AutomobileInsurancePolicy,String> {
    public AutomobileInsurancePolicy findPolicyByPolicyName(String policyName);
}
