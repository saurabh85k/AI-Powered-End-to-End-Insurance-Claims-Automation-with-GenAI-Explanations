package com.example.claims_automation.controller;

import com.example.claims_automation.entity.PolicyDocument;
import com.example.claims_automation.service.PolicyDocumentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/admin/policy")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class PolicyDocumentController {

    private final PolicyDocumentService policyDocumentService;

    @PostMapping("/upload")
    public ResponseEntity<Map<String, String>> uploadPolicy(
            @RequestParam("file") MultipartFile file,
            @RequestParam("policyType") String policyType) {
        try {
            PolicyDocument saved = policyDocumentService.uploadPolicy(file, policyType);
            Map<String, String> response = new HashMap<>();
            response.put("message", "Policy uploaded successfully");
            response.put("policyType", saved.getPolicyType());
            response.put("filePath", saved.getFilePath());
            return ResponseEntity.ok(response);
        } catch (IOException e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", "Upload failed: " + e.getMessage());
            return ResponseEntity.internalServerError().body(error);
        }
    }

    @GetMapping("/{policyType}")
    public ResponseEntity<PolicyDocument> getPolicy(@PathVariable String policyType) {
        PolicyDocument policy = policyDocumentService.getPolicyByType(policyType);
        return ResponseEntity.ok(policy);
    }
}