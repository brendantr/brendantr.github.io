// ================================================
// ElevenLabs-Inspired Interactive Features
// Simulisten Dual Audio App
// ================================================

document.addEventListener('DOMContentLoaded', function() {
    initializeWaveform();
    initializeDemoPlayer();
    initializeMobileMenu();
    initializeScrollAnimations();
    initializeDualDemoAudio();
    initializeTrackBuilder();
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
    const animateElements = document.querySelectorAll('.feature-card, .section-header, .demo-text, .audio-card, .checklist li');
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
    if (!navbar) return;
    const isDemoPage = document.body.classList.contains('demo-page');
    const isHomePage = document.body.classList.contains('home-page');
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        if (isDemoPage || isHomePage) {
            navbar.style.background = currentScrollY > 100
                ? 'rgba(6, 9, 19, 0.95)'
                : 'rgba(6, 9, 19, 0.9)';
            navbar.style.boxShadow = '0 10px 30px rgba(6, 9, 19, 0.6)';
        } else {
            if (currentScrollY > 100) {
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                navbar.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.8)';
                navbar.style.boxShadow = 'none';
            }
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

function initializeDualDemoAudio() {
    const sections = document.querySelectorAll('[data-dual-demo]');
    if (!sections.length) return;

    const formatTime = (time) => {
        if (Number.isNaN(time) || !Number.isFinite(time)) return '0:00';
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60).toString().padStart(2, '0');
        return `${minutes}:${seconds}`;
    };

    sections.forEach(section => {
        const audios = {
            learning: section.querySelector('[data-audio="learning"]'),
            focus: section.querySelector('[data-audio="focus"]')
        };

        const playBothBtn = section.querySelector('[data-action="play-both"]');
        const pauseBothBtn = section.querySelector('[data-action="pause-both"]');

        const toggleButtons = section.querySelectorAll('[data-action="toggle"]');
        toggleButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const target = btn.getAttribute('data-target');
                const audio = audios[target];
                if (!audio) return;

                if (audio.paused) {
                    audio.play();
                } else {
                    audio.pause();
                }
            });
        });

        playBothBtn?.addEventListener('click', () => {
            Object.values(audios).forEach(audio => audio?.play());
        });

        pauseBothBtn?.addEventListener('click', () => {
            Object.values(audios).forEach(audio => audio?.pause());
        });

        const volumeSliders = section.querySelectorAll('[data-volume]');
        volumeSliders.forEach(slider => {
            const target = slider.getAttribute('data-volume');
            const audio = audios[target];
            if (!audio) return;

            audio.volume = Number(slider.value) / 100;

            slider.addEventListener('input', () => {
                audio.volume = Number(slider.value) / 100;
            });
        });

        Object.entries(audios).forEach(([key, audio]) => {
            if (!audio) return;

            const timeEl = section.querySelector(`[data-time="${key}"]`);
            const progressFill = section.querySelector(`[data-progress="${key}"]`);
            const button = section.querySelector(`[data-action="toggle"][data-target="${key}"]`);

            audio.addEventListener('loadedmetadata', () => {
                if (timeEl) {
                    timeEl.textContent = `${formatTime(0)} / ${formatTime(audio.duration)}`;
                }
            });

            audio.addEventListener('error', () => {
                if (timeEl) {
                    timeEl.textContent = 'Audio failed to load';
                }
            });

            audio.addEventListener('timeupdate', () => {
                if (timeEl) {
                    timeEl.textContent = `${formatTime(audio.currentTime)} / ${formatTime(audio.duration)}`;
                }
                if (progressFill && audio.duration) {
                    progressFill.style.width = `${(audio.currentTime / audio.duration) * 100}%`;
                }
            });

            audio.addEventListener('play', () => {
                if (button) button.textContent = 'Pause';
            });

            audio.addEventListener('pause', () => {
                if (button) button.textContent = 'Play';
            });
        });
    });
}

