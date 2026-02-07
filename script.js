// ================================================
// ElevenLabs-Inspired Interactive Features
// Simulisten Dual Audio App
// ================================================

document.addEventListener('DOMContentLoaded', function() {
    initializeWaveform();
    initializeDemoPlayer();
    initializeMobileMenu();
    initializeScrollAnimations();
});

// ============================================
// Waveform Animation
// ============================================
function initializeWaveform() {
    const waveBars = document.querySelectorAll('.wave-bar');
    
    waveBars.forEach((bar, index) => {
        const height = Math.random() * 0.7 + 0.3; // Random height between 0.3 and 1
        bar.style.setProperty('--height', height);
        
        // Animate bars with slight delays
        bar.style.animationDelay = `${index * 0.1}s`;
    });
    
    // Update waveform periodically for dynamic effect
    setInterval(() => {
        waveBars.forEach(bar => {
            const height = Math.random() * 0.7 + 0.3;
            bar.style.setProperty('--height', height);
        });
    }, 2000);
}

// ============================================
// Demo Player Functionality
// ============================================
function initializeDemoPlayer() {
    // Toggle between mono and dual modes
    const toggleBtns = document.querySelectorAll('.toggle-btn');
    const demoTracks = document.querySelectorAll('.demo-track');
    
    toggleBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            toggleBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const mode = this.textContent.trim().toLowerCase();
            
            if (mode === 'mono') {
                // Show only first track
                demoTracks.forEach((track, index) => {
                    if (index === 0) {
                        track.classList.remove('secondary');
                        track.style.opacity = '1';
                    } else {
                        track.classList.add('secondary');
                        track.style.opacity = '0.3';
                    }
                });
            } else {
                // Show both tracks
                demoTracks.forEach(track => {
                    track.classList.remove('secondary');
                    track.style.opacity = '1';
                });
            }
        });
    });
    
    // Play/Pause functionality
    let isPlaying = false;
    const playBtn = document.querySelector('.play-btn');
    const progressFills = document.querySelectorAll('.progress-fill');
    const volumeFills = document.querySelectorAll('.volume-fill');
    
    if (playBtn) {
        playBtn.addEventListener('click', function() {
            isPlaying = !isPlaying;
            
            if (isPlaying) {
                this.innerHTML = '⏸️';
                startProgress();
            } else {
                this.innerHTML = '▶️';
                stopProgress();
            }
        });
    }
    
    // Progress bar animation
    let progressInterval;
    function startProgress() {
        let progress = 0;
        progressInterval = setInterval(() => {
            progress += 0.5;
            if (progress > 100) {
                progress = 0;
            }
            progressFills.forEach(fill => {
                fill.style.width = progress + '%';
            });
        }, 100);
    }
    
    function stopProgress() {
        clearInterval(progressInterval);
    }
    
    // Volume controls
    const volumeSliders = document.querySelectorAll('input[type="range"]');
    volumeSliders.forEach((slider, index) => {
        slider.addEventListener('input', function() {
            const value = this.value;
            // Update corresponding volume fill
            if (volumeFills[index]) {
                volumeFills[index].style.width = value + '%';
            }
        });
        
        // Set initial values
        slider.value = 75;
        if (volumeFills[index]) {
            volumeFills[index].style.width = '75%';
        }
    });
}

// ============================================
// Mobile Menu
// ============================================
function initializeMobileMenu() {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    let isMenuOpen = false;
    
    if (mobileToggle) {
        mobileToggle.addEventListener('click', function() {
            isMenuOpen = !isMenuOpen;
            
            if (isMenuOpen) {
                // Show menu (you'd need to implement the mobile menu HTML/CSS)
                this.classList.add('active');
            } else {
                // Hide menu
                this.classList.remove('active');
            }
        });
    }
}

// ============================================
// Scroll Animations
// ============================================
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe all feature cards and sections
    const animateElements = document.querySelectorAll('.feature-card, .section-header, .demo-text');
    animateElements.forEach(el => observer.observe(el));
}

// ============================================
// Smooth Scrolling for Navigation
// ============================================
function initializeSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ============================================
// Audio Visualization Effects
// ============================================
function createAdvancedWaveform() {
    const containers = document.querySelectorAll('.waveform');
    
    containers.forEach(container => {
        // Clear existing bars
        container.innerHTML = '';
        
        // Create more bars for smoother effect
        const barCount = 20;
        
        for (let i = 0; i < barCount; i++) {
            const bar = document.createElement('div');
            bar.className = 'wave-bar';
            
            // Set initial height
            const height = Math.random() * 0.8 + 0.2;
            bar.style.setProperty('--height', height);
            
            // Add staggered animation delay
            bar.style.animationDelay = `${i * 0.05}s`;
            
            container.appendChild(bar);
        }
    });
    
    // Continuous wave animation
    setInterval(() => {
        const waveBars = document.querySelectorAll('.wave-bar');
        waveBars.forEach(bar => {
            const height = Math.random() * 0.8 + 0.2;
            bar.style.setProperty('--height', height);
        });
    }, 1500);
}

// ============================================
// Feature Card Interactions
// ============================================
function initializeFeatureCards() {
    const cards = document.querySelectorAll('.feature-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-4px)';
        });
    });
}

// ============================================
// Navbar Scroll Effect
// ============================================
function initializeNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.8)';
            navbar.style.boxShadow = 'none';
        }
        
        lastScrollY = currentScrollY;
    });
}

// ============================================
// Demo Section Stats Counter
// ============================================
function initializeStatsCounter() {
    const stats = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalValue = parseInt(target.textContent);
                let currentValue = 0;
                
                const increment = finalValue / 50; // 50 steps
                const timer = setInterval(() => {
                    currentValue += increment;
                    if (currentValue >= finalValue) {
                        target.textContent = finalValue + (finalValue >= 1000 ? 'K+' : '%');
                        clearInterval(timer);
                    } else {
                        target.textContent = Math.floor(currentValue) + (finalValue >= 1000 ? 'K+' : '%');
                    }
                }, 40);
            }
        });
    }, { threshold: 0.5 });
    
    stats.forEach(stat => observer.observe(stat));
}

// ============================================
// Initialize Enhanced Features
// ============================================
function initializeEnhancedFeatures() {
    createAdvancedWaveform();
    initializeFeatureCards();
    initializeNavbarScroll();
    initializeStatsCounter();
    initializeSmoothScrolling();
}

// Call enhanced features after initial load
setTimeout(initializeEnhancedFeatures, 500);

// ============================================
// Utility Functions
// ============================================
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Resize handler
window.addEventListener('resize', debounce(() => {
    // Reinitialize responsive elements if needed
    console.log('Window resized, adjusting layout...');
}, 250));

// ============================================
// Console Branding
// ============================================
console.log('%c🎵 Simulisten - Dual Audio Experience', 'color: #7c3aed; font-size: 16px; font-weight: bold;');
console.log('%cPowered by ElevenLabs-inspired design', 'color: #6b7280; font-size: 12px;');