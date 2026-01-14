package com.BankIt.Server.service;


import com.BankIt.Server.entity.User;
import com.BankIt.Server.repo.UserRepo;
import com.BankIt.Server.security.BankUserPrincipal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class BankUserDetailsService implements UserDetailsService {

    private final UserRepo userRepository;

    public BankUserDetailsService(UserRepo userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) {

        User user = userRepository.findByUsername(username)
                .orElseThrow(() ->
                        new UsernameNotFoundException("User not found"));

        return new BankUserPrincipal(
                user.getUsername(),
                user.getPassword(),
                user.getBankCode(),
                List.of(new SimpleGrantedAuthority("ROLE_USER"))
        );
    }
}
