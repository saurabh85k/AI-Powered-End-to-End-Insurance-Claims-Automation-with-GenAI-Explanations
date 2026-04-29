package com.example.claims_automation.service;

import com.example.claims_automation.Data_Transfer_Object.ClaimRequestDto;
import com.example.claims_automation.entity.Claim;
import com.example.claims_automation.repository.ClaimRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ClaimService {

    private final ClaimRepository claimRepository;
    private final String UPLOAD_DIR = "uploads/";

    public Claim saveClaim(ClaimRequestDto dto) {
        Claim claim = new Claim();
        claim.setPolicyNumber(dto.getPolicyNumber());
        claim.setDescription(dto.getDescription());
        return claimRepository.save(claim);
    }

    public Claim getClaimById(Long id) {
        return claimRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Claim not found with id: " + id));
    }

    public String handleFileUpload(MultipartFile file) throws IOException {
        Path uploadPath = Paths.get(UPLOAD_DIR);
        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }

        String originalFilename = file.getOriginalFilename();
        String extension = originalFilename.substring(originalFilename.lastIndexOf("."));
        String newFileName = UUID.randomUUID().toString() + extension;
        Path filePath = uploadPath.resolve(newFileName);

        Files.copy(file.getInputStream(), filePath);
        return filePath.toString();
    }
}