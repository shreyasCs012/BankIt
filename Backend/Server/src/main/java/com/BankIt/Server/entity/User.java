package com.BankIt.Server.entity;

import jakarta.persistence.*;
import lombok.*;
@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String username;

    @Column(nullable = false)
    private String password;

    // Which bank to route to
    @Column(nullable = false)
    private String bankCode;

    // 🔥 Which customer inside that bank
    @Column(nullable = false)
    private Long bankCustomerId;
}
