export const site = {
  name: 'usagiteks',
  url: 'https://usagiteks.com',
  email: 'usagiteks@gmail.com',
  github: 'https://github.com/usagitechs',
  /** Contact API. Override at build time with PUBLIC_CONTACT_API. */
  contactApi: import.meta.env.PUBLIC_CONTACT_API ?? 'https://api.usagiteks.com/contact',
  turnstileSiteKey: '0x4AAAAAACLp2i1wJihyfk_G',
  /** EmailJS (browser-side sending, no backend). Set the three PUBLIC_EMAILJS_* vars at build time to enable it. */
  emailjs: {
    publicKey: import.meta.env.PUBLIC_EMAILJS_PUBLIC_KEY ?? '',
    serviceId: import.meta.env.PUBLIC_EMAILJS_SERVICE_ID ?? '',
    templateId: import.meta.env.PUBLIC_EMAILJS_TEMPLATE_ID ?? '',
  },
  cloudProviders: ['AWS', 'Azure', 'GCP', 'OCI'],
  tools: ['Terraform', 'Kubernetes', 'Docker', 'GitHub Actions', 'Go', 'Python', 'Node.js', 'PostgreSQL'],
  founded: 2026,
};

/** 'emailjs' when the three EmailJS vars are set, otherwise the contact API (Lambda). */
export const contactProvider: 'emailjs' | 'api' =
  site.emailjs.publicKey && site.emailjs.serviceId && site.emailjs.templateId ? 'emailjs' : 'api';
