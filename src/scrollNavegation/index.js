// ============================================
// Smooth Scroll Navigation
// ============================================


const header = document.getElementById('header');


export function smoothScrollTo(targetId) {
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

export default function initScrollNavegation(){
    
    const allLinks = document.querySelectorAll('a[href^="#"], [data-nav]');
    
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
}
