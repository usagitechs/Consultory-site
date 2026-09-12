import type { Dict } from '../config';

export default {
  es: {
    eyebrow: '// consultora IT · Buenos Aires · remoto',
    title: 'Infraestructura cloud y desarrollo que',
    titleAccent: 'escala con tu negocio',
    subtitle:
      'DevOps, arquitectura multi-cloud y software a medida. Dos fundadores técnicos, trato directo, sin capas de account managers. Entregamos sistemas que tu equipo puede operar sin nosotros.',
    ctaPrimary: 'Agenda una consulta gratuita',
    ctaSecondary: 'Ver cómo trabajamos',
    check1: 'Respuesta en 24 h',
    check2: 'Primera consulta sin costo',
    check3: 'Hablás con quien ejecuta',
  },
  en: {
    eyebrow: '// IT consultancy · Buenos Aires · remote',
    title: 'Cloud infrastructure and software development that',
    titleAccent: 'scales with your business',
    subtitle:
      'DevOps, multi-cloud architecture, and custom software. Two technical founders, direct communication, no account-manager layers. We deliver systems your team can run without us.',
    ctaPrimary: 'Book a free consultation',
    ctaSecondary: 'See how we work',
    check1: '24-hour response time',
    check2: 'First consultation is free',
    check3: "You talk to the people who build it",
  },
  pt: {
    eyebrow: '// consultoria de TI · Buenos Aires · remoto',
    title: 'Infraestrutura cloud e desenvolvimento que',
    titleAccent: 'escala com o seu negócio',
    subtitle:
      'DevOps, arquitetura multi-cloud e software sob medida. Dois fundadores técnicos, contato direto, sem camadas de account managers. Entregamos sistemas que o seu time consegue operar sem a gente.',
    ctaPrimary: 'Agende uma consultoria gratuita',
    ctaSecondary: 'Veja como trabalhamos',
    check1: 'Resposta em 24 h',
    check2: 'Primeira consulta sem custo',
    check3: 'Você fala direto com quem executa',
  },
} satisfies Dict<
  | 'eyebrow'
  | 'title'
  | 'titleAccent'
  | 'subtitle'
  | 'ctaPrimary'
  | 'ctaSecondary'
  | 'check1'
  | 'check2'
  | 'check3'
>;
