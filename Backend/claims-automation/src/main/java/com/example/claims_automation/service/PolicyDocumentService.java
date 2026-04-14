package com.example.claims_automation.service;

import com.example.claims_automation.entity.PolicyDocument;
import com.example.claims_automation.repository.PolicyDocumentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class PolicyDocumentService {

    private final PolicyDocumentRepository policyDocumentRepository;
    private final String POLICY_UPLOAD_DIR = "policy_files/";

    public PolicyDocument uploadPolicy(MultipartFile file, String policyType) throws IOException {
        // Create directory if not exists
        Path uploadPath = Paths.get(POLICY_UPLOAD_DIR);
        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }

        // Generate unique filename
        String originalFilename = file.getOriginalFilename();
        String extension = originalFilename.substring(originalFilename.lastIndexOf("."));
        String newFileName = policyType + "_" + UUID.randomUUID().toString() + extension;
        Path filePath = uploadPath.resolve(newFileName);

        // Save file
        Files.copy(file.getInputStream(), filePath);

        // Save metadata in database
        PolicyDocument doc = new PolicyDocument();
        doc.setPolicyType(policyType);
        doc.setFileName(originalFilename);
        doc.setFilePath(filePath.toString());
        doc.setUploadedAt(LocalDateTime.now());

        return policyDocumentRepository.save(doc);
    }

    public PolicyDocument getPolicyByType(String policyType) {
        return policyDocumentRepository.findByPolicyType(policyType)
                .orElseThrow(() -> new RuntimeException("Policy not found for type: " + policyType));
    }
}