// ============================================
// Keyboard Navigation
// ============================================

export default function initKeyBoardNavegation(){
    
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

}
