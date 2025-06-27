/* global turnstile */
const SITE_KEY = "0x4AAAAAABg8fBKvm3kslBsU";

// Store form data temporarily
let formDataToSubmit = null;

// Handle verify button click
document.getElementById("verify-btn").addEventListener("click", function () {
  // Render Turnstile widget
  turnstile.render("#turnstile-container", {
    sitekey: SITE_KEY,
    callback: function (token) {
      // Store the token
      formDataToSubmit = { token: token, siteKey: SITE_KEY };

      // Hide verify button and show submit button
      document.getElementById("verify-btn").style.display = "none";
      document.getElementById("submit-btn").style.display = "block";
    },
    "expired-callback": () => {
      formDataToSubmit = null;
      document.getElementById("turnstile-container").innerHTML = "";
      document.getElementById("verify-btn").style.display = "block";
      document.getElementById("submit-btn").style.display = "none";
      alert("Turnstile challenge expired. Please verify again.");
    },
    "error-callback": () => {
      formDataToSubmit = null;
      document.getElementById("turnstile-container").innerHTML = "";
      document.getElementById("verify-btn").style.display = "block";
      document.getElementById("submit-btn").style.display = "none";
      alert(
        "There was an error with the Turnstile challenge. Please try again."
      );
    },
  });
});

document
  .getElementById("lead-form")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    // Ensure we have a valid token
    if (!formDataToSubmit || !formDataToSubmit.token) {
      alert("Please complete the verification first.");
      return;
    }

    const submitButton = document.getElementById("submit-btn");
    submitButton.disabled = true;

    try {
      // Collect form data
      const formData = new FormData(e.target);
      const data = {};
      formData.forEach((value, key) => {
        data[key] = value;
      });

      // Combine form data with the stored token
      const finalData = {
        ...data,
        token: formDataToSubmit.token,
        siteKey: formDataToSubmit.siteKey,
      };

      const response = await fetch(
        "https://cloudflare-workers.adheep.workers.dev",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(finalData),
        }
      );

      const responseData = await response.json();
      console.log("Response:", responseData);

      // Reset form and clear stored data after successful submission
      this.reset();
      formDataToSubmit = null;

      // Reset UI state
      document.getElementById("turnstile-container").innerHTML = "";
      document.getElementById("verify-btn").style.display = "block";
      document.getElementById("submit-btn").style.display = "none";
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("There was an error submitting the form. Please try again.");
    } finally {
      submitButton.disabled = false;
    }
  });
