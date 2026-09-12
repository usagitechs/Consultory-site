import type { Dict } from '../config';

export default {
  es: {
    eyebrow: '02 — Proceso',
    title: 'Cómo trabajamos',
    lead: 'Hacemos las preguntas incómodas al principio para evitar sorpresas después.',
    step1Title: 'Discovery',
    step1Desc: 'Entendemos tu negocio, tus desafíos técnicos y tus objetivos antes de proponer nada.',
    step2Title: 'Planificación',
    step2Desc: 'Diseñamos la solución y el roadmap. Lo validamos con vos antes de escribir una línea de código.',
    step3Title: 'Ejecución',
    step3Desc: 'Desarrollo iterativo con demos cada 2 semanas para que veas el progreso y des feedback.',
    step4Title: 'Entrega',
    step4Desc: 'Código, documentación y conocimiento. La seguridad de que podés operar sin nosotros.',
  },
  en: {
    eyebrow: '02 — Process',
    title: 'How we work',
    lead: 'We ask the uncomfortable questions upfront to avoid surprises later.',
    step1Title: 'Discovery',
    step1Desc: 'We understand your business, your technical challenges, and your goals before proposing anything.',
    step2Title: 'Planning',
    step2Desc: 'We design the solution and the roadmap, and validate it with you before writing a single line of code.',
    step3Title: 'Execution',
    step3Desc: 'Iterative development with demos every 2 weeks so you can see progress and give feedback.',
    step4Title: 'Delivery',
    step4Desc: 'Code, documentation, and knowledge transfer. The confidence that you can operate without us.',
  },
  pt: {
    eyebrow: '02 — Processo',
    title: 'Como trabalhamos',
    lead: 'Fazemos as perguntas incômodas logo no início para evitar surpresas depois.',
    step1Title: 'Discovery',
    step1Desc: 'Entendemos seu negócio, seus desafios técnicos e seus objetivos antes de propor qualquer coisa.',
    step2Title: 'Planejamento',
    step2Desc: 'Desenhamos a solução e o roadmap. Validamos com você antes de escrever uma linha de código.',
    step3Title: 'Execução',
    step3Desc: 'Desenvolvimento iterativo com demos a cada 2 semanas para você acompanhar o progresso e dar feedback.',
    step4Title: 'Entrega',
    step4Desc: 'Código, documentação e conhecimento. A segurança de que você pode operar sem a gente.',
  },
} satisfies Dict<
  | 'eyebrow'
  | 'title'
  | 'lead'
  | 'step1Title'
  | 'step1Desc'
  | 'step2Title'
  | 'step2Desc'
  | 'step3Title'
  | 'step3Desc'
  | 'step4Title'
  | 'step4Desc'
>;
