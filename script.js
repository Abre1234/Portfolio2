// ===== HAMBURGER MENU =====
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// ===== ACTIVE NAV LINK ON SCROLL =====
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-links li a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (pageYOffset >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(a => {
        a.classList.remove('active-link');
        if (a.getAttribute('href').includes(current)) {
            a.classList.add('active-link');
        }
    });
});

// ===== SMOOTH SCROLL =====
navItems.forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        target.scrollIntoView({ behavior: 'smooth' });
    });
});

// ===== SCROLL REVEAL ANIMATIONS =====
const revealElements = document.querySelectorAll('section');

const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    revealElements.forEach(section => {
        const revealTop = section.getBoundingClientRect().top;
        if (revealTop < windowHeight - 100) {
            section.classList.add('active-reveal');
        }
    });
};

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// ===== TYPEWRITER EFFECT FOR HERO TAGLINE =====
const tagline = document.querySelector('.hero-content p');
const text = tagline.innerText;
tagline.innerText = '';
let index = 0;

const typeWriter = () => {
    if (index < text.length) {
        tagline.innerText += text.charAt(index);
        index++;
        setTimeout(typeWriter, 60);
    }
};

window.addEventListener('load', typeWriter);

// ===== BACK TO TOP BUTTON =====
const backToTop = document.createElement('button');
backToTop.innerText = '↑';
backToTop.id = 'back-to-top';
document.body.appendChild(backToTop);

backToTop.style.cssText = `
position: fixed;
bottom: 30px;
right: 30px;
padding: 0.8rem 1rem;
border: none;
border-radius: 50%;
background: #fbbf24;
color: #1e293b;
font-size: 1.5rem;
cursor: pointer;
display: none;
z-index: 999;
box-shadow: 0 4px 12px rgba(0,0,0,0.2);
transition: all 0.3s;
`;

backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTop.style.display = 'block';
    } else {
        backToTop.style.display = 'none';
    }
});

// ===== FLOATING PARTICLES BACKGROUND =====
const canvas = document.createElement('canvas');
canvas.id = 'particles';
document.body.appendChild(canvas);
const ctx = canvas.getContext('2d');

canvas.style.cssText = `
position: fixed;
top: 0;
left: 0;
width: 100%;
height: 100%;
pointer-events: none;
z-index: -1;
`;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particlesArray = [];
const particleCount = 80;

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1 - 0.5;
        this.color = `rgba(255, 191, 36, ${Math.random()})`;
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0 || this.x > canvas.width) this.speedX = -this.speedX;
        if (this.y < 0 || this.y > canvas.height) this.speedY = -this.speedY;
    }
    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function initParticles() {
    for (let i = 0; i < particleCount; i++) {
        particlesArray.push(new Particle());
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particlesArray.forEach(p => {
        p.update();
        p.draw();
    });
    requestAnimationFrame(animateParticles);
}

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

initParticles();
animateParticles();
