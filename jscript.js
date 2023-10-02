function toggleMenu() {
    const menu = document.querySelector('.menu-links');
    const icon = document.querySelector('.hamburger-icon');
    menu.classList.toggle("open")
    icon.classList.toggle("open")
}

function smoothScroll(targetId) {
    const targetElement = document.getElementById(targetId);
    if (!targetElement) return;

    const targetPosition = targetElement.offsetTop;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    const duration = 800;

    let start = null;

    function step(timestamp) {
        if (!start) start = timestamp;
        const progress = timestamp - start;
        const scrollTo = startPosition + easeInOutQuad(progress, 0, distance, duration);
        window.scrollTo(0, scrollTo);
        if (progress < duration) requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
}

function easeInOutQuad(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t + b;
    t--;
    return (-c / 2) * (t * (t - 2) - 1) + b;
}

const navLinks = document.querySelectorAll('.nav-links a');
navLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        smoothScroll(targetId);
    });
});

const arrowIcons = document.querySelectorAll('.arrow');
arrowIcons.forEach((arrow) => {
    arrow.addEventListener('click', () => {
        const targetId = arrow.getAttribute('onclick').match(/'(.+?)'/)[1];
        smoothScroll(targetId);
    });
});

const sections = document.querySelectorAll('section');

function checkScroll() {
    sections.forEach((section) => {
        const sectionTop = section.getBoundingClientRect().top;
        const windowBottom = window.innerHeight;

        if (sectionTop < windowBottom) {
            section.classList.add('visible');
        } else {
            section.classList.remove('visible');
        }
    });
}

window.addEventListener('scroll', checkScroll);
window.addEventListener('resize', checkScroll);
document.addEventListener('DOMContentLoaded', checkScroll);

const textElement = document.querySelector('.section__text__p2');
const texts = ['Frontend Developer', 'Layout Artist', 'Gamer'];
let index = 0;
let isTyping = true;
let speed = 100;

function typeText() {
    if (isTyping) {
        textElement.textContent += texts[index].charAt(textElement.textContent.length);
        if (textElement.textContent === texts[index]) {
            isTyping = false;
            setTimeout(typeText, speed * 20);
        } else {
            setTimeout(typeText, speed);
        }
    } else {
        textElement.textContent = textElement.textContent.slice(0, -1);
        if (textElement.textContent === '') {
            isTyping = true;
            index = (index + 1) % texts.length;
            setTimeout(typeText, speed * 2);
        } else {
            setTimeout(typeText, speed / 2);
        }
    }
}

typeText();
