document.getElementById("forgotPasswordForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    const email = document.getElementById("forgotEmail").value;

    try {
        const response = await fetch("http://127.0.0.1:8000/api/reset-password/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email })
        });

        const data = await response.json();

        document.getElementById("message").innerText = response.ok 
            ? "Check your email for reset instructions." 
            : data.detail || "Reset request failed.";
    } catch (error) {
        console.error("Error:", error);
        document.getElementById("message").innerText = "An error occurred.";
    }
});
