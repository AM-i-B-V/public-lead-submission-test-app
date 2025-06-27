// Turnstile Configuration - using Vite's import.meta.env
const SITE_KEY = import.meta.env.VITE_SITE_KEY;
const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;

// Store form data temporarily
let formDataToSubmit = null;
let widgetId = null; // Store widget ID for reset

// DOM Elements
const form = document.getElementById("leadForm");
const submitBtn = document.getElementById("submitBtn");
const turnstileContainer = document.getElementById("turnstile-container");
const statusMessage = document.getElementById("statusMessage");

// Helper to set submit button state
function setSubmitEnabled(enabled) {
  submitBtn.disabled = !enabled;
  submitBtn.style.cursor = enabled ? "pointer" : "not-allowed";
  submitBtn.style.backgroundColor = enabled ? "#56ab2f" : "#ccc";
}

// Function to reset/refresh Turnstile token
function refreshTurnstile() {
  if (widgetId !== null) {
    window.turnstile.reset(widgetId);
  }
  setSubmitEnabled(false);
  formDataToSubmit = null;
}

// Wait for DOM and Turnstile to be ready, then render the widget
function renderTurnstile() {
  setSubmitEnabled(false); // Disable while token is not ready
  widgetId = window.turnstile.render("#turnstile-container", {
    sitekey: SITE_KEY,
    appearance: "always", // Always show the widget
    theme: "light", // Light theme
    size: "normal", // Normal size
    action: "submit_form", // Action name for analytics
    callback: function (token) {
      formDataToSubmit = { token: token, siteKey: SITE_KEY };
      setSubmitEnabled(true); // Enable when token is ready
      console.log("New token generated:", token);
      showStatus(
        "Verification successful! You can now submit the form.",
        "success"
      );
    },
    "error-callback": function () {
      formDataToSubmit = null;
      setSubmitEnabled(false); // Disable on error
      console.log("turnstile challenge failed");
      showStatus(
        "There was an error with the Turnstile challenge. Please try again.",
        "error"
      );
    },
    "expired-callback": function () {
      formDataToSubmit = null;
      setSubmitEnabled(false); // Disable on expiration
      console.log("Token expired, please refresh");
      showStatus("Turnstile challenge expired. Please verify again.", "error");
    },
    "timeout-callback": function () {
      console.log("Challenge timed out, please try again");
      showStatus("Challenge timed out, please try again", "error");
      refreshTurnstile();
    },
    "refresh-timeout": "auto", // Auto refresh on timeout
  });
}

// Initialize the application
document.addEventListener("DOMContentLoaded", function () {
  initializeForm();
  setupEventListeners();

  // Initialize Turnstile
  if (window.turnstile) {
    renderTurnstile();
  } else {
    const interval = setInterval(() => {
      if (window.turnstile) {
        clearInterval(interval);
        renderTurnstile();
      }
    }, 100);
  }
});

function initializeForm() {
  // Show status message
  showStatus(
    "Please fill out the form and complete the verification to continue.",
    "info"
  );
}

function setupEventListeners() {
  // Form submission
  form.addEventListener("submit", handleFormSubmit);

  // Form field changes to enable/disable submit button
  const requiredFields = form.querySelectorAll("[required]");
  requiredFields.forEach((field) => {
    field.addEventListener("input", validateRequiredFields);
  });

  // Initial validation
  validateRequiredFields();
}

function validateRequiredFields() {
  const requiredFields = form.querySelectorAll("[required]");
  let allFilled = true;

  requiredFields.forEach((field) => {
    if (!field.value.trim()) {
      allFilled = false;
    }
  });

  // Only enable submit if both form is filled AND we have a token
  const canSubmit = allFilled && formDataToSubmit && formDataToSubmit.token;
  setSubmitEnabled(canSubmit);
}

async function handleFormSubmit(event) {
  event.preventDefault();

  // Ensure we have a valid token
  if (!formDataToSubmit || !formDataToSubmit.token) {
    showStatus("Please complete the verification first.", "error");
    return;
  }

  setSubmitEnabled(false); // Disable while submitting
  const formData = new FormData(event.target);
  const data = {};
  formData.forEach((value, key) => {
    data[key] = value;
  });
  console.log("Form submitted:", data);

  try {
    // Structure the data according to the API schema
    const leadPayload = {
      // Turnstile verification
      sitekey: formDataToSubmit.siteKey,
      token: formDataToSubmit.token,

      // Required lead fields
      initiative: data.initiative,
      source: data.source,
      leadType: data.leadType,
      dealerId: data.dealerId,

      // Prospect information
      prospect: {
        firstName: data.firstName,
        lastName: data.lastName,
        emailAddress: data.emailAddress,
        phoneNumber: data.phoneNumber,
        address: data.address,
        company: data.company,
        preferredCommunicationChannel: data.preferredCommunicationChannel,
      },

      // Optional fields
      title: data.title,
      customerMessage: data.customerMessage,
      channel: data.channel,
      campaign: data.campaign,
      leadDepartment: data.leadDepartment,
      correlationId: data.correlationId,
      externalLink: data.externalLink,
      advertisementLink: data.advertisementLink,

      // Default values
      isExternalSystemLeading: false,
    };

    // Remove undefined values
    Object.keys(leadPayload).forEach((key) => {
      if (leadPayload[key] === undefined || leadPayload[key] === "") {
        delete leadPayload[key];
      }
    });

    // Clean prospect object
    Object.keys(leadPayload.prospect).forEach((key) => {
      if (
        leadPayload.prospect[key] === undefined ||
        leadPayload.prospect[key] === ""
      ) {
        delete leadPayload.prospect[key];
      }
    });

    const response = await fetch(API_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(leadPayload),
    });
    const responseData = await response.json();
    console.log("Response:", responseData);

    if (!response.ok) {
      throw new Error(
        responseData.message || `HTTP error! status: ${response.status}`
      );
    }

    showStatus("Lead submitted successfully!", "success");

    // Reset Turnstile after successful submission - EXACTLY like script2-works.js
    refreshTurnstile();
  } catch (error) {
    refreshTurnstile();
    console.error("Error submitting form:", error);
    showStatus(
      "There was an error submitting the form. Please try again.",
      "error"
    );
  }
}

function showStatus(message, type) {
  statusMessage.textContent = message;
  statusMessage.className = `status-message ${type}`;

  // Auto-hide success messages after 5 seconds
  if (type === "success") {
    setTimeout(() => {
      statusMessage.style.display = "none";
    }, 5000);
  }
}

// Utility function to handle network errors
function handleNetworkError(error) {
  console.error("Network error:", error);
  showStatus(
    "Network error. Please check your connection and try again.",
    "error"
  );
}
