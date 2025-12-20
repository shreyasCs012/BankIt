package com.bankB.server.model.sql;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Table(name = "customers")  // ✅ map to the correct table
@Data
@NoArgsConstructor
@AllArgsConstructor
public class MainCustomer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long customerId;

    private String customerName;
    private String customerMail;

    @OneToMany(fetch = FetchType.EAGER)
    @JoinColumn(name = "customer_id") // foreign key in accounts table
    private List<Account> accounts;
}
