package com.example.claims_automation.service;

import com.example.claims_automation.Data_Transfer_Object.ClaimRequestDto;
import com.example.claims_automation.entity.Claim;
import com.example.claims_automation.entity.PolicyHolder;
import com.example.claims_automation.repository.ClaimRepository;
import com.example.claims_automation.repository.PolicyHolderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
@RequiredArgsConstructor
public class ClaimService {

    private final ClaimRepository claimRepository;
    private final PolicyHolderRepository policyHolderRepository;
    private final String UPLOAD_DIR = "uploads/";

    // ---------------------- Public CRUD ----------------------
    public Claim saveClaim(ClaimRequestDto dto, String extractedText, String decisionReason, Double claimAmount) {
        Claim claim = new Claim();
        claim.setPolicyNumber(dto.getPolicyNumber());
        claim.setTitle(dto.getTitle());
        claim.setType(dto.getType());
        claim.setClaimDate(dto.getDate());
        claim.setDescription(dto.getDescription());
        claim.setLocation(dto.getLocation());
        claim.setStatus(dto.getStatus() != null ? dto.getStatus() : "Processing");
        claim.setFileName(dto.getFileName());
        claim.setExtractedText(extractedText);
        claim.setDecisionReason(decisionReason);
        claim.setClaimAmount(claimAmount);
        return claimRepository.save(claim);
    }

    public Claim saveClaim(ClaimRequestDto dto) {
        return saveClaim(dto, "", "", null);
    }

    public List<Claim> getAllClaims() {
        return claimRepository.findAll();
    }

    public Claim getClaimById(Long id) {
        return claimRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Claim not found with id: " + id));
    }

    // ---------------------- File Upload & OCR ----------------------
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

        // OCR extraction
        String extractedText = extractTextFromDocument(file);
        System.out.println("Extracted Text: " + extractedText);

        // Parse extracted fields
        String policyNumber = extractPolicyNumber(extractedText);
        String claimDate = extractClaimDate(extractedText);
        Double claimAmount = extractClaimAmount(extractedText);
        String description = extractDescription(extractedText);
        String claimType = extractClaimType(extractedText);
        String customerName = extractCustomerName(extractedText);

        // Create claim record with raw extracted values
        Claim claim = new Claim();
        claim.setFileName(newFileName);
        claim.setExtractedText(extractedText);
        claim.setPolicyNumber(policyNumber != null ? policyNumber : "Unknown");
        claim.setTitle("Auto-generated Claim");
        claim.setType(claimType != null ? claimType : "Unknown");
        claim.setClaimDate(claimDate);
        claim.setDescription(description);
        claim.setLocation(null);
        claim.setClaimAmount(claimAmount);
        claim.setStatus("Processing");
        claimRepository.save(claim);

        // Apply decision logic (full validation)
        Map<String, String> decision = decideClaimStatus(policyNumber, claimDate, claimAmount, customerName, claimType);
        claim.setStatus(decision.get("status"));
        claim.setDecisionReason(decision.get("reason"));
        claimRepository.save(claim);
        System.out.println("Decision: " + decision.get("status") + " - " + decision.get("reason"));

