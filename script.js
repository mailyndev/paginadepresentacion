/**
 * PORTFOLIO EXPRESS - MAILYN CORDERO
 * CUSTOM INTERACTION & LOGIC SCRIPT
 */

document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 1. STICKY HEADER & NAVBAR SHADOW ON SCROLL
    // ==========================================
    const header = document.getElementById('header');
    
    const checkScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', checkScroll);
    checkScroll(); // Initial check


    // ==========================================
    // 2. MOBILE HAMBURGER MENU DRAWER
    // ==========================================
    const menuToggle = document.getElementById('menu-toggle');
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');

    const toggleMenu = (e) => {
        if (e) e.stopPropagation();
        menuToggle.classList.toggle('active');
        navbar.classList.toggle('active');
    };

    const closeMenu = () => {
        menuToggle.classList.remove('active');
        navbar.classList.remove('active');
    };

    menuToggle.addEventListener('click', toggleMenu);

    // Close menu when clicking a nav-link
    navLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // Close menu when clicking anywhere outside of the nav panel
    document.addEventListener('click', (e) => {
        const isClickInsideMenu = navbar.contains(e.target);
        const isClickInsideToggle = menuToggle.contains(e.target);
        if (!isClickInsideMenu && !isClickInsideToggle && navbar.classList.contains('active')) {
            closeMenu();
        }
    });


    // ==========================================
    // 3. SMOOTH SCROLL & ACTIVE LINK NAVIGATION
    // ==========================================
    const sections = document.querySelectorAll('section[id]');
    
    const trackActiveSection = () => {
        const scrollY = window.pageYOffset;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 120; // offset for sticky header
            const sectionId = current.getAttribute('id');
            const navLink = document.querySelector(`.nav-list a[href*=${sectionId}]`);

            if (navLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    navLinks.forEach(link => link.classList.remove('active'));
                    navLink.classList.add('active');
                }
            }
        });
    };

    window.addEventListener('scroll', trackActiveSection);


    // ==========================================
    // 4. SCROLL REVEAL ANIMATIONS (Intersection Observer)
    // ==========================================
    const revealElements = document.querySelectorAll('.reveal-left, .reveal-right, .reveal-y');

    const revealOnScrollOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-active');
                observer.unobserve(entry.target); // Stop observing once animated
            }
        });
    }, revealOnScrollOptions);

    revealElements.forEach(element => {
        revealOnScrollObserver.observe(element);
    });


    // ==========================================
    // 5. CONTACT FORM VALIDATION & ANIMATION
    // ==========================================
    const form = document.getElementById('contact-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const subjectInput = document.getElementById('subject');
    const messageInput = document.getElementById('message');
    const submitBtn = document.getElementById('contact-submit-btn');
    const successBox = document.getElementById('success-box');

    const emailRegex = /^[a-zA-Z0-0._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    // Helper: Show validation error
    const showError = (input, errorId) => {
        input.classList.add('invalid');
        const errorSpan = document.getElementById(errorId);
        if (errorSpan) errorSpan.style.display = 'block';
    };

    // Helper: Clear validation error
    const clearError = (input, errorId) => {
        input.classList.remove('invalid');
        const errorSpan = document.getElementById(errorId);
        if (errorSpan) errorSpan.style.display = 'none';
    };

    // Live validation listeners
    nameInput.addEventListener('input', () => {
        if (nameInput.value.trim() !== '') {
            clearError(nameInput, 'name-error');
        }
    });

    emailInput.addEventListener('input', () => {
        if (emailRegex.test(emailInput.value.trim())) {
            clearError(emailInput, 'email-error');
        }
    });

    subjectInput.addEventListener('input', () => {
        if (subjectInput.value.trim() !== '') {
            clearError(subjectInput, 'subject-error');
        }
    });

    messageInput.addEventListener('input', () => {
        if (messageInput.value.trim().length >= 10) {
            clearError(messageInput, 'message-error');
        }
    });

    // Form Submission
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        let isValid = true;

        // Reset errors first
        clearError(nameInput, 'name-error');
        clearError(emailInput, 'email-error');
        clearError(subjectInput, 'subject-error');
        clearError(messageInput, 'message-error');

        // Check fields
        if (nameInput.value.trim() === '') {
            showError(nameInput, 'name-error');
            isValid = false;
        }

        if (!emailRegex.test(emailInput.value.trim())) {
            showError(emailInput, 'email-error');
            isValid = false;
        }

        if (subjectInput.value.trim() === '') {
            showError(subjectInput, 'subject-error');
            isValid = false;
        }

        if (messageInput.value.trim().length < 10) {
            showError(messageInput, 'message-error');
            isValid = false;
        }

        if (isValid) {
            // Disable submit button and show loading state
            submitBtn.disabled = true;
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.innerHTML = `
                <span>Enviando...</span>
                <svg class="btn-icon spinner" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="animation: spin 1s linear infinite;"><line x1="12" y1="2" x2="12" y2="6"></line><line x1="12" y1="18" x2="12" y2="22"></line><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line><line x1="2" y1="12" x2="6" y2="12"></line><line x1="18" y1="12" x2="22" y2="12"></line><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line></svg>
            `;

            // Style for spin animation
            const style = document.createElement('style');
            style.innerHTML = `@keyframes spin { 100% { transform: rotate(360deg); } }`;
            document.head.appendChild(style);

            // Simulate form submission to backend (API call)
            setTimeout(() => {
                // Show success box slider
                successBox.classList.add('active');
                
                // Clear input values
                form.reset();
                
                // Re-enable button after animation
                setTimeout(() => {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalBtnText;
                }, 1000);

                // Auto-close success modal after 5 seconds
                setTimeout(() => {
                    successBox.classList.remove('active');
                }, 5000);

            }, 1500);
        }
    });

});
