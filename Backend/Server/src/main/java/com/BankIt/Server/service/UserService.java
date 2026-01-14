package com.BankIt.Server.service;

import com.BankIt.Server.entity.User;
import com.BankIt.Server.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
@Service
public class UserService {
    @Autowired
    private UserRepo repo;
    @Autowired
    private BankJWTService jwtservice;
    @Autowired
    private AuthenticationManager authManager;
    private BCryptPasswordEncoder encoder =new BCryptPasswordEncoder(12);

    public User register(User user){
        user.setPassword(encoder.encode(user.getPassword()));
        return  repo.save(user);
    }

    public String verify(User loginRequest) {

        // 1️⃣ Authenticate username + password
        Authentication authentication =
                authManager.authenticate(
                        new UsernamePasswordAuthenticationToken(
                                loginRequest.getUsername(),
                                loginRequest.getPassword()
                        )
                );

        if (!authentication.isAuthenticated()) {
            throw new RuntimeException("Invalid credentials");
        }

        // 2️⃣ Load user from DB (SOURCE OF TRUTH)
        User dbUser = repo.findByUsername(loginRequest.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));

        // 3️⃣ Validate bankCode (client hint, DB is truth)
        if (loginRequest.getBankCode() == null) {
            throw new RuntimeException("Bank code is required");
        }

        if (!dbUser.getBankCode().equalsIgnoreCase(loginRequest.getBankCode())) {
            throw new RuntimeException("Invalid bank code");
        }

        // 4️⃣ 🔐 Generate JWT using DB values ONLY
        return jwtservice.generateToken(
                dbUser.getUsername(),
                dbUser.getBankCode(),
                dbUser.getBankCustomerId()   // 🔥 THIS IS THE KEY ADDITION
        );
    }


}
