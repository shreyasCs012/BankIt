package com.bankA.server.repository.sql;
import com.bankA.server.model.sql.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MainAccount extends JpaRepository<Account, String> {

}


