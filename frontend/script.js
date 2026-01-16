// ------------------------------------------------------------------------------------------

document.addEventListener("DOMContentLoaded", () => {
    updateAuthUI();

    // ================= LOGIN =================
    document.querySelector("#loginModal form").addEventListener("submit", async (e) => {
        e.preventDefault();

        const email = document.getElementById("loginEmail").value.trim();
        const password = document.getElementById("loginPassword").value.trim();

        if (!email || !password) {
            showErrorToast("Please fill all fields");
            return;
        }

        if (password.length < 8) {
            showErrorToast("Password must be at least 8 characters");
            return;
        }

        try {
            const res = await fetch("http://localhost:8080/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            });

            const data = await res.json();

            if (!res.ok) {
                showErrorToast(data.message || "Invalid credentials");
                return;
            }

            localStorage.setItem("authToken", data.token);
            localStorage.setItem("userEmail", email);

            bootstrap.Modal.getInstance(
                document.getElementById("loginModal")
            ).hide();

            updateAuthUI();
            showsuccesstoast("Login successful 🎉");

            // Redirect after login
            window.location.href = "dashboard.html";

        } catch (err) {
            showErrorToast("Server error. Try again later.");
            console.error(err);
        }
    });

    // ================= SIGNUP + AUTO LOGIN =================
    document.querySelector("#signupModal form").addEventListener("submit", async (e) => {
        e.preventDefault();

        const name = document.getElementById("name").value.trim();
        const username = document.getElementById("username").value.trim();
        const email = document.getElementById("registerEmail").value.trim();
        const password = document.getElementById("registerPassword").value.trim();

        if (!name || !username || !email || !password) {
            showErrorToast("All fields are required");
            return;
        }

        if (password.length < 8) {
            showErrorToast("Password must be at least 8 characters");
            return;
        }

        try {
            // 1️⃣ SIGNUP
            const signupRes = await fetch("http://localhost:8080/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, username, email, password })
            });

            const signupData = await signupRes.json();

            if (!signupRes.ok) {
                showErrorToast(signupData.message || "Signup failed");
                return;
            }

            // 2️⃣ AUTO LOGIN
            const loginRes = await fetch("http://localhost:8080/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            });

            const loginData = await loginRes.json();

            if (!loginRes.ok) {
                showErrorToast("Auto login failed. Please login manually.");
                return;
            }

            // 3️⃣ SAVE AUTH
            localStorage.setItem("authToken", loginData.token);
            localStorage.setItem("userEmail", email);

            // 4️⃣ CLOSE SIGNUP MODAL
            bootstrap.Modal.getInstance(
                document.getElementById("signupModal")
            ).hide();

            updateAuthUI();
            showsuccesstoast("Welcome to TechNova 🎉");

            // 5️⃣ REDIRECT TO PROFILE / DASHBOARD
            window.location.href = "dashboard.html";

        } catch (err) {
            showErrorToast("Server error. Try again later.");
            console.error(err);
        }
    });
});

// ================= NAVBAR UI =================
function updateAuthUI() {
    const guestZone = document.getElementById("auth-guest-zone");
    const userZone = document.getElementById("auth-user-zone");
    const displayName = document.getElementById("display-name");
    const avatar = document.getElementById("user-avatar");

    const token = localStorage.getItem("authToken");
    const email = localStorage.getItem("userEmail");

    if (token && email) {
        guestZone.classList.add("d-none");
        userZone.classList.remove("d-none");

        displayName.textContent = email.split("@")[0];
        avatar.src = `https://ui-avatars.com/api/?name=${email}&background=ff5722&color=fff`;
    } else {
        guestZone.classList.remove("d-none");
        userZone.classList.add("d-none");
    }
}

// ================= LOGOUT =================
function logoutUser() {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userEmail");
    updateAuthUI();
    window.location.href = "index.html";
}

// ================= TOASTS =================
function showErrorToast(message) {
    const toastEl = document.getElementById("errorToast");
    const toastMsg = document.getElementById("toastMessage");

    toastMsg.textContent = message;
    new bootstrap.Toast(toastEl, { delay: 3000 }).show();
}

function showsuccesstoast(message) {
    const toastEl = document.getElementById("successtoast");
    const toastMsg = toastEl.querySelector(".toast-body");

    toastMsg.textContent = message;
    new bootstrap.Toast(toastEl, { delay: 3000 }).show();
}

// ================= NAVBAR & HERO UI =================
function updateAuthUI() {
    const guestZone = document.getElementById("auth-guest-zone");
    const userZone = document.getElementById("auth-user-zone");
    const joinNowZone = document.getElementById("join-now-zone"); // Get the Join Now container
    const displayName = document.getElementById("display-name");
    const avatar = document.getElementById("user-avatar");

    const token = localStorage.getItem("authToken");
    const email = localStorage.getItem("userEmail");

    if (token && email) {
        // USER IS LOGGED IN
        guestZone.classList.add("d-none");
        userZone.classList.remove("d-none");
        
        // HIDE "Join Now" button if it exists on the page
        if (joinNowZone) {
            joinNowZone.classList.add("d-none");
        }

        displayName.textContent = email.split("@")[0];
        avatar.src = `https://ui-avatars.com/api/?name=${email}&background=ff5722&color=fff`;
    } else {
        // USER IS GUEST
        guestZone.classList.remove("d-none");
        userZone.classList.add("d-none");

        // SHOW "Join Now" button
        if (joinNowZone) {
            joinNowZone.classList.remove("d-none");
        }
    }
}

// ================= CONSOLIDATED NAVBAR & HERO UI =================
function updateAuthUI() {
    // 1. Get all necessary elements
    const guestZone = document.getElementById("auth-guest-zone");
    const userZone = document.getElementById("auth-user-zone");
    const joinNowZone = document.getElementById("join-now-zone");
    const classNavItem = document.getElementById("class-nav-item"); // The dropdown container
    const displayName = document.getElementById("display-name");
    const avatar = document.getElementById("user-avatar");

    // 2. Check login status
    const token = localStorage.getItem("authToken");
    const email = localStorage.getItem("userEmail");

    if (token && email) {
        // --- USER IS LOGGED IN ---
        if (guestZone) guestZone.classList.add("d-none");
        if (userZone) userZone.classList.remove("d-none");
        
        // Show the Class Dropdown
        if (classNavItem) {
            classNavItem.classList.remove("d-none");
        }
        
        // Hide "Join Now" button on hero section
        if (joinNowZone) {
            joinNowZone.classList.add("d-none");
        }

        // Set Profile Info
        if (displayName) displayName.textContent = email.split("@")[0];
        if (avatar) avatar.src = `https://ui-avatars.com/api/?name=${email}&background=ff5722&color=fff`;
        
    } else {
        // --- USER IS GUEST ---
        if (guestZone) guestZone.classList.remove("d-none");
        if (userZone) userZone.classList.add("d-none");

        // Hide the Class Dropdown
        if (classNavItem) {
            classNavItem.classList.add("d-none");
        }

        // Show "Join Now" button
        if (joinNowZone) {
            joinNowZone.classList.remove("d-none");
        }
    }
}

// Example logic that should be in your script.js
window.onload = function() {
    const loggedInUser = localStorage.getItem('user'); // Or however you store session
    if (loggedInUser) {
        document.getElementById('auth-guest-zone').classList.add('d-none');
        document.getElementById('auth-user-zone').classList.remove('d-none');
        document.getElementById('class-nav-item')?.classList.remove('d-none');
        // Set name and avatar...
    }
};

function logoutUser() {
    localStorage.removeItem('user'); 
    window.location.href = 'index.html';
}