// ===========================
// 1. Typing Animation for Hero Tagline
// ===========================
document.addEventListener('DOMContentLoaded', () => {
    const typingText = document.getElementById('typing-text');
    const text = 'Building internal web tools and automation with React, Python, and cloud technologies. Active Secret clearance.';
    let index = 0;

    function typeWriter() {
        if (index < text.length) {
            typingText.textContent += text.charAt(index);
            index++;
            setTimeout(typeWriter, 50);
        }
    }

    setTimeout(typeWriter, 500);
});

// ===========================
// 2. Toast Notification System
// ===========================
function showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;

    const icon = type === 'success' ? '✓' : type === 'error' ? '✗' : 'ℹ';

    toast.innerHTML = `
        <span class="toast-icon">${icon}</span>
        <span class="toast-message">${message}</span>
    `;

    container.appendChild(toast);

    setTimeout(() => {
        toast.style.animation = 'slideIn 0.3s ease reverse';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// ===========================
// 3. Number Counter Animation for Stats
// ===========================
document.addEventListener('DOMContentLoaded', () => {
    const statNumbers = document.querySelectorAll('.stat-number');

    const animateCounter = (element) => {
        const target = parseInt(element.getAttribute('data-target'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;

        const updateCounter = () => {
            current += increment;
            if (current < target) {
                element.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
            }
        };

        updateCounter();
    };

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumber = entry.target.querySelector('.stat-number');
                animateCounter(statNumber);
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.stat-item').forEach(item => {
        statsObserver.observe(item);
    });
});

// ===========================
// 4. Ripple Effect on Clicks
// ===========================
document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.glass-button, .glass-card');

    buttons.forEach(button => {
        button.style.position = 'relative';
        button.style.overflow = 'hidden';

        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');

            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';

            this.appendChild(ripple);

            setTimeout(() => ripple.remove(), 600);
        });
    });
});

// ===========================
// 5. Magnetic Button Effect
// ===========================
document.addEventListener('DOMContentLoaded', () => {
    const magneticButtons = document.querySelectorAll('.glass-button, .cta-button, .download-icon');

    magneticButtons.forEach(button => {
        button.classList.add('magnetic-button');

        button.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            const moveX = x * 0.3;
            const moveY = y * 0.3;

            this.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });

        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translate(0, 0)';
        });
    });
});

// ===========================
// Download Resume Success Toast
// ===========================
document.addEventListener('DOMContentLoaded', () => {
    const downloadIcon = document.querySelector('.download-icon');

    if (downloadIcon) {
        downloadIcon.addEventListener('click', () => {
            setTimeout(() => {
                showToast('Resume download started!', 'success');
            }, 100);
        });
    }
});

// ===========================
// Copy Email to Clipboard with Toast
// ===========================
document.addEventListener('DOMContentLoaded', () => {
    const emailLinks = document.querySelectorAll('a[href^="mailto:"]');

    emailLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const email = link.getAttribute('href').replace('mailto:', '');
            navigator.clipboard.writeText(email).then(() => {
                showToast('Email copied to clipboard!', 'success');
            }).catch(() => {
                showToast('Failed to copy email', 'error');
            });
        });
    });
});

// ===========================
// Smooth Scroll & Active Nav
// ===========================
document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section, footer');

    // Update active nav link on scroll
    const updateActiveNav = () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (window.pageYOffset >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', updateActiveNav);
    updateActiveNav(); // Initial check

    // Smooth scroll for nav links (only for anchor links)
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href');

            // Only prevent default for anchor links (starting with #)
            if (targetId && targetId.startsWith('#')) {
                e.preventDefault();
                const targetSection = document.querySelector(targetId);

                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
            // For regular page links (like index.html), let default navigation happen
        });
    });
});

// ===========================
// Scroll Animations
// ===========================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(section);
    });
});

// ===========================
// Project Hover Effect
// (Will be enhanced after user provides reference)
// ===========================
document.addEventListener('DOMContentLoaded', () => {
    const projectRows = document.querySelectorAll('.project-row');

    projectRows.forEach(row => {
        row.addEventListener('mouseenter', () => {
            const preview = row.querySelector('.project-preview');
            if (preview) {
                preview.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
            }
        });
    });
});


// ===========================
// Glassmorphism Effect Enhancement
// ===========================
document.addEventListener('DOMContentLoaded', () => {
    const glassElements = document.querySelectorAll('.glass-card, .glass-button');

    glassElements.forEach(element => {
        element.addEventListener('mouseenter', function(e) {
            this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        });
    });
});

// ===========================
// Mobile Menu Toggle (for smaller screens if needed)
// ===========================
const handleMobileNav = () => {
    const nav = document.querySelector('.glass-nav');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        // Hide nav on scroll down, show on scroll up (mobile only)
        if (window.innerWidth <= 640) {
            if (currentScroll > lastScroll && currentScroll > 100) {
                nav.style.transform = 'translateX(-50%) translateY(-100px)';
            } else {
                nav.style.transform = 'translateX(-50%) translateY(0)';
            }
        }

        lastScroll = currentScroll;
    });
};

document.addEventListener('DOMContentLoaded', handleMobileNav);

// ===========================
// Micro Interactions - Card Tilt Effect
// ===========================
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.glass-card');

    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'transform 0.1s ease';
        });

        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;

            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        });

        card.addEventListener('mouseleave', function() {
            this.style.transition = 'transform 0.5s ease';
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        });
    });
});

// ===========================
// Smooth Reveal Animation on Scroll
// ===========================
document.addEventListener('DOMContentLoaded', () => {
    const elements = document.querySelectorAll('.glass-card, .skill-item, .cert-card');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 50);
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    elements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        revealObserver.observe(el);
    });
});

// ===========================
// Performance: Lazy Load Images (DISABLED - causing logos to disappear)
// ===========================
// document.addEventListener('DOMContentLoaded', () => {
//     const images = document.querySelectorAll('img[src]');
//
//     const imageObserver = new IntersectionObserver((entries, observer) => {
//         entries.forEach(entry => {
//             if (entry.isIntersecting) {
//                 const img = entry.target;
//                 img.style.opacity = '0';
//                 img.style.transition = 'opacity 0.5s ease';
//
//                 img.onload = () => {
//                     img.style.opacity = '1';
//                 };
//
//                 observer.unobserve(img);
//             }
//         });
//     });
//
//     images.forEach(img => imageObserver.observe(img));
// });

// ===========================
// Add subtle parallax to background (DISABLED - background is fixed)
// ===========================
// window.addEventListener('scroll', () => {
//     const scrolled = window.pageYOffset;
//     const background = document.getElementById('background-container');
//
//     if (background && window.innerWidth > 768) {
//         background.style.transform = `translateY(${scrolled * 0.3}px)`;
//     }
// });

// ===========================
// Back to Top Button
// ===========================
document.addEventListener('DOMContentLoaded', () => {
    const backToTopBtn = document.getElementById('back-to-top');

    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });

    // Scroll to top on click
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});
