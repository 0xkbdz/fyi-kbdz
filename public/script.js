// script.js
document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav a');

    navLinks.forEach(link => {
        link.addEventListener('click', async (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                await scrollToSection(targetSection);
            }
        });
    });
});

/**
 * Smoothly scrolls to the specified section.
 * @param {HTMLElement} section 
 */
const scrollToSection = async (section) => {
    const behavior = 'smooth';
    section.scrollIntoView({ behavior });
};

