// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAB3QMbEJgPDrLpGbcPqSvKdhoRDKV1NPo",
  authDomain: "vireon-ai.netlify.app",
  projectId: "mine-4aa4d",
  storageBucket: "mine-4aa4d.appspot.com",
  messagingSenderId: "593235766915",
  appId: "1:593235766915:web:e76fa153ccd84adcb375b6",
  measurementId: "G-4W86WEXDT5"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// Elements
const loginForm      = document.getElementById('login-form');
const signupForm     = document.getElementById('signup-form');
const loaderOverlay  = document.getElementById('loader');
const notificationEl = document.getElementById('notification-container');

// Show loader
function showLoader() {
  if (loaderOverlay) loaderOverlay.classList.remove('hidden');
}

// Hide loader
function hideLoader() {
  if (loaderOverlay) loaderOverlay.classList.add('hidden');
}

// Toast notification
function showNotification(message, type = 'info') {
  if (!notificationEl) return;
  const notif = document.createElement('div');
  notif.className = `notification notification--${type}`;
  notif.textContent = message;
  notificationEl.appendChild(notif);
  setTimeout(() => notif.remove(), 4000);
}

// Handle Login
if (loginForm) {
  loginForm.addEventListener('submit', e => {
    e.preventDefault();
    showLoader();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    auth.signInWithEmailAndPassword(email, password)
      .then(() => {
        window.location.href = 'main.html';
      })
      .catch(err => {
        hideLoader();
        console.error(err);
        showNotification('Error signing in: ' + err.message, 'error');
      });
  });
}

// Handle Sign Up
if (signupForm) {
  signupForm.addEventListener('submit', e => {
    e.preventDefault();
    showLoader();
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    const confirmPass = document.getElementById('confirmPassword').value;
    if (password !== confirmPass) {
      hideLoader();
      showNotification('Passwords do not match.', 'error');
      return;
    }
    auth.createUserWithEmailAndPassword(email, password)
      .then(() => {
        window.location.href = 'main.html';
      })
      .catch(err => {
        hideLoader();
        console.error(err);
        showNotification('Error creating account: ' + err.message, 'error');
      });
  });
}

// Auth state & profile display
auth.onAuthStateChanged(user => {
  hideLoader();
  if (user) {
    // If on main.html, display user profile
    const profileContainer = document.getElementById('user-profile');
    if (profileContainer) {
      // Build profile markup
      const emailP = document.createElement('p');
      emailP.textContent = `Email: ${user.email}`;
      const uidP = document.createElement('p');
      uidP.textContent = `User ID: ${user.uid}`;
      // Optionally display photoURL if available
      let img;
      if (user.photoURL) {
        img = document.createElement('img');
        img.src = user.photoURL;
        img.alt = 'Profile Photo';
        img.className = 'profile-photo';
        profileContainer.appendChild(img);
      }
      profileContainer.appendChild(emailP);
      profileContainer.appendChild(uidP);
    }
    // Redirect from auth pages if already signed in
    if (window.location.pathname.includes('auth.html')) {
      window.location.href = 'main.html';
    }
  }
});
