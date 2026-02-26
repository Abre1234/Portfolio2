// ===============================
// ADVANCED PORTFOLIO INTERACTION SCRIPT
// Author: Abraraw Ayal Portfolio
// ===============================


// ===============================
// HAMBURGER MENU
// ===============================
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

if (hamburger) {
    hamburger.addEventListener("click", () => {
        navLinks.classList.toggle("active");
    });
}


// ===============================
// SMOOTH SCROLL
// ===============================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function(e) {

        e.preventDefault();

        const target = document.querySelector(this.getAttribute("href"));

        if (target) {
            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }

        navLinks.classList.remove("active");

    });

});


// ===============================
// ACTIVE NAV LINK ON SCROLL
// ===============================
const sections = document.querySelectorAll("section");
const navItems = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 150;

        if (window.scrollY >= sectionTop) {
            current = section.getAttribute("id");
        }

    });

    navItems.forEach(link => {

        link.classList.remove("active-link");

        if (link.getAttribute("href") === "#" + current) {
            link.classList.add("active-link");
        }

    });

});


// ===============================
// SCROLL REVEAL ANIMATION
// ===============================
const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
            entry.target.style.transition = "all 0.8s ease";

        }

    });

}, {
    threshold: 0.15
});

document.querySelectorAll("section, .project-card, .skill-card, .course-card")
.forEach(el => {

    el.style.opacity = "0";
    el.style.transform = "translateY(40px)";
    observer.observe(el);

});


// ===============================
// TYPEWRITER EFFECT
// ===============================
const heroText = document.querySelector(".hero-content p");

if (heroText) {

    const text = heroText.textContent;
    heroText.textContent = "";

    let i = 0;

    function typeWriter() {

        if (i < text.length) {

            heroText.textContent += text.charAt(i);
            i++;

            setTimeout(typeWriter, 40);

        }

    }

    window.addEventListener("load", typeWriter);

}


// ===============================
// BACK TO TOP BUTTON
// ===============================
const backBtn = document.createElement("button");

backBtn.innerHTML = "↑";
backBtn.id = "backToTop";

document.body.appendChild(backBtn);

backBtn.style.cssText = `
position: fixed;
bottom: 30px;
right: 30px;
width: 50px;
height: 50px;
border-radius: 50%;
border: none;
background: linear-gradient(135deg, #2563eb, #1e3a8a);
color: white;
font-size: 20px;
cursor: pointer;
display: none;
z-index: 1000;
box-shadow: 0 5px 20px rgba(0,0,0,0.3);
transition: all 0.3s ease;
`;

window.addEventListener("scroll", () => {

    if (window.scrollY > 400) {

        backBtn.style.display = "block";

    } else {

        backBtn.style.display = "none";

    }

});

backBtn.addEventListener("click", () => {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});


// ===============================
// NAVBAR BLUR EFFECT
// ===============================
const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {

    if (window.scrollY > 50) {

        navbar.style.background = "rgba(255,255,255,0.85)";
        navbar.style.backdropFilter = "blur(10px)";

    } else {

        navbar.style.background = "rgba(255,255,255,0.95)";

    }

});


// ===============================
// 3D TILT EFFECT ON PROJECT CARDS
// ===============================
const cards = document.querySelectorAll(".project-card");

cards.forEach(card => {

    card.addEventListener("mousemove", (e) => {

        const rect = card.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / 10);
        const rotateY = ((centerX - x) / 10);

        card.style.transform =
            `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;

    });

    card.addEventListener("mouseleave", () => {

        card.style.transform = "rotateX(0) rotateY(0) scale(1)";

    });

});


// ===============================
// SKILL CARD ANIMATION
// ===============================
document.querySelectorAll(".skill-card").forEach((card, index) => {

    card.style.animationDelay = `${index * 0.1}s`;

    card.addEventListener("mouseenter", () => {

        card.style.transform = "scale(1.1)";

    });

    card.addEventListener("mouseleave", () => {

        card.style.transform = "scale(1)";

    });

});


// ===============================
// PARTICLES BACKGROUND
// ===============================
const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");

canvas.style.position = "fixed";
canvas.style.top = "0";
canvas.style.left = "0";
canvas.style.zIndex = "-1";

document.body.appendChild(canvas);

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

class Particle {

    constructor() {

        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;

        this.size = Math.random() * 2 + 1;

        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;

    }

    update() {

        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;

    }

    draw() {

        ctx.fillStyle = "rgba(37, 99, 235, 0.7)";
        ctx.beginPath();

        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);

        ctx.fill();

    }

}

function initParticles() {

    particles = [];

    for (let i = 0; i < 100; i++) {

        particles.push(new Particle());

    }

}

function animateParticles() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(p => {

        p.update();
        p.draw();

    });

    requestAnimationFrame(animateParticles);

}

initParticles();
animateParticles();


// ===============================
// RESIZE HANDLER
// ===============================
window.addEventListener("resize", () => {

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    initParticles();

});


// ===============================
// MOUSE GLOW EFFECT
// ===============================
const glow = document.createElement("div");

glow.style.position = "fixed";
glow.style.width = "300px";
glow.style.height = "300px";
glow.style.background =
"radial-gradient(circle, rgba(37,99,235,0.15), transparent)";
glow.style.borderRadius = "50%";
glow.style.pointerEvents = "none";
glow.style.zIndex = "-1";

document.body.appendChild(glow);

document.addEventListener("mousemove", (e) => {

    glow.style.left = e.clientX - 150 + "px";
    glow.style.top = e.clientY - 150 + "px";

});
