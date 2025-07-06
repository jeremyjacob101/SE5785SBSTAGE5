import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";

import {
  getFirestore,
  collection,
  addDoc,
  query,
  where,
  getDocs,
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCvUrG_8Vp1I5AdrxnxGF6IQDxDN1hjttA",
  authDomain: "fanaddicts-67322.firebaseapp.com",
  projectId: "fanaddicts-67322",
  storageBucket: "fanaddicts-67322.firebasestorage.app",
  messagingSenderId: "669039096879",
  appId: "1:669039096879:web:9d45f9e94ff733327042da",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const form = document.getElementById("accountForm");
const messageDiv = document.getElementById("message");

function showMessage(message, isError = false) {
  messageDiv.innerHTML = `<div class="${isError ? "error-message" : "success-message"}">${message}</div>`;
  setTimeout(() => {
    messageDiv.innerHTML = "";
  }, 5000);
}

async function checkIfEmailExists(email) {
  const q = query(collection(db, "accounts"), where("email", "==", email));
  const querySnapshot = await getDocs(q);
  return !querySnapshot.empty;
}

async function checkIfUsernameExists(username) {
  const q = query(
    collection(db, "accounts"),
    where("username", "==", username)
  );
  const querySnapshot = await getDocs(q);
  return !querySnapshot.empty;
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const birthday = document.getElementById("birthday").value;

  // Show loading state
  form.classList.add("loading");
  const submitButton = form.querySelector('input[type="submit"]');
  const originalValue = submitButton.value;
  submitButton.value = "Creating...";

  try {
    // Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (username.length < 3) {
      throw new Error("Username must be at least 3 characters.");
    }

    if (!emailRegex.test(email)) {
      throw new Error("Invalid email format.");
    }

    if (password.length < 6) {
      throw new Error("Password must be at least 6 characters.");
    }

    const birthDate = new Date(birthday);
    const today = new Date();
    if (!birthday || birthDate >= today) {
      throw new Error("Birthday must be in the past.");
    }

    // Check for existing email
    const emailExists = await checkIfEmailExists(email);
    if (emailExists) {
      throw new Error("An account with this email already exists.");
    }

    // Check for existing username
    const usernameExists = await checkIfUsernameExists(username);
    if (usernameExists) {
      throw new Error("This username is already taken.");
    }

    // Create account
    await addDoc(collection(db, "accounts"), {
      username,
      email,
      password, // Note: In production, you should hash passwords!
      birthday,
      createdAt: new Date().toISOString(),
    });

    showMessage("Account created successfully!");
    form.reset();
  } catch (error) {
    console.error("Account creation failed:", error);
    showMessage(
      error.message || "Something went wrong. Please try again.",
      true
    );
  } finally {
    // Remove loading state
    form.classList.remove("loading");
    submitButton.value = originalValue;
  }
});

// Add visual feedback for form interactions
document
  .querySelectorAll(
    'input[type="text"], input[type="email"], input[type="password"], input[type="date"]'
  )
  .forEach((input) => {
    input.addEventListener("input", function () {
      if (this.value.length > 0) {
        this.classList.add("has-value");
      } else {
        this.classList.remove("has-value");
      }
    });
  });
