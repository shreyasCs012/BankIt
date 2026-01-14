package com.BankIt.Server.controller;

import com.BankIt.Server.entity.User;
import com.BankIt.Server.security.BankUserPrincipal;
import com.BankIt.Server.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.Authentication;
@RestController
public class UserControler {

    private final UserService service;

    public UserControler(UserService service) {
        this.service = service;
    }

    @PostMapping("/register")
    public User register(@RequestBody User user){
        return service.register(user);
    }

    @PostMapping("/auth/login")
    public String login(@RequestBody User user) {
        return service.verify(user); // 🔥 returns JWT
    }

    @GetMapping("/me")
    public String getLoggedInUser(
            @org.springframework.security.core.annotation.AuthenticationPrincipal
            BankUserPrincipal user) {

        return user.getUsername();
    }
    @GetMapping("/me/bank-code")
    public String getBankCode(
            @AuthenticationPrincipal BankUserPrincipal user) {

        if (user == null) {
            return "USER IS NULL";
        }

        return user.getBankCode();
    }

}
