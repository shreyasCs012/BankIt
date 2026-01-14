package com.BankIt.Server.service;

import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
@Service
public class AccountClient {

    private final WebClient webClient;

    public AccountClient(WebClient webClient) {
        this.webClient = webClient;
    }

    public String callGateway(String jwt) {

        return webClient.get()
                .uri("/me/bank-code")
                .headers(h -> h.add(HttpHeaders.AUTHORIZATION, "Bearer " + jwt))
                .retrieve()
                .bodyToMono(String.class)
                .block();

    }
}
