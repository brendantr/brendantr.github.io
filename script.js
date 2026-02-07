// Intersection Observer for reveal animations
(() => {
  const els = Array.from(document.querySelectorAll(".reveal"));
  if (!("IntersectionObserver" in window) || !els.length) {
    els.forEach(el => el.classList.add("reveal-visible"));
    return;
  }
  const io = new IntersectionObserver((entries, obs) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add("reveal-visible");
        obs.unobserve(entry.target);
      }
    }
  }, { rootMargin: "0px 0px -10% 0px", threshold: 0.15 });
  els.forEach(el => io.observe(el));
})();

// Animated Counter for Hero Metrics
function animateCounter(element, target, suffix = '') {
  let current = 0;
  const increment = target / 50; // 50 steps
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    
    // Format numbers appropriately
    let displayValue;
    if (target >= 1000000000) {
      displayValue = (current / 1000000000).toFixed(1) + 'B';
    } else if (target >= 1000000) {
      displayValue = (current / 1000000).toFixed(1) + 'M';
    } else if (target >= 1000) {
      displayValue = (current / 1000).toFixed(1) + 'K';
    } else {
      displayValue = Math.floor(current);
    }
    
    element.textContent = displayValue + suffix;
  }, 30);
}

// Initialize counters when they come into view
document.addEventListener('DOMContentLoaded', function() {
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const element = entry.target;
        const target = parseFloat(element.dataset.target) || 0;
        const suffix = element.dataset.suffix || '';
        
        animateCounter(element, target, suffix);
        counterObserver.unobserve(element);
      }
    });
  });

  // Set up metric counters
  const metricValues = document.querySelectorAll('.metric-value, .metric-number, .stat-value');
  metricValues.forEach(metric => {
    const text = metric.textContent.trim();
    let target = 0;
    let suffix = '';
    
    if (text.includes('B')) {
      target = parseFloat(text) * 1000000000;
    } else if (text.includes('M')) {
      target = parseFloat(text) * 1000000;
    } else if (text.includes('K')) {
      target = parseFloat(text) * 1000;
    } else if (text.includes('%')) {
      target = parseFloat(text);
      suffix = '%';
    } else if (text.includes('★')) {
      target = parseFloat(text);
      suffix = '★';
    } else if (text.includes('min')) {
      target = parseFloat(text);
      suffix = 'min';
    } else {
      target = parseFloat(text.replace(/[^\d.]/g, ''));
    }
    
    metric.dataset.target = target;
    metric.dataset.suffix = suffix;
    metric.textContent = '0' + suffix;
    
    counterObserver.observe(metric);
  });
});

// FAQ Toggle Functionality (keeping existing)
document.addEventListener('DOMContentLoaded', function() {
  const faqQuestions = document.querySelectorAll('.faq-question');
  
  faqQuestions.forEach(question => {
    question.addEventListener('click', function() {
      const faqItem = this.parentElement;
      const isExpanded = this.getAttribute('aria-expanded') === 'true';
      
      // Close all other FAQ items
      faqQuestions.forEach(otherQuestion => {
        if (otherQuestion !== this) {
          otherQuestion.setAttribute('aria-expanded', 'false');
          otherQuestion.parentElement.classList.remove('active');
        }
      });
      
      // Toggle current FAQ item
      if (isExpanded) {
        this.setAttribute('aria-expanded', 'false');
        faqItem.classList.remove('active');
      } else {
        this.setAttribute('aria-expanded', 'true');
        faqItem.classList.add('active');
      }
    });
  });
});

// Smooth scroll for navigation links
document.addEventListener('DOMContentLoaded', function() {
  const navLinks = document.querySelectorAll('.nav a[href^="#"]');
  
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        const headerHeight = document.querySelector('.site-header').offsetHeight;
        const targetPosition = targetElement.offsetTop - headerHeight - 20;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
});

