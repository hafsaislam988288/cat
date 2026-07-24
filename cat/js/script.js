// ===== STICKY NAV =====
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 25) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ===== MOBILE MENU =====
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('open');
    });
}

window.addEventListener('resize', () => {
    if (window.innerWidth > 900) {
        navLinks.classList.remove('open');
    }
});

// ===== SCROLL ANIMATIONS =====
const animatedElements = document.querySelectorAll(
    '.hero-text, .hero-image, .about-hero-text, .about-hero-image, ' +
    '.feature-card, .category-card, .stat-item, .story-text, .story-image, ' +
    '.value-card, .team-card, .newsletter-card, .ig-item, .page-hero-text, ' +
    '.page-hero-image, .breed-card, .care-card, .blog-card, .product-card, ' +
    '.shop-cat-card, .quiz-content'
);

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 60);
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.15, rootMargin: '0px 0px -30px 0px' });

animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(40px)';
    el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    observer.observe(el);
});

// ===== STATS COUNTER =====
const statNumbers = document.querySelectorAll('.stat-number');

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const el = entry.target;
            const text = el.textContent;
            const num = parseInt(text.replace(/[^0-9]/g, ''));
            const suffix = text.replace(/[0-9]/g, '');
            
            if (num) {
                let current = 0;
                const increment = Math.ceil(num / 40);
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= num) {
                        current = num;
                        clearInterval(timer);
                    }
                    el.textContent = current + suffix;
                }, 30);
            }
            counterObserver.unobserve(el);
        }
    });
}, { threshold: 0.5 });

statNumbers.forEach(el => {
    counterObserver.observe(el);
});

// ===== BREED FILTER =====
const filterBtns = document.querySelectorAll('.filter-btn');
const breedCards = document.querySelectorAll('.breed-card');

if (filterBtns.length > 0) {
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            breedCards.forEach(card => {
                const categories = card.getAttribute('data-category').split(' ');
                
                if (filter === 'all') {
                    card.style.display = 'block';
                } else if (categories.includes(filter)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// ===== NEWSLETTER SUBSCRIBE =====
const subscribeBtn = document.querySelector('.btn-subscribe');
const emailInput = document.querySelector('.newsletter-right input');

if (subscribeBtn && emailInput) {
    subscribeBtn.addEventListener('click', function(e) {
        e.preventDefault();
        const email = emailInput.value.trim();
        
        if (email && email.includes('@') && email.includes('.')) {
            this.textContent = '✅ Subscribed!';
            this.style.background = '#5a7a6e';
            emailInput.value = '';
            setTimeout(() => {
                this.textContent = 'Subscribe';
                this.style.background = '#8b9a7a';
            }, 3000);
        } else {
            emailInput.style.borderColor = '#d4a373';
            emailInput.style.animation = 'shake 0.5s ease';
            setTimeout(() => {
                emailInput.style.borderColor = '#ddd2c2';
                emailInput.style.animation = '';
            }, 500);
        }
    });
}

// ===== SHAKE KEYFRAMES =====
const styleSheet = document.createElement('style');
styleSheet.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        20% { transform: translateX(-8px); }
        40% { transform: translateX(8px); }
        60% { transform: translateX(-5px); }
        80% { transform: translateX(5px); }
    }
`;
document.head.appendChild(styleSheet);

console.log('🐱 Kitty Kingdom');
console.log('✨ Because every cat deserves the best.');