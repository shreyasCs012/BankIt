package com.bankB.server.repository.sql;

import com.bankB.server.model.sql.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MainAccount extends JpaRepository<Account, String> {

}


