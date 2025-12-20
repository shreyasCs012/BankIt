package com.bankB.server.service;



import com.bankB.server.model.sql.MainCustomer;
import com.bankB.server.repository.sql.MainCustomerRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CustomerService {

    @Autowired
    private MainCustomerRepo custrepo;

    public MainCustomer getCustomerById(Long customerId) {
        return custrepo.findById(customerId).orElse(null);
    }

}
