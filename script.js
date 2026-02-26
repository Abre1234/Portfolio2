// ===============================
// ABRARAW AYAL PORTFOLIO SCRIPT
// Professional Interactive JS
// ===============================

document.addEventListener("DOMContentLoaded", function () {

    // ===============================
    // THEME TOGGLE
    // ===============================
    const themeToggle = document.getElementById("theme-toggle");
    const body = document.body;
    const icon = themeToggle?.querySelector("i");

    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "light") {
        body.classList.add("light-mode");
        icon?.classList.replace("fa-moon", "fa-sun");
    }

    themeToggle?.addEventListener("click", () => {

        body.classList.toggle("light-mode");

        if (body.classList.contains("light-mode")) {
            localStorage.setItem("theme", "light");
            icon?.classList.replace("fa-moon", "fa-sun");
        } else {
            localStorage.setItem("theme", "dark");
            icon?.classList.replace("fa-sun", "fa-moon");
        }

    });


    // ===============================
    // MOBILE MENU
    // ===============================
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-links");

    hamburger?.addEventListener("click", () => {

        navMenu.classList.toggle("active");
        hamburger.classList.toggle("active");

    });

    document.querySelectorAll(".nav-links a").forEach(link => {

        link.addEventListener("click", () => {

            navMenu.classList.remove("active");
            hamburger.classList.remove("active");

        });

    });


    // ===============================
    // SMOOTH SCROLL
    // ===============================
    document.querySelectorAll("a[href^='#']").forEach(anchor => {

        anchor.addEventListener("click", function (e) {

            e.preventDefault();

            const target = document.querySelector(this.getAttribute("href"));

            if (target) {

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }

        });

    });


    // ===============================
    // SCROLL PROGRESS BAR
    // ===============================
    const progressBar = document.getElementById("progress-bar");

    window.addEventListener("scroll", () => {

        const scrollTop = document.documentElement.scrollTop;
        const height =
            document.documentElement.scrollHeight -
            document.documentElement.clientHeight;

        const progress = (scrollTop / height) * 100;

        if (progressBar)
            progressBar.style.width = progress + "%";

    });


    // ===============================
    // ACTIVE NAV LINK ON SCROLL
    // ===============================
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-links a");

    window.addEventListener("scroll", () => {

        let current = "";

        sections.forEach(section => {

            const sectionTop = section.offsetTop - 100;

            if (scrollY >= sectionTop)
                current = section.getAttribute("id");

        });

        navLinks.forEach(link => {

            link.classList.remove("active");

            if (link.getAttribute("href") === "#" + current)
                link.classList.add("active");

        });

    });


    // ===============================
    // SCROLL REVEAL ANIMATION
    // ===============================
    const revealElements = document.querySelectorAll(

        ".reveal, .project-card, .skill-card, .course-card"

    );

    const revealObserver = new IntersectionObserver(

        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("active");

                }

            });

        },
        {
            threshold: 0.1
        }

    );

    revealElements.forEach(el => {

        revealObserver.observe(el);

    });


    // ===============================
    // TYPING EFFECT
    // ===============================
    const typingElement = document.getElementById("typing");

    const texts = [

        "Data Scientist",
        "Machine Learning Engineer",
        "AI Developer",
        "Data Analyst",
        "Python Developer"

    ];

    let index = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeEffect() {

        if (!typingElement) return;

        const currentText = texts[index];

        if (isDeleting) {

            typingElement.textContent =
                currentText.substring(0, charIndex--);

        } else {

            typingElement.textContent =
                currentText.substring(0, charIndex++);

        }

        if (!isDeleting && charIndex === currentText.length) {

            isDeleting = true;
            setTimeout(typeEffect, 1200);

        } else if (isDeleting && charIndex === 0) {

            isDeleting = false;
            index = (index + 1) % texts.length;
            setTimeout(typeEffect, 300);

        } else {

            setTimeout(typeEffect, isDeleting ? 50 : 100);

        }

    }

    typeEffect();


    // ===============================
    // SKILL BAR ANIMATION
    // ===============================
    const skillBars = document.querySelectorAll(".skill-progress");

    const skillObserver = new IntersectionObserver(entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.style.width =
                    entry.target.dataset.width;

            }

        });

    });

    skillBars.forEach(bar => {

        skillObserver.observe(bar);

    });


    // ===============================
    // PROJECT CARD TILT EFFECT
    // ===============================
    const cards = document.querySelectorAll(".project-card");

    cards.forEach(card => {

        card.addEventListener("mousemove", e => {

            const rect = card.getBoundingClientRect();

            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 15;
            const rotateY = (centerX - x) / 15;

            card.style.transform =
                `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

        });

        card.addEventListener("mouseleave", () => {

            card.style.transform =
                "rotateX(0) rotateY(0)";

        });

    });


    // ===============================
    // BACK TO TOP BUTTON
    // ===============================
    const backToTop = document.getElementById("backToTop");

    window.addEventListener("scroll", () => {

        if (window.scrollY > 300) {

            backToTop?.classList.add("show");

        } else {

            backToTop?.classList.remove("show");

        }

    });

    backToTop?.addEventListener("click", () => {

        window.scrollTo({

            top: 0,
            behavior: "smooth"

        });

    });


    // ===============================
    // CURSOR GLOW EFFECT
    // ===============================
    const cursor = document.createElement("div");

    cursor.classList.add("cursor-glow");

    document.body.appendChild(cursor);

    document.addEventListener("mousemove", e => {

        cursor.style.left = e.clientX + "px";
        cursor.style.top = e.clientY + "px";

    });


    // ===============================
    // CONTACT FORM ANIMATION
    // ===============================
    const form = document.getElementById("contactForm");

    form?.addEventListener("submit", function () {

        const btn = form.querySelector("button");

        btn.innerHTML = "Sending...";
        btn.disabled = true;

    });

});
