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
    private String title;
    private String type;
    private String claimDate;
    private String description;
    private String location;
    private String status;
    private String fileName;

    // New field for extracted claim amount
    private Double claimAmount;

    @Column(columnDefinition = "TEXT")
    private String extractedText;

    @Column(columnDefinition = "TEXT")
    private String decisionReason;
}