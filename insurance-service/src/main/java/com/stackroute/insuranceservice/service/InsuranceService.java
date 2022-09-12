package com.stackroute.insuranceservice.service;

import com.stackroute.insuranceservice.exceptions.PolicyAlreadyExistException;
import com.stackroute.insuranceservice.model.Insurance;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface InsuranceService {

    public Insurance saveInsurance(Insurance insurance) throws PolicyAlreadyExistException, IOException;

    public List<Insurance> getInsuranceByInsuranceType(String insuranceType);
}
