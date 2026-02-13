package com.example.backend;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {

    @GetMapping("/")
    public String helloWorld(){
        String rez = "Welcome to our website!<br>" +
                "We hope that you will have a great experience visiting our application!\n";
        return rez;
    }

}
