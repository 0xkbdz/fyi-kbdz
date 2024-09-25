// script.js
document.addEventListener('DOMContentLoaded', () => {
    // Theme Toggle
    const themeToggleBtn = document.querySelector('.theme-toggle');
    const body = document.body;
    const themes = ['theme-dark-magenta', 'theme-blood-red', 'theme-forest-camouflage'];
    let currentThemeIndex = 0;

    themeToggleBtn.addEventListener('click', () => {
        currentThemeIndex = (currentThemeIndex + 1) % themes.length;
        body.classList.remove(...themes);
        body.classList.add(themes[currentThemeIndex]);
    });

    // Hamburger Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Smooth Scrolling
    const navAnchors = document.querySelectorAll('.nav a');

    navAnchors.forEach(link => {
        link.addEventListener('click', async (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                await scrollToSection(targetSection);
                // Close the mobile menu after clicking
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                }
            }
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

    // Leaderboard Fetching
    const leaderboardSection = document.getElementById('leaderboard');
    const leaderboardGrid = document.getElementById('leaderboard-grid');
    let leaderboardFetched = false;

    const fetchLeaderboard = async () => {
        try {
            const response = await fetch('/v2/nitrado/servers/13666113/leaderboard');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            renderLeaderboard(data);
        } catch (error) {
            console.error('Error fetching leaderboard:', error);
            leaderboardGrid.innerHTML = '<p>Failed to load leaderboard.</p>';
        }
    };

    const renderLeaderboard = (data) => {
        if (!Array.isArray(data) || data.length === 0) {
            leaderboardGrid.innerHTML = '<p>No leaderboard data available.</p>';
            return;
        }

        leaderboardGrid.innerHTML = ''; // Clear loading text

        data.forEach(player => {
            const tile = document.createElement('div');
            tile.classList.add('leaderboard-tile');

            tile.innerHTML = `
                <h3>Rank ${player.rankk}: ${player.survivor}</h3>
                <p><strong>Kills:</strong> ${player.kills}</p>
                <p><strong>Deaths:</strong> ${player.deaths}</p>
                <p><strong>K/D Ratio:</strong> ${player.kd}</p>
                <p><strong>Damage:</strong> ${player.damage}</p>
                <p><strong>Best Meters:</strong> ${player.bestmeters}</p>
                <p><strong>Headshots:</strong> ${player.hs}</p>
                <p><strong>Bank:</strong> $${Number(player.bank).toLocaleString()}</p>
                <p><strong>Score:</strong> ${player.score}</p>
            `;

            leaderboardGrid.appendChild(tile);
        });
    };

    // Intersection Observer for Leaderboard Section
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !leaderboardFetched) {
                fetchLeaderboard();
                leaderboardFetched = true;
                observer.unobserve(entry.target);
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    if (leaderboardSection) {
        observer.observe(leaderboardSection);
    }
});

