### 1. **HTML Structure Setup**

- Create a basic HTML form with form fields (dealer ID, email, name, phone, etc.)
- Add a dedicated container for the Turnstile widget: `<div id="turnstile-container"></div>`
- Include two buttons: a "Verify" button and a hidden "Submit" button
- Load the Turnstile API script with explicit rendering: `https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit`

### 2. **Turnstile Configuration**

- Define your Cloudflare Turnstile site key (`SITE_KEY`)
- Set up the Turnstile widget with explicit rendering mode
- Configure callback functions for success, expiration, and error handling

### 3. **Two-Step Verification Process**

- **Step 1**: User clicks "Verify" button → Turnstile challenge appears
- **Step 2**: After successful verification → Show "Submit" button, hide "Verify" button
- Store the verification token temporarily for form submission

### 4. **Form Submission Logic**

- Prevent default form submission behavior
- Validate that a Turnstile token exists before allowing submission
- Collect all form data and combine it with the stored token
- Send data to your backend endpoint (Cloudflare Workers in this case)
- Handle success/error responses appropriately

### 5. **State Management**

- Track form data and verification token in variables
- Manage UI state transitions between verify and submit phases
- Reset form and UI state after successful submission
- Handle token expiration and errors by resetting the verification state

### 6. **Error Handling**

- Implement callbacks for Turnstile expiration and errors
- Provide user feedback for verification failures
- Handle network errors during form submission
- Disable submit button during submission to prevent double-submission

### 7. **Styling**

- Style form fields with consistent spacing and focus states
- Style buttons with hover effects and disabled states
- Ensure Turnstile widget container has appropriate dimensions
- Make the form responsive and user-friendly

### Key Features of This Implementation:

- **Managed Challenge**: Uses Turnstile's managed challenge mode for better UX
- **Two-Phase Submission**: Separates verification from form submission
- **Token Validation**: Ensures verification is completed before allowing submission
- **Error Recovery**: Handles token expiration and errors gracefully
- **Clean State Management**: Resets form and UI state after successful submission
