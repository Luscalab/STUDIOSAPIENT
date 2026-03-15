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
    service_pages: {
      ads: {
        badge: "Domínio de Busca Local",
        title: "Domine as",
        title_italic: "Buscas de Urgência.",
        desc: "Tráfego digital cirúrgico focado em capturar a demanda no momento exato da necessidade. Onde o clique se torna contrato.",
        cta: "SOLICITAR DIAGNÓSTICO",
        method: "Explorar Método",
        manifesto_title: "Tráfego de Intenção:",
        manifesto_italic: "Onde o ROI Acontece.",
        manifesto_quote: "Não geramos apenas 'leads'. Geramos oportunidades prontas para o fechamento. Capturamos a dor ativa de quem precisa da sua solução agora.",
        manifesto_p: "Substitua a dependência incerta de indicações por uma fonte constante e previsível de novos contratos. Nossa estratégia de Performance Ads é desenhada para negócios que não podem esperar o longo prazo do SEO orgânico.",
        stat1: "Precisão de Segmentação",
        stat2: "Monitoramento Ativo",
        pillar_title: "Engenharia de",
        pillar_italic: "Conversão.",
        p1_title: "Arquitetura GMN",
        p1_desc: "Transformamos seu Google Meu Negócio em uma máquina de chamadas e direções, focando em buscas locais de alta conversão.",
        p2_title: "Escala com Dados",
        p2_desc: "Focamos em ROAS real. Cada centavo investido é rastreado para garantir o maior retorno possível.",
        p3_title: "Negativação Estratégica",
        p3_desc: "Eliminamos o desperdício de verba através de uma curadoria técnica de termos de pesquisa irrelevantes.",
        p4_title: "Otimização Contínua",
        p4_desc: "Ajustes diários de lances e criativos baseados no comportamento real do seu cliente ideal.",
        cta_final_title: "Pronto para a",
        cta_final_italic: "Escala Previsível?",
        cta_final_p: "Agende agora seu diagnóstico de performance e descubra o real potencial de busca do seu negócio.",
        cta_final_btn: "FALAR COM ESTRATEGISTA"
      },
      sites: {
        badge: "Alta Performance Web",
        title: "Sites que são",
        title_italic: "Máquinas de Venda.",
        desc: "Não basta ser bonito, precisa ser rápido e estratégico. Criamos sites de alta fidelidade que posicionam sua marca no topo e convertem visitantes em clientes reais.",
        cta: "SOLICITAR DIAGNÓSTICO WEB",
        method: "Nossa Engenharia",
        manifesto_title: "Sua Vitrine Digital",
        manifesto_italic: "Profissional.",
        manifesto_quote: "No digital, seu site é o seu cartão de visitas de 24 horas. Se ele não carrega em 2 segundos ou não passa confiança, você já perdeu a venda.",
        manifesto_p: "Trabalhamos na intersecção entre design de luxo e engenharia de software. Cada pixel é planejado para guiar o usuário até o fechamento, eliminando qualquer ponto de dúvida ou distração.",
        pillar_title: "Infraestrutura",
        pillar_italic: "de Alto Nível.",
        p1_title: "Velocidade Extrema",
        p1_desc: "Sites otimizados para carregar instantaneamente, garantindo a melhor experiência e melhor rankeamento no Google.",
        p2_title: "Mobile First",
        p2_desc: "Experiência impecável em smartphones, onde acontece a maioria das suas vendas.",
        p3_title: "Segurança Total",
        p3_desc: "Protocolos SSL e proteção contra ataques, garantindo que seus dados e dos seus clientes estejam sempre salvos.",
        p4_title: "Design Autoral",
        p4_desc: "Nada de templates prontos. Criamos o design do zero para refletir a exclusividade da sua marca.",
        cta_final_title: "Leve sua Marca",
        cta_final_italic: "para a Web.",
        cta_final_p: "Pare de lutar por atenção com um site lento. Tenha uma presença digital que impõe autoridade.",
        cta_final_btn: "PROJETAR MEU SITE"
      },
      design: {
        badge: "Psicologia de Valor",
        title: "Design que",
        title_italic: "Comunica Prestígio.",
        desc: "Projetamos universos visuais que removem barreiras de confiança e posicionam sua marca no topo da pirâmide de valor.",
        cta: "SOLICITAR DOSSIÊ VISUAL",
        method: "Nossa Semiótica",
        manifesto_title: "O Impacto da",
        manifesto_italic: "Percepção Profissional.",
        manifesto_quote: "Em mercados de alto padrão, sua imagem é sua primeira barreira de venda. Um design estratégico remove atritos de percepção e gera confiança imediata.",
        manifesto_p: "Sua marca não é apenas o que você entrega, mas o que o cliente sente ao interagir com ela. Utilizamos a psicologia cromática e a semiótica avançada para encurtar o ciclo de decisão do seu cliente ideal.",
        pillar_title: "Sistemas Visuais",
        pillar_italic: "de Alto Nível.",
        p1_title: "Identidade de Prestígio",
        p1_desc: "Arquitetura visual desenhada para transmitir solidez, expertise e exclusividade absoluta antes mesmo da primeira reunião.",
        p2_title: "Branding Cognitivo",
        p2_desc: "Onde a estética encontra a ciência. Design focado em como o cérebro humano processa valor.",
        p3_title: "Barreira de Confiança",
        p3_desc: "Removemos o atrito informacional através de uma interface limpa e hierarquia visual cirúrgica.",
        p4_title: "Omnicanalidade",
        p4_desc: "Garantimos que sua marca seja sentida da mesma forma em todas as interfaces, digitais ou físicas.",
        cta_final_title: "Projete seu",
        cta_final_italic: "Próximo Nível.",
        cta_final_p: "Pare de lutar por preço. Comece a ser percebido pelo valor que você realmente entrega.",
        cta_final_btn: "TRANSFORMAR MINHA MARCA"
      }
    },
    process: {
      badge: "Caminho do ROI",
      title: "Nossa",
      title_italic: "Metodologia.",
      steps: [
        { title: "Entendimento", desc: "Conversamos para entender seus objetivos, desafios e o público que você deseja alcançar." },
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
        { q: "Quanto tempo leva para ver resultados?", a: "Os resultados variam conforme o serviço. Campanhas de anúncios podem gerar contatos em poucos dias, enquanto projetos de design e posicionamento de marca costumam amadurecer entre 3 a 6 meses de trabalho consistente." },
        { q: "Como a IA é integrada ao meu negócio?", a: "Utilizamos IA para criar ecossistemas de atendimento automatizado que qualificam leads 24/7." },
        { q: "O que é o projeto UrbeLudo?", a: "É a nossa iniciativa de impacto social e tecnológico. Uma plataforma de reabilitação neuro-motora." },
        { q: "Como posso apoiar ou investir no UrbeLudo?", a: "Existem caminhos como investidor estratégico, doações diretas via PIX ou como colaborador especialista." },
        { q: "A Sapient atende qualquer tipo de empresa?", a: "Focamos em negócios que buscam autoridade e diferenciação." }
      ]
    },
    urbeludo: {
      hero: {
        badge: "Biociência & Conexão",
        soon: "Em Breve",
        title: "UrbeLudo:",
        title_italic: "desenvolvimento neuropsicomotor.",
        desc: "Um ecossistema digital (iOS, Android e Web) desenhado para apoiar o desenvolvimento de crianças e jovens, respeitando a singularidade de cada cérebro. Unimos o rigor clínico ao engajamento lúdico.",
        cta_project: "Conhecer Projeto",
        cta_science: "Nossa Ciência",
        cta_colab: "Colaborar",
        cta_support: "Apoiar Social",
        cta_faq: "FAQ"
      },
      essence: {
        badge: "Da Estratégia ao Cuidado",
        title: "Nossa",
        title_italic: "essência.",
        quote: "Eu sou o Lucas Souza. Minha base no design estratégico me ensinou que soluções reais nascem da empatia. Ao entrar na Psicomotricidade, entendi que a reabilitação precisa sair do consultório e ganhar a vida real. O UrbeLudo nasceu dessa fusão: usar a tecnologia para criar uma ponte entre o terapeuta, a família e a criança.",
        founder: "Lucas Souza — Fundador & Designer Estratégico"
      },
      philosophy: {
        badge: "Pilar do Projeto",
        title: "Filosofia",
        title_italic: "urbeludo.",
        urbe_title: "URBE (Estrutura)",
        urbe_desc: "Entendemos o corpo como o nosso primeiro território, a nossa 'cidade interna'. Organizar a Urbe é ajudar a criança a mapear seu esquema corporal e se sentir segura em seu espaço.",
        ludo_title: "LUDO (Fluidez)",
        ludo_desc: "O jogo é a linguagem universal do aprendizado. Através do lúdico, acessamos motivações profundas, facilitando a superação de barreiras motoras e cognitivas de forma natural."
      },
      science: {
        badge: "Rigor Clínico",
        title: "Rigor que nos",
        title_italic: "sustenta.",
        desc: "Nosso desenvolvimento é pautado por conceitos científicos que respeitam a neurodiversidade e garantem ganhos terapêuticos sólidos.",
        item1_title: "Integração Sensorial",
        item1_desc: "Estímulos desenhados para acolher hipersensibilidades e organizar o processamento sensorial.",
        item2_title: "Funções Executivas",
        item2_desc: "Atividades que treinam o foco, a memória de trabalho e o controle inibitório.",
        item3_title: "Praxia e Coordenação",
        item3_desc: "Foco na organização do movimento complexo, auxiliando na autonomia de tarefas diárias.",
        item4_title: "Neuroplasticidade Motivada",
        item4_desc: "O prazer no jogo libera neurotransmissores que facilitam a criação de novas rotas neurais."
      },
      spsp: {
        badge: "Cérebro Analítico",
        title: "Inteligência ao",
        title_italic: "terapeuta.",
        desc: "O SPSP gera relatórios detalhados para o profissional de saúde, permitindo ajustes preditivos na conduta terapêutica com base em dados reais coletados diretamente do ambiente domiciliar.",
        motto: "A serviço da evolução humana.",
        card_title: "Motor SPSP.",
        card_desc: "Enquanto a criança interage, o Sistema Preditivo de Suporte Psicomotor observa padrões individuais de evolução.",
        card_feat1: "Foco Individual",
        card_feat1_sub: "Comparação com o próprio histórico",
        card_feat2: "Insights Clínicos",
        card_feat2_sub: "Ajustes preditivos na conduta"
      },
      frentes: {
        badge: "Trilhas Clínicas",
        title: "Frentes de",
        title_italic: "cuidado.",
        fono_title: "Fonoaudiologia",
        fono_desc: "Incentivo à intenção comunicativa, articulação sonora e linguagem expressiva através de interações que reagem à voz.",
        to_title: "Terapia Ocupacional",
        to_desc: "Atividades focadas na autonomia funcional, atenção visual e planejamento motor fino.",
        reab_title: "Reabilitação Motora",
        reab_desc: "Foco no equilíbrio, consciência corporal global, tônus e ritmo."
      },
      colab: {
        badge: "Propósito em Rede",
        title: "Ecossistema de",
        title_italic: "colaboração.",
        desc: "O UrbeLudo está em fase final de desenvolvimento. Para que este ecossistema chegue às famílias e clínicas o quanto antes, buscamos profissionais dispostos a contribuir com sua expertise.",
        btn: "Seja um Colaborador",
        role1: "Desenvolvimento de Jogos",
        role1_desc: "Programadores e designers que transformam mecânicas terapêuticas em experiências imersivas.",
        role2: "Psicologia & Neurociência",
        role2_desc: "Especialistas que garantem o suporte emocional e a validação dos processos cognitivos.",
        role3: "Fonoaudiologia",
        role3_desc: "Profissionais focados na comunicação, voz e linguagem dentro do ambiente digital.",
        role4: "Psicomotricidade",
        role4_desc: "A base do nosso projeto, orientando cada movimento e interação para o ganho real.",
        badge_tag: "Colaborador Pro Bono"
      },
      support: {
        title: "Mova o",
        title_italic: "futuro.",
        desc: "Oferecemos versões gratuitas para ONGs e famílias de baixa renda através do nosso fundo de apoio. Sua contribuição mantém o UrbeLudo acessível.",
        pix_label: "Apoio via PIX",
        pix_btn: "Copiar Chave PIX"
      }
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
    },
    chat_flow: {
      step1: {
        q: "Para a gente começar, qual é a sua área de atuação hoje?",
        options: ["Saúde (Médico/Clínica)", "Direito (Advocacia)", "Alimentação / Restaurante", "Estética / Beleza", "Vendas / Loja", "Tecnologia / Software", "Imóveis / Arquitetura", "Servios (Geral)", "Outros"]
      },
      step2: {
        q: "Entendi. E como os novos clientes chegam até você hoje?",
        options: ["Pelo Instagram", "Pelo Google", "Só por Indicação", "Panfleto / Local", "Ainda não tenho clientes"]
      },
      step3: {
        q: "Você já tem um site ou uma página para apresentar seu trabalho?",
        options: ["Sim, já tenho", "Não tenho", "Tenho, mas não gosto dele", "Não preciso de um"]
      },
      step4: {
        q: "Qual é o seu maior 'gargalo' hoje? O que mais te impede de crescer?",
        options: []
      },
      step5: {
        q: "Se a gente pudesse resolver um problema nos próximos 90 dias, qual seria?",
        options: ["Vender mais", "Aparecer para mais gente", "Organizar o atendimento", "Ter uma marca mais profissional"]
      },
      step6: {
        q: "Certo. E qual é o nome da sua empresa ou da sua marca?",
        options: []
      },
      step7: {
        q: "Perfeito! Já tenho um rascunho do que podemos fazer. Clique no botão abaixo para falar com nosso estrategista no WhatsApp e receber sua proposta personalizada.",
        options: []
      },
      others_q: "Sem problemas! Qual seria a sua área específica?",
      others_label: "Outros"
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
    service_pages: {
      ads: {
        badge: "Domínio de Procura Local",
        title: "Domine as",
        title_italic: "Procuras de Urgência.",
        desc: "Tráfego digital cirúrgico focado em capturar a procura no momento exato da necessidade. Onde o clique se torna contrato.",
        cta: "SOLICITAR DIAGNÓSTICO",
        method: "Explorar Método",
        manifesto_title: "Tráfego de Intenção:",
        manifesto_italic: "Onde o ROI Acontece.",
        manifesto_quote: "Não geramos apenas 'leads'. Geramos oportunidades prontas para o fecho. Capturamos a dor ativa de quem precisa da sua solução agora.",
        manifesto_p: "Substitua a dependência incerta de recomendações por uma fonte constante e previsível de novos contratos. A nossa estratégia de Performance Ads é desenhada para negócios que não podem esperar pelo longo prazo do SEO orgânico.",
        stat1: "Precisão de Segmentação",
        stat2: "Monitorização Ativa",
        pillar_title: "Engenharia de",
        pillar_italic: "Conversão.",
        p1_title: "Arquitetura GMN",
        p1_desc: "Transformamos o seu Google O Meu Negócio numa máquina de chamadas e direções, focando em procuras locais de alta conversão.",
        p2_title: "Escala com Dados",
        p2_desc: "Focamos em ROAS real. Cada cêntimo investido é monitorizado para garantir o maior retorno possível.",
        p3_title: "Negativação Estratégica",
        p3_desc: "Eliminamos o desperdício de verba através de uma curadoria técnica de termos de pesquisa irrelevantes.",
        p4_title: "Otimização Contínua",
        p4_desc: "Ajustes diários de licitações e criativos baseados no comportamento real do seu cliente ideal.",
        cta_final_title: "Pronto para a",
        cta_final_italic: "Escala Previsível?",
        cta_final_p: "Agende agora o seu diagnóstico de performance e descubra o real potencial de procura do seu negócio.",
        cta_final_btn: "FALAR COM ESTRATEGISTA"
      },
      sites: {
        badge: "Alta Performance Web",
        title: "Sites que são",
        title_italic: "Máquinas de Venda.",
        desc: "Não basta ser bonito, precisa de ser rápido e estratégico. Criamos sites de alta fidelidade que posicionam a sua marca no topo e convertem visitantes em clientes reais.",
        cta: "SOLICITAR DIAGNÓSTICO WEB",
        method: "Nossa Engenharia",
        manifesto_title: "A Sua Vitrine Digital",
        manifesto_italic: "Profissional.",
        manifesto_quote: "No digital, o seu site é o seu cartão de visitas de 24 horas. Se ele não carregar em 2 segundos ou não passar confiança, já perdeu a venda.",
        manifesto_p: "Trabalhamos na intersecção entre design de luxo e engenharia de software. Cada pixel é planeado para guiar o utilizador até ao fecho, eliminando qualquer ponto de dúvida ou distração.",
        pillar_title: "Infraestrutura",
        pillar_italic: "de Alto Nível.",
        p1_title: "Velocidade Extrema",
        p1_desc: "Sites otimizados para carregar instantaneamente, garantindo a melhor experiência e melhor posicionamento no Google.",
        p2_title: "Telemóvel Primeiro",
        p2_desc: "Experiência impecável em smartphones, onde acontece a maioria das suas vendas.",
        p3_title: "Segurança Total",
        p3_desc: "Protocolos SSL e proteção contra ataques, garantindo que os seus dados e os dos seus clientes estejam sempre salvos.",
        p4_title: "Design Autoral",
        p4_desc: "Nada de templates prontos. Criamos o design do zero para refletir a exclusividade da sua marca.",
        cta_final_title: "Leve a sua Marca",
        cta_final_italic: "para a Web.",
        cta_final_p: "Pare de lutar por atenção com um site lento. Tenha uma presença digital que impõe autoridade.",
        cta_final_btn: "PROJETAR MEU SITE"
      },
      design: {
        badge: "Psicologia de Valor",
        title: "Design que",
        title_italic: "Comunica Prestígio.",
        desc: "Projetamos universos visuais que removem barreiras de confiança e posicionam a sua marca no topo da pirâmide de valor.",
        cta: "SOLICITAR DOSSIÊ VISUAL",
        method: "Nossa Semiótica",
        manifesto_title: "O Impacto da",
        manifesto_italic: "Perceção Profissional.",
        manifesto_quote: "Em mercados de alto padrão, a sua imagem é a sua primeira barreira de venda. Um design estratégico remove atritos de perceção e gera confiança imediata.",
        manifesto_p: "A sua marca não é apenas o que entrega, mas o que o cliente sente ao interagir com ela. Utilizamos a psicologia cromática e a semiótica avançada para encurtar o ciclo de decisão do seu cliente ideal.",
        pillar_title: "Sistemas Visuais",
        pillar_italic: "de Alto Nível.",
        p1_title: "Identidade de Prestígio",
        p1_desc: "Arquitetura visual desenhada para transmitir solidez, perícia e exclusividade absoluta antes mesmo da primeira reunião.",
        p2_title: "Branding Cognitivo",
        p2_desc: "Onde a estética encontra a ciência. Design focado em como o cérebro humano processa valor.",
        p3_title: "Barreira de Confiança",
        p3_desc: "Removemos o atrito informacional através de uma interface limpa e hierarquia visual cirúrgica.",
        p4_title: "Omnicanalidade",
        p4_desc: "Garantimos que a sua marca seja sentida da mesma forma em todas as interfaces, digitais ou físicas.",
        cta_final_title: "Projete o seu",
        cta_final_italic: "Próximo Nível.",
        cta_final_p: "Pare de lutar por preço. Comece a ser percebido pelo valor que realmente entrega.",
        cta_final_btn: "TRANSFORMAR MINHA MARCA"
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
        { q: "Quanto tempo demora para ver resultados?", a: "Os resultados variam conforme o serviço. Campanhas de anúncios podem gerar contactos em poucos dias, enquanto projetos de design e posicionamento de marca costumam amadurecer entre 3 a 6 meses de trabalho consistente." },
        { q: "Como a IA é integrada ao meu negócio?", a: "Utilizamos IA para criar ecossistemas de atendimento automatizado que qualificam leads 24/7." },
        { q: "O que é o projeto UrbeLudo?", a: "É a nossa iniciativa de impacto social e tecnológico. Uma plataforma de reabilitação neuro-motora." },
        { q: "Como posso apoiar ou investir no UrbeLudo?", a: "Existem caminhos como investidor estratégico, doações diretas ou como colaborador especialista." },
        { q: "A Sapient atende qualquer tipo de empresa?", a: "Focamos em negócios que procuram autoridade e diferenciação." }
      ]
    },
    urbeludo: {
      hero: {
        badge: "Biociência & Conexão",
        soon: "Brevemente",
        title: "UrbeLudo:",
        title_italic: "desenvolvimento neuropsicomotor.",
        desc: "Um ecossistema digital (iOS, Android e Web) desenhado para apoiar o desenvolvimento de crianças e jovens, respeitando a singularidade de cada cérebro. Unimos o rigor clínico ao envolvimento lúdico.",
        cta_project: "Conhecer Projeto",
        cta_science: "Nossa Ciência",
        cta_colab: "Colaborar",
        cta_support: "Apoiar Social",
        cta_faq: "FAQ"
      },
      essence: {
        badge: "Da Estratégia ao Cuidado",
        title: "Nossa",
        title_italic: "essência.",
        quote: "Eu sou o Lucas Souza. A minha base no design estratégico ensinou-me que soluções reais nascem da empatia. Ao entrar na Psicomotricidade, entendi que a reabilitação precisa de sair do consultório e ganhar a vida real. O UrbeLudo nasceu desta fusão: usar a tecnologia para criar uma ponte entre o terapeuta, a família e a criança.",
        founder: "Lucas Souza — Fundador & Designer Estratégico"
      },
      philosophy: {
        badge: "Pilar do Projeto",
        title: "Filosofia",
        title_italic: "urbeludo.",
        urbe_title: "URBE (Estrutura)",
        urbe_desc: "Entendemos o corpo como o nosso primeiro território, a nossa 'cidade interna'. Organizar a Urbe é ajudar a criança a mapear o seu esquema corporal e a sentir-se segura no seu espaço.",
        ludo_title: "LUDO (Fluidez)",
        ludo_desc: "O jogo é a linguagem universal da aprendizagem. Através do lúdico, acedemos a motivações profundas, facilitando a superação de barreiras motoras e cognitivas de forma natural."
      },
      science: {
        badge: "Rigor Clínico",
        title: "Rigor que nos",
        title_italic: "sustenta.",
        desc: "O nosso desenvolvimento é pautado por conceitos científicos que respeitam a neurodiversidade e garantem ganhos terapêuticos sólidos.",
        item1_title: "Integração Sensorial",
        item1_desc: "Estímulos desenhados para acolher hipersensibilidades e organizar o processamento sensorial.",
        item2_title: "Funções Executivas",
        item2_desc: "Atividades que treinam o foco, a memória de trabalho e o controlo inibitório.",
        item3_title: "Praxia e Coordenação",
        item3_desc: "Foco na organização do movimento complexo, auxiliando na autonomia de tarefas diárias.",
        item4_title: "Neuroplasticidade Motivada",
        item4_desc: "O prazer no jogo liberta neurotransmissores que facilitam a criação de novas rotas neurais."
      },
      spsp: {
        badge: "Cérebro Analítico",
        title: "Inteligência ao",
        title_italic: "terapeuta.",
        desc: "O SPSP gera relatórios detalhados para o profissional de saúde, permitindo ajustes preditivos na conduta terapêutica com base em dados reais recolhidos diretamente do ambiente domiciliar.",
        motto: "Ao serviço da evolução humana.",
        card_title: "Motor SPSP.",
        card_desc: "Enquanto a criança interage, o Sistema Preditivo de Suporte Psicomotor observa padrões individuais de evolução.",
        card_feat1: "Foco Individual",
        card_feat1_sub: "Comparação com o próprio histórico",
        card_feat2: "Insights Clínicos",
        card_feat2_sub: "Ajustes preditivos na conduta"
      },
      frentes: {
        badge: "Trilhas Clínicas",
        title: "Frentes de",
        title_italic: "cuidado.",
        fono_title: "Terapeuta da Fala",
        fono_desc: "Incentivo à intenção comunicativa, articulação sonora e linguagem expressiva através de interações que reagem à voz.",
        to_title: "Terapia Ocupacional",
        to_desc: "Atividades focadas na autonomia funcional, atenção visual e planeamento motor fino.",
        reab_title: "Reabilitação Motora",
        reab_desc: "Foco no equilíbrio, consciência corporal global, tónus e ritmo."
      },
      colab: {
        badge: "Propósito em Rede",
        title: "Ecossistema de",
        title_italic: "colaboração.",
        desc: "O UrbeLudo está em fase final de desenvolvimento. Para que este ecossistema chegue às famílias e clínicas o quanto antes, procuramos profissionais dispostos a contribuir com a sua especialidade.",
        btn: "Seja um Colaborador",
        role1: "Desenvolvimento de Jogos",
        role1_desc: "Programadores e designers que transformam mecânicas terapêuticas em experiências imersivas.",
        role2: "Psicologia & Neurociência",
        role2_desc: "Especialistas que garantem o suporte emocional e a validação dos processos cognitivos.",
        role3: "Terapeuta da Fala",
        role3_desc: "Profissionais focados na comunicação, voz e linguagem dentro do ambiente digital.",
        role4: "Psicomotricidade",
        role4_desc: "A base do nosso projeto, orientando cada movimento e interação para o ganho real.",
        badge_tag: "Colaborador Pro Bono"
      },
      support: {
        title: "Mova o",
        title_italic: "futuro.",
        desc: "Oferecemos versões gratuitas para ONGs e famílias de baixo rendimento através do nosso fundo de apoio. A sua contribuição mantém o UrbeLudo acessível.",
        pix_label: "Apoio via Transferência",
        pix_btn: "Copiar Chave de Apoio"
      }
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
      terms_section1_content: "É concedida permissão para descarregar temporariamente uma cópia dos materiais no site da studiosapient apenas para visualização transitória pessoal e não comercial.",
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
    },
    chat_flow: {
      step1: {
        q: "Para começarmos, qual é a sua área de atuação hoje?",
        options: ["Saúde (Médico/Clínica)", "Direito (Advocacia)", "Alimentação / Restaurante", "Estética / Beleza", "Vendas / Loja", "Tecnologia / Software", "Imóveis / Arquitetura", "Serviços (Geral)", "Outros"]
      },
      step2: {
        q: "Entendi. E como é que os novos clientes chegam até si hoje?",
        options: ["Pelo Instagram", "Pelo Google", "Apenas por Indicação", "Panfleto / Local", "Ainda não tenho clientes"]
      },
      step3: {
        q: "Já tem um site ou uma página para apresentar o seu trabalho?",
        options: ["Sim, já tenho", "Não tenho", "Tenho, mas não gosto dele", "Não preciso de um"]
      },
      step4: {
        q: "Qual é o seu maior 'gargalo' hoje? O que mais o impede de crescer?",
        options: []
      },
      step5: {
        q: "Se pudéssemos resolver um problema nos próximos 90 dias, qual seria?",
        options: ["Vender mais", "Aparecer para mais gente", "Organizar o atendimento", "Ter uma marca mais profissional"]
      },
      step6: {
        q: "Certo. E qual é o nome da sua empresa ou da sua marca?",
        options: []
      },
      step7: {
        q: "Perfeito! Já tenho um rascunho do que podemos fazer. Clique no botão abaixo para falar com o nosso estrategista no WhatsApp e receber a sua proposta personalizada.",
        options: []
      },
      others_q: "Sem problemas! Qual seria a sua área específica?",
      others_label: "Outros"
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
    service_pages: {
      ads: {
        badge: "Local Search Domain",
        title: "Dominate",
        title_italic: "Urgency Searches.",
        desc: "Surgical digital traffic focused on capturing demand at the exact moment of need. Where the click becomes a contract.",
        cta: "REQUEST DIAGNOSTIC",
        method: "Explore Method",
        manifesto_title: "Intent Traffic:",
        manifesto_italic: "Where ROI Happens.",
        manifesto_quote: "We don't just generate 'leads'. We generate opportunities ready for closing. We capture the active pain of those who need your solution now.",
        manifesto_p: "Replace the uncertain dependence on referrals with a constant and predictable source of new contracts. Our Performance Ads strategy is designed for businesses that cannot wait for the long term of organic SEO.",
        stat1: "Targeting Precision",
        stat2: "Active Monitoring",
        pillar_title: "Conversion",
        pillar_italic: "Engineering.",
        p1_title: "GMN Architecture",
        p1_desc: "We transform your Google My Business into a call and directions machine, focusing on high-conversion local searches.",
        p2_title: "Scale with Data",
        p2_desc: "We focus on real ROAS. Every cent invested is tracked to ensure the highest possible return.",
        p3_title: "Strategic Negation",
        p3_desc: "We eliminate budget waste through a technical curation of irrelevant search terms.",
        p4_title: "Continuous Optimization",
        p4_desc: "Daily bid and creative adjustments based on the real behavior of your ideal customer.",
        cta_final_title: "Ready for",
        cta_final_italic: "Predictable Scale?",
        cta_final_p: "Schedule your performance diagnostic now and discover the real search potential of your business.",
        cta_final_btn: "TALK TO STRATEGIST"
      },
      sites: {
        badge: "High Performance Web",
        title: "Sites that are",
        title_italic: "Sales Machines.",
        desc: "It's not enough to be beautiful, it needs to be fast and strategic. We create high-fidelity sites that position your brand at the top and convert visitors into real customers.",
        cta: "REQUEST WEB DIAGNOSTIC",
        method: "Our Engineering",
        manifesto_title: "Your Professional",
        manifesto_italic: "Digital Showcase.",
        manifesto_quote: "In digital, your website is your 24-hour business card. If it doesn't load in 2 seconds or doesn't pass trust, you've already lost the sale.",
        manifesto_p: "We work at the intersection of luxury design and software engineering. Every pixel is planned to guide the user to the closing, eliminating any point of doubt or distraction.",
        pillar_title: "High-Level",
        pillar_italic: "Infrastructure.",
        p1_title: "Extreme Speed",
        p1_desc: "Sites optimized to load instantly, ensuring the best experience and best ranking on Google.",
        p2_title: "Mobile First",
        p2_desc: "Impeccable experience on smartphones, where most of your sales happen.",
        p3_title: "Total Security",
        p3_desc: "SSL protocols and protection against attacks, ensuring that your data and your customers' data are always safe.",
        p4_title: "Custom Design",
        p4_desc: "No ready-made templates. We create the design from scratch to reflect your brand's exclusivity.",
        cta_final_title: "Take your Brand",
        cta_final_italic: "to the Web.",
        cta_final_p: "Stop fighting for attention with a slow site. Have a digital presence that imposes authority.",
        cta_final_btn: "DESIGN MY SITE"
      },
      design: {
        badge: "Value Psychology",
        title: "Design that",
        title_italic: "Communicates Prestige.",
        desc: "We project visual universes that remove trust barriers and position your brand at the top of the value pyramid.",
        cta: "REQUEST VISUAL DOSSIER",
        method: "Our Semiotics",
        manifesto_title: "The Impact of",
        manifesto_italic: "Professional Perception.",
        manifesto_quote: "In high-end markets, your image is your first sales barrier. A strategic design removes perception friction and generates immediate trust.",
        manifesto_p: "Your brand is not just what you deliver, but what the customer feels when interacting with it. We use color psychology and advanced semiotics to shorten your ideal customer's decision cycle.",
        pillar_title: "High-Level",
        pillar_italic: "Visual Systems.",
        p1_title: "Prestige Identity",
        p1_desc: "Visual architecture designed to convey solidity, expertise, and absolute exclusivity even before the first meeting.",
        p2_title: "Cognitive Branding",
        p2_desc: "Where aesthetics meets science. Design focused on how the human brain processes value.",
        p3_title: "Trust Barrier",
        p3_desc: "We remove informational friction through a clean interface and surgical visual hierarchy.",
        p4_title: "Omnichannel",
        p4_desc: "We ensure your brand is felt the same way across all interfaces, digital or physical.",
        cta_final_title: "Design your",
        cta_final_italic: "Next Level.",
        cta_final_p: "Stop fighting for price. Start being perceived by the value you actually deliver.",
        cta_final_btn: "TRANSFORM MY BRAND"
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
    urbeludo: {
      hero: {
        badge: "Bioscience & Connection",
        soon: "Coming Soon",
        title: "UrbeLudo:",
        title_italic: "neuropsychomotor development.",
        desc: "A digital ecosystem (iOS, Android, and Web) designed to support the development of children and youth, respecting the uniqueness of every brain. We combine clinical rigor with playful engagement.",
        cta_project: "Explore Project",
        cta_science: "Our Science",
        cta_colab: "Collaborate",
        cta_support: "Social Support",
        cta_faq: "FAQ"
      },
      essence: {
        badge: "From Strategy to Care",
        title: "Our",
        title_italic: "essence.",
        quote: "I'm Lucas Souza. My foundation in strategic design taught me that real solutions are born from empathy. Upon entering Psychomotricity, I understood that rehabilitation needs to leave the office and enter real life. UrbeLudo was born from this fusion: using technology to create a bridge between the therapist, the family, and the child.",
        founder: "Lucas Souza — Founder & Strategic Designer"
      },
      philosophy: {
        badge: "Project Pillar",
        title: "Philosophy",
        title_italic: "urbeludo.",
        urbe_title: "URBE (Structure)",
        urbe_desc: "We understand the body as our first territory, our 'inner city'. Organizing the Urbe is helping the child map their body schema and feel safe in their space.",
        ludo_title: "LUDO (Fluidity)",
        ludo_desc: "Play is the universal language of learning. Through play, we access deep motivations, facilitating the overcoming of motor and cognitive barriers naturally."
      },
      science: {
        badge: "Clinical Rigor",
        title: "Rigor that",
        title_italic: "sustains us.",
        desc: "Our development is guided by scientific concepts that respect neurodiversity and ensure solid therapeutic gains.",
        item1_title: "Sensory Integration",
        item1_desc: "Stimuli designed to welcome hypersensitivities and organize sensory processing.",
        item2_title: "Executive Functions",
        item2_desc: "Activities that train focus, working memory, and inhibitory control.",
        item3_title: "Praxis and Coordination",
        item3_desc: "Focus on the organization of complex movement, aiding autonomy in daily tasks.",
        item4_title: "Motivated Neuroplasticity",
        item4_desc: "Pleasure in the game releases neurotransmitters that facilitate the creation of new neural pathways."
      },
      spsp: {
        badge: "Analytical Brain",
        title: "Intelligence for the",
        title_italic: "therapist.",
        desc: "SPSP generates detailed reports for the health professional, allowing predictive adjustments in therapeutic conduct based on real data collected directly from the home environment.",
        motto: "At the service of human evolution.",
        card_title: "SPSP Engine.",
        card_desc: "While the child interacts, the Predictive Psychomotor Support System observes individual evolution patterns.",
        card_feat1: "Individual Focus",
        card_feat1_sub: "Comparison with own history",
        card_feat2: "Clinical Insights",
        card_feat2_sub: "Predictive adjustments in conduct"
      },
      frentes: {
        badge: "Clinical Tracks",
        title: "Fronts of",
        title_italic: "care.",
        fono_title: "Speech Therapy",
        fono_desc: "Incentive for communicative intention, sound articulation, and expressive language through interactions that react to voice.",
        to_title: "Occupational Therapy",
        to_desc: "Activities focused on functional autonomy, visual attention, and fine motor planning.",
        reab_title: "Motor Rehabilitation",
        reab_desc: "Focus on balance, global body awareness, muscle tone, and rhythm."
      },
      colab: {
        badge: "Network Purpose",
        title: "Ecosystem of",
        title_italic: "collaboration.",
        desc: "UrbeLudo is in the final phase of development. To ensure this ecosystem reaches families and clinics as soon as possible, we seek professionals willing to contribute their expertise.",
        btn: "Be a Collaborator",
        role1: "Game Development",
        role1_desc: "Programmers and designers who transform therapeutic mechanics into immersive experiences.",
        role2: "Psychology & Neuroscience",
        role2_desc: "Specialists who ensure emotional support and validation of cognitive processes.",
        role3: "Speech Therapy",
        role3_desc: "Professionals focused on communication, voice, and language within the digital environment.",
        role4: "Psychomotricity",
        role4_desc: "The foundation of our project, guiding every movement and interaction for real gain.",
        badge_tag: "Pro Bono Collaborator"
      },
      support: {
        title: "Move the",
        title_italic: "future.",
        desc: "We offer free versions for NGOs and low-income families through our support fund. Your contribution keeps UrbeLudo accessible.",
        pix_label: "Support via Transfer",
        pix_btn: "Copy Support Key"
      }
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
    },
    chat_flow: {
      step1: {
        q: "To get started, what is your area of expertise today?",
        options: ["Health (Medical/Clinic)", "Law (Legal)", "Food / Restaurant", "Aesthetics / Beauty", "Sales / Retail", "Technology / Software", "Real Estate / Architecture", "Services (General)", "Others"]
      },
      step2: {
        q: "Understood. And how do new customers reach you today?",
        options: ["From Instagram", "From Google", "Referral only", "Local / Flyers", "I don't have customers yet"]
      },
      step3: {
        q: "Do you already have a website or page to showcase your work?",
        options: ["Yes, I have one", "No, I don't", "I have one, but I don't like it", "I don't need one"]
      },
      step4: {
        q: "What is your biggest 'bottleneck' today? What stops you from growing?",
        options: []
      },
      step5: {
        q: "If we could solve one problem in the next 90 days, what would it be?",
        options: ["Sell more", "Reach more people", "Organize customer service", "Have a more professional brand"]
      },
      step6: {
        q: "Great. And what is the name of your company or brand?",
        options: []
      },
      step7: {
        q: "Perfect! I already have a draft of what we can do. Click the button below to talk to our strategist on WhatsApp and receive your custom proposal.",
        options: []
      },
      others_q: "No problem! What would be your specific area?",
      others_label: "Others"
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
          desc: "Desarrollamos sitios modernos y rápidos que funcionan como su escaparate de lujo en internet, listos para converter.",
          f1: "Rápido y Seguro", f2: "Diseño de Autor", f3: "Primero Móvil"
        },
        brand: {
          title: "Design de Marca",
          desc: "Cree una imagen profesional que transmita confianza y demuestre que es la mejor opción en su mercado.",
          f1: "Logotipos Premium", f2: "Visual de Impacto", f3: "Credibilidad"
        }
      }
    },
    service_pages: {
      ads: {
        badge: "Dominio de Búsqueda Local",
        title: "Domine las",
        title_italic: "Búsquedas de Urgencia.",
        desc: "Tráfico digital quirúrgico enfocado en capturar la demanda en el momento exacto de la necesidad. Donde el clic se convierte en contrato.",
        cta: "SOLICITAR DIAGNÓSTICO",
        method: "Explorar Método",
        manifesto_title: "Tráfico de Intención:",
        manifesto_italic: "Donde el ROI Ocurre.",
        manifesto_quote: "No generamos solo 'leads'. Generamos oportunidades listas para el cierre. Capturamos el dolor activo de quien necesita su solución ahora.",
        manifesto_p: "Sustituya la dependencia incierta de recomendaciones por una fuente constante y previsible de nuevos contratos. Nuestra estrategia de Performance Ads está diseñada para negocios que no pueden esperar el largo plazo del SEO orgánico.",
        stat1: "Precisión de Segmentación",
        stat2: "Monitoreo Activo",
        pillar_title: "Ingeniería de",
        pillar_italic: "Conversión.",
        p1_title: "Arquitectura GMN",
        p1_desc: "Transformamos su Google Mi Negocio en una máquina de llamadas y direcciones, enfocándonos en búsquedas locales de alta conversión.",
        p2_title: "Escala con Datos",
        p2_desc: "Nos enfocamos en ROAS real. Cada centavo invertido es rastreado para garantizar el mayor retorno posible.",
        p3_title: "Negatividad Estratégica",
        p3_desc: "Eliminamos el desperdicio de presupuesto a través de una curaduría técnica de términos de búsqueda irrelevantes.",
        p4_title: "Optimización Continua",
        p4_desc: "Ajustes diarios de ofertas y creativos basados en el comportamiento real de su cliente ideal.",
        cta_final_title: "¿Listo para la",
        cta_final_italic: "Escala Previsible?",
        cta_final_p: "Agende ahora su diagnóstico de performance y descubra el potencial real de búsqueda de su negocio.",
        cta_final_btn: "HABLAR CON ESTRATEGA"
      },
      sites: {
        badge: "Alta Performance Web",
        title: "Sitios que son",
        title_italic: "Máquinas de Venta.",
        desc: "No basta con ser bonito, debe ser rápido y estratégico. Creamos sitios de alta fidelidad que posicionan su marca en la cima y convierten visitantes en clientes reales.",
        cta: "SOLICITAR DIAGNÓSTICO WEB",
        method: "Nuestra Ingeniería",
        manifesto_title: "Su Vitrina Digital",
        manifesto_italic: "Profesional.",
        manifesto_quote: "En lo digital, su sitio web es su tarjeta de presentación de 24 horas. Si no carga en 2 segundos o no transmite confianza, ya perdió la venta.",
        manifesto_p: "Trabajamos en la intersección entre el diseño de lujo y la ingeniería de software. Cada píxel está planeado para guiar al usuario hasta el cierre, eliminando cualquier punto de duda o distracción.",
        pillar_title: "Infraestructura",
        pillar_italic: "de Alto Nivel.",
        p1_title: "Velocidad Extrema",
        p1_desc: "Sitios optimizados para cargar instantáneamente, garantizando la mejor experiencia y el mejor ranking en Google.",
        p2_title: "Móvil Primero",
        p2_desc: "Experiencia impecable en smartphones, donde ocurre la mayoría de sus ventas.",
        p3_title: "Seguridad Total",
        p3_desc: "Protocolos SSL y protección contra ataques, garantizando que sus datos y los de sus clientes estén siempre a salvo.",
        p4_title: "Diseño de Autor",
        p4_desc: "Nada de plantillas prefabricadas. Creamos el diseño desde cero para reflejar la exclusividad de su marca.",
        cta_final_title: "Lleve su Marca",
        cta_final_italic: "a la Web.",
        cta_final_p: "Deje de luchar por la atención con un sitio lento. Tenga una presencia digital que imponga autoridad.",
        cta_final_btn: "DISEÑAR MI SITIO"
      },
      design: {
        badge: "Psicología de Valor",
        title: "Diseño que",
        title_italic: "Comunica Prestigio.",
        desc: "Proyectamos universos visuales que eliminan las barreras de confianza y posicionan su marca en la cima de la pirámide de valor.",
        cta: "SOLICITAR DOSSIER VISUAL",
        method: "Nuestra Semiótica",
        manifesto_title: "El Impacto de la",
        manifesto_italic: "Percepción Profesional.",
        manifesto_quote: "En mercados de alto nivel, su imagen es su primera barrera de ventas. Un diseño estratégico elimina la fricción de percepción y genera confianza inmediata.",
        manifesto_p: "Su marca no es solo lo que entrega, sino lo que el cliente siente al interactuar con ella. Utilizamos la psicología del color y la semiótica avanzada para acortar el ciclo de decisión de su cliente ideal.",
        pillar_title: "Sistemas Visuales",
        pillar_italic: "de Alto Nivel.",
        p1_title: "Identidad de Prestigio",
        p1_desc: "Arquitectura visual diseñada para transmitir solidez, experiencia y exclusividad absoluta incluso antes de la primera reunión.",
        p2_title: "Branding Cognitivo",
        p2_desc: "Donde la estética se encuentra con la ciencia. Diseño enfocado en cómo el cerebro humano procesa el valor.",
        p3_title: "Barrera de Confianza",
        p3_desc: "Eliminamos la fricción informativa a través de una interfaz limpia y una jerarquía visual quirúrgica.",
        p4_title: "Omnicanalidad",
        p4_desc: "Garantizamos que su marca se sienta igual en todas las interfaces, ya sean digitales o físicas.",
        cta_final_title: "Proyecte su",
        cta_final_italic: "Próximo Nivel.",
        cta_final_p: "Deje de luchar por el precio. Comience a ser percibido por el valor que realmente entrega.",
        cta_final_btn: "TRANSFORMAR MI MARCA"
      }
    },
    process: {
      badge: "Camino del ROI",
      title: "Nuestra",
      title_italic: "Metodología.",
      steps: [
        { title: "Entendimiento", desc: "Hablamos para entender sus objetivos, desafíos y el público que deseja alcanzar." },
        { title: "Planeamiento", desc: "Creamos uma hoja de ruta estratégica enfocada en las soluciones que tengan más sentido para su negocio." },
        { title: "Ejecución", desc: "Desenvolvemos el proyecto con atención a los detalles, garantizando calidad técnica y visual." },
        { title: "Seguimiento", desc: "Analizamos los resultados obtenidos y sugerimos mejoras continuas para su crecimiento constante." }
      ]
    },
    faq: {
      badge: "Soporte Técnico",
      title: "Dudas",
      title_italic: "Frequentes.",
      items: [
        { q: "¿Cuánto tiempo toma ver resultados?", a: "Los resultados varían según el servicio. Las campañas de anuncios podem generar contactos en pocos días, mientras que el branding tarda de 3 a 6 meses." },
        { q: "¿Cómo se integra la IA en mi negocio?", a: "Usamos IA para crear ecosistemas de atención automatizada que califican leads 24/7." },
        { q: "¿Qué é el proyecto UrbeLudo?", a: "Es nuestra iniciativa de impacto social y tecnológico. Una plataforma de rehabilitación neuro-motora." },
        { q: "¿Cómo posso apoiar o invertir en UrbeLudo?", a: "Existen caminos como inversor estratégico, donaciones o como colaborador especialista." },
        { q: "¿Sapient atiende a cualquier empresa?", a: "Nos enfocamos en negocios que buscan autoridad y diferenciación." }
      ]
    },
    urbeludo: {
      hero: {
        badge: "Biociencia & Conexión",
        soon: "Próximamente",
        title: "UrbeLudo:",
        title_italic: "desarrollo neuropsicomotor.",
        desc: "Un ecosistema digital (iOS, Android y Web) diseñado para apoyar el desarrollo de niños y jóvenes, respetando la singularidad de cada cerebro. Unimos el rigor clínico al compromiso lúdico.",
        cta_project: "Conocer Proyecto",
        cta_science: "Nuestra Ciencia",
        cta_colab: "Colaborar",
        cta_support: "Apoyo Social",
        cta_faq: "FAQ"
      },
      essence: {
        badge: "De la Estrategia al Cuidado",
        title: "Nuestra",
        title_italic: "esencia.",
        quote: "Soy Lucas Souza. Mi base en el diseño estratégico me enseñó que las soluciones reales nacen de la empatía. Al entrar en la Psicomotricidade, entendí que la rehabilitación debe salir del consultorio y ganar la vida real. UrbeLudo nació de esta fusión: usar la tecnología para crear un puente entre el terapeuta, la familia y el niño.",
        founder: "Lucas Souza — Fundador & Diseñador Estratégico"
      },
      philosophy: {
        badge: "Pilar del Proyecto",
        title: "Filosofía",
        title_italic: "urbeludo.",
        urbe_title: "URBE (Estructura)",
        urbe_desc: "Entendemos el cuerpo como nuestro primer territorio, nuestra 'ciudad interna'. Organizar la Urbe es ayudar al niño a mapear su esquema corporal y sentirse seguro en su espacio.",
        ludo_title: "LUDO (Fluidez)",
        ludo_desc: "El juego es el lenguaje universal del aprendizaje. A través de lo lúdico, accedemos a motivaciones profundas, facilitando la superación de barreras motoras y cognitivas de forma natural."
      },
      science: {
        badge: "Rigor Clínico",
        title: "Rigor que nos",
        title_italic: "sustenta.",
        desc: "Nuestro desarrollo se basa en conceptos científicos que respetan la neurodiversidad y garantizan ganancias terapéuticas sólidas.",
        item1_title: "Integración Sensorial",
        item1_desc: "Estímulos diseñados para acoger hipersensibilidades y organizar el procesamiento sensorial.",
        item2_title: "Funciones Ejecutivas",
        item2_desc: "Actividades que entrenan el enfoque, la memoria de trabajo y el control inhibitorio.",
        item3_title: "Praxia y Coordinación",
        item3_desc: "Enfoque en la organización del movimiento complejo, ayudando en la autonomía de tareas diarias.",
        item4_title: "Neuroplasticidade Motivada",
        item4_desc: "El placer en el juego libera neurotransmisores que facilitan la creación de nuevas rutas neurales."
      },
      spsp: {
        badge: "Cerebro Analítico",
        title: "Inteligencia para el",
        title_italic: "terapeuta.",
        desc: "El SPSP genera informes detallados para el profesional de salud, permitiendo ajustes predictivos en la conducta terapéutica basados en datos reales recolectados directamente del hogar.",
        motto: "Al servicio de la evolución humana.",
        card_title: "Motor SPSP.",
        card_desc: "Mientras el niño interactúa, el Sistema Predictivo de Soporte Psicomotor observa patrones individuales de evolución.",
        card_feat1: "Enfoque Individual",
        card_feat1_sub: "Comparación con el historial propio",
        card_feat2: "Insights Clínicos",
        card_feat2_sub: "Ajustes predictivos en la conducta"
      },
      frentes: {
        badge: "Rutas Clínicas",
        title: "Frentes de",
        title_italic: "cuidado.",
        fono_title: "Fonoaudiología",
        fono_desc: "Incentivo a la intención comunicativa, articulación sonora y lenguaje expresivo mediante interacciones que reaccionan a la voz.",
        to_title: "Terapia Ocupacional",
        to_desc: "Actividades enfocadas en la autonomía funcional, atención visual y planificación motriz fina.",
        reab_title: "Rehabilitación Motora",
        reab_desc: "Enfoque en el equilibrio, conciencia corporal global, tono y ritmo."
      },
      colab: {
        badge: "Propósito en Red",
        title: "Ecosistema de",
        title_italic: "colaboración.",
        desc: "UrbeLudo está en fase final de desarrollo. Para que este ecosistema llegue a las familias y clínicas lo antes posible, buscamos profesionales dispuestos a contribuir con su experiencia.",
        btn: "Sea un Colaborador",
        role1: "Desarrollo de Juegos",
        role1_desc: "Programadores y diseñadores que transforman mecánicas terapéuticas en experiencias inmersivas.",
        role2: "Psicología & Neurociencia",
        role2_desc: "Especialistas que garantizan el soporte emocional y la validación de los procesos cognitivos.",
        role3: "Fonoaudiología",
        role3_desc: "Profesionales enfocados en la comunicación, voz y lenguaje dentro del entorno digital.",
        role4: "Psicomotricidade",
        role4_desc: "La base de nuestro proyecto, orientando cada movimiento e interacción para el progreso real.",
        badge_tag: "Colaborador Pro Bono"
      },
      support: {
        title: "Mueve el",
        title_italic: "futuro.",
        desc: "Oferecemos versiones gratuitas para ONGs y familias de bajos ingresos a través de nuestro fondo de apoyo. Tu contribución mantiene UrbeLudo accesible.",
        pix_label: "Apoyo vía Transferencia",
        pix_btn: "Copiar Clave de Apoyo"
      }
    },
    contact: {
      badge: "Canales de Consultoria",
      title: "Vamos a",
      title_italic: "Conversar.",
      whatsapp: { title: "WhatsApp", desc: "Diálogo imediato e consultoria técnica.", action: "Iniciar" },
      email: { title: "Correo", desc: "Solicitudes y documentación de proyectos.", action: "Enviar", copy: "Copiar Dirección" },
      phone: { title: "Teléfono", desc: "Conexión direta para estrategia e escala.", action: "Llamar" }
    },
    footer: {
      mission: "Transformamos negocios en referencias a través de ecosistemas digitales de alta claridad y autoridad visual.",
      solutions: "Soluciones",
      navigation: "Navegação",
      contacts: "Contactos Oficiais",
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
      privacy_section3_content: "Implementamos blindagem digital e protocolos de cifrado para garantizar que su información patentada y datos de prospección estén seguros.",
      terms_title: "Términos de Uso",
      terms_intro: "Al acceder al sitio web de studiosapient, usted acepta cumplir con estos términos de servicio, todas las leyes y regulaciones aplicables.",
      terms_section1_title: "1. Licencia de Uso",
      terms_section1_content: "Se otorga permiso para descargar temporalmente una copia de los materiales en el sitio web de studiosapient solo para visualización trasitoria personal y no comercial.",
      terms_section2_title: "2. Propiedad Intelectual",
      terms_section2_content: "Todo el diseño, código y diagnósticos estratégicos presentados son propiedad intelectual de studiosapient y no pueden ser replicados sin autorización previa."
    },
    cookie: {
      title: "Privacidad y Cookies",
      description: "Utilizamos cookies para mejorar su experiencia y analizar nuestro tráfico.",
      accept: "Aceptar Todo",
      decline: "Rechazar",
      policy: "Política de Privacidade"
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
      lock_placeholder: "Elija una opção arriba...",
      analyze: "Analizando...",
      cta: "HABLAR CON ESTRATEGA",
      confirm: "Confirmar Opciones"
    },
    chat_flow: {
      step1: {
        q: "Para empezar, ¿cuál es su área de especialización hoy?",
        options: ["Salud (Médico/Clínica)", "Derecho (Abogacía)", "Alimentación / Restaurante", "Estética / Belleza", "Ventas / Tienda", "Tecnología / Software", "Inmuebles / Arquitectura", "Servicios (General)", "Otros"]
      },
      step2: {
        q: "Entiendo. ¿Y cómo le llegan los nuevos clientes hoy?",
        options: ["Por Instagram", "Por Google", "Solo por indicación", "Folleto / Local", "Aún no tengo clientes"]
      },
      step3: {
        q: "¿Ya tiene un sitio web o una página para presentar su trabajo?",
        options: ["Sí, ya tengo", "No tengo", "Tengo, pero no me gusta", "No necesito uno"]
      },
      step4: {
        q: "¿Cuál es su mayor 'cuello de botella' hoy? ¿Qué es lo que más le impide crecer?",
        options: []
      },
      step5: {
        q: "Si pudiéramos resolver un problema en los próximos 90 dias, ¿cuál sería?",
        options: ["Vender más", "Aparecer para más gente", "Organizar la atención", "Tener una marca más profesional"]
      },
      step6: {
        q: "Perfecto. ¿Y cuál es el nombre de su empresa o marca?",
        options: []
      },
      step7: {
        q: "¡Excelente! Ya tengo un borrador de lo que podemos hacer. Haga clic en el botón de abajo para hablar con nuestro estratega en WhatsApp y recibir su propuesta personalizada.",
        options: []
      },
      others_q: "¡No hay problema! ¿Cuál sería su área específica?",
      others_label: "Otros"
    }
  }
};