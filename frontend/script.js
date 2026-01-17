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
// ================= LOGOUT =================
function logoutUser() {
    // 1. Clear the EXACT keys used in login
    localStorage.removeItem("authToken");
    localStorage.removeItem("userEmail");
    
    // 2. Redirect to index and refresh to reset UI
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

// ================= CONSOLIDATED UI UPDATE =================
function updateAuthUI() {
    const guestZone = document.getElementById("auth-guest-zone");
    const userZone = document.getElementById("auth-user-zone");
    const joinNowZone = document.getElementById("join-now-zone");
    const classNavItem = document.getElementById("class-nav-item");
    const displayName = document.getElementById("display-name");
    const avatar = document.getElementById("user-avatar");

    // Check keys saved during login
    const token = localStorage.getItem("authToken");
    const email = localStorage.getItem("userEmail");

    if (token && email) {
        // --- USER IS LOGGED IN ---
        if (guestZone) guestZone.classList.add("d-none");
        if (userZone) userZone.classList.remove("d-none");
        
        // SHOW the Class Dropdown
        if (classNavItem) classNavItem.classList.remove("d-none");
        
        // HIDE "Join Now" button on hero section
        if (joinNowZone) joinNowZone.classList.add("d-none");

        // Set Profile Info
        if (displayName) displayName.textContent = email.split("@")[0];
        if (avatar) avatar.src = `https://ui-avatars.com/api/?name=${email}&background=ff5722&color=fff`;
        
    } else {
        // --- USER IS GUEST ---
        if (guestZone) guestZone.classList.remove("d-none");
        if (userZone) userZone.classList.add("d-none");

        // HIDE the Class Dropdown
        if (classNavItem) classNavItem.classList.add("d-none");

        // SHOW "Join Now" button
        if (joinNowZone) joinNowZone.classList.remove("d-none");
    }
}

// Run this once when the page loads
document.addEventListener("DOMContentLoaded", () => {
    updateAuthUI();
});

document.addEventListener('DOMContentLoaded', () => {
    const isLoggedIn = localStorage.getItem('isLoggedIn'); // Or however you track login state
    const classNavItem = document.getElementById('class-nav-item');
    const guestZone = document.getElementById('auth-guest-zone');
    const userZone = document.getElementById('auth-user-zone');

    if (isLoggedIn === 'true') {
        classNavItem.classList.remove('d-none');
        guestZone.classList.add('d-none');
        userZone.classList.remove('d-none');
    } else {
        classNavItem.classList.add('d-none');
        guestZone.classList.remove('d-none');
        userZone.classList.add('d-none');
    }
});

document.addEventListener("DOMContentLoaded", () => {
    // Run UI check as soon as any page loads
    updateAuthUI();

    // ================= LOGIN LOGIC =================
    const loginForm = document.querySelector("#loginModal form");
    if (loginForm) {
        loginForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            const email = document.getElementById("loginEmail").value.trim();
            const password = document.getElementById("loginPassword").value.trim();

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

                // Save data to localStorage
                localStorage.setItem("authToken", data.token);
                localStorage.setItem("userEmail", email);

                // Close Modal
                const modal = bootstrap.Modal.getInstance(document.getElementById("loginModal"));
                if (modal) modal.hide();

                showsuccesstoast("Login successful 🎉");
                
                // Redirect to dashboard (which also triggers updateAuthUI on load)
                window.location.href = "dashboard.html";

            } catch (err) {
                showErrorToast("Server error. Try again later.");
            }
        });
    }
});

// ================= THE MASTER UI FUNCTION =================
// This function must be globally accessible so it can be called anywhere
function updateAuthUI() {
    const guestZone = document.getElementById("auth-guest-zone");
    const userZone = document.getElementById("auth-user-zone");
    const classNavItem = document.getElementById("class-nav-item");
    const joinNowZone = document.getElementById("join-now-zone");
    const displayName = document.getElementById("display-name");
    const avatar = document.getElementById("user-avatar");

    const token = localStorage.getItem("authToken");
    const email = localStorage.getItem("userEmail");

    if (token && email) {
        // USER IS LOGGED IN
        if (guestZone) guestZone.classList.add("d-none");
        if (userZone) userZone.classList.remove("d-none");
        if (classNavItem) classNavItem.classList.remove("d-none");
        if (joinNowZone) joinNowZone.classList.add("d-none");

        // Set Profile Details
        if (displayName) displayName.textContent = email.split("@")[0];
        if (avatar) avatar.src = `https://ui-avatars.com/api/?name=${email}&background=ff5722&color=fff`;
    } else {
        // USER IS GUEST
        if (guestZone) guestZone.classList.remove("d-none");
        if (userZone) userZone.classList.add("d-none");
        if (classNavItem) classNavItem.classList.add("d-none");
        if (joinNowZone) joinNowZone.classList.remove("d-none");
    }
}

function logoutUser() {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userEmail");
    window.location.href = "index.html";
}

// Toast Helpers
function showErrorToast(msg) {
    const toast = document.getElementById("errorToast");
    if(toast) {
        document.getElementById("toastMessage").textContent = msg;
        new bootstrap.Toast(toast).show();
    }
}

function showsuccesstoast(msg) {
    const toast = document.getElementById("successtoast");
    if(toast) {
        toast.querySelector(".toast-body").textContent = msg;
        new bootstrap.Toast(toast).show();
    }
}