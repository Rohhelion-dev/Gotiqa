// Modal Functions

    function openLoginModal() {
      document.getElementById('loginModal').classList.add('show');
    }

    function closeLoginModal() {
      document.getElementById('loginModal').classList.remove('show');
    }

    function openSignupModal() {
      document.getElementById('signupModal').classList.add('show');
    }

    function closeSignupModal() {
      document.getElementById('signupModal').classList.remove('show');
    }

    // SOCIAL LOGIN FUNCTIONS
    function loginWithGoogle() {
      // Simulate Google Login - in production, use Firebase or Google OAuth
      const mockGoogleUser = 'Google_User_' + Math.random().toString(36).substr(2, 9);
      localStorage.setItem('currentUser', mockGoogleUser);
      localStorage.setItem('authProvider', 'google');
      document.getElementById('displayUsername').textContent = 'ðŸ‘¤ ' + mockGoogleUser;
      updateAuthBar();
      closeLoginModal();
      alert('Logged in with Google! (Demo Mode)');
    }

    function loginWithApple() {
      // Simulate Apple Login - in production, use Firebase or Apple OAuth
      const mockAppleUser = 'Apple_User_' + Math.random().toString(36).substr(2, 9);
      localStorage.setItem('currentUser', mockAppleUser);
      localStorage.setItem('authProvider', 'apple');
      document.getElementById('displayUsername').textContent = 'ðŸ‘¤ ' + mockAppleUser;
      updateAuthBar();
      closeLoginModal();
      alert('Logged in with Apple! (Demo Mode)');
    }

    function loginWithFacebook() {
      // Simulate Facebook Login - in production, use Firebase or Facebook OAuth
      const mockFacebookUser = 'Facebook_User_' + Math.random().toString(36).substr(2, 9);
      localStorage.setItem('currentUser', mockFacebookUser);
      localStorage.setItem('authProvider', 'facebook');
      document.getElementById('displayUsername').textContent = 'ðŸ‘¤ ' + mockFacebookUser;
      updateAuthBar();
      closeLoginModal();
      alert('Logged in with Facebook! (Demo Mode)');
    }

    function signupWithGoogle() {
      // Simulate Google Signup - in production, use Firebase
      const mockGoogleUser = 'Google_NewUser_' + Math.random().toString(36).substr(2, 9);
      localStorage.setItem('currentUser', mockGoogleUser);
      localStorage.setItem('authProvider', 'google');
      document.getElementById('displayUsername').textContent = 'ðŸ‘¤ ' + mockGoogleUser;
      updateAuthBar();
      closeSignupModal();
      alert('Account created with Google! Welcome to Gotiqa Farm!');
    }

    function signupWithApple() {
      // Simulate Apple Signup - in production, use Firebase
      const mockAppleUser = 'Apple_NewUser_' + Math.random().toString(36).substr(2, 9);
      localStorage.setItem('currentUser', mockAppleUser);
      localStorage.setItem('authProvider', 'apple');
      document.getElementById('displayUsername').textContent = 'ðŸ‘¤ ' + mockAppleUser;
      updateAuthBar();
      closeSignupModal();
      alert('Account created with Apple! Welcome to Gotiqa Farm!');
    }

    function signupWithFacebook() {
      // Simulate Facebook Signup - in production, use Firebase
      const mockFacebookUser = 'Facebook_NewUser_' + Math.random().toString(36).substr(2, 9);
      localStorage.setItem('currentUser', mockFacebookUser);
      localStorage.setItem('authProvider', 'facebook');
      document.getElementById('displayUsername').textContent = 'ðŸ‘¤ ' + mockFacebookUser;
      updateAuthBar();
      closeSignupModal();
      alert('Account created with Facebook! Welcome to Gotiqa Farm!');
    }

    function switchToSignup() {
      closeLoginModal();
      openSignupModal();
    }

    function switchToLogin() {
      closeSignupModal();
      openLoginModal();
    }

    // Close modals when clicking outside
    window.addEventListener('click', function (event) {
      const loginModal = document.getElementById('loginModal');
      const signupModal = document.getElementById('signupModal');

      if (event.target === loginModal) {
        closeLoginModal();
      }

      if (event.target === signupModal) {
        closeSignupModal();
      }
    });

    // Handle Login
    function handleLogin(event) {
      event.preventDefault();
      const username = document.getElementById('login-username').value;
      const password = document.getElementById('login-password').value;

      if (username && password) {
        localStorage.setItem('currentUser', username);
        document.getElementById('displayUsername').textContent = 'ðŸ‘¤ ' + username;
        updateAuthBar();
        closeLoginModal();
        document.getElementById('login-username').value = '';
        document.getElementById('login-password').value = '';
      }

      else {
        alert('Please enter both username and password');
      }
    }

    // Handle Signup
    function handleSignup(event) {
      event.preventDefault();
      const email = document.getElementById('signup-email').value;
      const username = document.getElementById('signup-username').value;
      const password = document.getElementById('signup-password').value;
      const confirmPassword = document.getElementById('signup-confirm').value;

      if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
      }

      if (email && username && password) {
        localStorage.setItem('currentUser', username);
        localStorage.setItem('userEmail', email);
        document.getElementById('displayUsername').textContent = 'ðŸ‘¤ ' + username;
        updateAuthBar();
        closeSignupModal();
        document.getElementById('signup-email').value = '';
        document.getElementById('signup-username').value = '';
        document.getElementById('signup-password').value = '';
        document.getElementById('signup-confirm').value = '';
        alert('Account created successfully! Welcome to Gotiqa Farm!');
      }

      else {
        alert('Please fill in all fields');
      }
    }

    // Handle Logout
    function handleLogout() {
      localStorage.removeItem('currentUser');
      localStorage.removeItem('userEmail');
      updateAuthBar();
    }

    // Update Auth Bar visibility
    function updateAuthBar() {
      const currentUser = localStorage.getItem('currentUser');
      const authBar = document.getElementById('authBar');
      const headerTop = document.querySelector('.header-top');
      const userSection = document.querySelector('.user-section');
      const logoutBtn = document.querySelector('.logout-btn');

      if (currentUser) {
        // User is logged in
        authBar.classList.add('hidden');
        headerTop.style.display = 'flex';
        userSection.style.display = 'flex';
        logoutBtn.style.display = 'block';
      }

      else {
        // User is not logged in
        authBar.classList.remove('hidden');
        headerTop.style.display = 'none';
        userSection.style.display = 'none';
        logoutBtn.style.display = 'none';
        document.getElementById('displayUsername').textContent = '';
      }
    }

    // Show/Hide Sections
    function showSection(sectionId) {
      const sections = document.querySelectorAll('section');
      sections.forEach(section => section.classList.remove('show'));

      const targetSection = document.getElementById(sectionId);

      if (targetSection) {
        targetSection.classList.add('show');
      }
    }

    // Refresh Weather
    function refreshWeather() {
      const conditions = ['Sunny â˜€ï¸',
        'Cloudy â›…',
        'Rainy ðŸŒ§ï¸',
        'Partly Cloudy â›…'];
      const temps = [18,
        20,
        22,
        24,
        26,
        28,
        30];
      const randomCondition = conditions[Math.floor(Math.random() * conditions.length)];
      const randomTemp = temps[Math.floor(Math.random() * temps.length)];

      const conditionEl = document.querySelector('.weather-current .condition');
      const tempEl = document.querySelector('.weather-current .temp');
      if (conditionEl) conditionEl.textContent = randomCondition;
      if (tempEl) tempEl.textContent = randomTemp + 'Â°C';

      alert('Weather updated! Current: ' + randomTemp + 'Â°C, ' + randomCondition);
    }

    // Check if user is logged in on page load
    window.addEventListener('load', function () {
      updateAuthBar();
    });
