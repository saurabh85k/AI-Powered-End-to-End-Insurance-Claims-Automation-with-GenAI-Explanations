package com.example.claims_automation.entity;


import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Table(name = "policy_documents")
@Data
public class PolicyDocument {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String policyType;
    private String fileName;
    private String filePath;
    private LocalDateTime uploadedAt;
}
