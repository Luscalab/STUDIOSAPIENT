export type Language = 'pt-BR' | 'pt-PT' | 'en' | 'es';

export const translations = {
  'pt-BR': {
    nav: {
      services: "Serviços",
      urbeludo: "UrbeLudo",
      methodology: "Metodologia",
      contact: "Contato",
      consultancy: "Consultoria"
    },
    hero: {
      badge: "Inteligência Criativa & Performance",
      title: "Estratégia",
      title_italic: "& resultados.",
      description: "Apoiamos o crescimento da sua marca através de uma comunicação visual clara e estratégias focadas em resultados reais.",
      partnership: "Uma parceria verdadeira.",
      cta_primary: "CONHECER SOLUÇÕES",
      cta_secondary: "Nossa Metodologia"
    },
    services: {
      badge: "Soluções para crescer",
      title: "Como podemos",
      title_italic: "Ajudar.",
      explore: "Explorar Solução",
      swipe: "Deslize para navegar",
      items: {
        ads: {
          title: "Vendas & Anúncios",
          desc: "Atraia as pessoas certas para o seu negócio com campanhas no Google e redes sociais focadas em trazer clientes reais.",
          f1: "Topo do Google", f2: "Anúncios locais", f3: "Mais WhatsApp"
        },
        web: {
          title: "Criação de Sites",
          desc: "Desenvolvemos sites modernos e rápidos que funcionam como sua vitrine de luxo na internet, prontos para converter.",
          f1: "Rápido e Seguro", f2: "Design Autoral", f3: "Mobile First"
        },
        brand: {
          title: "Design de Marca",
          desc: "Crie um visual profissional que passa confiança e mostra que você é a melhor escolha do seu mercado.",
          f1: "Logotipos Premium", f2: "Visual de Impacto", f3: "Credibilidade"
        }
      }
    },
    process: {
      badge: "Caminho do ROI",
      title: "Nossa",
      title_italic: "Metodologia.",
      steps: [
        { title: "Entendimento", desc: "Conversamos para entender seus objetivos, desafios e o público que você deseja alcançar." },
        { title: "Planejamento", desc: "Criamos um roteiro estratégico focado nas soluções que farão mais sentido para o seu negócio." },
        { title: "Execução", desc: "Desenvolvemos o projeto com atenção aos detalhes, garantindo qualidade técnica e visual." },
        { title: "Acompanhamento", desc: "Analisamos os resultados obtidos e sugerimos melhorias contínuas para o seu crescimento constante." }
      ]
    },
    faq: {
      badge: "Suporte Técnico",
      title: "Dúvidas",
      title_italic: "Frequentes.",
      items: [
        { q: "Quanto tempo leva para ver resultados?", a: "Os resultados variam conforme o serviço. Campanhas de anúncios podem gerar contatos em poucos dias, enquanto projetos de design e posicionamento de marca costumam amadurecer entre 3 a 6 meses de trabalho consistente." },
        { q: "Como a IA é integrada ao meu negócio?", a: "Utilizamos IA para criar ecossistemas de atendimento automatizado (WhatsApp e Web) que qualificam leads 24/7, além de aplicar inteligência de dados para otimizar a performance de anúncios em tempo real." },
        { q: "O que é o projeto UrbeLudo?", a: "É a nossa iniciativa de impacto social e tecnológico. Uma plataforma de reabilitação neuro-motora que utiliza jogos imersivos e biofeedback para auxiliar em tratamentos clínicos." },
        { q: "Como posso apoiar ou investir no UrbeLudo?", a: "Existem caminhos como investidor estratégico, doações diretas via PIX ou como colaborador especialista nas áreas de saúde e tecnologia que deseje atuar pro bono." },
        { q: "A Sapient atende qualquer tipo de empresa?", a: "Focamos em negócios que buscam autoridade e diferenciação. Atendemos profissionais liberais de alto padrão e empresas em expansão." }
      ]
    },
    contact: {
      badge: "Canais de Consultoria",
      title: "Vamos",
      title_italic: "Conversar.",
      whatsapp: { title: "WhatsApp", desc: "Diálogo imediato e consultoria técnica.", action: "Iniciar" },
      email: { title: "E-mail", desc: "Solicitações e documentação de projetos.", action: "Enviar", copy: "Copiar Endereço" },
      phone: { title: "Telefone", desc: "Conexão direta para estratégia e escala.", action: "Ligar" }
    },
    footer: {
      mission: "Transformamos negócios em referências através de ecossistemas digitais de alta clareza e autoridade visual.",
      solutions: "Soluções",
      navigation: "Navegação",
      contacts: "Contatos Oficiais",
      email_label: "E-mail Corporativo",
      whatsapp_label: "WhatsApp Business",
      rights: "© 2026 STUDIOSAPIENT. TODOS OS DIREITOS RESERVADOS.",
      privacy: "PRIVACIDADE",
      terms: "TERMOS",
      colab_area: "Área do Colaborador"
    },
    legal: {
      privacy_title: "Política de Privacidade",
      privacy_intro: "A studiosapient valoriza a sua privacidade. Esta política descreve como tratamos seus dados coletados através de nossos sistemas de IA e formulários de contato.",
      privacy_section1_title: "1. Coleta de Dados",
      privacy_section1_content: "Coletamos informações básicas de contato (nome, e-mail, telefone) e dados sobre seu negócio através de nosso chat inteligente para fornecer diagnósticos estratégicos precisos.",
      privacy_section2_title: "2. Uso das Informações",
      privacy_section2_content: "Os dados são utilizados exclusivamente para personalizar nossas recomendações de serviços, entrar em contato comercial e melhorar a experiência do usuário em nosso portal.",
      privacy_section3_title: "3. Proteção e Segurança",
      privacy_section3_content: "Implementamos blindagem digital e protocolos de criptografia para garantir que suas informações proprietárias e dados de prospecção estejam seguros.",
      terms_title: "Termos de Uso",
      terms_intro: "Ao acessar o site da studiosapient, você concorda em cumprir estes termos de serviço, todas as leis e regulamentos aplicáveis.",
      terms_section1_title: "1. Licença de Uso",
      terms_section1_content: "É concedida permissão para baixar temporariamente uma cópia dos materiais no site da studiosapient apenas para visualização transitória pessoal e não comercial.",
      terms_section2_title: "2. Propriedade Intelectual",
      terms_section2_content: "Todo o design, código e diagnósticos estratégicos apresentados são propriedade intelectual da studiosapient e não podem ser replicados sem autorização prévia."
    },
    cookie: {
      title: "Privacidade e Cookies",
      description: "Utilizamos cookies para melhorar sua experiência e analisar nosso tráfego.",
      accept: "Aceitar Tudo",
      decline: "Recusar",
      policy: "Política de Privacidade"
    },
    urbeludo_banner: {
      badge: "Biociência & Tech",
      title: "UrbeLudo:",
      title_italic: "Ciência.",
      explore: "Explorar"
    },
    chat: {
      title: "Consultor Sapient",
      subtitle: "Raio-X de Performance",
      placeholder: "Escreva aqui...",
      lock_placeholder: "Escolha uma opção acima...",
      analyze: "Analisando...",
      cta: "FALAR COM ESTRATEGISTA",
      confirm: "Confirmar Opções"
    }
  },
  'pt-PT': {
    nav: {
      services: "Serviços",
      urbeludo: "UrbeLudo",
      methodology: "Metodologia",
      contact: "Contacto",
      consultancy: "Consultoria"
    },
    hero: {
      badge: "Inteligência Criativa & Performance",
      title: "Estratégia",
      title_italic: "& resultados.",
      description: "Apoiamos o crescimento da sua marca através de uma comunicação visual clara e estratégias focadas em resultados reais.",
      partnership: "Uma parceria verdadeira.",
      cta_primary: "CONHECER SOLUÇÕES",
      cta_secondary: "Nossa Metodologia"
    },
    services: {
      badge: "Soluções para crescer",
      title: "Como podemos",
      title_italic: "Ajudar.",
      explore: "Explorar Solução",
      swipe: "Deslize para navegar",
      items: {
        ads: {
          title: "Vendas & Anúncios",
          desc: "Atraia as pessoas certas para o seu negócio com campanhas no Google e redes sociais focadas em trazer clientes reais.",
          f1: "Topo do Google", f2: "Anúncios locais", f3: "Mais WhatsApp"
        },
        web: {
          title: "Criação de Sites",
          desc: "Desenvolvemos sites modernos e rápidos que funcionam como a sua vitrine de luxo na internet, prontos para converter.",
          f1: "Rápido e Seguro", f2: "Design Autoral", f3: "Otimizado para Telemóvel"
        },
        brand: {
          title: "Design de Marca",
          desc: "Crie um visual profissional que passa confiança e mostra que é a melhor escolha do seu mercado.",
          f1: "Logótipos Premium", f2: "Visual de Impacto", f3: "Credibilidade"
        }
      }
    },
    process: {
      badge: "Caminho do ROI",
      title: "Nossa",
      title_italic: "Metodologia.",
      steps: [
        { title: "Entendimento", desc: "Conversamos para entender os seus objetivos, desafios e o público que deseja alcançar." },
        { title: "Planeamento", desc: "Criamos um roteiro estratégico focado nas soluções que farão mais sentido para o seu negócio." },
        { title: "Execução", desc: "Desenvolvemos o projeto com atenção aos detalhes, garantindo qualidade técnica e visual." },
        { title: "Acompanhamento", desc: "Analisamos os resultados obtidos e sugerimos melhorias contínuas para o seu crescimento constante." }
      ]
    },
    faq: {
      badge: "Suporte Técnico",
      title: "Dúvidas",
      title_italic: "Frequentes.",
      items: [
        { q: "Quanto tempo demora para ver resultados?", a: "Os resultados variam conforme o serviço. Campanhas de anúncios podem gerar contactos em poucos dias, enquanto projetos de design e posicionamento de marca costumam amadurecer entre 3 a 6 meses." },
        { q: "Como a IA é integrada ao meu negócio?", a: "Utilizamos IA para criar ecossistemas de atendimento automatizado que qualificam leads 24/7." },
        { q: "O que é o projeto UrbeLudo?", a: "É a nossa iniciativa de impacto social e tecnológico. Uma plataforma de reabilitação neuro-motora que utiliza jogos imersivos." },
        { q: "Como posso apoiar ou investir no UrbeLudo?", a: "Existem caminhos como investidor estratégico, doações diretas ou como colaborador especialista." },
        { q: "A Sapient atende qualquer tipo de empresa?", a: "Focamos em negócios que procuram autoridade e diferenciação." }
      ]
    },
    contact: {
      badge: "Canais de Consultoria",
      title: "Vamos",
      title_italic: "Conversar.",
      whatsapp: { title: "WhatsApp", desc: "Diálogo imediato e consultoria técnica.", action: "Iniciar" },
      email: { title: "E-mail", desc: "Solicitações e documentação de projetos.", action: "Enviar", copy: "Copiar Endereço" },
      phone: { title: "Telemóvel", desc: "Conexão direta para estratégia e escala.", action: "Ligar" }
    },
    footer: {
      mission: "Transformamos negócios em referências através de ecossistemas digitais de alta clareza e autoridade visual.",
      solutions: "Soluções",
      navigation: "Navegação",
      contacts: "Contactos Oficiais",
      email_label: "E-mail Corporativo",
      whatsapp_label: "WhatsApp Business",
      rights: "© 2026 STUDIOSAPIENT. TODOS OS DIREITOS RESERVADOS.",
      privacy: "PRIVACIDADE",
      terms: "TERMOS",
      colab_area: "Área do Colaborador"
    },
    legal: {
      privacy_title: "Política de Privacidade",
      privacy_intro: "A studiosapient valoriza a sua privacidade. Esta política descreve como tratamos os seus dados recolhidos através dos nossos sistemas de IA e formulários de contacto.",
      privacy_section1_title: "1. Recolha de Dados",
      privacy_section1_content: "Recolhemos informações básicas de contacto (nome, e-mail, telefone) e dados sobre o seu negócio através do nosso chat inteligente para fornecer diagnósticos estratégicos precisos.",
      privacy_section2_title: "2. Uso das Informações",
      privacy_section2_content: "Os dados são utilizados exclusivamente para personalizar as nossas recomendações de serviços, entrar em contacto comercial e melhorar a experiência do utilizador no nosso portal.",
      privacy_section3_title: "3. Proteção e Segurança",
      privacy_section3_content: "Implementamos blindagem digital e protocolos de criptografia para garantir que as suas informações proprietárias e dados de prospeção estejam seguros.",
      terms_title: "Termos de Utilização",
      terms_intro: "Ao aceder ao site da studiosapient, concorda em cumprir estes termos de serviço, todas as leis e regulamentos aplicáveis.",
      terms_section1_title: "1. Licença de Utilização",
      terms_section1_content: "É concedida permissão para baixar temporariamente uma cópia dos materiais no site da studiosapient apenas para visualização transitória pessoal e não comercial.",
      terms_section2_title: "2. Propriedade Intelectual",
      terms_section2_content: "Todo o design, código e diagnósticos estratégicos apresentados são propriedade intelectual da studiosapient e não podem ser replicados sem autorização prévia."
    },
    cookie: {
      title: "Privacidade e Cookies",
      description: "Utilizamos cookies para melhorar a sua experiência e analisar o nosso tráfego.",
      accept: "Aceitar Tudo",
      decline: "Recusar",
      policy: "Política de Privacidade"
    },
    urbeludo_banner: {
      badge: "Biociência & Tech",
      title: "UrbeLudo:",
      title_italic: "Ciência.",
      explore: "Explorar"
    },
    chat: {
      title: "Consultor Sapient",
      subtitle: "Raio-X de Performance",
      placeholder: "Escreva aqui...",
      lock_placeholder: "Escolha uma opção acima...",
      analyze: "Analisando...",
      cta: "FALAR COM ESTRATEGISTA",
      confirm: "Confirmar Opções"
    }
  },
  'en': {
    nav: {
      services: "Services",
      urbeludo: "UrbeLudo",
      methodology: "Methodology",
      contact: "Contact",
      consultancy: "Consultancy"
    },
    hero: {
      badge: "Creative Intelligence & Performance",
      title: "Strategy",
      title_italic: "& results.",
      description: "We support your brand growth through clear visual communication and strategies focused on real results.",
      partnership: "A true partnership.",
      cta_primary: "EXPLORE SOLUTIONS",
      cta_secondary: "Our Methodology"
    },
    services: {
      badge: "Growth Solutions",
      title: "How we can",
      title_italic: "Help.",
      explore: "Explore Solution",
      swipe: "Swipe to navigate",
      items: {
        ads: {
          title: "Sales & Ads",
          desc: "Attract the right people to your business with Google and social media campaigns focused on real customers.",
          f1: "Google Top Ranking", f2: "Local Ads", f3: "WhatsApp Leads"
        },
        web: {
          title: "Web Development",
          desc: "We develop modern and fast websites that act as your luxury showcase on the internet, ready to convert.",
          f1: "Fast & Secure", f2: "Custom Design", f3: "Mobile First"
        },
        brand: {
          title: "Brand Design",
          desc: "Create a professional look that conveys trust and shows you are the best choice in your market.",
          f1: "Premium Logos", f2: "Impactful Visuals", f3: "Credibility"
        }
      }
    },
    process: {
      badge: "ROI Path",
      title: "Our",
      title_italic: "Methodology.",
      steps: [
        { title: "Understanding", desc: "We talk to understand your goals, challenges and the audience you want to reach." },
        { title: "Planning", desc: "We create a strategic roadmap focused on the solutions that will make the most sense for your business." },
        { title: "Execution", desc: "We develop the project with attention to detail, ensuring technical and visual quality." },
        { title: "Monitoring", desc: "We analyze the results obtained and suggest continuous improvements for your constant growth." }
      ]
    },
    faq: {
      badge: "Technical Support",
      title: "Frequently Asked",
      title_italic: "Questions.",
      items: [
        { q: "How long does it take to see results?", a: "Results vary by service. Ad campaigns can generate leads in a few days, while design and branding projects usually mature within 3 to 6 months." },
        { q: "How is AI integrated into my business?", a: "We use AI to create automated customer service ecosystems that qualify leads 24/7." },
        { q: "What is the UrbeLudo project?", a: "It is our social and technological impact initiative. A neuro-motor rehabilitation platform that uses immersive games." },
        { q: "How can I support or invest in UrbeLudo?", a: "There are paths as a strategic investor, direct donations, or as a pro bono specialist collaborator." },
        { q: "Does Sapient serve any type of company?", a: "We focus on businesses seeking authority and differentiation." }
      ]
    },
    contact: {
      badge: "Consultancy Channels",
      title: "Let's",
      title_italic: "Talk.",
      whatsapp: { title: "WhatsApp", desc: "Immediate dialogue and technical consultancy.", action: "Start" },
      email: { title: "Email", desc: "Project requests and documentation.", action: "Send", copy: "Copy Address" },
      phone: { title: "Phone", desc: "Direct connection for strategy and scale.", action: "Call" }
    },
    footer: {
      mission: "We transform businesses into references through high-clarity digital ecosystems and visual authority.",
      solutions: "Solutions",
      navigation: "Navigation",
      contacts: "Official Contacts",
      email_label: "Corporate Email",
      whatsapp_label: "WhatsApp Business",
      rights: "© 2026 STUDIOSAPIENT. ALL RIGHTS RESERVED.",
      privacy: "PRIVACY",
      terms: "TERMS",
      colab_area: "Collaborator Area"
    },
    legal: {
      privacy_title: "Privacy Policy",
      privacy_intro: "studiosapient values your privacy. This policy describes how we handle your data collected through our AI systems and contact forms.",
      privacy_section1_title: "1. Data Collection",
      privacy_section1_content: "We collect basic contact information (name, email, phone) and data about your business through our intelligent chat to provide accurate strategic diagnostics.",
      privacy_section2_title: "2. Information Use",
      privacy_section2_content: "Data is used exclusively to customize our service recommendations, contact you commercially, and improve the user experience on our portal.",
      privacy_section3_title: "3. Protection and Security",
      privacy_section3_content: "We implement digital shielding and encryption protocols to ensure that your proprietary information and prospecting data are secure.",
      terms_title: "Terms of Use",
      terms_intro: "By accessing the studiosapient website, you agree to comply with these terms of service, all applicable laws and regulations.",
      terms_section1_title: "1. Use License",
      terms_section1_content: "Permission is granted to temporarily download one copy of the materials on studiosapient's website for personal, non-commercial transitory viewing only.",
      terms_section2_title: "2. Intellectual Property",
      terms_section2_content: "All design, code, and strategic diagnostics presented are intellectual property of studiosapient and may not be replicated without prior authorization."
    },
    cookie: {
      title: "Privacy and Cookies",
      description: "We use cookies to improve your experience and analyze our traffic.",
      accept: "Accept All",
      decline: "Decline",
      policy: "Privacy Policy"
    },
    urbeludo_banner: {
      badge: "Bioscience & Tech",
      title: "UrbeLudo:",
      title_italic: "Science.",
      explore: "Explore"
    },
    chat: {
      title: "Sapient Consultant",
      subtitle: "Performance X-Ray",
      placeholder: "Write here...",
      lock_placeholder: "Choose an option above...",
      analyze: "Analyzing...",
      cta: "TALK TO STRATEGIST",
      confirm: "Confirm Options"
    }
  },
  'es': {
    nav: {
      services: "Servicios",
      urbeludo: "UrbeLudo",
      methodology: "Metodología",
      contact: "Contacto",
      consultancy: "Consultoría"
    },
    hero: {
      badge: "Inteligencia Creativa & Rendimiento",
      title: "Estrategia",
      title_italic: "& resultados.",
      description: "Apoyamos el crecimiento de su marca a través de una comunicación visual clara y estrategias enfocadas en resultados reales.",
      partnership: "Una alianza verdadera.",
      cta_primary: "CONOCER SOLUCIONES",
      cta_secondary: "Nuestra Metodología"
    },
    services: {
      badge: "Soluciones para crecer",
      title: "Cómo podemos",
      title_italic: "Ayudar.",
      explore: "Explorar Solución",
      swipe: "Desliza para navegar",
      items: {
        ads: {
          title: "Ventas & Anuncios",
          desc: "Atraiga a las personas adecuadas para su negocio con campañas en Google y redes sociales enfocadas en clientes reales.",
          f1: "Top en Google", f2: "Anuncios Locales", f3: "Más WhatsApp"
        },
        web: {
          title: "Creación de Sitios",
          desc: "Desarrollamos sitios modernos y rápidos que funcionan como su escaparate de lujo en internet, listos para convertir.",
          f1: "Rápido y Seguro", f2: "Diseño de Autor", f3: "Primero Móvil"
        },
        brand: {
          title: "Diseño de Marca",
          desc: "Cree una imagen profesional que transmita confianza y demuestre que es la mejor opción en su mercado.",
          f1: "Logotipos Premium", f2: "Visual de Impacto", f3: "Credibilidad"
        }
      }
    },
    process: {
      badge: "Camino del ROI",
      title: "Nuestra",
      title_italic: "Metodología.",
      steps: [
        { title: "Entendimiento", desc: "Hablamos para entender sus objetivos, desafíos y el público que deseja alcanzar." },
        { title: "Planeamiento", desc: "Creamos uma hoja de ruta estratégica enfocada en las soluciones que tengan más sentido para su negocio." },
        { title: "Ejecución", desc: "Desarrollamos el proyecto con atención a los detalles, garantizando calidad técnica y visual." },
        { title: "Seguimiento", desc: "Analizamos los resultados obtenidos y sugerimos mejoras continuas para su crecimiento constante." }
      ]
    },
    faq: {
      badge: "Soporte Técnico",
      title: "Dudas",
      title_italic: "Frecuentes.",
      items: [
        { q: "¿Cuánto tiempo toma ver resultados?", a: "Los resultados varían según el servicio. Las campañas de anuncios pueden generar contactos en pocos días, mientras que el branding tarda de 3 a 6 meses." },
        { q: "¿Cómo se integra la IA en mi negocio?", a: "Usamos IA para crear ecosistemas de atención automatizada que califican leads 24/7." },
        { q: "¿Qué es el proyecto UrbeLudo?", a: "Es nuestra iniciativa de impacto social y tecnológico. Una plataforma de rehabilitación neuro-motora." },
        { q: "¿Cómo posso apoiar o invertir en UrbeLudo?", a: "Existen caminos como inversor estratégico, donaciones o como colaborador especialista." },
        { q: "¿Sapient atiende a cualquier empresa?", a: "Nos enfocamos en negocios que buscan autoridad y diferenciación." }
      ]
    },
    contact: {
      badge: "Canales de Consultoría",
      title: "Vamos a",
      title_italic: "Conversar.",
      whatsapp: { title: "WhatsApp", desc: "Diálogo inmediato y consultoría técnica.", action: "Iniciar" },
      email: { title: "Correo", desc: "Solicitudes y documentación de proyectos.", action: "Enviar", copy: "Copiar Dirección" },
      phone: { title: "Teléfono", desc: "Conexión directa para estrategia y escala.", action: "Llamar" }
    },
    footer: {
      mission: "Transformamos negocios en referencias a través de ecosistemas digitales de alta claridad y autoridad visual.",
      solutions: "Soluciones",
      navigation: "Navegación",
      contacts: "Contactos Oficiales",
      email_label: "Correo Corporativo",
      whatsapp_label: "WhatsApp Business",
      rights: "© 2026 STUDIOSAPIENT. TODOS LOS DERECHOS RESERVADOS.",
      privacy: "PRIVACIDAD",
      terms: "TÉRMINOS",
      colab_area: "Área del Colaborador"
    },
    legal: {
      privacy_title: "Política de Privacidad",
      privacy_intro: "studiosapient valora su privacidad. Esta política describe cómo manejamos sus datos recopilados a través de nuestros sistemas de IA y formularios de contacto.",
      privacy_section1_title: "1. Recopilación de Datos",
      privacy_section1_content: "Recopilamos información básica de contacto (nombre, correo electrónico, teléfono) y datos sobre su negocio a través de nuestro chat inteligente para proporcionar diagnósticos estratégicos precisos.",
      privacy_section2_title: "2. Uso de la Información",
      privacy_section2_content: "Los datos se utilizan exclusivamente para personalizar nuestras recomendaciones de servicios, contactarlo comercialmente y mejorar la experiencia del usuario en nuestro portal.",
      privacy_section3_title: "3. Protección y Seguridad",
      privacy_section3_content: "Implementamos blindagem digital y protocolos de cifrado para garantizar que su información patentada y datos de prospección estén seguros.",
      terms_title: "Términos de Uso",
      terms_intro: "Al acceder al sitio web de studiosapient, usted acepta cumplir con estos términos de servicio, todas las leyes y regulaciones aplicables.",
      terms_section1_title: "1. Licencia de Uso",
      terms_section1_content: "Se otorga permiso para descargar temporalmente una copia de los materiales en el sitio web de studiosapient solo para visualización transitoria personal y no comercial.",
      terms_section2_title: "2. Propiedad Intelectual",
      terms_section2_content: "Todo el diseño, código y diagnósticos estratégicos presentados son propiedad intelectual de studiosapient y no pueden ser replicados sin autorización previa."
    },
    cookie: {
      title: "Privacidad y Cookies",
      description: "Utilizamos cookies para mejorar su experiencia y analizar nuestro tráfico.",
      accept: "Aceptar Todo",
      decline: "Rechazar",
      policy: "Política de Privacidad"
    },
    urbeludo_banner: {
      badge: "Biociencia & Tech",
      title: "UrbeLudo:",
      title_italic: "Ciencia.",
      explore: "Explorar"
    },
    chat: {
      title: "Consultor Sapient",
      subtitle: "Radiografía de Rendimiento",
      placeholder: "Escriba aquí...",
      lock_placeholder: "Elija una opción arriba...",
      analyze: "Analizando...",
      cta: "HABLAR CON ESTRATEGA",
      confirm: "Confirmar Opciones"
    }
  }
};