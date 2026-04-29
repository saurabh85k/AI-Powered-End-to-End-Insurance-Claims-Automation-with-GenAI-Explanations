package com.example.claims_automation.Data_Transfer_Object;

import lombok.Data;

@Data
public class ClaimRequestDto {
    private String policyNumber;
    private String title;
    private String type;
    private String date;
    private String description;
    private String location;
    private String status;
    private String fileName;
}