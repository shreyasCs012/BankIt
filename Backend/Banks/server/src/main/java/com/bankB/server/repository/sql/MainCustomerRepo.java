package com.bankB.server.repository.sql;


import com.bankB.server.model.sql.MainCustomer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MainCustomerRepo extends JpaRepository<MainCustomer, Long> {
}



