document.addEventListener('DOMContentLoaded', () => {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');

    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const tab = btn.dataset.tab;
            tabButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            if (tab === 'login') {
                loginForm.classList.add('active');
                signupForm.classList.remove('active');
            } else {
                signupForm.classList.add('active');
                loginForm.classList.remove('active');
            }

            document.getElementById('login-error').textContent = '';
            document.getElementById('signup-error').textContent = '';
        });
    });

    const loginFormElement = document.getElementById('loginForm');
    loginFormElement.addEventListener('submit', async (e) => {
        e.preventDefault();
        const username = document.getElementById('login-username').value.trim();
        const password = document.getElementById('login-password').value;
        const errorDiv = document.getElementById('login-error');
        const submitBtn = loginFormElement.querySelector('button[type="submit"]');

        errorDiv.textContent = '';
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;

        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });
            const data = await response.json();

            if (response.ok) {
                if (data.user.avatar && data.user.displayName) {
                    window.location.href = '/home.html';
                } else {
                    window.location.href = '/avatar.html';
                }
            } else {
                errorDiv.textContent = data.message || 'Login failed. Please try again.';
            }
        } catch (error) {
            errorDiv.textContent = 'Network error. Please try again.';
        } finally {
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
        }
    });

    const signupFormElement = document.getElementById('signupForm');
    signupFormElement.addEventListener('submit', async (e) => {
        e.preventDefault();
        const username = document.getElementById('signup-username').value.trim();
        const password = document.getElementById('signup-password').value;
        const confirmPassword = document.getElementById('signup-confirm-password').value;
        const errorDiv = document.getElementById('signup-error');
        const submitBtn = signupFormElement.querySelector('button[type="submit"]');

        errorDiv.textContent = '';

        if (password !== confirmPassword) {
            errorDiv.textContent = 'Passwords do not match';
            return;
        }

        if (password.length < 6) {
            errorDiv.textContent = 'Password must be at least 6 characters';
            return;
        }

        submitBtn.classList.add('loading');
        submitBtn.disabled = true;

        try {
            const response = await fetch('/api/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });
            const data = await response.json();

            if (response.ok) {
                window.location.href = '/avatar.html';
            } else {
                errorDiv.textContent = data.message || 'Signup failed. Please try again.';
            }
        } catch (error) {
            errorDiv.textContent = 'Network error. Please try again.';
        } finally {
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
        }
    });
});
