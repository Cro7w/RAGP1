// Avatar selection page functionality

document.addEventListener('DOMContentLoaded', () => {
    const avatarOptions = document.querySelectorAll('.avatar-option');
    const displayNameInput = document.getElementById('display-name');
    const avatarForm = document.getElementById('avatarForm');
    const errorDiv = document.getElementById('avatar-error');
    const submitBtn = avatarForm.querySelector('button[type="submit"]');
    
    let selectedAvatar = null;

    // Avatar selection
    avatarOptions.forEach(option => {
        option.addEventListener('click', () => {
            // Remove selected class from all
            avatarOptions.forEach(opt => opt.classList.remove('selected'));
            
            // Add selected class to clicked option
            option.classList.add('selected');
            selectedAvatar = option.dataset.avatar;

            // Enable submit button if display name is also filled
            updateSubmitButton();
        });
    });

    // Display name input
    displayNameInput.addEventListener('input', () => {
        updateSubmitButton();
    });

    function updateSubmitButton() {
        if (selectedAvatar && displayNameInput.value.trim()) {
            submitBtn.disabled = false;
        } else {
            submitBtn.disabled = true;
        }
    }

    // Get avatar SVG based on selection
    function getAvatarSVG(avatar) {
        const avatarMap = {
            'explorer': '<svg class="avatar-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>',
            'adventurer': '<svg class="avatar-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 20h18L12 4z"/></svg>',
            'wanderer': '<svg class="avatar-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>'
        };
        return avatarMap[avatar] || avatarMap['explorer'];
    }

    // Form submission
    avatarForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        if (!selectedAvatar) {
            errorDiv.textContent = 'Please select an avatar';
            return;
        }

        const displayName = displayNameInput.value.trim();
        if (!displayName) {
            errorDiv.textContent = 'Please enter a display name';
            return;
        }

        errorDiv.textContent = '';
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;

        try {
            const response = await fetch('/api/save-avatar', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    avatar: selectedAvatar, 
                    displayName 
                })
            });

            const data = await response.json();

            if (response.ok) {
                // Redirect to home page
                window.location.href = '/home.html';
            } else {
                errorDiv.textContent = data.message || 'Failed to save avatar. Please try again.';
            }
        } catch (error) {
            errorDiv.textContent = 'Network error. Please try again.';
            console.error('Avatar save error:', error);
        } finally {
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
        }
    });

    // Check if user is authenticated
    async function checkAuth() {
        try {
            const response = await fetch('/api/get-user');
            if (!response.ok) {
                window.location.href = '/';
            }
        } catch (error) {
            console.error('Auth check error:', error);
            window.location.href = '/';
        }
    }

    checkAuth();
});
