/** Founder profiles. Bios are translated in i18n/sections/about.ts by key. */
export type Founder = {
  key: 'lucas' | 'guido';
  name: string;
  initials: string;
  /** Personal LinkedIn URL; empty until provided (link is hidden when empty). */
  linkedin: string;
  skills: string[];
};

export const founders: Founder[] = [
  {
    key: 'lucas',
    name: 'Lucas Cristaldo',
    initials: 'LC',
    linkedin: '',
    skills: ['AWS', 'Azure', 'GCP', 'OCI', 'Terraform', 'Kubernetes', 'Go', 'Python', 'Bash'],
  },
  {
    key: 'guido',
    name: 'Guido Do Rego',
    initials: 'GD',
    linkedin: '',
    skills: ['Python', 'Node.js', 'Web', 'Mobile', 'Linux', 'SQL'],
  },
];
