const SITE_KEY = "0x4AAAAAABg8fBKvm3kslBsU";
let turnstileToken = null;
let widgetId = null; // Store widget ID for reset
const submitBtn = document.getElementById("submit-btn");
const refreshBtn = document.getElementById("refresh-turnstile");

// Helper to set submit button state
function setSubmitEnabled(enabled) {
  submitBtn.disabled = !enabled;
  submitBtn.style.cursor = enabled ? "pointer" : "not-allowed";
  submitBtn.style.backgroundColor = enabled ? "#007bff" : "#ccc";
}

// Function to reset/refresh Turnstile token
function refreshTurnstile() {
  if (widgetId !== null) {
    window.turnstile.reset(widgetId);
  }
  setSubmitEnabled(false);
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
      turnstileToken = token;
      setSubmitEnabled(true); // Enable when token is ready
      console.log("New token generated:", token);
    },
    "error-callback": function () {
      turnstileToken = null;
      setSubmitEnabled(false); // Disable on error
      console.log("turnstile challenge failed");
    },
    "expired-callback": function () {
      turnstileToken = null;
      setSubmitEnabled(false); // Disable on expiration
      console.log("Token expired, please refresh");
    },
    "timeout-callback": function () {
      console.log("Challenge timed out, please try again");
      refreshTurnstile();
    },
    "refresh-timeout": "auto", // Auto refresh on timeout
  });
}

// Initialize Turnstile
document.addEventListener("DOMContentLoaded", function () {
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

// Add refresh button handler
refreshBtn.addEventListener("click", refreshTurnstile);

// Form submission handler
document
  .getElementById("lead-form")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    if (!turnstileToken) {
      alert("Please complete the Turnstile challenge first");
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
      const response = await fetch(
        "https://cloudflare-workers.adheep.workers.dev",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...data,
            token: turnstileToken,
            siteKey: SITE_KEY,
          }),
        }
      );
      const responseData = await response.json();
      console.log("Response:", responseData);

      // Reset Turnstile after successful submission
      refreshTurnstile();
    } catch (error) {
      refreshTurnstile();
      console.error("Error submitting form:", error);
      setSubmitEnabled(true); // Re-enable on error
    }
  });
