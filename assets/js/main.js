// Main JavaScript functionality for KILLBOX landing page
class SiteManager {
    constructor() {
        this.header = document.querySelector('.header');
        this.hamburger = document.querySelector('.hamburger');
        this.navLinks = document.querySelector('.nav-links');
        this.subscriptionForm = document.querySelector('.subscription-form');
        this.heroVideo = document.querySelector('.hero-video');
        
        this.isScrolled = false;
        this.mobileMenuOpen = false;
        
        this.initialize();
    }

    initialize() {
        this.setupScrollEffects();
        this.setupSmoothScrolling();
        this.setupMobileMenu();
        this.setupFormHandling();
        this.setupVideoFallback();
        this.setupKeyboardNavigation();
        this.setupIntersectionObserver();
        
        console.log('KILLBOX site initialized');
    }

    // Header scroll effects
    setupScrollEffects() {
        let ticking = false;
        
        const updateHeader = () => {
            const scrollY = window.scrollY;
            const shouldBeScrolled = scrollY > 100;
            
            if (shouldBeScrolled !== this.isScrolled) {
                this.isScrolled = shouldBeScrolled;
                
                if (this.header) {
                    this.header.classList.toggle('scrolled', this.isScrolled);
                }
            }
            
            ticking = false;
        };

        const onScroll = () => {
            if (!ticking) {
                requestAnimationFrame(updateHeader);
                ticking = true;
            }
        };

        window.addEventListener('scroll', onScroll, { passive: true });
        
        // Initial check
        updateHeader();
    }

    // Smooth scrolling for anchor links
    setupSmoothScrolling() {
        document.addEventListener('click', (e) => {
            const target = e.target.closest('a[href^="#"]');
            
            if (target) {
                const href = target.getAttribute('href');
                const targetElement = document.querySelector(href);
                
                if (targetElement) {
                    e.preventDefault();
                    
                    // Close mobile menu if open
                    if (this.mobileMenuOpen) {
                        this.toggleMobileMenu();
                    }
                    
                    // Calculate offset for fixed header
                    const headerHeight = this.header ? this.header.offsetHeight : 80;
                    const targetPosition = targetElement.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    }

    // Mobile menu functionality
    setupMobileMenu() {
        if (!this.hamburger || !this.navLinks) return;

        this.hamburger.addEventListener('click', () => {
            this.toggleMobileMenu();
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (this.mobileMenuOpen && 
                !this.hamburger.contains(e.target) && 
                !this.navLinks.contains(e.target)) {
                this.toggleMobileMenu();
            }
        });

        // Close menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.mobileMenuOpen) {
                this.toggleMobileMenu();
            }
        });

        // Close menu on window resize to desktop size
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768 && this.mobileMenuOpen) {
                this.toggleMobileMenu();
            }
        });
    }

    toggleMobileMenu() {
        this.mobileMenuOpen = !this.mobileMenuOpen;
        
        if (this.hamburger) {
            this.hamburger.classList.toggle('active', this.mobileMenuOpen);
            this.hamburger.setAttribute('aria-expanded', this.mobileMenuOpen);
        }
        
        if (this.navLinks) {
            this.navLinks.classList.toggle('mobile-open', this.mobileMenuOpen);
        }
        
        // Prevent body scroll when menu is open
        document.body.style.overflow = this.mobileMenuOpen ? 'hidden' : '';
    }

    // Form handling
    setupFormHandling() {
        if (!this.subscriptionForm) return;

        this.subscriptionForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            await this.handleSubscription(e.target);
        });
    }

    async handleSubscription(form) {
        const formData = new FormData(form);
        const email = formData.get('email');
        const consent = formData.get('consent');
        const feedbackElement = form.querySelector('.form-feedback');
        const submitButton = form.querySelector('button[type="submit"]');
        
        if (!email || !consent) {
            this.showFormFeedback(feedbackElement, 'Please fill out all required fields and agree to receive updates.', 'error');
            return;
        }

        // Disable submit button during processing
        if (submitButton) {
            submitButton.disabled = true;
            submitButton.textContent = 'SUBMITTING...';
        }

        try {
            // Simulate API call (replace with actual endpoint)
            await this.simulateAPICall(email);
            
            this.showFormFeedback(feedbackElement, 'Thank you for subscribing! Check your inbox for confirmation.', 'success');
            form.reset();
            
            // Track conversion (replace with actual analytics)
            this.trackConversion('subscription', email);
            
        } catch (error) {
            console.error('Subscription error:', error);
            this.showFormFeedback(feedbackElement, 'Something went wrong. Please try again later.', 'error');
        } finally {
            // Re-enable submit button
            if (submitButton) {
                submitButton.disabled = false;
                submitButton.textContent = 'SUBMIT';
            }
        }
    }

    async simulateAPICall(email) {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Simulate random success/failure for demo
        if (Math.random() > 0.9) {
            throw new Error('Simulated API error');
        }
        
        console.log(`Subscription submitted for: ${email}`);
        return { success: true };
    }

    showFormFeedback(element, message, type) {
        if (!element) return;
        
        element.textContent = message;
        element.className = `form-feedback ${type}`;
        
        // Auto-hide success messages after 5 seconds
        if (type === 'success') {
            setTimeout(() => {
                element.className = 'form-feedback';
                element.textContent = '';
            }, 5000);
        }
    }

    // Video fallback handling
    setupVideoFallback() {
        if (!this.heroVideo) return;

        const fallback = document.querySelector('.hero-fallback');
        
        this.heroVideo.addEventListener('loadeddata', () => {
            if (fallback) {
                fallback.style.opacity = '0';
            }
        });

        this.heroVideo.addEventListener('error', () => {
            if (fallback) {
                fallback.style.opacity = '1';
            }
            console.warn('Hero video failed to load, showing fallback');
        });

        // Pause video when page is hidden to save bandwidth
        document.addEventListener('visibilitychange', () => {
            if (this.heroVideo) {
                if (document.hidden) {
                    this.heroVideo.pause();
                } else {
                    this.heroVideo.play().catch(e => console.log('Video autoplay prevented:', e));
                }
            }
        });
    }

    // Enhanced keyboard navigation
    setupKeyboardNavigation() {
        // Skip to main content link
        const skipLink = document.createElement('a');
        skipLink.href = '#hero';
        skipLink.textContent = 'Skip to main content';
        skipLink.className = 'skip-link';
        skipLink.style.cssText = `
            position: absolute;
            top: -40px;
            left: 6px;
            background: var(--color-accent);
            color: white;
            padding: 8px;
            text-decoration: none;
            border-radius: 4px;
            z-index: 1001;
            transition: top 0.3s;
        `;
        
        skipLink.addEventListener('focus', () => {
            skipLink.style.top = '6px';
        });
        
        skipLink.addEventListener('blur', () => {
            skipLink.style.top = '-40px';
        });
        
        document.body.insertBefore(skipLink, document.body.firstChild);

        // Trap focus in mobile menu when open
        document.addEventListener('keydown', (e) => {
            if (this.mobileMenuOpen && e.key === 'Tab') {
                this.trapFocusInMobileMenu(e);
            }
        });
    }

    trapFocusInMobileMenu(e) {
        const focusableElements = this.navLinks.querySelectorAll(
            'a, button, [tabindex]:not([tabindex="-1"])'
        );
        
        const firstFocusable = focusableElements[0];
        const lastFocusable = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
            if (document.activeElement === firstFocusable) {
                lastFocusable.focus();
                e.preventDefault();
            }
        } else {
            if (document.activeElement === lastFocusable) {
                firstFocusable.focus();
                e.preventDefault();
            }
        }
    }

    // Intersection Observer for animations
    setupIntersectionObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                    
                    // Track section views for analytics
                    this.trackSectionView(entry.target.id);
                }
            });
        }, observerOptions);

        // Observe all main sections
        document.querySelectorAll('section[id]').forEach(section => {
            observer.observe(section);
        });
    }

    // Analytics tracking helpers
    trackConversion(type, value) {
        // Replace with actual analytics implementation
        if (typeof gtag !== 'undefined') {
            gtag('event', 'conversion', {
                event_category: 'engagement',
                event_label: type,
                value: value
            });
        }
        
        console.log(`Conversion tracked: ${type} - ${value}`);
    }

    trackSectionView(sectionId) {
        // Replace with actual analytics implementation
        if (typeof gtag !== 'undefined') {
            gtag('event', 'section_view', {
                event_category: 'engagement',
                event_label: sectionId
            });
        }
    }

    // Utility method for lazy loading images
    setupLazyLoading() {
        const lazyImages = document.querySelectorAll('img[data-src]');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                });
            });

            lazyImages.forEach(img => imageObserver.observe(img));
        } else {
            // Fallback for older browsers
            lazyImages.forEach(img => {
                img.src = img.dataset.src;
                img.classList.remove('lazy');
            });
        }
    }

    // Performance monitoring
    logPerformanceMetrics() {
        if ('performance' in window) {
            window.addEventListener('load', () => {
                setTimeout(() => {
                    const perfData = performance.getEntriesByType('navigation')[0];
                    console.log('Page Load Performance:', {
                        loadTime: perfData.loadEventEnd - perfData.loadEventStart,
                        domReady: perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart,
                        firstPaint: performance.getEntriesByName('first-paint')[0]?.startTime || 'N/A'
                    });
                }, 0);
            });
        }
    }
}

