const menuToggle = document.getElementById('mobile-menu');
const navMenu = document.querySelector('nav');

menuToggle.addEventListener('click', () => {
    // Agora ambos recebem a classe 'active' ao mesmo tempo
    navMenu.classList.toggle('active');
    menuToggle.classList.toggle('active'); 
});

// Fecha o menu e volta o X para hambúrguer ao clicar em qualquer link
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', () => {
        document.querySelectorAll('nav a').forEach(item => {
            item.classList.remove('active');
        });
        link.classList.add('active');
        navMenu.classList.remove('active');
        menuToggle.classList.remove('active');
    });
});

// Mantem o ativo correto ao recarregar com hash
window.addEventListener('load', () => {
    const current = document.querySelector(`nav a[href="${window.location.hash || '#'}"]`);
    if (current) {
        document.querySelectorAll('nav a').forEach(item => {
            item.classList.remove('active');
        });
        current.classList.add('active');
    }
});

// Atualiza o item ativo conforme o scroll
const navLinks = Array.from(document.querySelectorAll('nav a'));
const trackedSections = Array.from(
    document.querySelectorAll('main section, section#contato, footer#footer')
);
const headerEl = document.querySelector('header');

const setActiveLink = (hash) => {
    const current = navLinks.find(link => link.getAttribute('href') === hash);
    if (!current) return;
    navLinks.forEach(item => item.classList.remove('active'));
    current.classList.add('active');
};

const updateActiveOnScroll = () => {
    const headerOffset = headerEl ? headerEl.offsetHeight + 8 : 0;
    let currentHash = '#';

    trackedSections.forEach((section) => {
        const top = section.getBoundingClientRect().top - headerOffset;
        if (top <= 0) {
            currentHash = section.id ? `#${section.id}` : '#';
        }
    });

    setActiveLink(currentHash);
};

window.addEventListener('scroll', updateActiveOnScroll);
window.addEventListener('resize', updateActiveOnScroll);
updateActiveOnScroll();

// Acordeao dos projetos no mobile
const projectRows = Array.from(document.querySelectorAll('.project-row'));
const projectAccordionQuery = window.matchMedia('(max-width: 900px)');

const setProjectState = (row, expanded) => {
    row.classList.toggle('is-collapsed', !expanded);
    const toggle = row.querySelector('.project-toggle');
    const label = row.querySelector('.project-toggle-text');
    if (toggle) {
        toggle.setAttribute('aria-expanded', expanded ? 'true' : 'false');
    }
    if (label) {
        label.textContent = expanded ? 'Fechar detalhes' : 'Ver detalhes';
    }
};

const syncProjectAccordion = () => {
    const isMobile = projectAccordionQuery.matches;
    projectRows.forEach((row) => {
        const toggle = row.querySelector('.project-toggle');
        if (!toggle) return;
        if (isMobile) {
            if (!row.classList.contains('is-collapsed') && !row.classList.contains('is-expanded')) {
                row.classList.add('is-collapsed');
            }
            setProjectState(row, !row.classList.contains('is-collapsed'));
            toggle.disabled = false;
        } else {
            row.classList.remove('is-collapsed');
            row.classList.remove('is-expanded');
            setProjectState(row, true);
            toggle.disabled = true;
        }
    });
};

projectRows.forEach((row) => {
    const toggle = row.querySelector('.project-toggle');
    if (!toggle) return;
    toggle.addEventListener('click', () => {
        if (!projectAccordionQuery.matches) return;
        const isCollapsed = row.classList.contains('is-collapsed');
        row.classList.toggle('is-collapsed');
        row.classList.toggle('is-expanded', isCollapsed);
        setProjectState(row, isCollapsed);
    });
});

syncProjectAccordion();
projectAccordionQuery.addEventListener('change', syncProjectAccordion);

// Animacoes de entrada (uma vez por elemento)
document.body.classList.add('js-enabled');

const revealGroups = [
    { selector: '.home-img, .home-content, .social-icons, .home .btn', baseDelay: 80, step: 80 },
    { selector: '.titulo-section, .sobre-txt, .sobre-info-extra', baseDelay: 0, step: 90 },
    { selector: '.sobre-conteudo', baseDelay: 0, step: 0, className: 'reveal-left' },
    { selector: '.terminal-widget', baseDelay: 120, step: 0, className: 'reveal-right reveal-pop' },
    { selector: '.sobre-estudos', baseDelay: 160, step: 0, className: 'reveal-pop' },
    { selector: '.project-row:not(.project-row--reverse) .project-media', baseDelay: 0, step: 120, className: 'reveal-left' },
    { selector: '.project-row:not(.project-row--reverse) .project-content', baseDelay: 80, step: 120, className: 'reveal-right' },
    { selector: '.project-row--reverse .project-media', baseDelay: 0, step: 120, className: 'reveal-right' },
    { selector: '.project-row--reverse .project-content', baseDelay: 80, step: 120, className: 'reveal-left' },
    { selector: '.contato-card', baseDelay: 0, step: 0, className: 'reveal-pop' },
    { selector: '.contato .titulo-section, .contato-text', baseDelay: 60, step: 90 },
    { selector: '.contact-links a', baseDelay: 140, step: 90, className: 'reveal-pop' },
    { selector: '.contato-extra', baseDelay: 120, step: 0, className: 'reveal-pop' },
    { selector: '.contato-extra-item', baseDelay: 160, step: 90, className: 'reveal-pop' },
    { selector: '.footer-brand, .footer-links, .footer-social', baseDelay: 0, step: 120, className: 'reveal-pop' },
    { selector: '.footer-bottom', baseDelay: 180, step: 0 }
];

const revealTargets = new Set();

revealGroups.forEach((group) => {
    const elements = document.querySelectorAll(group.selector);
    elements.forEach((el, index) => {
        el.classList.add('reveal');
        if (group.className) {
            group.className.split(' ').forEach((cls) => el.classList.add(cls));
        }
        el.style.transitionDelay = `${group.baseDelay + index * group.step}ms`;
        revealTargets.add(el);
    });
});

const revealObserver = new IntersectionObserver(
    (entries, observer) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
        });
    },
    {
        threshold: 0.2,
        rootMargin: '0px 0px -10% 0px'
    }
);

revealTargets.forEach((el) => revealObserver.observe(el));

const revealAboveFold = () => {
    revealTargets.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.85) {
            el.classList.add('is-visible');
            revealObserver.unobserve(el);
        }
    });
};

window.addEventListener('load', () => {
    requestAnimationFrame(() => {
        requestAnimationFrame(revealAboveFold);
    });

    setTimeout(() => {
        document.body.classList.add('page-loaded');
    }, 80);
});

//terminal simulado
const input = document.getElementById('terminal-input');
const output = document.getElementById('terminal-output');

input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        const command = input.value.trim().toLowerCase();
        let response = "";

        if (command === 'clear') {
            output.innerHTML = ""; // Limpa todo o conteúdo
            input.value = "";
            return; // Encerra a função aqui
        } 
        
        if (command === 'skills') {
            response = "Python, Django, React, HTML & CSS, JavaScript, C, Linux (arch/hyprland), SQL.";
        } else if (command === 'status') {
            response = "3º Semestre de CC | Buscando Estágio.";
        } else if (command === 'help') {
            response = "Comandos: skills, status, clear.";
        } else if (command !== "") {
            response = `Comando não encontrado: ${command}`;
        }

        if (command !== "") {
            output.innerHTML += `<p><span class="prompt">$ ${command}</span><br>${response}</p>`;
        }
        
        input.value = "";
        output.scrollTop = output.scrollHeight;
    }
});


