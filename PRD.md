# Product Requirements Document (PRD)  
## Project Overview  
**Project Name:** KILLBOX Landing Page  
**Project Type:** Static SEO-Optimized Landing Page  
**Platform:** Static Web (HTML/CSS/JavaScript)  
**Theme:** Dark Bloody / Cinematic  

### 1. Purpose & Objectives  
- **Purpose:**  
  Create a visually striking, cinematic landing page for the Xbox DayZ gameserver “KILLBOX” that drives new player subscriptions and community engagement.  
- **Primary Objectives:**  
  1. **Increase Subscriber Count:** Encourage visitors to subscribe (email/newsletter or server notification).  
  2. **Grow Discord Community:** Provide a clear call-to-action (CTA) linking to the KILLBOX Discord.  
  3. **Drive Social Engagement:** Link to TikTok, Twitter, and YouTube accounts.  
  4. **Showcase Live Leaderboard:** Display real-time player stats fetched client-side via API to build FOMO (Fear of Missing Out) and authenticity.  
  5. **SEO Optimization:** Rank for search queries related to “Xbox DayZ server,” “DayZ KILLBOX,” “DayZ Xbox gaming community,” etc.  

### 2. Target Audience  
1. **Xbox DayZ Players:**  
   - Casual and hardcore DayZ players on Xbox looking for a new, intense PvPvE (Player vs. Player vs. Environment) experience.  
   - Age range: 18+, comfortable with dark/gory aesthetics.  
2. **Streaming/Content Community:**  
   - Streamers and content creators searching for an active PvP-focused server with a cinematic vibe.  
3. **Social Gamers & Community Seekers:**  
   - Gamers who engage in Discord communities and follow gaming-related social channels on TikTok, Twitter, YouTube.

### 3. Key Success Metrics  
- **Subscription Rate:** Percentage of unique visitors who click the “Subscribe” CTA and complete the sign-up form.  
- **Discord Join Rate:** Number of visitors clicking “Join Discord” and actually joining the server.  
- **Social Click-Throughs (CTRs):** Clicks on TikTok, Twitter, and YouTube icons.  
- **Average Time on Page:** Higher dwell time indicates engagement with content (target ≥ 2:00 minutes).  
- **SEO Performance:**  
  - Organic search traffic increase by X% within 3 months.  
  - Ranking in Google SERPs for “Xbox DayZ server” within top 5.  

---

## 4. Functional Requirements  
### 4.1. Hero Section (Above the Fold)  
- **Background Video / Cinematic Banner:**  
  - 1920×1080 mp4 (autoplay, muted, loop). Footage of DayZ in-game raiding, blood splatter, cinematic fade-ins.  
  - Fallback static image with dark, bloody textures if the user’s browser does not support video autoplay.  
- **Headline & Subheadline:**  
  - **Headline (H1):** “KILLBOX: The Ultimate Xbox DayZ Bloodbath”  
  - **Subheadline (H2):** “Survive. Dominate. Return for More.”  
- **Primary CTA Buttons (2):**  
  1. **Subscribe to Updates**  
     - Button text: “SUBSCRIBE NOW”  
     - Link target: Anchor to the “Subscription Section” (below), scroll smooth.  
     - `aria-label="Subscribe to KILLBOX updates"`  
     - Styling: Bloody-red button with subtle glow/flicker animation on hover.  
  2. **Join Our Discord**  
     - Button text: “JOIN DISCORD”  
     - Link target: Redirect to Discord invite URL (e.g., `https://discord.gg/<INVITE_CODE>`).  
     - `aria-label="Join KILLBOX Discord Server"`  
     - Styling: Black button with red border, red hover effect.  

### 4.2. Subscription Section  
- **Section ID:** `#subscribe`  
- **Headline (H2):** “Never Miss a Raid”  
- **Body Copy:**  
  - Brief description (1–2 sentences) about what subscribers receive (e.g., “Get exclusive server updates, event announcements, and insider news.”).  
