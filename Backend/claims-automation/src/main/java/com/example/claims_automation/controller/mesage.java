package com.example.claims_automation.controller;


import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/test")
public class mesage {

    @GetMapping("/print")
    public String hello(){
        return "Your application runs successfull!";
    }
}
