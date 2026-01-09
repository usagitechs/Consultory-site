// ============================================
// Scroll Animations (Intersection Observer)
// ============================================

import animateCounter from "../statsCounter";

export default function initScrollAnimations(){
        
    const statNumbers = document.querySelectorAll('.stat__number');


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

}