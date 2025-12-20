package com.bankB.server.controller;

import com.bankB.server.model.sql.MainCustomer;
import com.bankB.server.service.CustomerService;
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
    public String greet(){
        return "hi bank 2";
    }
}
