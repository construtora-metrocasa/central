// app.js (module)
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  GoogleAuthProvider,
  signInWithPopup
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";

/* ========== Cole seu firebaseConfig aqui =============
const firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "seu-projeto.firebaseapp.com",
  projectId: "seu-projeto",
  // ...
};
======================================================*/
const firebaseConfig = {
  apiKey: "AIzaSyCd8rhcFbHwNuqVqEa1GXQz21xOPN0zUMY",
  authDomain: "dash-dbc8f.firebaseapp.com",
  projectId: "dash-dbc8f",
  storageBucket: "dash-dbc8f.firebasestorage.app",
  messagingSenderId: "824232359810",
  appId: "1:824232359810:web:f4c180e23592205625819b",
  measurementId: "G-40Z4XQ6JYW"
};;

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const path = window.location.pathname.split("/").pop();

// Auth state observer
onAuthStateChanged(auth, user => {
  if (user && (path === "" || path === "index.html")) {
    window.location.replace("dashboard.html");
  }
  if (!user && path === "dashboard.html") {
    window.location.replace("index.html");
  }
  if (user && path === "dashboard.html") {
    const el = document.getElementById("user-email");
    if (el) el.textContent = user.email || user.displayName || "Usuário";
  }
});

// Login page logic
if (path === "" || path === "index.html") {
  const btnLogin = document.getElementById("btn-login");
  const btnRegister = document.getElementById("btn-register");
  const btnGoogle = document.getElementById("btn-google");
  const linkReset = document.getElementById("link-reset");
  const emailInput = document.getElementById("email");
  const passInput = document.getElementById("password");
  const authError = document.getElementById("auth-error");

  function showError(msg) {
    if (!authError) return;
    authError.style.display = "block";
    authError.textContent = msg;
    setTimeout(()=> authError.style.display = "none", 5000);
  }

  btnLogin?.addEventListener("click", async () => {
    const email = emailInput.value.trim();
    const password = passInput.value;
    if (!email || !password) return showError("Preencha e-mail e senha.");
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      showError(err.message || "Erro no login.");
    }
  });

  btnRegister?.addEventListener("click", async () => {
    const email = emailInput.value.trim();
    const password = passInput.value;
    if (!email || !password) return showError("Preencha e-mail e senha.");
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (err) {
      showError(err.message || "Erro ao criar conta.");
    }
  });

  btnGoogle?.addEventListener("click", async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (err) {
      showError(err.message || "Erro no login com Google.");
    }
  });

  linkReset?.addEventListener("click", async (e) => {
    e.preventDefault();
    const email = emailInput.value.trim();
    if (!email) return showError("Digite seu e-mail para reset de senha.");
    try {
      await sendPasswordResetEmail(auth, email);
      showError("E-mail de recuperação enviado.");
    } catch (err) {
      showError(err.message || "Erro ao enviar e-mail de recuperação.");
    }
  });
}

// Dashboard page logic
if (path === "dashboard.html") {
  const btnLogout = document.getElementById("btn-logout");
  btnLogout?.addEventListener("click", async () => {
    await signOut(auth);
    window.location.replace("index.html");
  });
}
