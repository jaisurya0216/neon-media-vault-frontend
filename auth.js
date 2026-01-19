/* 🔐 CONFIG */
const VALID_USER = "shinchan";

/* 🔒 SHA-256 HASH of your password */
const PASSWORD_HASH = "5d2517f377eca422a2d576a27f18a662bf04625cf1079f1c13afa06f14746164";

/* SHA-256 helper */
async function sha256(text) {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
}

/* LOGIN */
async function login() {
  const u = document.getElementById("username").value.trim();
  const p = document.getElementById("password").value.trim();
  const error = document.getElementById("error");

  if (!u || !p) {
    error.textContent = "Enter credentials";
    return;
  }

  const inputHash = await sha256(p);

  if (u === VALID_USER && inputHash === PASSWORD_HASH) {
    localStorage.setItem("neonVaultAuth", "true");
    window.location.href = "index.html";
  } else {
    error.textContent = "❌ Invalid credentials";
    error.classList.add("shake");
    setTimeout(() => error.classList.remove("shake"), 400);
  }
}

/* PAGE GUARD */
function checkAuth() {
  if (localStorage.getItem("neonVaultAuth") !== "true") {
    window.location.href = "login.html";
  }
}

/* LOGOUT */
function logout() {
  localStorage.removeItem("neonVaultAuth");
  window.location.href = "login.html";
}
