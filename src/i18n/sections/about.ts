import type { Dict } from '../config';

export default {
  es: {
    eyebrow: '03 — Nosotros',
    title: 'Dos expertos, un equipo ágil',
    lead: 'Después de años viendo proyectos fallar por falta de comunicación, procesos caóticos o decisiones técnicas cuestionables, decidimos hacer las cosas diferente. No vendemos humo ni tecnologías de moda.',
    value1: 'Transparencia radical: decimos lo que pensamos.',
    value2: 'Excelencia técnica: sin atajos.',
    value3: 'Comunicación clara: sin jerga innecesaria.',
    roleLucas: 'Co-Founder · CTO',
    bioLucas:
      'Arquitectura cloud y DevOps. 7 años construyendo y operando infraestructura en AWS, Azure, GCP y OCI. Automatiza en Bash, Python y Go.',
    roleGuido: 'Co-Founder · Head of Development',
    bioGuido: 'Desarrollador full-stack, web y mobile. Python, Linux y bases de datos. Estudiante de ingeniería.',
    linkedinLabel: 'Ver trayectoria en LinkedIn',
  },
  en: {
    eyebrow: '03 — About',
    title: 'Two experts, one agile team',
    lead: "After years watching projects fail due to poor communication, chaotic processes, or questionable technical decisions, we decided to do things differently. We don't sell hype or trendy tech for its own sake.",
    value1: 'Radical transparency: we say what we think.',
    value2: 'Technical excellence: no shortcuts.',
    value3: 'Clear communication: no unnecessary jargon.',
    roleLucas: 'Co-Founder · CTO',
    bioLucas:
      'Cloud architecture and DevOps. 7 years building and operating infrastructure on AWS, Azure, GCP, and OCI. Automates with Bash, Python, and Go.',
    roleGuido: 'Co-Founder · Head of Development',
    bioGuido: 'Full-stack developer, web and mobile. Python, Linux, and databases. Engineering student.',
    linkedinLabel: 'View LinkedIn profile',
  },
  pt: {
    eyebrow: '03 — Sobre nós',
    title: 'Dois especialistas, um time ágil',
    lead: 'Depois de anos vendo projetos fracassarem por falta de comunicação, processos caóticos ou decisões técnicas questionáveis, decidimos fazer diferente. Não vendemos ilusão nem tecnologias da moda.',
    value1: 'Transparência radical: dizemos o que pensamos.',
    value2: 'Excelência técnica: sem atalhos.',
    value3: 'Comunicação clara: sem jargão desnecessário.',
    roleLucas: 'Co-Founder · CTO',
    bioLucas:
      'Arquitetura cloud e DevOps. 7 anos construindo e operando infraestrutura em AWS, Azure, GCP e OCI. Automatiza com Bash, Python e Go.',
    roleGuido: 'Co-Founder · Head of Development',
    bioGuido: 'Desenvolvedor full-stack, web e mobile. Python, Linux e bancos de dados. Estudante de engenharia.',
    linkedinLabel: 'Ver trajetória no LinkedIn',
  },
} satisfies Dict<
  | 'eyebrow'
  | 'title'
  | 'lead'
  | 'value1'
  | 'value2'
  | 'value3'
  | 'roleLucas'
  | 'bioLucas'
  | 'roleGuido'
  | 'bioGuido'
  | 'linkedinLabel'
>;
