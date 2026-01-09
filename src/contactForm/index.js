// ============================================
// Contact Form
// ============================================


const contactForm = document.getElementById('contactForm');
const toast = document.getElementById('toast');


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