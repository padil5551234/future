const loginTab = document.getElementById('loginTab');
const registerTab = document.getElementById('registerTab');
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const formSubtitle = document.getElementById('formSubtitle');

function switchToLogin() {
  loginTab.classList.add('active');
  loginTab.setAttribute('aria-selected', 'true');
  registerTab.classList.remove('active');
  registerTab.setAttribute('aria-selected', 'false');
  loginForm.classList.add('active');
  registerForm.classList.remove('active');
  formSubtitle.textContent = 'Secure access to your eco account';
  clearMessages();
}

function switchToRegister() {
  registerTab.classList.add('active');
  registerTab.setAttribute('aria-selected', 'true');
  loginTab.classList.remove('active');
  loginTab.setAttribute('aria-selected', 'false');
  registerForm.classList.add('active');
  loginForm.classList.remove('active');
  formSubtitle.textContent = 'Create your eco-friendly account';
  clearMessages();
}

loginTab.addEventListener('click', switchToLogin);
registerTab.addEventListener('click', switchToRegister);

function clearMessages() {
  document.querySelectorAll('.error-msg').forEach(el => el.textContent = '');
  document.getElementById('loginErrorMsg').textContent = '';
  document.getElementById('registerSuccessMsg').textContent = '';
}

// Simple fixed credentials for demonstration login:
const demoUsers = [
  {name : 'Ricardo' , username: 'admin', email : 'ari.sadewa@gmail.com' , password: 'admin1234'}
];

loginForm.addEventListener('submit', e => {
  e.preventDefault();
  clearMessages();
  const username = loginForm.loginUsername.value.trim();
  const password = loginForm.loginPassword.value.trim();
  let valid = true;

  if (!username) {
    document.getElementById('loginUsernameError').textContent = 'Username or Email is required.';
    valid = false;
  }
  if (!password) {
    document.getElementById('loginPasswordError').textContent = 'Password is required.';
    valid = false;
  }
  if (!valid) return;

  // check credentials
  const foundUser = demoUsers.find(user => (user.email === username || user.username === username) && user.password === password);
  if (foundUser) {
    // Redirect to beranda.html on success
    localStorage.setItem('loggedInName', foundUser.name || 'Pengguna');
    window.location.href = 'beranda.html';
    // document.querySelector('.user-details h4').innerHTML = demoUsers.nama;
  } else {
    document.getElementById('loginErrorMsg').textContent = 'Incorrect username or password.';
  }
});


registerForm.addEventListener('submit', e => {
  e.preventDefault();
  clearMessages();

  const name = registerForm.registerName.value.trim();
  const username = registerForm.registerUsername.value.trim();
  const email = registerForm.registerEmail.value.trim();
  const password = registerForm.registerPassword.value.trim();
  const confirmPassword = registerForm.registerConfirmPassword.value.trim();

  let valid = true;

  if (!name) {
    document.getElementById('registerNameError').textContent = 'Full name is required.';
    valid = false;
  }
  if (!username) {
    document.getElementById('registerUsernameError').textContent = 'Username is required.';
    valid = false;
  } else if(demoUsers.some(u => u.username === username)){
    document.getElementById('registerUsernameError').textContent = 'Username already exists.';
    valid = false;
  }
  if (!email) {
    document.getElementById('registerEmailError').textContent = 'Email is required.';
    valid = false;
  } else if (!/^[\w.-]+@[\w.-]+\.\w{2,}$/.test(email)){
    document.getElementById('registerEmailError').textContent = 'Invalid email format.';
    valid = false;
  }
  if (!password) {
    document.getElementById('registerPasswordError').textContent = 'Password is required.';
    valid = false;
  } else if (password.length < 6) {
    document.getElementById('registerPasswordError').textContent = 'Password must be at least 6 characters.';
    valid = false;
  }
  if (!confirmPassword) {
    document.getElementById('registerConfirmPasswordError').textContent = 'Please confirm your password.';
    valid = false;
  } else if (password !== confirmPassword) {
    document.getElementById('registerConfirmPasswordError').textContent = 'Passwords do not match.';
    valid = false;
  }
  if (!valid) return;
  
  // Simulate successful registration
  document.getElementById('registerSuccessMsg').textContent = 'Registration successful! You can now log in.';
  setTimeout(() => {
    demoUsers.push({name, username, email, password});
    localStorage.setItem('loggedInName', name);
    switchToLogin();
    registerForm.reset();
  }, 2000);
});
