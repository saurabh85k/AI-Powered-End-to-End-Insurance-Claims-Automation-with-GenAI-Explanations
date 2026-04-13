package com.example.claims_automation.entity;


import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "claims")
@Data
public class Claim {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String policyNumber;
    private String description;
}
