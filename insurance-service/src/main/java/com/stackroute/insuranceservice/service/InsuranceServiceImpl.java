package com.stackroute.insuranceservice.service;

import com.stackroute.insuranceservice.config.Producer;
import com.stackroute.insuranceservice.exceptions.PolicyAlreadyExistException;
import com.stackroute.insuranceservice.model.Insurance;
import com.stackroute.insuranceservice.rabbitMq.domain.DTO;
import com.stackroute.insuranceservice.repository.InsuranceRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
public class InsuranceServiceImpl implements InsuranceService{

    InsuranceRepo insuranceRepo;
    @Autowired
    Producer producer;

    @Autowired
    public InsuranceServiceImpl(InsuranceRepo insuranceRepo) {
        this.insuranceRepo = insuranceRepo;
    }

    @Override
    public Insurance saveInsurance(Insurance insurance) throws PolicyAlreadyExistException, IOException {
        DTO dto = new DTO();
        dto.setPolicyId(dto.getPolicyId());
        dto.setPolicyName(dto.getPolicyName());
        dto.setInsuranceType(dto.getInsuranceType());
        dto.setDescription(dto.getDescription());

        if (insuranceRepo.findById(insurance.getPolicyId()).isPresent()){
            throw new PolicyAlreadyExistException();
        }
        else {
            insuranceRepo.save(insurance);
            producer.sendingMessageToRabbitMQServer(dto);
            return insurance;
        }
    }

    @Override
    public List<Insurance> getInsuranceByInsuranceType(String insuranceType) {
        return null;
    }
}
