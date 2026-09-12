import type { Dict } from '../config';

export default {
  es: {
    eyebrow: '01 — Servicios',
    title: 'Soluciones técnicas end-to-end',
    lead: 'Desde la primera línea de Terraform hasta el último deploy. Un solo equipo, sin handoffs.',
    devopsTitle: 'DevOps & CI/CD',
    devopsDesc:
      'Automatización de pipelines, infraestructura como código y despliegues sin fricción. GitHub Actions, Terraform, contenedores.',
    cloudTitle: 'Arquitectura Cloud',
    cloudDesc:
      'Diseño e implementación en AWS, Azure, GCP u OCI, optimizada para rendimiento y costo. Well-Architected desde el día uno.',
    desarrolloTitle: 'Desarrollo de Software',
    desarrolloDesc: 'Aplicaciones web y APIs robustas con arquitecturas modernas y código limpio.',
    migracionesTitle: 'Migraciones',
    migracionesDesc: 'De on-premise a la nube o entre proveedores, sin interrupciones de servicio.',
    soporteTitle: 'Soporte & Consultoría',
    soporteDesc: 'Acompañamiento continuo y asesoría estratégica para tu equipo técnico.',
    agentesTitle: 'Automatización con agentes de IA',
    agentesDesc: 'Agentes de IA integrados a tus flujos de desarrollo y operaciones: pipelines, revisiones de código, migraciones y documentación, con supervisión humana y resultados medibles.',
  },
  en: {
    eyebrow: '01 — Services',
    title: 'End-to-end technical solutions',
    lead: 'From the first line of Terraform to the last deploy. One team, no handoffs.',
    devopsTitle: 'DevOps & CI/CD',
    devopsDesc:
      'Pipeline automation, infrastructure as code, and frictionless deployments. GitHub Actions, Terraform, containers.',
    cloudTitle: 'Cloud Architecture',
    cloudDesc:
      'Design and implementation on AWS, Azure, GCP, or OCI, optimized for performance and cost. Well-Architected from day one.',
    desarrolloTitle: 'Software Development',
    desarrolloDesc: 'Robust web applications and APIs built with modern architectures and clean code.',
    migracionesTitle: 'Migrations',
    migracionesDesc: 'From on-premise to the cloud or between providers, with zero service interruption.',
    soporteTitle: 'Support & Consulting',
    soporteDesc: 'Ongoing support and strategic advice for your technical team.',
    agentesTitle: 'AI-agent automation',
    agentesDesc: 'AI agents integrated into your development and operations workflows: pipelines, code reviews, migrations and documentation, with human oversight and measurable results.',
  },
  pt: {
    eyebrow: '01 — Serviços',
    title: 'Soluções técnicas de ponta a ponta',
    lead: 'Da primeira linha de Terraform até o último deploy. Um só time, sem handoffs.',
    devopsTitle: 'DevOps & CI/CD',
    devopsDesc:
      'Automação de pipelines, infraestrutura como código e deploys sem fricção. GitHub Actions, Terraform, containers.',
    cloudTitle: 'Arquitetura Cloud',
    cloudDesc:
      'Design e implementação em AWS, Azure, GCP ou OCI, otimizados para desempenho e custo. Well-Architected desde o primeiro dia.',
    desarrolloTitle: 'Desenvolvimento de Software',
    desarrolloDesc: 'Aplicações web e APIs robustas com arquiteturas modernas e código limpo.',
    migracionesTitle: 'Migrações',
    migracionesDesc: 'De on-premise para a nuvem ou entre provedores, sem interrupção do serviço.',
    soporteTitle: 'Suporte & Consultoria',
    soporteDesc: 'Acompanhamento contínuo e assessoria estratégica para o seu time técnico.',
    agentesTitle: 'Automação com agentes de IA',
    agentesDesc: 'Agentes de IA integrados aos seus fluxos de desenvolvimento e operações: pipelines, revisões de código, migrações e documentação, com supervisão humana e resultados mensuráveis.',
  },
} satisfies Dict<
  | 'eyebrow'
  | 'title'
  | 'lead'
  | 'devopsTitle'
  | 'devopsDesc'
  | 'cloudTitle'
  | 'cloudDesc'
  | 'desarrolloTitle'
  | 'desarrolloDesc'
  | 'migracionesTitle'
  | 'migracionesDesc'
  | 'soporteTitle'
  | 'soporteDesc'
  | 'agentesTitle'
  | 'agentesDesc'
>;
