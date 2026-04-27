document.addEventListener('DOMContentLoaded', () => {

    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navList = document.querySelector('.nav-list');
    const headerCta = document.querySelector('.header-cta');

    hamburger.addEventListener('click', () => {
        navList.classList.toggle('active');
        headerCta.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Header Scroll Effect
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Animate Elements on Scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.bento-card, .about-content, .about-img, .contact-card-wrapper').forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.05}s`;
        observer.observe(el);
    });

    // Animate Stats
    const statsSection = document.querySelector('#stats');
    let statsAnimated = false;

    const statsObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !statsAnimated) {
            statsAnimated = true;
            document.querySelectorAll('.stat-number').forEach(counter => {
                const target = +counter.getAttribute('data-target');
                const duration = 2000;
                const increment = target / (duration / 16);

                let current = 0;
                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        counter.innerText = Math.ceil(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.innerText = target + (counter.parentElement.innerText.includes('%') ? '%' : '+');
                    }
                };
                updateCounter();
            });
        }
    }, { threshold: 0.5 });

    if (statsSection) {
        statsObserver.observe(statsSection);
    }

    // Contact Form Handling
    const contactForm = document.querySelector('.simple-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = contactForm.querySelector('input[type="text"]').value.trim();
            const email = contactForm.querySelector('input[type="email"]').value.trim();
            const message = contactForm.querySelector('textarea').value.trim();
            
            if (!name || !email || !message) {
                alert('Please fill in all fields.');
                return;
            }
            
            if (!/\S+@\S+\.\S+/.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            // For GitHub Pages, show success message
            alert('Thank you for your message! We will get back to you soon.');
            contactForm.reset();
        });
    }

    // App Store Links (Update these URLs when app is published)
    const appleStoreLink = document.getElementById('apple-store-link');
    const googlePlayLink = document.getElementById('google-play-link');

    if (appleStoreLink) {
        appleStoreLink.addEventListener('click', (e) => {
            e.preventDefault();
            // Replace with actual App Store URL when published
            alert('App Store link will be available soon! App is currently in development.');
            // window.open('https://apps.apple.com/app/your-app-id', '_blank');
        });
    }

    if (googlePlayLink) {
        googlePlayLink.addEventListener('click', (e) => {
            e.preventDefault();
            // Replace with actual Google Play URL when published
            alert('Google Play link will be available soon! App is currently in development.');
            // window.open('https://play.google.com/store/apps/details?id=your.package.name', '_blank');
        });
    }

    // Dynamic Style for Animations
