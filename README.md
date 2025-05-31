# KILLBOX Landing Page

A dark, cinematic landing page for the KILLBOX Xbox DayZ server designed to drive player subscriptions and community engagement.

## 🎮 Features

### Core Functionality
- **Hero Section** with video background and dual CTAs
- **Email Subscription** with form validation
- **Live Leaderboard** with auto-refresh (30-second intervals)
- **Social Media Integration** (TikTok, Twitter, YouTube, Discord)
- **About Section** with server features
- **Legal Pages** (Privacy Policy, Terms of Service)

### Technical Features
- **Responsive Design** - Mobile, tablet, and desktop optimized
- **Dark Bloody Theme** - Deep blacks and reds with cinematic feel
- **SEO Optimized** - Meta tags, structured data, OpenGraph
- **Accessibility** - WCAG 2.1 AA compliant
- **Performance** - Optimized CSS/JS, lazy loading ready
- **PWA Ready** - Manifest.json included
- **Analytics Ready** - Google Analytics integration

## 🚀 Quick Start

### Prerequisites
- Modern web browser
- Web server (for local development: Python, Node.js, or any static server)

### Setup
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd fyi-kbdz-landing-0531
   ```

2. Serve the files locally:
   ```bash
   # Option 1: Python 3
   python -m http.server 8000
   
   # Option 2: Node.js (with http-server)
   npx http-server
   
   # Option 3: PHP
   php -S localhost:8000
   ```

3. Open your browser to `http://localhost:8000`

## 📁 Project Structure

```
fyi-kbdz-landing-0531/
├── index.html                 # Main landing page
├── privacy-policy.html        # Privacy policy page
├── terms-of-service.html      # Terms of service page
├── manifest.json             # PWA manifest
├── favicon.ico               # Site favicon (to be added)
├── assets/
│   ├── css/
│   │   └── styles.css        # Main stylesheet
│   ├── js/
│   │   ├── main.js          # Site functionality
│   │   └── leaderboard.js   # Leaderboard management
│   ├── images/              # Images directory
│   └── video/               # Video assets directory
├── PRD.md                   # Product Requirements Document
└── README.md               # This file
```

## 🎨 Design System

### Colors
- **Primary Background**: `#0d0d0d` (Deep Black)
- **Secondary Background**: `#121212` (Dark Gray)
- **Accent Color**: `#b30000` (Blood Red)
- **Text Primary**: `#ffffff` (White)
- **Text Secondary**: `#c0c0c0` (Light Gray)

### Typography
- **Headings**: Cinzel (Gothic serif)
- **Body Text**: Open Sans (Clean sans-serif)

### Animations
- Smooth fade-ins and transitions
- Pulsing glow on CTA buttons
- Row highlighting for leaderboard updates
- Parallax effects on scroll

## 🔧 Configuration

### API Endpoints
Currently using mock data. To connect to real APIs:

1. **Leaderboard API** (`assets/js/leaderboard.js`):
   ```javascript
   const LEADERBOARD_CONFIG = {
       API_URL: 'https://api.kbdz.fyi/leaderboard/xbox', // Update this URL
       REFRESH_INTERVAL_MS: 30000,
       MAX_RETRIES: 3,
       RETRY_DELAY_MS: 5000
   };
   ```

2. **Subscription Form** (`assets/js/main.js`):
   Update the `simulateAPICall` method to use your email service endpoint.

### Analytics
Replace `GA_MEASUREMENT_ID` in `index.html` with your Google Analytics ID:
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=YOUR_GA_ID"></script>
```

### Social Media Links
Update social media URLs in all HTML files:
- TikTok: `https://www.tiktok.com/@killbox_dayz`
- Twitter: `https://twitter.com/killbox_dayz`
- YouTube: `https://www.youtube.com/killbox_dayz`
- Discord: `https://discord.gg/killbox`

## 📱 Mobile Optimization

- Responsive navigation with hamburger menu
- Touch-friendly button sizes (44px minimum)
- Optimized font scaling
- Mobile-first CSS approach
- PWA capabilities for installation

## ♿ Accessibility Features

- Semantic HTML structure
- ARIA labels and roles
- Keyboard navigation support
- Screen reader announcements
- High contrast mode support
- Reduced motion preferences
- Focus indicators
- Skip to content links

## 🔒 Security & Privacy

- HTTPS only (when deployed)
- Form validation and sanitization
- GDPR/CCPA compliant privacy policy
- Secure cookie handling
- Content Security Policy ready

## 📊 SEO Features

- Optimized meta tags
- Structured data (JSON-LD)
- OpenGraph and Twitter Cards
- Semantic HTML
- Image alt text
- Clean URL structure
- Fast loading times

## 🚀 Deployment

### Static Hosting
The site is ready to deploy to any static hosting service:

- **Netlify**: Drag and drop the project folder
- **Vercel**: Connect your Git repository
- **AWS S3**: Upload files to S3 bucket with static hosting
- **GitHub Pages**: Push to GitHub and enable Pages
- **Firebase Hosting**: Use Firebase CLI

### Performance Optimization
Before deploying:
1. Minify CSS and JavaScript
2. Optimize images (WebP format recommended)
3. Add hero video (compressed MP4, <5MB)
4. Enable Gzip/Brotli compression
5. Set up CDN for assets

## 📋 TODO / Future Enhancements

### Immediate (MVP Complete)
- [x] Core HTML structure
- [x] CSS styling with dark theme
- [x] JavaScript functionality
- [x] Mock leaderboard data
- [x] Form handling
- [x] Legal pages
- [x] Responsive design

### Next Phase
- [ ] Add hero background video
- [ ] Create favicon and app icons
- [ ] Add placeholder images
- [ ] Connect real API endpoints
- [ ] Set up email service integration
- [ ] Add loading states and animations
- [ ] Implement error boundaries

### Advanced Features
- [ ] Admin dashboard for content management
- [ ] User authentication system
- [ ] Real-time Discord integration
- [ ] Advanced analytics dashboard
- [ ] A/B testing framework
- [ ] Multi-language support

## 🐛 Known Issues

- Hero video placeholder needs actual DayZ footage
- Images directory needs actual assets
- API endpoints are currently mocked
- Email form needs backend integration

## 📞 Support

For questions or issues:
- **Email**: support@kbdz.fyi
- **Discord**: [KILLBOX Discord Server](https://discord.gg/killbox)

## 📄 License

This project is proprietary to KILLBOX. All rights reserved.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

---

**Built with ❤️ for the KILLBOX community** 