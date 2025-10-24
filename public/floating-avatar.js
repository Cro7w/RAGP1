// Floating Avatar Component - Loads on every page

document.addEventListener('DOMContentLoaded', async () => {
    const floatingAvatar = document.getElementById('floating-avatar');
    const avatarContainer = document.getElementById('avatar-icon-container');

    // Get avatar SVG based on selection
    function getAvatarSVG(avatar) {
        const avatarMap = {
            'explorer': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>',
            'adventurer': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 20h18L12 4z"/></svg>',
            'wanderer': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>'
        };
        return avatarMap[avatar] || avatarMap['explorer'];
    }

    // Load user avatar
    async function loadAvatar() {
        try {
            const response = await fetch('/api/get-user');
            if (response.ok) {
                const user = await response.json();
                if (user.avatar) {
                    avatarContainer.innerHTML = getAvatarSVG(user.avatar);
                    floatingAvatar.style.display = 'block';
                }
            } else {
                // User not authenticated or no avatar set
                floatingAvatar.style.display = 'none';
            }
        } catch (error) {
            console.error('Error loading avatar:', error);
            floatingAvatar.style.display = 'none';
        }
    }

    loadAvatar();

    // Optional: Add click interaction for future AI chat feature
    floatingAvatar.addEventListener('click', () => {
        // Placeholder for future AI chat feature
        console.log('AI Assistant clicked - feature coming soon!');
    });
});
