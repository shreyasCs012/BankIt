package com.bankB.server.model.sql;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@DiscriminatorValue("FD")
public class FixedDepositAccount extends Account {
    private int durationInMonths;
    private double fdInterestRate;
}