// ============================================
// Track Builder (Home Page)
// ============================================
function initializeTrackBuilder() {
    const results1 = document.getElementById('track-results-1');
    const results2 = document.getElementById('track-results-2');
    if (!results1 && !results2) return;

    const ICONS = {
        audiobook: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>',
        podcast:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>',
        ambient:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2"/></svg>',
        energetic: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',
        focus:     '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/></svg>',
    };

    const CHECK = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" width="10" height="10"><polyline points="20 6 9 17 4 12"/></svg>';

    const learningData = [
        { id: 'l1', title: 'Atomic Habits',          author: 'James Clear',       type: 'Audiobook', cat: 'audiobook', icon: 'audiobook', duration: '5h 35m'  },
        { id: 'l2', title: 'The Science of Learning', author: 'Barbara Oakley',    type: 'Podcast',   cat: 'podcast',   icon: 'podcast',   duration: '42 min'  },
        { id: 'l3', title: 'Sapiens',                 author: 'Yuval Noah Harari', type: 'Audiobook', cat: 'audiobook', icon: 'audiobook', duration: '15h 17m' },
        { id: 'l4', title: 'How I Built This',        author: 'NPR',               type: 'Podcast',   cat: 'podcast',   icon: 'podcast',   duration: '58 min'  },
        { id: 'l5', title: 'Deep Work',               author: 'Cal Newport',       type: 'Audiobook', cat: 'audiobook', icon: 'audiobook', duration: '7h 44m'  },
        { id: 'l6', title: 'Huberman Lab',            author: 'Andrew Huberman',   type: 'Podcast',   cat: 'podcast',   icon: 'podcast',   duration: '1h 48m'  },
        { id: 'l7', title: 'Thinking, Fast and Slow', author: 'Daniel Kahneman',   type: 'Audiobook', cat: 'audiobook', icon: 'audiobook', duration: '20h 2m'  },
        { id: 'l8', title: 'Lex Fridman Podcast',     author: 'Lex Fridman',       type: 'Podcast',   cat: 'podcast',   icon: 'podcast',   duration: '2h 15m'  },
    ];

    const musicData = [
        { id: 'm1', title: 'Deep Focus Flow',    author: 'Atmospheric Layers', type: 'Ambient',   cat: 'ambient',   icon: 'ambient',   duration: '∞ Loop' },
        { id: 'm2', title: 'Morning Surge',       author: 'BPM Labs',           type: 'Energetic', cat: 'energetic', icon: 'energetic', duration: '∞ Loop' },
        { id: 'm3', title: 'Alpha Wave Session',  author: 'NeuroSound',         type: 'Focus',     cat: 'focus',     icon: 'focus',     duration: '∞ Loop' },
        { id: 'm4', title: 'Lo-Fi Study Beats',   author: 'ChillBeats Co.',     type: 'Focus',     cat: 'focus',     icon: 'focus',     duration: '∞ Loop' },
        { id: 'm5', title: 'Thunderstorm',         author: 'Nature Sounds',      type: 'Ambient',   cat: 'ambient',   icon: 'ambient',   duration: '∞ Loop' },
        { id: 'm6', title: 'Gym Power Mix',        author: 'Athletic Audio',     type: 'Energetic', cat: 'energetic', icon: 'energetic', duration: '∞ Loop' },
        { id: 'm7', title: 'Binaural Theta',       author: 'MindFreq Studio',    type: 'Focus',     cat: 'focus',     icon: 'focus',     duration: '∞ Loop' },
        { id: 'm8', title: 'Café Ambience',        author: 'Urban Sounds',       type: 'Ambient',   cat: 'ambient',   icon: 'ambient',   duration: '∞ Loop' },
    ];

    const selected = { 1: null, 2: null };
    const filters  = { 1: { query: '', cat: 'all' }, 2: { query: '', cat: 'all' } };

    function escHtml(str) {
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;');
    }

    function renderPanel(panelId, pool) {
        const el = document.getElementById(`track-results-${panelId}`);
        if (!el) return;
        const { query, cat } = filters[panelId];
        const q = query.trim().toLowerCase();
        const items = pool.filter(t =>
            (cat === 'all' || t.cat === cat) &&
            (!q || t.title.toLowerCase().includes(q) || t.author.toLowerCase().includes(q))
        );
        if (!items.length) {
            el.innerHTML = `<div class="track-empty">No results${q ? ` for &ldquo;${escHtml(q)}&rdquo;` : ''}</div>`;
            return;
        }
        el.innerHTML = items.map(t => {
            const sel = selected[panelId]?.id === t.id;
            return `<button class="track-item${sel ? ' selected' : ''}" data-panel="${panelId}" data-id="${escHtml(t.id)}" type="button" role="option" aria-selected="${sel}">
                <div class="track-item-icon icon-${escHtml(t.icon)}">${ICONS[t.icon] ?? ''}</div>
                <div class="track-item-info">
                    <div class="track-item-title">${escHtml(t.title)}</div>
                    <div class="track-item-meta">${escHtml(t.author)}&nbsp;&middot;&nbsp;${escHtml(t.type)}</div>
                </div>
                <div class="track-item-duration">${escHtml(t.duration)}</div>
                <div class="track-item-check">${CHECK}</div>
            </button>`;
        }).join('');
        el.querySelectorAll('.track-item').forEach(btn => {
            btn.addEventListener('click', () => {
                const pId = parseInt(btn.dataset.panel, 10);
                const pool2 = pId === 1 ? learningData : musicData;
                selected[pId] = pool2.find(t => t.id === btn.dataset.id) ?? null;
                renderPanel(pId, pool2);
                syncSessionBar();
            });
        });
    }

    function syncSessionBar() {
        const t1 = selected[1];
        const t2 = selected[2];
        const el1 = document.getElementById('session-title-1');
        const el2 = document.getElementById('session-title-2');
        const bar = document.getElementById('session-bar');
        if (el1) { el1.textContent = t1 ? t1.title : 'Select learning content'; el1.classList.toggle('has-selection', !!t1); }
        if (el2) { el2.textContent = t2 ? t2.title : 'Select background music';  el2.classList.toggle('has-selection', !!t2); }
        if (bar) bar.classList.toggle('session-ready', !!(t1 && t2));
    }

    // Search inputs
    document.querySelectorAll('.track-search-input').forEach(input => {
        input.addEventListener('input', () => {
            const pId = parseInt(input.dataset.panel, 10);
            filters[pId].query = input.value;
            renderPanel(pId, pId === 1 ? learningData : musicData);
        });
    });

    // Category pills
    document.querySelectorAll('.pill[data-panel]').forEach(pill => {
        pill.addEventListener('click', () => {
            const pId = parseInt(pill.dataset.panel, 10);
            filters[pId].cat = pill.dataset.cat;
            document.querySelectorAll(`.pill[data-panel="${pId}"]`).forEach(p => p.classList.remove('active'));
            pill.classList.add('active');
            renderPanel(pId, pId === 1 ? learningData : musicData);
        });
    });

    // Initial render
    renderPanel(1, learningData);
    renderPanel(2, musicData);
}