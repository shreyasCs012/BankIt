package com.bankA.server.service;

import com.bankA.server.model.sql.MainCustomer;
import com.bankA.server.repository.sql.MainCustomerRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
@Service
public class CustomerService {

    @Autowired
    MainCustomerRepo custrepo;

    public MainCustomer getCustomerById(Long customerId) {
        return custrepo.findById(customerId)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Customer NOT FOUND in SBI DB: " + customerId
                        )
                );
    }
}

