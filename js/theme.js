// js/theme.js - Global Theme Toggle Script
document.addEventListener('DOMContentLoaded', () => {
  const themeToggle = document.getElementById('themeToggle');
  const body = document.body;

  // Load saved theme from localStorage (default to dark)
  const savedTheme = localStorage.getItem('theme') || 'dark';
  body.classList.toggle('light', savedTheme === 'light');
  if (themeToggle) {
    updateThemeIcon(savedTheme);
  }

  // Toggle theme on button click (if button exists on page)
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const isLight = body.classList.toggle('light');
      const theme = isLight ? 'light' : 'dark';
      localStorage.setItem('theme', theme);
      updateThemeIcon(theme);
    });
  }

  function updateThemeIcon(theme) {
    if (themeToggle) {
      themeToggle.textContent = theme === 'light' ? '☀️' : '🌙';
      themeToggle.setAttribute('title', theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode');
    }
  }
});