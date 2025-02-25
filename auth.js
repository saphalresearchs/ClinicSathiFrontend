document.getElementById("loginForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    try {
        const response = await fetch("http://127.0.0.1:8000/api/login/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();

        if (response.ok) {
            localStorage.setItem("accessToken", data.access); // Store JWT token
            alert("Login successful!");
            window.location.href = "dashboard.html"; // Redirect to dashboard
        } else {
            document.getElementById("errorMessage").innerText = data.detail || "Login failed.";
        }
    } catch (error) {
        console.error("Error:", error);
        document.getElementById("errorMessage").innerText = "An error occurred.";
    }
});
