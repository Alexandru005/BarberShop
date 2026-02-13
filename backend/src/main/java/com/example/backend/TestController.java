package com.example.backend;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController // (1) Spunem Spring-ului că această clasă gestionează cereri web
public class TestController {

    @GetMapping("/salut") // (2) Definim adresa la care răspunde metoda
    public String spuneSalut() {
        return "Hello world!"; // (3) Răspunsul
    }
}
