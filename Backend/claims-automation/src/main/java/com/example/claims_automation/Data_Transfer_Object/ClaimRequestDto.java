package com.example.claims_automation.Data_Transfer_Object;

import lombok.Data;

@Data
public class ClaimRequestDto {
    private String policyNumber;
    private String description;
}