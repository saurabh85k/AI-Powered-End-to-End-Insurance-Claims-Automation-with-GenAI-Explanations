package com.example.claims_automation.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;

@Entity
@Table(name = "policy_holders")
@Data
public class PolicyHolder {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String policyNumber;
    private String policyType;   // MOTOR, HEALTH
    private Double coverageLimit;
    private LocalDate policyStartDate;
    private LocalDate policyEndDate;
    private String email;
    private String phone;
}