- **Subscription Form Elements:**  
  1. **Email Input** (required)  
     - Placeholder: “Enter your email address”  
     - Validation: HTML5 `type="email"`, required attribute, client-side validation.  
  2. **Checkbox (Optional):** “I agree to receive email updates from KILLBOX.”  
     - Link to Privacy Policy (opens in new tab).  
  3. **Subscribe Button**  
     - Text: “SUBMIT”  
     - On success: Display a confirmation message below form: “Thank you for subscribing! Check your inbox for confirmation.”  
- **SEO/Accessibility:**  
  - Use `<form>` tag with `action` pointing to email marketing endpoint (e.g., MailChimp, SendGrid API).  
  - Include `aria-live="polite"` region for form success/error messages.  

### 4.3. Live Player Stats Leaderboard Section  
- **Section ID:** `#leaderboard`  
- **Headline (H2):** “Live Killbox Leaderboard”  
- **Description:** “Top Players on KILLBOX Xbox DayZ Server – Updated Every 30 Seconds.”  
- **Leaderboard Table:**  
  - Columns: `Rank | Player Name | Kills | Deaths | K/D Ratio`  
  - Styling:  
    - Dark background (#1a1a1a), red border accents, white text, blood-red highlights for top 3 ranks.  
    - Rows alternate: very dark (#121212) and slightly lighter (#1e1e1e).  
  - Client-Side Data Fetch:  
    - On page load, JavaScript fetches JSON from API endpoint `https://api.kbdz.fyi/leaderboard/xbox` (example).  
    - Poll every 30 seconds to refresh data.  
    - Use fetch + async/await; handle errors gracefully (display “Unable to load stats” red-text fallback).  
  - **Accessibility:**  
    - Use `<table>` with `<thead>`, `<tbody>`, and appropriate `<th scope="col">`.  
    - Include `aria-live="polite"` so screen readers announce updates.  
  - **Fallback:**  
    - If JavaScript disabled, show static message: “Live leaderboard available when JavaScript is enabled.”  

### 4.4. Social Media Links Section  
- **Section ID:** `#socials`  
- **Headline (H2):** “Follow Us”  
- **Description:** “Join the carnage on social media for sneak peeks, highlights, and server news.”  
- **Social Icons & Links:**  
  - TikTok: `https://www.tiktok.com/@killbox_dayz`  
  - Twitter: `https://twitter.com/killbox_dayz`  
  - YouTube: `https://www.youtube.com/killbox_dayz`  
- **Icon Styling:**  
  - Use SVG icons (white outlines with red hover fill).  
  - On hover: scale up slightly (1.1×), glow effect (subtle red outer glow).  
  - If any link is unavailable, hide that icon automatically.  

### 4.5. About Section (Optional)  
> *(Optional, but can help SEO and context)*  
- **Section ID:** `#about`  
- **Headline (H2):** “About KILLBOX”  
- **Body Copy (2–3 paragraphs max):**  
  1. **Introduction:** “KILLBOX is the premier Xbox DayZ server delivering relentless PvPvE action….”  
  2. **Features:** “Custom mods, 24/7 uptime, active admin team, seasonal events…”  
  3. **Community:** “Join a thriving community of survivors… daily bloodbaths… unforgettable betrayals….”  
- **SEO Considerations:**  
  - Include keywords naturally (e.g., “Xbox DayZ server,” “DayZ KILLBOX,” “PvP DayZ Xbox”).  
  - Use 2–3 relevant internal/external links (e.g., link to DayZ Xbox official site, link to top influencers).  
  - Add a small FAQ at the bottom if space allows: “What makes KILLBOX different?”, “How do I join?”, “What mods are enabled?”.  



---

## 5. Non-Functional Requirements  
### 5.1. Performance & Hosting  
- **Hosting Platform:** AWS EC2 behind NGINX reverse proxy (static site).  
- **Page Load Time:**  
  - Target: ≤ 2.5 seconds on 3G.  
  - Optimize images/video for web (compress hero video to under 5 MB).  
  - Use Brotli/Gzip compression.  
  - Lazy-load offscreen assets (e.g., lower-priority images or sections below fold).  
  - Minify CSS/JS.  
- **Responsive Design:**  
  - Fully responsive for desktop, tablet, and mobile (breakpoints at 320px, 768px, 1024px).  
  - Ensure hero video or fallback image scales/crops appropriately.  
  - Mobile CTAs: large tappable buttons (minimum 44×44 px).  

### 5.2. SEO & Metadata  
- **Meta Tags:**  
  - `<title>KILLBOX: Xbox DayZ Server | Join the Bloody Carnage</title>`  
  - `<meta name="description" content="KILLBOX is the ultimate Xbox DayZ gameserver—experience relentless PvP action, epic raids, and a thriving Discord community. Subscribe now and never miss a bloodbath!">`  
  - `<meta name="keywords" content="Xbox DayZ, DayZ server, KILLBOX, DayZ PvP, Xbox gaming, zombie survival, DayZ Discord">`  
  - Open Graph (OG) Tags:  
    - `<meta property="og:title" content="KILLBOX: Xbox DayZ Server | Join the Bloody Carnage">`  
    - `<meta property="og:description" content="Subscribe to KILLBOX and join our Discord for nonstop DayZ action on Xbox. Live leaderboard and exclusive updates!">`  
    - `<meta property="og:image" content="https://kbdz.fyi/assets/og-image.jpg">`  
    - `<meta property="og:url" content="https://kbdz.fyi">`  
    - `<meta property="og:type" content="website">`  
  - Twitter Card:  
    - `<meta name="twitter:card" content="summary_large_image">`  
    - `<meta name="twitter:title" content="KILLBOX: Xbox DayZ Server">`  
    - `<meta name="twitter:description" content="Join KILLBOX for unrelenting Xbox DayZ PvP action—subscribe for updates & join our Discord!">`  
    - `<meta name="twitter:image" content="https://kbdz.fyi/assets/twitter-card.jpg">`  
- **Structured Data (JSON-LD):**  
  - Use `Organization` schema with name “KILLBOX,” URL, social profiles, and logo.  
  - Use `WebSite` schema for “subscription” action target.  

### 5.3. Security & Compliance  
- **HTTPS Only:** Ensure TLS certificate (Let’s Encrypt) for all traffic.  
- **Form Validation & Spam Prevention:**  
  - Use reCAPTCHA v2 or honeypot field to reduce bot signups.  
  - Validate email inputs on both client and server side (if serverless function used).  
- **Privacy Policy & Terms Link:**  
  - Add link in footer to Privacy Policy (hosted as `/privacy-policy.html`).  
  - GDPR/CCPA compliance: collect only email, store securely, provide opt-out instructions.  

### 5.4. Accessibility (WCAG 2.1 AA)  
- **Color Contrast:**  
  - Ensure text on dark backgrounds meet minimum contrast ratios (≥ 4.5:1).  
  - Buttons: red on black should be tested and tweaked if insufficient contrast.  
- **Keyboard Navigation:**  
  - All interactive elements (CTAs, form fields, social icons) reachable via `Tab`.  
  - Visible focus indicators (e.g., red outline).  
- **ARIA Labels & Roles:**  
  - Add `role="banner"` for header, `role="main"` for content container, `role="contentinfo"` for footer.  
  - Use `aria-label` on icon links to indicate “Follow us on Twitter/TikTok/YouTube.”  
  - `aria-live="polite"` for leaderboard updates and form feedback.  
- **Semantic HTML:**  
  - Use `<header>`, `<nav>`, `<section>`, `<footer>`, `<h1>–<h3>`, `<p>`, `<ul>`/`<li>` for lists of features or social icons.  

---

## 6. Content & Copywriting Guidelines  
1. **Tone & Voice:**  
   - Bold, aggressive, cinematic language; short impactful sentences.  
   - Use sensory verbs (e.g., “Bleed. Survive. Conquer.”).  
   - Avoid jargon beyond DayZ/Survival game terms.  
2. **Headlines & CTAs:**  
   - Hero Headline must be H1, 6–8 words max, high emotional impact.  
   - Secondary headings H2 should be descriptive, include keywords.  
3. **Body Text:**  
   - Keep paragraphs ≤ 3 sentences.  
   - Use bullet lists sparingly to highlight server features (e.g., “✔ Custom mods ✔ 24/7 Admin Support ✔ Weekly Events”).  
4. **Images/Graphics:**  
   - Cinematic stills from DayZ with red/brown color grading.  
   - Iconography: custom “bloody” SVG overlays on CTAs.  
   - Prefetch/Open Graph images must be cinematic montage with server logo.  
5. **Localization (Future-Proofing):**  
   - Use `lang="en-US"` in `<html>`.  
   - Prepare copy strings to be easily extractable for translation.  

---

## 7. Design & UX Specifications  
### 7.1. Overall Look & Feel  
- **Color Palette:**  
  - Primary Colors: Deep Black (#0d0d0d), Dark Red (#8b0000), Blood Red (#b30000).  
  - Secondary/Accents: Charcoal Gray (#1a1a1a), Silver Gray (#c0c0c0), White (#ffffff).  
- **Typography:**  
  - Heading Font: “Cinzel” or “UnifrakturMaguntia” (medieval/gothic serif style).  
  - Body Font: “Roboto” or “Open Sans” (san-serif for readability).  
  - Font Sizes:  
    - H1: 3rem (48px)  
    - H2: 2rem (32px)  
    - H3: 1.5rem (24px)  
    - Body: 1rem (16px)  
    - CTA Buttons: 1.125rem (18px) bold  
- **Layout & Structure:**  
  - Single-column scroll-based layout with parallax background sections (hero video, then dark background).  
  - Sticky Header/Nav Bar: Transparency fading to solid on scroll past hero.  
  - Footer: Dark gray (#121212) with social icons, small legal links (“Privacy Policy,” “Terms of Service”).  
- **Animations & Transitions:**  
  - Smooth fade-in of text elements on page load (500ms).  
  - CTA Buttons: Slight pulsing glow animation (1.5s infinite loop) to draw attention.  
  - Leaderboard update: subtle row highlight flash (red-tint for 1 second) when data changes.  
  - Parallax effect: background moves slower than foreground text as user scrolls.  

### 7.2. Navigation & Header  
- **Header:**  
  - Logo (left): KILLBOX stylized wordmark—white outline with slight blood drip effect.  
  - Nav Links (right): “Home,” “Leaderboard,” “About,” “Subscribe,” “Discord.”  
    - Anchor links scroll to respective sections smoothly.  
  - On mobile: Hamburger menu icon (three red bars) expands a full-screen overlay with nav links.  
- **Sticky Behavior:**  
  - Header becomes semi-opaque black background (rgba(0,0,0,0.85)) after scrolling 100px.  
  - Height: 80px on desktop; 60px on mobile.  

### 7.3. Footer  
- **Structure:**  
  - Left: Small KILLBOX logo, copyright.  
  - Center: “Follow Us” social icons (TikTok, Twitter, YouTube).  
  - Right: “Privacy Policy” & “Terms of Service” text links (font-size: 0.875rem).  
- **Styling:**  
  - Background: #121212; Text: #c0c0c0; Links turn red (#b30000) on hover.  
  - Padding: 2rem top/bottom, 10% left/right.  
- **Accessibility:**  
  - Ensure focus outlines on links in footer.  

---

## 8. Technical Architecture & Implementation Details  
### 8.1. Technology Stack  
- **Static Site Generator (Optional):**  
  - **Option 2:** Vanilla HTML/CSS/JS with a build tool (Webpack/Rollup) for bundling.  
- **CSS Framework (Optional):**  
  - Tailwind CSS (dark mode enabled) OR custom SCSS for granular control.  
- **JavaScript:**  
  - Plain ES6+ modules (no heavy frameworks).  
  - Use Fetch API for leaderboard.  
  - Intersection Observer for lazy-loading sections.  
- **Build & Deployment:**  
  - Git repository (GitHub).  
  - CI/CD with GitHub Actions:  
    - Lint CSS/JS, run HTML validator, optimize images, deploy to Netlify (or chosen host).  
- **Analytics & Tracking:**  
  - Google Analytics 4 (GA4) integrated in `<head>`.  
  - Optional: Discord widget analytics if trackable, UTM parameters on “Join Discord” link.  

### 8.2. File Structure (Example)  
```

/killbox-landing
├── assets/
│   ├── css/
│   │   └── styles.min.css
│   ├── js/
│   │   └── leaderboard.js
│   ├── images/
│   │   ├── hero-fallback.jpg
│   │   ├── og-image.jpg
│   │   └── twitter-card.jpg
│   └── video/
│       └── hero-background.mp4
├── index.html
├── privacy-policy.html
├── terms-of-service.html
├── manifest.json
├── favicon.ico
└── README.md

````

### 8.3. API Contract for Leaderboard  
- **Endpoint:** `GET https://api.kbdz.fyi/leaderboard/xbox`  
- **Response (JSON):**  
  ```json
  {
    "last_updated": "2025-05-31T14:23:00Z",
    "players": [
      {
        "rank": 1,
        "username": "BleedMaster",
        "kills": 152,
        "deaths": 42
      },
      {
        "rank": 2,
        "username": "ZombieSlayer",
        "kills": 148,
        "deaths": 55
      },
      …
    ]
  }
````

* **Client-Side Logic:**

  1. Fetch data on page load.
  2. Render `<tbody>` rows dynamically via template literal and `innerHTML`.
  3. Every 30 seconds: re-fetch, compare old vs. new `players[]`. If changes detected, re-render and highlight changed rows.
  4. Error handling: display `<div class="error">Unable to load leaderboard. Try again later.</div>`.

---

## 9. SEO & Marketing Strategy

### 9.1. Keyword Research & On-Page SEO

* **Primary Keywords:**

  * “Xbox DayZ server”
  * “DayZ Xbox PvP server”
  * “KILLBOX DayZ server”
* **Secondary Keywords:**

  * “DayZ Xbox community,” “best DayZ server Xbox,” “DayZ PvPvE server Xbox.”
* **On-Page SEO Implementation:**

  1. **Title Tag Optimization:**

     * Keep ≤ 60 characters; include primary keyword at front.
  2. **Heading Structure:**

     * Only one H1 (Hero Headline). Use H2/H3 for subheadings with secondary keywords.
  3. **URL Structure:**

     * Domain: `https://kbdz.fyi` (no URL parameters).
     * Clean, lowercased file names (`index.html`, `privacy-policy.html`).
  4. **Image Alt Text:**

     * Hero Image: `alt="KILLBOX DayZ server cinematic battlefield"`
     * Social icons: `alt="TikTok logo"`, etc.
  5. **Internal Links:**

     * Hero CTAs anchor-link to sections (`#subscribe`, `#leaderboard`).
     * Footer links to Privacy/Terms.

### 9.2. Off-Page SEO & Promotion

* **Discord Community Boost:**

  * Encourage current discord members to share the landing page link.
  * Pin landing page in Discord announcements channel.
* **Social Media Promotion:**

  * Post trailers/teasers on TikTok & YouTube Shorts linking back to landing page.
  * Tweet daily stats/highlights with link to live leaderboard section.
* **Collaborations & Influencers:**

  * Partner with Xbox DayZ streamers to showcase KILLBOX gameplay; include landing page link in stream descriptions.
* **Backlink Strategy:**

  * Submit to DayZ fan forums, Xbox community subreddits, gaming aggregator sites.
  * Reach out to gaming blogs for server reviews.

---

## 13. Appendix

### 13.1. Sample CTA Button HTML

```html
<a href="#subscribe" class="btn btn-primary cta-subscribe" aria-label="Subscribe to KILLBOX updates">
  SUBSCRIBE NOW
</a>
<a href="https://discord.gg/<INVITE_CODE>" class="btn btn-secondary cta-discord" aria-label="Join KILLBOX Discord Server" target="_blank" rel="noopener">
  JOIN DISCORD
</a>
```

### 13.2. Sample Leaderboard Fetch Script (Simplified)

```js
// File: assets/js/leaderboard.js
const API_URL = 'https://api.kbdz.fyi/leaderboard/xbox';
const REFRESH_INTERVAL_MS = 30000;
const tableBody = document.querySelector('#leaderboard tbody');

async function fetchLeaderboard() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    renderLeaderboard(data.players);
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    showError();
  }
}

function renderLeaderboard(players) {
  const rowsHTML = players.map(player => `
    <tr>
      <td>${player.rank}</td>
      <td>${player.username}</td>
      <td>${player.kills}</td>
      <td>${player.deaths}</td>
      <td>${(player.kills / Math.max(player.deaths, 1)).toFixed(2)}</td>
    </tr>
  `).join('');
  tableBody.innerHTML = rowsHTML;
}

function showError() {
  tableBody.innerHTML = `
    <tr>
      <td colspan="5" class="error">Unable to load leaderboard. Please try again later.</td>
    </tr>
  `;
}

document.addEventListener('DOMContentLoaded', () => {
  fetchLeaderboard();
  setInterval(fetchLeaderboard, REFRESH_INTERVAL_MS);
});
```

### 13.3. Sample CSS Snippet (Dark Bloody Theme)

```css
:root {
  --color-bg: #0d0d0d;
  --color-bg-alt: #121212;
  --color-text: #ffffff;
  --color-accent: #b30000;
  --color-accent-dark: #8b0000;
  --color-border: #1a1a1a;
}

body {
  background-color: var(--color-bg);
  color: var(--color-text);
  font-family: 'Open Sans', sans-serif;
  margin: 0; padding: 0;
}

.header {
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  background: transparent;
  transition: background 0.3s ease;
  z-index: 100;
}

.header.scrolled {
  background: rgba(0, 0, 0, 0.85);
}

.btn {
  font-weight: bold;
  padding: 1rem 2rem;
  border-radius: 4px;
  text-decoration: none;
  display: inline-block;
  transition: transform 0.2s ease, box-shadow 0.3s ease;
}

.btn-primary {
  background-color: var(--color-accent);
  color: var(--color-text);
  border: 2px solid var(--color-accent-dark);
}

.btn-primary:hover {
  transform: scale(1.05);
  box-shadow: 0 0 10px var(--color-accent);
}

.btn-secondary {
  background-color: var(--color-bg);
  color: var(--color-accent);
  border: 2px solid var(--color-accent);
}

.btn-secondary:hover {
  background-color: var(--color-accent);
  color: var(--color-text);
  box-shadow: 0 0 10px var(--color-accent);
}

#leaderboard {
  background-color: var(--color-bg-alt);
  padding: 2rem;
  border: 1px solid var(--color-border);
  margin: 2rem auto;
  max-width: 800px;
  border-radius: 8px;
}

#leaderboard table {
  width: 100%;
  border-collapse: collapse;
}

#leaderboard th,
#leaderboard td {
  padding: 0.75rem 1rem;
  border-bottom: 1px solid var(--color-border);
}

#leaderboard tr:nth-child(odd) {
  background-color: #1e1e1e;
}

#leaderboard tr:nth-child(even) {
  background-color: #121212;
}

#leaderboard th {
  text-align: left;
  border-bottom: 2px solid var(--color-accent);
}

.error {
  color: var(--color-accent);
  text-align: center;
}
```

---

**End of PRD**

