// ============================================
// Modals
// ============================================


const modals = document.querySelectorAll('.modal');
const modalTriggers = document.querySelectorAll('[data-modal]');


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

const modalController = {
    openModal: openModal,
    closeModal: closeModal,
    closeAllModals: closeAllModals
}
export default modalController

export function initModal(){
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
}
