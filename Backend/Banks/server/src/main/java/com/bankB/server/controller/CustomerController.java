package com.bankB.server.controller;

import com.bankB.server.model.sql.MainCustomer;
import com.bankB.server.service.CustomerService;
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
        System.out.println("✅ SBI SERVICE HIT (8082)");
        System.out.println("CustomerId = " + customerId);

        return cust.getCustomerById(customerId);
    }
}