// Initialize site functionality when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const siteManager = new SiteManager();
    
    // Add mobile menu styles dynamically
    const style = document.createElement('style');
    style.textContent = `
        .hamburger.active span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }
        .hamburger.active span:nth-child(2) {
            opacity: 0;
        }
        .hamburger.active span:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -6px);
        }
        
        @media (max-width: 768px) {
            .nav-links {
                position: fixed;
                top: 60px;
                left: 0;
                width: 100%;
                height: calc(100vh - 60px);
                background: rgba(0, 0, 0, 0.98);
                backdrop-filter: blur(10px);
                flex-direction: column;
                justify-content: center;
                align-items: center;
                transform: translateX(-100%);
                transition: transform 0.3s ease;
                z-index: 999;
            }
            
            .nav-links.mobile-open {
                transform: translateX(0);
            }
            
            .nav-links li {
                margin: 1rem 0;
            }
            
            .nav-links a {
                font-size: 1.5rem;
                padding: 1rem 2rem;
            }
        }
        
        .section.in-view {
            animation: fadeInUp 0.6s ease-out;
        }
        
        .skip-link:focus {
            top: 6px !important;
        }
    `;
    document.head.appendChild(style);
});

// Handle critical errors gracefully
window.addEventListener('error', (e) => {
    console.error('Critical error:', e.error);
    
    // Could send error reports to monitoring service
    if (typeof gtag !== 'undefined') {
        gtag('event', 'exception', {
            description: e.error.message,
            fatal: false
        });
    }
});

// Export for potential use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SiteManager;
} 