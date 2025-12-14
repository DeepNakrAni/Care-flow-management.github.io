// Prime Care Landing Page JavaScript
document.addEventListener('DOMContentLoaded', function () {

    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.querySelector('.nav-links');
    const navActions = document.querySelector('.nav-actions');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function () {
            this.classList.toggle('active');
            navLinks.classList.toggle('mobile-open');
            navActions.classList.toggle('mobile-open');
        });
    }

    // Smooth Scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', function () {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)';
        } else {
            navbar.style.boxShadow = 'none';
        }

        lastScroll = currentScroll;
    });

    // Animate elements on scroll
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.feature-card, .pricing-card, .testimonial-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease-out';
        observer.observe(el);
    });

    // Add animate-in class styles
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);

    // Form submission handler
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const formData = new FormData(this);
            const button = this.querySelector('button[type="submit"]');
            const originalText = button.innerHTML;

            // Show loading state
            button.innerHTML = `
                <svg class="animate-spin" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
                </svg>
                Processing...
            `;
            button.disabled = true;

            // Simulate form submission
            setTimeout(() => {
                button.innerHTML = `
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="20 6 9 17 4 12"/>
                    </svg>
                    Request Sent!
                `;
                button.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';

                // Reset form
                contactForm.reset();

                setTimeout(() => {
                    button.innerHTML = originalText;
                    button.style.background = '';
                    button.disabled = false;
                }, 3000);
            }, 1500);
        });
    }

    // Counter animation for stats
    function animateCounter(element, target) {
        let current = 0;
        const increment = target / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }

            if (target >= 1000) {
                element.textContent = Math.floor(current / 1000) + 'K+';
            } else if (target >= 100) {
                element.textContent = Math.floor(current) + '+';
            } else {
                element.textContent = current.toFixed(1) + '%';
            }
        }, 30);
    }

    // Observe stats section
    const statsSection = document.querySelector('.hero-stats');
    if (statsSection) {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const stats = entry.target.querySelectorAll('.stat-value');
                    stats.forEach(stat => {
                        const text = stat.textContent;
                        if (text.includes('K+')) {
                            animateCounter(stat, parseFloat(text) * 1000);
                        } else if (text.includes('+')) {
                            animateCounter(stat, parseFloat(text));
                        } else if (text.includes('%')) {
                            animateCounter(stat, parseFloat(text));
                        }
                    });
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        statsObserver.observe(statsSection);
    }

    // Demo video play button
    const demoPlaceholder = document.querySelector('.demo-placeholder');
    if (demoPlaceholder) {
        demoPlaceholder.addEventListener('click', function () {
            // Show alert for demo
            alert('Demo video would play here!\n\nIn production, this would open a video modal or redirect to a demo video.');
        });
    }

    // Add hover effect to pricing cards
    document.querySelectorAll('.pricing-card').forEach(card => {
        card.addEventListener('mouseenter', function () {
            document.querySelectorAll('.pricing-card').forEach(c => {
                if (c !== this && !c.classList.contains('popular')) {
                    c.style.transform = 'scale(0.95)';
                    c.style.opacity = '0.7';
                }
            });
        });

        card.addEventListener('mouseleave', function () {
            document.querySelectorAll('.pricing-card').forEach(c => {
                c.style.transform = '';
                c.style.opacity = '';
            });
        });
    });

    // Parallax effect for hero gradients
    window.addEventListener('scroll', function () {
        const scrolled = window.pageYOffset;
        const heroGradients = document.querySelectorAll('.hero-gradient-1, .hero-gradient-2');

        heroGradients.forEach((gradient, index) => {
            const speed = (index + 1) * 0.1;
            gradient.style.transform = `translate(${scrolled * speed}px, ${scrolled * speed}px)`;
        });
    });

    // Typing effect for hero title (optional enhancement)
    // Uncomment below for typing effect
    /*
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const text = heroTitle.innerHTML;
        heroTitle.innerHTML = '';
        let i = 0;
        
        function typeWriter() {
            if (i < text.length) {
                heroTitle.innerHTML += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        }
        
        typeWriter();
    }
    */

    console.log('Prime Care Landing Page loaded successfully!');
});

// Add spin animation for loading state
const spinStyle = document.createElement('style');
spinStyle.textContent = `
    @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
    .animate-spin {
        animation: spin 1s linear infinite;
    }
`;
document.head.appendChild(spinStyle);
