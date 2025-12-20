package com.bankB.server.model.sql;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "Accounts")
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "discriminator")
public class Account {

    @Id
    private String accountNo;
    private double balance;
    @Column(name = "discriminator", insertable = false, updatable = false)
    private String discriminator;

}
