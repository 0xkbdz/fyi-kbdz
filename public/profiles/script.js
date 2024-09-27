// script.js

document.addEventListener('DOMContentLoaded', () => {
  // Function to parse query parameters from the URL
  function getQueryParams() {
    const params = new URLSearchParams(window.location.search);
    const psid = params.get('psid') || params.get('psi'); // Support both 'pid' and 'psi'
    const sid = params.get('sid');
    return { psid, sid };
  }

  // Extract psid and sid from the URL
  const { psid, sid } = getQueryParams();

  // Validate psid and sid
  if (!psid || !sid) {
    displayError(new Error('Missing psid or sid in the URL parameters.'));
    return;
  }

  // Convert psid and sid to integers
  const parsedPsid = parseInt(psid, 10);
  const parsedSid = parseInt(sid, 10);

  if (isNaN(parsedPsid) || isNaN(parsedSid)) {
    displayError(new Error('Invalid psid or sid parameter. They must be integers.'));
    return;
  }

  // API Endpoint
  const apiEndpoint = `/survivors/${parsedPsid}/servers/${parsedSid}`;

  // Show the loading spinner
  document.body.classList.remove('loaded');

  // Fetch data from the API
  fetch(apiEndpoint)
    .then(response => {
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Player or server not found.');
        } else {
          throw new Error(`An error occurred: ${response.statusText}`);
        }
      }
      return response.json();
    })
    .then(data => {
      populateProfile(data);
    })
    .catch(error => {
      console.error('Error fetching the profile data:', error);
      displayError(error);
    });

  /**
   * Populates the HTML elements with fetched data
   * @param {Object} data - The JSON data from the API
   */
  function populateProfile(data) {
    // Hide the loading spinner
    document.body.classList.add('loaded');

    // Header
    document.getElementById('survivor-name').textContent = data.survivor_stats.survivor || 'Unknown Survivor';
    document.getElementById('rank').textContent = `Rank: ${data.survivor_stats.rankk || '--'}`;

    // Update avatar if available
    const avatarImg = document.querySelector('.avatar');
    if (data.survivor_stats.avatar_url) {
      avatarImg.src = data.survivor_stats.avatar_url;
      avatarImg.alt = `${data.survivor_stats.survivor}'s Avatar`;
    } else {
      avatarImg.src = 'avatar-placeholder.svg'; // Default avatar
      avatarImg.alt = 'Default Avatar';
    }

    // Statistics
    document.getElementById('kills').textContent = data.survivor_stats.kills || '0';
    document.getElementById('deaths').textContent = data.survivor_stats.deaths || '0';
    document.getElementById('kd').textContent = (data.survivor_stats.kd !== undefined) ? data.survivor_stats.kd.toFixed(2) : '0.0';
    document.getElementById('damage').textContent = data.survivor_stats.damage || '0';
    document.getElementById('bestmeters').textContent = `${data.survivor_stats.bestmeters || '0'}m`;
    document.getElementById('hs').textContent = data.survivor_stats.hs || '0';
    document.getElementById('bs').textContent = data.survivor_stats.bs || '0';
    document.getElementById('bank').textContent = `$${data.survivor_stats.bank || '0'}`;
    document.getElementById('wages').textContent = `$${data.survivor_stats.wages || '0'}`;
    document.getElementById('cst').textContent = `${formatTime(data.survivor_stats.cst)}`;
    document.getElementById('bst').textContent = `${formatTime(data.survivor_stats.bst)}`;
    document.getElementById('ton').textContent = `${formatTime(data.survivor_stats.ton)}`;
    document.getElementById('online').textContent = data.survivor_stats.online ? 'Yes' : 'No';
    document.getElementById('score').textContent = (data.survivor_stats.score !== undefined) ? data.survivor_stats.score.toFixed(1) : '0.0';
    document.getElementById('kosauthorized').textContent = data.survivor_stats.kosauthorized ? 'Yes' : 'No';

    // Leaderboard
    document.getElementById('leaderboard-rank').textContent = `Rank: ${data.survivor_stats.rankk || '--'}`;
    document.getElementById('leaderboard-score').textContent = `Score: ${(data.survivor_stats.score !== undefined) ? data.survivor_stats.score.toFixed(1) : '--'}`;
    document.getElementById('leaderboard-of').textContent = `of ${data.survivor_stats.of || '--'} players`;
  }

  /**
   * Formats time from minutes to hours and minutes format (e.g., 130 minutes to "2h 10m")
   * @param {number} minutes
   * @returns {string} Formatted time string
   */
  function formatTime(minutes) {
    if (minutes === undefined || minutes === null) return '0h 0m';
    const totalMinutes = parseInt(minutes, 10);
    if (isNaN(totalMinutes)) return '0h 0m';
    const hours = Math.floor(totalMinutes / 60);
    const remainingMinutes = totalMinutes % 60;
    return `${hours}h ${remainingMinutes}m`;
  }

  /**
   * Displays an error message on the page
   * @param {Error} error
   */
  function displayError(error) {
    // Hide the loading spinner
    document.body.classList.add('loaded');

    const container = document.querySelector('.container');
    container.innerHTML = `
      <div class="error">
        <h2>Oops! Something went wrong.</h2>
        <p>${error.message}</p>
      </div>
    `;
    // Optional: Add styling for the error message
    const errorStyle = document.createElement('style');
    errorStyle.textContent = `
      .error {
        text-align: center;
        padding: 50px;
      }
      .error h2 {
        color: #ff4c4c;
        margin-bottom: 20px;
      }
      .error p {
        color: #ffffff;
        font-size: 1.2em;
      }
    `;
    document.head.appendChild(errorStyle);
  }
});

