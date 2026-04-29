# Integrate Frontend with Backend

This plan details the necessary changes to connect the React frontend with the existing Spring Boot backend without modifying any backend code. 

## User Review Required

Please review the proposed changes below. The focus is on making sure the frontend sends and receives the correct data structures that the backend expects, especially for the OCR file upload feature and the manual claim submission.

## Open Questions
- The backend currently does not have an authentication/user entity. The frontend uses `localStorage` for `Register.jsx` and `Login.jsx`. Are you okay with leaving authentication as it is (mocked with local storage) for now, or did you plan to add a backend Auth controller later?
- For the `Form.jsx`, do you want to keep a manual submission form, or should we strictly use the document upload feature (`/api/claims/upload`) which automatically extracts claim details using OCR? I propose supporting both in the form (a manual form, plus an "Auto-Fill via Upload" or "Submit Document" button).

## Proposed Changes

### Frontend Integration

#### [MODIFY] `d:\claims-automation-project\claim-frontend\src\pages\Form.jsx`
- Add a new input field for `policyNumber` since the backend `ClaimRequestDto` expects it and the decision logic relies on it.
- Update the form submission logic:
  - If the user selects a document, use `FormData` and `fetch` to send a `POST` request to `http://localhost:8080/api/claims/upload`. This will trigger the backend's OCR and automated decision logic.
  - If no file is selected, fallback to the existing JSON `POST` request to `http://localhost:8080/api/claims` for manual submission, but ensure `policyNumber` is included.

#### [MODIFY] `d:\claims-automation-project\claim-frontend\src\pages\ClaimDetails.jsx`
- Update the UI to display the newly added fields from the backend `Claim` entity.
- Display `claimAmount`, `policyNumber`, `claimDate`, and `decisionReason` (if the claim was Flagged or Rejected).
- Show a section for the `extractedText` from the OCR process if it exists, so the user can verify what the AI read from the document.

#### [MODIFY] `d:\claims-automation-project\claim-frontend\src\pages\Dashboard.jsx`
- Ensure the dashboard cleanly displays the key fields like `policyNumber` or `claimAmount` if you want them visible at a glance.
- Verify the colors for the new status `"FLAG"` (currently handles Approved and Rejected, but the backend decision logic also sets "FLAG" or "Processing"). We will add a color for `"FLAG"`.

## Verification Plan

### Manual Verification
1. Run the frontend (`npm run dev`) and navigate to the "New Claim" form.
2. Submit a claim manually with all fields and ensure it appears in the Dashboard.
3. Upload a sample document and verify that it successfully hits the `/api/claims/upload` endpoint and creates a claim via OCR.
4. Open the `ClaimDetails` page for the uploaded claim and verify that the `decisionReason`, `claimAmount`, and `extractedText` are visible.
