lucide.createIcons();

const runIntro = () => {
    const overlay = document.getElementById('intro-overlay');
    const textContainer = document.getElementById('intro-text-container');
    const progressBar = document.getElementById('intro-progress');

    const steps = [
        { label: '✓ SYSTEM INIT', message: '> LOADING CORE MODULES...', width: '30%' },
        { label: '✓ UI READY', message: '> PREPARING PORTFOLIO...', width: '65%' },
        { label: '✓ READY', message: '> WELCOME TO MY WORK.', width: '100%' }
    ];

    let currentStep = 0;

    const nextStep = () => {
        if (currentStep >= steps.length) {
            overlay.style.transform = 'translateY(-110%)';
            overlay.style.opacity = '0';
            overlay.style.pointerEvents = 'none';
            setTimeout(() => {
                overlay.style.display = 'none';
            }, 700);
            return;
        }

        const step = steps[currentStep];
        textContainer.innerHTML = `<div class="text-slate-500 text-sm">${step.label}</div><div class="text-cyan-400 text-xl font-bold">${step.message}</div>`;
        progressBar.style.width = step.width;
        currentStep += 1;
        setTimeout(nextStep, 900);
    };

    nextStep();
};

window.addEventListener('load', runIntro);

const navbar = document.getElementById('navbar');
const mobileBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

const renderMobileIcon = (isOpen) => {
    mobileBtn.innerHTML = isOpen ? '<i data-lucide="x"></i>' : '<i data-lucide="menu"></i>';
    lucide.createIcons();
};

const toggleMobileMenu = () => {
    const isOpen = !mobileMenu.classList.contains('opacity-100');
    mobileMenu.classList.toggle('max-h-0', !isOpen);
    mobileMenu.classList.toggle('max-h-96', isOpen);
    mobileMenu.classList.toggle('opacity-0', !isOpen);
    mobileMenu.classList.toggle('opacity-100', isOpen);
    document.body.classList.toggle('overflow-hidden', isOpen);
    mobileBtn.setAttribute('aria-expanded', String(isOpen));
    renderMobileIcon(isOpen);
};

mobileBtn.addEventListener('click', toggleMobileMenu);

mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        if (!mobileMenu.classList.contains('opacity-100')) return;
        toggleMobileMenu();
    });
});

const updateNavbar = () => {
    if (window.scrollY > 60) {
        navbar.classList.add('bg-slate-950/90', 'backdrop-blur-md', 'border-b', 'border-slate-800', 'shadow-lg');
        navbar.classList.remove('bg-transparent');
    } else {
        navbar.classList.remove('bg-slate-950/90', 'backdrop-blur-md', 'border-b', 'border-slate-800', 'shadow-lg');
        navbar.classList.add('bg-transparent');
    }

    let activeSection = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 140;
        if (window.scrollY >= sectionTop) {
            activeSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        const span = link.querySelector('span');
        const isActive = link.getAttribute('data-section') === activeSection;
        link.classList.toggle('text-cyan-400', isActive);
        link.classList.toggle('text-slate-300', !isActive);
        if (span) {
            span.classList.toggle('scale-x-100', isActive);
            span.classList.toggle('scale-x-0', !isActive);
        }
    });
};

window.addEventListener('scroll', updateNavbar, { passive: true });
window.addEventListener('load', updateNavbar);

const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.15,
    rootMargin: '0px 0px -80px 0px'
});

document.querySelectorAll('.reveal').forEach(element => revealObserver.observe(element));