// Add loading effect for investment deck button
document.addEventListener('DOMContentLoaded', function() {
  const deckButton = document.querySelector('a[href^="mailto:invest@"]');
  
  if (deckButton) {
    deckButton.addEventListener('click', function() {
      const originalText = this.textContent;
      this.textContent = 'Preparing Investment Materials...';
      this.style.opacity = '0.7';
      
      setTimeout(() => {
        this.textContent = originalText;
        this.style.opacity = '1';
      }, 2000);
    });
  }
});

// Mobile Menu Toggle (enhanced)
document.addEventListener('DOMContentLoaded', function() {
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const nav = document.querySelector('.nav');
  
  if (mobileMenuToggle && nav) {
    mobileMenuToggle.addEventListener('click', function() {
      const isOpen = nav.style.display === 'flex';
      nav.style.display = isOpen ? 'none' : 'flex';
      
      if (!isOpen) {
        nav.style.position = 'absolute';
        nav.style.top = '100%';
        nav.style.left = '0';
        nav.style.right = '0';
        nav.style.background = 'var(--bg)';
        nav.style.border = '1px solid var(--border)';
        nav.style.borderRadius = '0 0 12px 12px';
        nav.style.flexDirection = 'column';
        nav.style.padding = '20px';
        nav.style.gap = '20px';
      }
    });
  }
});

// Add typing effect for hero title
document.addEventListener('DOMContentLoaded', function() {
  const heroTitle = document.querySelector('.hero h1');
  if (heroTitle) {
    const text = heroTitle.textContent;
    heroTitle.textContent = '';
    heroTitle.style.opacity = '1';
    
    let i = 0;
    const typeWriter = () => {
      if (i < text.length) {
        heroTitle.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 50);
      }
    };
    
    setTimeout(typeWriter, 500); // Start after page loads
  }
});

// Tab functionality for use cases
document.addEventListener('DOMContentLoaded', function() {
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');
  
  tabButtons.forEach(button => {
    button.addEventListener('click', function() {
      const targetTab = this.getAttribute('data-tab');
      
      // Remove active class from all buttons and contents
      tabButtons.forEach(btn => btn.classList.remove('active'));
      tabContents.forEach(content => content.classList.remove('active'));
      
      // Add active class to clicked button and corresponding content
      this.classList.add('active');
      document.getElementById(targetTab).classList.add('active');
    });
  });
});

// Enhanced scroll-triggered animations for new sections
document.addEventListener('DOMContentLoaded', function() {
  const observerOptions = {
    rootMargin: '0px 0px -10% 0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animationDelay = `${Math.random() * 0.3}s`;
        entry.target.classList.add('animate-in');
      }
    });
  }, observerOptions);

  // Observe timeline items for staggered animation
  const timelineItems = document.querySelectorAll('.timeline-item');
  timelineItems.forEach((item, index) => {
    item.style.animationDelay = `${index * 0.2}s`;
    observer.observe(item);
  });

  // Observe competitive table rows
  const compRows = document.querySelectorAll('.comp-row');
  compRows.forEach((row, index) => {
    row.style.animationDelay = `${index * 0.1}s`;
    observer.observe(row);
  });
});

// Add loading states for CTA buttons
document.addEventListener('DOMContentLoaded', function() {
  const ctaButtons = document.querySelectorAll('.button-primary, .button-secondary');
  
  ctaButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      if (this.href && this.href.includes('mailto:')) {
        e.preventDefault();
        const originalText = this.textContent;
        this.textContent = '✉️ Opening Email...';
        this.style.opacity = '0.8';
        
        setTimeout(() => {
          window.location.href = this.href;
          this.textContent = originalText;
          this.style.opacity = '1';
        }, 1000);
      }
    });
  });
});
  const nav = document.querySelector('.nav');
  
  if (mobileMenuToggle && nav) {
    mobileMenuToggle.addEventListener('click', function() {
      // Mobile menu functionality can be expanded here
      console.log('Mobile menu clicked');
    });
  };