export const site = {
  name: 'usagiteks',
  url: 'https://usagiteks.com',
  email: 'usagiteks@gmail.com',
  github: 'https://github.com/usagitechs',
  /** Contact API. Override at build time with PUBLIC_CONTACT_API. */
  contactApi: import.meta.env.PUBLIC_CONTACT_API ?? 'https://api.usagiteks.com/contact',
  turnstileSiteKey: '0x4AAAAAACLp2i1wJihyfk_G',
  cloudProviders: ['AWS', 'Azure', 'GCP', 'OCI'],
  tools: ['Terraform', 'Kubernetes', 'Docker', 'GitHub Actions', 'Go', 'Python', 'Node.js', 'PostgreSQL'],
  founded: 2026,
};
