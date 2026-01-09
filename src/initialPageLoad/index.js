// ============================================
// Initial Page Load
// ============================================
import updateActiveNavLink from "../sectionDetection";
import { detectActiveSection } from "../sectionDetection";
import { smoothScrollTo } from "../scrollNavegation";

export default function initInitialPageLoad(){
        
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
}