package com.example.claims_automation.repository;

import com.example.claims_automation.entity.PolicyHolder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface PolicyHolderRepository extends JpaRepository<PolicyHolder, Long> {
    Optional<PolicyHolder> findByPolicyNumber(String policyNumber);
}