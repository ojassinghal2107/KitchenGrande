// File: src/main/resources/static/js/theme-switcher.js

document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    const themeText = document.getElementById('themeText');
    const body = document.body;

    // --- Core Theme Switching Function ---
    function applyTheme(theme) {
        if (theme === 'dark') {
            body.classList.add('dark-theme');
            body.setAttribute('data-bs-theme', 'dark'); // For Bootstrap dark mode support
            themeIcon.className = 'fas fa-sun me-2';     // Sun icon
            themeText.textContent = 'Light Theme';
            localStorage.setItem('theme', 'dark');
        } else {
            body.classList.remove('dark-theme');
            body.setAttribute('data-bs-theme', 'light'); // For Bootstrap light mode support
            themeIcon.className = 'fas fa-moon me-2';    // Moon icon
            themeText.textContent = 'Dark Theme';
            localStorage.setItem('theme', 'light');
        }
    }

    // --- 1. Load Saved Preference on Page Load ---
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme) {
        applyTheme(savedTheme);
    } 
    // Default to 'light' if no preference is saved
    else {
        applyTheme('light'); 
    }

    // --- 2. Event Listener for Button Click ---
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            // Determine current theme, switch to the opposite
            const currentTheme = body.classList.contains('dark-theme') ? 'dark' : 'light';
            const newTheme = (currentTheme === 'dark') ? 'light' : 'dark';
            applyTheme(newTheme);
        });
    }
});