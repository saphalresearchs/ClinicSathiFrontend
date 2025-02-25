document.getElementById("logoutBtn").addEventListener("click", async function () {
    const token = localStorage.getItem("accessToken");

    await fetch("http://127.0.0.1:8000/api/logout/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    });

    localStorage.removeItem("accessToken");
    alert("Logged out successfully.");
    window.location.href = "login.html"; // Redirect to login
});
