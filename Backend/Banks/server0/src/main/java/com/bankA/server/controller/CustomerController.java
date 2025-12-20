package com.bankA.server.controller;

import com.bankA.server.model.sql.MainCustomer;
import com.bankA.server.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CustomerController {
    @Autowired
    private CustomerService cust;
    @RequestMapping("/login/{id}")
    public MainCustomer login(@PathVariable Long id) {
        return cust.getCustomerById(id);
    }
    @RequestMapping("/")
    public String hi() {
        return "bank1";
    }
}
