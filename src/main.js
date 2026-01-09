/**
 * Usagitech - Corporate Website JavaScript
 * SPA Navigation, Animations, Modals, Form handling
**/

import './style.css'

(function() {
    'use strict';

    // ============================================
    // DOM Elements
    // ============================================
    const header = document.getElementById('header');
    const nav = document.getElementById('nav');
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.querySelectorAll('.nav__link');
    const allLinks = document.querySelectorAll('a[href^="#"], [data-nav]');
    const sections = document.querySelectorAll('section[id]');
    const modals = document.querySelectorAll('.modal');
    const modalTriggers = document.querySelectorAll('[data-modal]');
    const contactForm = document.getElementById('contactForm');
    const toast = document.getElementById('toast');
    const faqItems = document.querySelectorAll('.faq__item');
    const statNumbers = document.querySelectorAll('.stat__number');

    // ============================================
    // Header Scroll Effect
    // ============================================
    function handleHeaderScroll() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', handleHeaderScroll);
    handleHeaderScroll();

    // ============================================
    // Mobile Navigation
    // ============================================
    function toggleMobileNav() {
        navToggle.classList.toggle('active');
        nav.classList.toggle('active');
        document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
    }

    function closeMobileNav() {
        navToggle.classList.remove('active');
        nav.classList.remove('active');
        document.body.style.overflow = '';
    }

    navToggle.addEventListener('click', toggleMobileNav);

    // Close mobile nav when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (nav.classList.contains('active')) {
                closeMobileNav();
            }
        });
    });

    // Close mobile nav on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeMobileNav();
            closeAllModals();
        }
    });

    // ============================================
    // Smooth Scroll Navigation
    // ============================================
    function smoothScrollTo(targetId) {
        const target = document.getElementById(targetId);
        if (target) {
            const headerOffset = header.offsetHeight;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    }

    allLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            const navTarget = link.getAttribute('data-nav');
            
            if (href && href.startsWith('#') && href.length > 1) {
                e.preventDefault();
                const targetId = href.substring(1);
                smoothScrollTo(targetId);
                updateActiveNavLink(targetId);
                
                // Update URL without page jump
                history.pushState(null, null, href);
            } else if (navTarget) {
                e.preventDefault();
                smoothScrollTo(navTarget);
                updateActiveNavLink(navTarget);
                history.pushState(null, null, `#${navTarget}`);
                
                // Close modal if open
                closeAllModals();
            }
        });
    });

    // ============================================
    // Active Section Detection
    // ============================================
    function updateActiveNavLink(sectionId) {
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === `#${sectionId}`) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    function detectActiveSection() {
        const scrollPosition = window.scrollY + header.offsetHeight + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                updateActiveNavLink(sectionId);
            }
        });
    }

    // Throttle scroll events
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (scrollTimeout) {
            window.cancelAnimationFrame(scrollTimeout);
        }
        scrollTimeout = window.requestAnimationFrame(detectActiveSection);
    });

    // ============================================
    // Modals
    // ============================================
    function openModal(modalId) {
        const modal = document.getElementById(`modal-${modalId}`);
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    function closeModal(modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    function closeAllModals() {
        modals.forEach(modal => closeModal(modal));
    }

    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const modalId = trigger.getAttribute('data-modal');
            openModal(modalId);
        });
    });

    modals.forEach(modal => {
        const overlay = modal.querySelector('.modal__overlay');
        const closeBtn = modal.querySelector('.modal__close');

        overlay.addEventListener('click', () => closeModal(modal));
        closeBtn.addEventListener('click', () => closeModal(modal));
    });

    // ============================================
    // FAQ Accordion
    // ============================================
    faqItems.forEach(item => {
        const question = item.querySelector('.faq__question');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all other items
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
            });
            
            // Toggle current item
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // ============================================
    // Stats Counter Animation
    // ============================================
    function animateCounter(element) {
        const target = parseFloat(element.getAttribute('data-count'));
        const prefix = element.getAttribute('data-prefix') || '';
        const suffix = element.getAttribute('data-suffix') || '';
        const duration = 2000;
        const start = 0;
        const startTime = performance.now();
        const isDecimal = target % 1 !== 0;

        function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function (ease-out)
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const current = start + (target - start) * easeOut;

            if (isDecimal) {
                element.textContent = prefix + current.toFixed(1) + suffix;
            } else {
                element.textContent = prefix + Math.floor(current) + suffix;
            }

            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = prefix + target + suffix;
            }
        }

        requestAnimationFrame(updateCounter);
    }

    // ============================================
    // Scroll Animations (Intersection Observer)
    // ============================================
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    // Animate elements on scroll
    const animateOnScrollElements = document.querySelectorAll(
        '.value-card, .service-card, .case-card, .process__step, .founder-card, .tech__category'
    );

    animateOnScrollElements.forEach(el => {
        el.classList.add('animate-on-scroll');
    });

    const scrollAnimationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                scrollAnimationObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animateOnScrollElements.forEach(el => {
        scrollAnimationObserver.observe(el);
    });

    // Stats counter animation
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                statNumbers.forEach(stat => {
                    if (!stat.classList.contains('animated')) {
                        stat.classList.add('animated');
                        animateCounter(stat);
                    }
                });
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const statsSection = document.querySelector('.stats');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }

    // ============================================
    // Contact Form
    // ============================================
    function showToast(message) {
        const toastMessage = toast.querySelector('.toast__message');
        toastMessage.textContent = message;
        toast.classList.add('active');

        setTimeout(() => {
            toast.classList.remove('active');
        }, 4000);
    }

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData.entries());

            // Basic validation
            if (!data.name || !data.email || !data.message) {
                showToast('Por favor, completá todos los campos obligatorios.');
                return;
            }

            if (!validateEmail(data.email)) {
                showToast('Por favor, ingresá un email válido.');
                return;
            }

            // Simulate form submission
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = `
                <svg class="animate-spin" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10" stroke-dasharray="60" stroke-dashoffset="20"/>
                </svg>
                Enviando...
            `;

            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Success
            showToast('¡Mensaje enviado! Te contactaremos pronto.');
            contactForm.reset();
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;

            // In production, you would send to your backend:
            // try {
            //     const response = await fetch('/api/contact', {
            //         method: 'POST',
            //         headers: { 'Content-Type': 'application/json' },
            //         body: JSON.stringify(data)
            //     });
            //     if (response.ok) {
            //         showToast('¡Mensaje enviado! Te contactaremos pronto.');
            //         contactForm.reset();
            //     } else {
            //         throw new Error('Error al enviar');
            //     }
            // } catch (error) {
            //     showToast('Error al enviar el mensaje. Por favor, intentá de nuevo.');
            // }
        });
    }

    // ============================================
    // Keyboard Navigation
    // ============================================
    document.addEventListener('keydown', (e) => {
        // Tab trap for modals
        const activeModal = document.querySelector('.modal.active');
        if (activeModal && e.key === 'Tab') {
            const focusableElements = activeModal.querySelectorAll(
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            );
            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];

            if (e.shiftKey && document.activeElement === firstElement) {
                e.preventDefault();
                lastElement.focus();
            } else if (!e.shiftKey && document.activeElement === lastElement) {
                e.preventDefault();
                firstElement.focus();
            }
        }
    });

    // ============================================
    // Handle Browser Back/Forward
    // ============================================
    window.addEventListener('popstate', () => {
        const hash = window.location.hash.substring(1);
        if (hash) {
            smoothScrollTo(hash);
            updateActiveNavLink(hash);
        }
    });

    // ============================================
    // Initial Page Load
    // ============================================
    function init() {
        // Check for hash in URL on page load
        const hash = window.location.hash.substring(1);
        if (hash) {
            setTimeout(() => {
                smoothScrollTo(hash);
                updateActiveNavLink(hash);
            }, 100);
        }

        // Initial active section detection
        detectActiveSection();

        // Add CSS for spinning animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes spin {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
            }
            .animate-spin {
                animation: spin 1s linear infinite;
            }
        `;
        document.head.appendChild(style);

        console.log('Usagitech website initialized');
    }

    // Run on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
