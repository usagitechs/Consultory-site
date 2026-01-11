/**
 * Usagitech - Corporate Website JavaScript
 * SPA Navigation, Animations, Modals, Form handling
**/

// ============================================
// DOM Elements
// ============================================

import app from './app.js'

document.addEventListener('DOMContentLoaded', () => {
    
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

    app()
});

