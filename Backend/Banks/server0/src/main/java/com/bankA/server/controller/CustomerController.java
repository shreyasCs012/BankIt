package com.bankA.server.controller;

import com.bankA.server.model.sql.MainCustomer;
import com.bankA.server.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
@RestController
@RequestMapping("/me")
public class CustomerController {

    @Autowired
    private CustomerService cust;

    @GetMapping("/profile")
    public MainCustomer profile(
            @RequestHeader("X-Bank-Customer-Id") Long customerId
    ) {
        return cust.getCustomerById(customerId);
    }
}