        return filePath.toString();
    }

    // ---------------------- OCR Service Call ----------------------
    private String extractTextFromDocument(MultipartFile file) {
        try {
            RestTemplate restTemplate = new RestTemplate();
            String ocrUrl = "http://localhost:8001/extract";

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.MULTIPART_FORM_DATA);

            MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
            body.add("file", new ByteArrayResource(file.getBytes()) {
                @Override
                public String getFilename() {
                    return file.getOriginalFilename();
                }
            });

            HttpEntity<MultiValueMap<String, Object>> requestEntity = new HttpEntity<>(body, headers);
            ResponseEntity<Map> response = restTemplate.postForEntity(ocrUrl, requestEntity, Map.class);

            if (response.getBody() != null) {
                return (String) response.getBody().get("extracted_text");
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return "OCR failed";
    }

    // ---------------------- Field Extraction Helpers ----------------------
    private String extractPolicyNumber(String text) {
        Pattern pattern = Pattern.compile("Policy Number:\\s*(\\S+)", Pattern.CASE_INSENSITIVE);
        Matcher matcher = pattern.matcher(text);
        if (matcher.find()) return matcher.group(1);
        pattern = Pattern.compile("\\b([A-Z]{3,}\\d{3,})\\b");
        matcher = pattern.matcher(text);
        if (matcher.find()) return matcher.group(1);
        return null;
    }

    private String extractClaimDate(String text) {
        Pattern pattern = Pattern.compile("Date:\\s*(\\d{2}-\\d{2}-\\d{4})", Pattern.CASE_INSENSITIVE);
        Matcher matcher = pattern.matcher(text);
        if (matcher.find()) return matcher.group(1);
        pattern = Pattern.compile("\\b(\\d{2}-\\d{2}-\\d{4})\\b");
        matcher = pattern.matcher(text);
        if (matcher.find()) return matcher.group(1);
        return null;
    }

    private Double extractClaimAmount(String text) {
        Pattern pattern = Pattern.compile("Claim Amount:\\s*(\\d+)", Pattern.CASE_INSENSITIVE);
        Matcher matcher = pattern.matcher(text);
        if (matcher.find()) return Double.parseDouble(matcher.group(1));
        pattern = Pattern.compile("(?:claim|amount)\\s+(\\d+)", Pattern.CASE_INSENSITIVE);
        matcher = pattern.matcher(text);
        if (matcher.find()) return Double.parseDouble(matcher.group(1));
        pattern = Pattern.compile("\\$(\\d+)");
        matcher = pattern.matcher(text);
        if (matcher.find()) return Double.parseDouble(matcher.group(1));
        return null;
    }

    private String extractDescription(String text) {
        Pattern pattern = Pattern.compile("Description:\\s*(.+)", Pattern.CASE_INSENSITIVE);
        Matcher matcher = pattern.matcher(text);
        if (matcher.find()) return matcher.group(1).trim();
        return text.length() > 100 ? text.substring(0, 100) : text;
    }

    private String extractClaimType(String text) {
        Pattern pattern = Pattern.compile("Claim Type:\\s*(\\w+)", Pattern.CASE_INSENSITIVE);
        Matcher matcher = pattern.matcher(text);
        if (matcher.find()) return matcher.group(1);
        return null;
    }

    private String extractCustomerName(String text) {
        Pattern pattern = Pattern.compile("Customer Name:\\s*(.+)", Pattern.CASE_INSENSITIVE);
        Matcher matcher = pattern.matcher(text);
        if (matcher.find()) return matcher.group(1).trim();
        return null;
    }

    // ---------------------- Decision Logic with Combined Reasons ----------------------
    private Map<String, String> decideClaimStatus(String policyNumber, String claimDate, Double claimAmount,
                                                  String customerName, String claimType) {
        Map<String, String> result = new HashMap<>();
        List<String> rejectReasons = new ArrayList<>();
        String flagReason = null;

        // ----- Step 1: Check missing fields -----
        if (policyNumber == null || policyNumber.trim().isEmpty()) {
            rejectReasons.add("Policy number missing");
        }
        if (customerName == null || customerName.trim().isEmpty()) {
            rejectReasons.add("Customer name missing");
        }
        if (claimType == null || claimType.trim().isEmpty()) {
            rejectReasons.add("Claim type missing");
        }
        if (claimAmount == null) {
            rejectReasons.add("Claim amount missing");
        }
        if (claimDate == null) {
            rejectReasons.add("Claim date missing");
        }

        // ----- Step 2: Fetch policy holder (only if policy number present) -----
        PolicyHolder policy = null;
        if (policyNumber != null && !policyNumber.trim().isEmpty()) {
            Optional<PolicyHolder> optPolicy = policyHolderRepository.findByPolicyNumber(policyNumber);
            if (optPolicy.isPresent()) {
                policy = optPolicy.get();
            } else {
                rejectReasons.add("Policy number " + policyNumber + " not found in records");
            }
        }

        // ----- Step 3: If policy exists, check mismatch fields -----
        if (policy != null) {
            if (customerName != null && !customerName.trim().isEmpty() && !policy.getName().equalsIgnoreCase(customerName.trim())) {
                rejectReasons.add("Customer name mismatch (Expected: " + policy.getName() + ", Found: " + customerName + ")");
            }
            if (claimType != null && !claimType.trim().isEmpty() && !policy.getPolicyType().equalsIgnoreCase(claimType.trim())) {
                rejectReasons.add("Policy type mismatch (Expected: " + policy.getPolicyType() + ", Found: " + claimType + ")");
            }

            // Check policy active period (only if policy exists)
            LocalDate today = LocalDate.now();
            if (today.isBefore(policy.getPolicyStartDate()) || today.isAfter(policy.getPolicyEndDate())) {
                rejectReasons.add("Policy is not active (valid from " + policy.getPolicyStartDate() + " to " + policy.getPolicyEndDate() + ")");
            }

            // Check claim date against policy period
            if (claimDate != null && !claimDate.trim().isEmpty()) {
                try {
                    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy");
                    LocalDate claimLocalDate = LocalDate.parse(claimDate, formatter);
                    if (claimLocalDate.isBefore(policy.getPolicyStartDate()) || claimLocalDate.isAfter(policy.getPolicyEndDate())) {
                        rejectReasons.add("Claim date " + claimDate + " is outside the policy period");
                    }
                } catch (Exception e) {
                    // Date format invalid -> FLAG (not REJECT)
                    flagReason = "Claim date format invalid (" + claimDate + "). Manual review required.";
                }
            }
        }

        // ----- Step 4: If any reject reasons, return REJECT with combined message -----
        if (!rejectReasons.isEmpty()) {
            String reason = String.join("; ", rejectReasons) + ". Claim rejected.";
            result.put("status", "REJECT");
            result.put("reason", reason);
            return result;
        }

        // ----- Step 5: Check claim amount against coverage limit (only if policy exists) -----
        if (policy != null && claimAmount != null && claimAmount > policy.getCoverageLimit()) {
            flagReason = "Claim amount $" + claimAmount + " exceeds coverage limit of $" + policy.getCoverageLimit() + ". Manual review required.";
        }

        // ----- Step 6: Final decision -----
        if (flagReason != null) {
            result.put("status", "FLAG");
            result.put("reason", flagReason);
        } else {
            result.put("status", "APPROVE");
            result.put("reason", "All policy details matched and claim amount within coverage limit.");
        }
        return result;
    }
}