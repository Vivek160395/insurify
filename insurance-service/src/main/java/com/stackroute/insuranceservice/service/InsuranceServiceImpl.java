package com.stackroute.insuranceservice.service;

import com.stackroute.insuranceservice.config.Producer;
import com.stackroute.insuranceservice.exceptions.PolicyAlreadyExistException;
import com.stackroute.insuranceservice.exceptions.PolicyNotFoundException;
import com.stackroute.insuranceservice.model.Insurance;
import com.stackroute.insuranceservice.model.User;
import com.stackroute.insuranceservice.rabbitMq.domain.DTO;
import com.stackroute.insuranceservice.repository.InsuranceRepo;
import com.stackroute.insuranceservice.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
public class InsuranceServiceImpl implements InsuranceService {

    InsuranceRepo insuranceRepo;
    UserRepository userRepository;
    @Autowired
    Producer producer;

    @Autowired
    public InsuranceServiceImpl(InsuranceRepo insuranceRepo, UserRepository userRepository) {
        this.insuranceRepo = insuranceRepo;
        this.userRepository = userRepository;
    }

    @Override
    public Insurance saveInsurance(Insurance insurance, String userEmail)
            throws PolicyAlreadyExistException, IOException {
        if (insuranceRepo.findById(insurance.getPolicyId()).isPresent()) {
            throw new PolicyAlreadyExistException();
        } else {
            User user = userRepository.findById(userEmail).get();
            insurance.setUserEmail(userEmail);
            user.getInsuranceBought().add(insurance.getPolicyId());
            Insurance insurance2 = insuranceRepo.save(insurance);
            return insurance2;
        }
    }

    @Override
    public Iterable<Insurance> findAllInsurance() {
        return insuranceRepo.findAll();
    }

    @Override
    public Optional<Insurance> getPolicyByPolicyId(String policyId) throws PolicyNotFoundException {
        if (insuranceRepo.findById(policyId).isPresent()) {
            return insuranceRepo.findById(policyId);
        } else {
            throw new PolicyNotFoundException();
        }
    }

    @Override
    public boolean deletePolicyByPolicyId(String policyId) throws PolicyNotFoundException {
        if (insuranceRepo.findById(policyId).isPresent()) {
            insuranceRepo.deleteById(policyId);
            return true;
        } else {
            throw new PolicyNotFoundException();
        }
    }

    @Override
    public Optional<Insurance> findPolicyByPolicyName(String policyName) {
        return insuranceRepo.findPolicyByPolicyName(policyName);
    }

    @Override
    public User addUser(User user) {
        return userRepository.save(user);
    }

    @Override
    public List<String> getAllInsuranceOfuser(String userEmail) {
        User user = userRepository.findById(userEmail).get();
        return user.getInsuranceBought();
    }
}
