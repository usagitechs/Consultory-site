// ============================================
// Contact Form
// ============================================


// Importas el contenido real del archivo SVG
import successSvgRaw from '../assets/icons/success.svg?raw';
import warningSvgRaw from '../assets/icons/warning.svg?raw';
import dangerSvgRaw from '../assets/icons/danger.svg?raw';
    
const toast = document.getElementById('toast');
const toastContent = toast.querySelector('.toast__content');
const toastIconWrapper = toast.querySelector('.toast__icon__wrapper');
const toastMessage = toast.querySelector('.toast__message');
const turnstileWrapper = document.querySelector('.cf-turnstile');


function showToast(status, message) {
    toastContent.className = 'toast__content'

    if (status === 'success') {
        toastIconWrapper.innerHTML = successSvgRaw
        toastContent.classList.add('toast__success')

    }else if (status === 'warning') {
        toastIconWrapper.innerHTML = warningSvgRaw
        toastContent.classList.add('toast__warning')

    }else if (status === 'danger') {
        toastIconWrapper.innerHTML = dangerSvgRaw
        toastContent.classList.add('toast__danger')
    }

    toastMessage.textContent = message;
    toast.classList.add('active');
    
    setTimeout(() => {
        toast.classList.remove('active');
    }, 4000);

}

const len = (value) => (value ?? '').length;

export function validateName(name){
    // Name    string `json:"name" validate:"required,min=2,max=100"`
    if(!name){
        return 'Por favor, ingresá tu nombre.'
    }
    
    const nameLen = len(name)
    if(nameLen < 2){
        return 'Nombre: longitud mínima de 2 caracteres.'
    }
    if(nameLen>100){
        return 'Nombre: longitud máxima de 100 caracteres.'
    }

    return ''
}

export function validateEmail(email) {
    // Email   string `json:"email" validate:"required,email,max=254"`
    
    if (!email){
        return 'Por favor, ingresá tu email.'
    }
    
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!re.test(email)) {
        return 'Email inválido.'
    }

    if (len(email) > 254) {
        return 'Email: longitud máxima de 254 caracteres.'
    }

    return ''
}

export function validateMessage(message){
    // Message string `json:"message" validate:"required,min=10,max=2000"`

    if (!message) {
        return 'Por favor, ingresá tu "mensaje".'
    }
    
    const messageLen = len(message)
    
    if (messageLen < 10) {
        return 'Mensaje: longitud mínima de 10 caracteres.'
    }
    if (messageLen > 2000) {
        return 'Mensaje: longitud máxima de 2000 caracteres.'
    }
    return ''
}

export function validateToken(token){
    // Token   string `json:"token" validate:"required,max=2048"`
    if (!token) {
        return 'Por favor, confirmá que sos humano.'
    }
    
    if (len(token) > 2048){
        return 'Token inválido.'
    }
    return ''
}

export function validateCompany(company){
    // Company string `json:"company" validate:"max=100"`
    if (len(company) > 100) {
        return 'Empresa : longitud máxima de 100 caracteres.'
    }

    return ''
}

export function validateService(service){
    // Theme   string `json:"theme" validate:"max=50"`
    if( len(service) > 50){
        return 'Servicio inválido.'
    }
    return ''
}

export default function initContactForm(){
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData.entries());

            // Basic validation
            
            /*
            type Request struct {

            }
            */
            
            const nameError = validateName(data.name);
            if (nameError) {
                showToast('warning', nameError);
                contactForm.querySelector('[name="name"]').focus();
                return;
            }
            const emailError = validateEmail(data.email);
            if (emailError) {
                showToast('warning', emailError);
                contactForm.querySelector('[name="email"]').focus();
                return;
            }
            const messageError = validateMessage(data.message);
            if (messageError) {
                showToast('warning', messageError);
                contactForm.querySelector('[name="message"]').focus();
                return;
            }
            const companyError = validateCompany(data.company);
            if (companyError) {
                showToast('warning', companyError);
                contactForm.querySelector('[name="company"]').focus();
                return;
            }
            const serviceError = validateService(data.service);
            if (serviceError) {
                showToast('warning', serviceError);
                contactForm.querySelector('[name="service"]').focus();
                return;
            }
            const tokenError = validateToken(window.turnstileToken);
            if (tokenError) {
                showToast('warning', tokenError);
                contactForm.querySelector('.cf-turnstile').scrollIntoView({ behavior: 'smooth', block: 'center' });
                return;
            }

            // Form submission
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = `
                <svg class="animate-spin" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10" stroke-dasharray="60" stroke-dashoffset="20"/>
                </svg>
                Enviando...
            `;
            
            try {
                const response = await fetch('/api/contact', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        "name": data.name,
                        "email": data.email,
                        "message": data.message,
                        "token": data.token,
                        "company": data.company,
                        "theme": data.service,
                    })
                });
                if (response.ok) {
                    showToast('success', '¡Mensaje enviado! Te contactaremos pronto.');
                    contactForm.reset();

                } else if(response.status >= 500){
                    showToast('error', 'Error interno. Por favor intentá de nuevo más tarde');

                } else {
                    throw new Error('Request error');
                }

            } catch (error) {
                showToast('danger', 'Error al enviar el mensaje. Por favor, intentá de nuevo.');
            }

            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;

        });
    }

}