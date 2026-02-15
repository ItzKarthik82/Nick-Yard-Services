// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');

    // Toggle mobile menu
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            if (hamburger) {
                hamburger.classList.remove('active');
            }
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.length > 1) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const headerOffset = 80;
                    const elementPosition = target.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Contact form submission to Google Apps Script
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Simple validation (reuse your existing logic)
            let isValid = true;
            const requiredFields = contactForm.querySelectorAll('[required]');
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.style.borderColor = '#e74c3c';
                } else {
                    field.style.borderColor = '#e0e0e0';
                }
            });

            // Email validation
            const emailField = contactForm.querySelector('input[type="email"]');
            if (emailField) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (emailField.value && !emailRegex.test(emailField.value)) {
                    isValid = false;
                    emailField.style.borderColor = '#e74c3c';
                }
            }

            // Phone validation
            const phoneField = contactForm.querySelector('input[type="tel"]');
            if (phoneField) {
                const phoneRegex = /^[\d\s\-\+\(\)]+$/;
                if (phoneField.value && !phoneRegex.test(phoneField.value)) {
                    isValid = false;
                    phoneField.style.borderColor = '#e74c3c';
                }
            }

            // Remove previous messages
            let prevSuccess = contactForm.querySelector('.form-success');
            if (prevSuccess) prevSuccess.remove();
            let prevError = contactForm.querySelector('.form-error');
            if (prevError) prevError.remove();

            if (isValid) {
                // Prepare data
                const formData = {
                    name: contactForm.name.value,
                    email: contactForm.email.value,
                    phone: contactForm.phone.value,
                    service: contactForm.service.value,
                    message: contactForm.message.value
                };

                // Send to Google Apps Script
                fetch('https://script.google.com/macros/s/AKfycbwyKjTsDtfxA1Ir1e0vf6K7im-ZWVNUb_IesLhsiOw0lw-3hXg9W43IRfUpcwKbcxWG/exec', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                })
                .then(response => response.json())
                .then(data => {
                    if (data.result === 'success') {
                        const successMessage = document.createElement('div');
                        successMessage.className = 'form-success';
                        successMessage.textContent = 'Thank you! Your message has been sent successfully.';
                        contactForm.appendChild(successMessage);
                        contactForm.reset();
                        setTimeout(() => {
                            successMessage.remove();
                        }, 5000);
                    } else {
                        throw new Error('Submission failed');
                    }
                })
                .catch(() => {
                    let errorMessage = contactForm.querySelector('.form-error');
                    if (!errorMessage) {
                        errorMessage = document.createElement('div');
                        errorMessage.className = 'form-error';
                        errorMessage.textContent = 'There was an error sending your message. Please try again later.';
                        contactForm.appendChild(errorMessage);
                    }
                });
            } else {
                // Show error message
                let errorMessage = contactForm.querySelector('.form-error');
                if (!errorMessage) {
                    errorMessage = document.createElement('div');
                    errorMessage.className = 'form-error';
                    form.appendChild(errorMessage);
                }
                errorMessage.textContent = 'Please fill in all required fields correctly.';

                setTimeout(() => {
                    errorMessage.remove();
                }, 5000);
            }
        });
    });

    // Scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Animate elements on scroll
    const animateElements = document.querySelectorAll('.service-card, .feature-item, .testimonial-card, .gallery-item');
    animateElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });

    // Before/after sliders
    const beforeAfterSliders = document.querySelectorAll('.before-after');

    beforeAfterSliders.forEach(slider => {
        let isDragging = false;

        const updateSliderPosition = event => {
            const rect = slider.getBoundingClientRect();
            const clampedX = Math.min(Math.max(event.clientX - rect.left, 0), rect.width);
            const percent = (clampedX / rect.width) * 100;
            slider.style.setProperty('--before-after-position', `${percent}%`);
        };

        slider.addEventListener('pointerdown', event => {
            isDragging = true;
            slider.classList.add('is-dragging');
            slider.setPointerCapture(event.pointerId);
            updateSliderPosition(event);
        });

        slider.addEventListener('pointermove', event => {
            if (!isDragging) {
                return;
            }

            updateSliderPosition(event);
        });

        const stopDragging = event => {
            if (!isDragging) {
                return;
            }

            isDragging = false;
            slider.classList.remove('is-dragging');
            slider.releasePointerCapture(event.pointerId);
        };

        slider.addEventListener('pointerup', stopDragging);
        slider.addEventListener('pointercancel', stopDragging);
    });

    // Back to top button
    const backToTop = document.createElement('button');
    backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTop.className = 'back-to-top';
    document.body.appendChild(backToTop);

    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    });

    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Active navigation highlighting based on scroll position
    const sections = document.querySelectorAll('section[id]');
    
    function highlightNavigation() {
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-menu a[href="#${sectionId}"]`);

            if (navLink && scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                navLink.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', highlightNavigation);

    // Gallery lightbox functionality
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            // Future enhancement: Implement lightbox functionality here
            // Example: Open modal with full-size image
        });
    });
});
