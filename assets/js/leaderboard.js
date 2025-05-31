// Leaderboard functionality for KILLBOX landing page
const LEADERBOARD_CONFIG = {
    API_URL: 'https://api.kbdz.fyi/leaderboard/xbox',
    REFRESH_INTERVAL_MS: 30000, // 30 seconds
    MAX_RETRIES: 3,
    RETRY_DELAY_MS: 5000
};

class LeaderboardManager {
    constructor() {
        this.tableBody = document.querySelector('#leaderboard-body');
        this.refreshInterval = null;
        this.retryCount = 0;
        this.previousData = null;
        
        // Initialize on DOM content loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.initialize());
        } else {
            this.initialize();
        }
    }

    initialize() {
        if (!this.tableBody) {
            console.warn('Leaderboard table body not found');
            return;
        }

        this.fetchLeaderboard();
        this.startAutoRefresh();
        
        // Handle visibility change to pause/resume updates
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.stopAutoRefresh();
            } else {
                this.startAutoRefresh();
                this.fetchLeaderboard(); // Immediate update when page becomes visible
            }
        });
    }

    async fetchLeaderboard() {
        try {
            // For demo purposes, we'll use mock data since the API doesn't exist yet
            // In production, replace this with: const response = await fetch(LEADERBOARD_CONFIG.API_URL);
            const data = await this.getMockData();
            
            // Simulate API response format
            const leaderboardData = {
                last_updated: new Date().toISOString(),
                players: data
            };

            this.renderLeaderboard(leaderboardData.players);
            this.retryCount = 0; // Reset retry count on success
            
        } catch (error) {
            console.error('Error fetching leaderboard:', error);
            this.handleError();
        }
    }

    async getMockData() {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Mock data that changes slightly each time to simulate live updates
        const baseData = [
            { username: 'BloodReaper', kills: 152, deaths: 42 },
            { username: 'ShadowHunter', kills: 148, deaths: 55 },
            { username: 'CrimsonWolf', kills: 134, deaths: 38 },
            { username: 'NightStalker', kills: 127, deaths: 61 },
            { username: 'DeathBringer', kills: 119, deaths: 45 },
            { username: 'DarkAssassin', kills: 115, deaths: 52 },
            { username: 'BloodThirsty', kills: 108, deaths: 49 },
            { username: 'GrimReaper', kills: 102, deaths: 58 },
            { username: 'VoidWalker', kills: 98, deaths: 44 },
            { username: 'SilentKiller', kills: 94, deaths: 51 }
        ];

        // Add some randomization to simulate live changes
        return baseData.map((player, index) => {
            const killVariation = Math.floor(Math.random() * 5) - 2; // -2 to +2
            const deathVariation = Math.floor(Math.random() * 3) - 1; // -1 to +1
            
            return {
                rank: index + 1,
                username: player.username,
                kills: Math.max(0, player.kills + killVariation),
                deaths: Math.max(1, player.deaths + deathVariation) // Ensure deaths is at least 1
            };
        });
    }

    renderLeaderboard(players) {
        if (!this.tableBody || !Array.isArray(players)) {
            console.error('Invalid data or missing table body');
            return;
        }

        // Check for changes to highlight updated rows
        const changedRows = this.getChangedRows(players);
        
        const rowsHTML = players.map(player => {
            const kd = (player.kills / Math.max(player.deaths, 1)).toFixed(2);
            const isChanged = changedRows.includes(player.rank);
            const rowClass = isChanged ? 'updated' : '';
            
            return `
                <tr class="${rowClass}" data-rank="${player.rank}">
                    <td>${player.rank}</td>
                    <td>${this.escapeHtml(player.username)}</td>
                    <td>${player.kills}</td>
                    <td>${player.deaths}</td>
                    <td>${kd}</td>
                </tr>
            `;
        }).join('');

        this.tableBody.innerHTML = rowsHTML;
        
        // Store current data for next comparison
        this.previousData = players;

        // Announce update to screen readers
        this.announceUpdate(players.length);
        
        // Remove updated class after animation
        setTimeout(() => {
            document.querySelectorAll('.leaderboard-table tr.updated').forEach(row => {
                row.classList.remove('updated');
            });
        }, 1000);
    }

    getChangedRows(newData) {
        if (!this.previousData || !Array.isArray(this.previousData)) {
            return [];
        }

        const changed = [];
        
        newData.forEach(newPlayer => {
            const oldPlayer = this.previousData.find(p => p.username === newPlayer.username);
            if (oldPlayer && (oldPlayer.kills !== newPlayer.kills || oldPlayer.deaths !== newPlayer.deaths)) {
                changed.push(newPlayer.rank);
            }
        });

        return changed;
    }

    handleError() {
        this.retryCount++;
        
        if (this.retryCount <= LEADERBOARD_CONFIG.MAX_RETRIES) {
            console.log(`Retrying leaderboard fetch (${this.retryCount}/${LEADERBOARD_CONFIG.MAX_RETRIES})`);
            setTimeout(() => this.fetchLeaderboard(), LEADERBOARD_CONFIG.RETRY_DELAY_MS);
        } else {
            this.showError();
        }
    }

    showError() {
        if (!this.tableBody) return;
        
        this.tableBody.innerHTML = `
            <tr>
                <td colspan="5" class="error">
                    Unable to load leaderboard. Please check your connection and try again later.
                    <br>
                    <button class="btn btn-secondary" style="margin-top: 1rem; padding: 0.5rem 1rem; font-size: 0.9rem;" onclick="leaderboardManager.retryFetch()">
                        Retry
                    </button>
                </td>
            </tr>
        `;
    }

    retryFetch() {
        this.retryCount = 0;
        this.fetchLeaderboard();
    }

    startAutoRefresh() {
        this.stopAutoRefresh(); // Clear any existing interval
        this.refreshInterval = setInterval(() => {
            this.fetchLeaderboard();
        }, LEADERBOARD_CONFIG.REFRESH_INTERVAL_MS);
    }

    stopAutoRefresh() {
        if (this.refreshInterval) {
            clearInterval(this.refreshInterval);
            this.refreshInterval = null;
        }
    }

    announceUpdate(playerCount) {
        // Create announcement for screen readers
        const announcement = `Leaderboard updated. Showing ${playerCount} players.`;
        const liveRegion = document.querySelector('.leaderboard-container[aria-live]');
        
        if (liveRegion) {
            // Temporarily clear and reset the aria-live region to trigger announcement
            const originalText = liveRegion.getAttribute('aria-label') || '';
            liveRegion.setAttribute('aria-label', announcement);
            
            setTimeout(() => {
                liveRegion.setAttribute('aria-label', originalText);
            }, 1000);
        }
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // Clean up on page unload
    destroy() {
        this.stopAutoRefresh();
        document.removeEventListener('visibilitychange', this.handleVisibilityChange);
    }
}

// Initialize leaderboard manager
const leaderboardManager = new LeaderboardManager();

// Handle page unload
window.addEventListener('beforeunload', () => {
    leaderboardManager.destroy();
});

// Export for potential use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = LeaderboardManager;
} 