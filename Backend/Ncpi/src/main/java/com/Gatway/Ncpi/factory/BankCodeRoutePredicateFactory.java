package com.Gatway.Ncpi.factory;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cloud.gateway.handler.predicate.AbstractRoutePredicateFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;

import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.function.Predicate;

@Component
public class BankCodeRoutePredicateFactory
        extends AbstractRoutePredicateFactory<BankCodeRoutePredicateFactory.Config> {

    @Value("${jwt.secret}")
    private String jwtSecret;

    public BankCodeRoutePredicateFactory() {
        super(Config.class);
    }

    // 🔥 THIS IS THE CRITICAL FIX
    @Override
    public List<String> shortcutFieldOrder() {
        return List.of("bankCode");
    }

    @Override
    public Predicate<ServerWebExchange> apply(Config config) {
        return exchange -> {

            String auth = exchange.getRequest()
                    .getHeaders()
                    .getFirst(HttpHeaders.AUTHORIZATION);

            if (auth == null || !auth.startsWith("Bearer ")) {
                return false;
            }

            try {
                Claims claims = Jwts.parserBuilder()
                        .setSigningKey(Keys.hmacShaKeyFor(jwtSecret.getBytes(StandardCharsets.UTF_8)))
                        .build()
                        .parseClaimsJws(auth.substring(7))
                        .getBody();

                String bankCode = claims.get("bankCode", String.class);

                System.out.println("[Gateway Predicate] config.bankCode = " + config.bankCode);
                System.out.println("[Gateway Predicate] jwt.bankCode    = " + bankCode);

                return config.bankCode.equalsIgnoreCase(bankCode);

            } catch (Exception e) {
                e.printStackTrace();
                return false;
            }
        };
    }

    public static class Config {
        private String bankCode;
        public String getBankCode() { return bankCode; }
        public void setBankCode(String bankCode) { this.bankCode = bankCode; }
    }
}
