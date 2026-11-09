
// 1. Typing Animation
const typedText = document.getElementById("typed");

const words = [
    "Creative Websites.",
    "Modern Designs.",
    "Digital Experiences.",
    "Strong Structures."
];

let wordIndex = 0;
let charIndex = 0;
let deleting = false;

function typeEffect() {
    if (!typedText) return;

    const currentWord = words[wordIndex];

    typedText.textContent = deleting
        ? currentWord.substring(0, charIndex--)
        : currentWord.substring(0, charIndex++);

    let speed = deleting ? 50 : 100;

    if (!deleting && charIndex > currentWord.length) {
        deleting = true;
        speed = 1200;
    } else if (deleting && charIndex < 0) {
        deleting = false;
        charIndex = 0;
        wordIndex = (wordIndex + 1) % words.length;
    }

    setTimeout(typeEffect, speed);
}

typeEffect();


// 2. Mobile Hamburger Menu
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");
const menuIcon = hamburger?.querySelector("i");

hamburger?.addEventListener("click", () => {
    navLinks.classList.toggle("active");

    if (menuIcon) {
        menuIcon.classList.toggle("fa-bars-staggered");
        menuIcon.classList.toggle("fa-xmark");
    }
});

// Close menu when clicking a link
document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("active");

        if (menuIcon) {
            menuIcon.classList.add("fa-bars-staggered");
            menuIcon.classList.remove("fa-xmark");
        }
    });
});


// 3. Scroll Reveal Animation
const revealElements = document.querySelectorAll(
    ".section, .box, .skill, .exp-card, .p-card, .code-card"
);

const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.12
});

revealElements.forEach(element => {
    element.classList.add("reveal");
    revealObserver.observe(element);
});


// 4. Active Navbar Link on Scroll
const sections = document.querySelectorAll("section[id]");
const navItems = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
    let currentSection = "";

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;
        const sectionBottom = sectionTop + section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionBottom
        ) {
            currentSection = section.getAttribute("id");
        }
    });

    navItems.forEach(link => {
        link.classList.toggle(
            "active-link",
            link.getAttribute("href") === `#${currentSection}`
        );
    });
});


// 5. Close Mobile Menu When Resizing
window.addEventListener("resize", () => {
    if (window.innerWidth > 900) {
        navLinks.classList.remove("active");

        if (menuIcon) {
            menuIcon.classList.add("fa-bars-staggered");
            menuIcon.classList.remove("fa-xmark");
        }
    }
});
