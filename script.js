// Initialize Splitting.js
Splitting();

// Initialize GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Custom Cursor
const cursor = document.querySelector('.cursor');
document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

// Cursor hover effect
document.querySelectorAll('a, button').forEach(element => {
    element.addEventListener('mouseenter', () => {
        cursor.style.transform = 'scale(1.5)';
        cursor.style.mixBlendMode = 'difference';
    });
    element.addEventListener('mouseleave', () => {
        cursor.style.transform = 'scale(1)';
        cursor.style.mixBlendMode = 'normal';
    });
});

// Loader Animation
window.addEventListener('load', () => {
    const loader = document.querySelector('.loader');
    const loaderText = loader.querySelector('h1');

    gsap.to(loaderText, {
        opacity: 1,
        duration: 1,
        ease: "power2.out"
    });

    gsap.to(loader, {
        opacity: 0,
        duration: 1,
        delay: 2,
        ease: "power2.inOut",
        onComplete: () => {
            loader.style.display = 'none';
            animateHero();
        }
    });
});

// Hero Section Animation
function animateHero() {
    const mainTitle = document.querySelector('.main-title');
    const glitchText = document.querySelector('.glitch-text');
    const subtitle = document.querySelector('.subtitle');

    gsap.from(glitchText, {
        duration: 1.5,
        y: 100,
        opacity: 0,
        ease: "power4.out"
    });

    gsap.from(mainTitle, {
        duration: 1.5,
        y: 100,
        opacity: 0,
        delay: 0.2,
        ease: "power4.out"
    });

    gsap.from(subtitle, {
        duration: 1.5,
        y: 50,
        opacity: 0,
        delay: 0.4,
        ease: "power4.out"
    });
}

// Glitch Effect
function createGlitchEffect(element) {
    let originalText = element.textContent;
    let iterations = 0;
    
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    
    const interval = setInterval(() => {
        element.textContent = element.textContent.split("")
            .map((letter, index) => {
                if(index < iterations) {
                    return originalText[index];
                }
                return letters[Math.floor(Math.random() * 26)]
            })
            .join("");
        
        if(iterations >= originalText.length) {
            clearInterval(interval);
        }
        
        iterations += 1/3;
    }, 30);
}

document.querySelector('.glitch-text').addEventListener('mouseover', function() {
    createGlitchEffect(this);
});

// Scroll Animations
gsap.utils.toArray('.project-item').forEach(project => {
    gsap.from(project, {
        scrollTrigger: {
            trigger: project,
            start: "top bottom",
            end: "top center",
            scrub: 1
        },
        y: 100,
        opacity: 0
    });
});

// Skills Animation
const skillBars = document.querySelectorAll('.skill-progress');
skillBars.forEach(bar => {
    gsap.to(bar, {
        scrollTrigger: {
            trigger: bar,
            start: "top bottom",
            end: "bottom center",
            scrub: 1
        },
        scaleX: 1,
        duration: 1.5,
        ease: "power2.out"
    });
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Text Split Animation for Headings
document.querySelectorAll('h2[data-splitting]').forEach(heading => {
    gsap.from(heading.querySelectorAll('.char'), {
        scrollTrigger: {
            trigger: heading,
            start: "top bottom",
            end: "bottom center",
        },
        y: 100,
        opacity: 0,
        duration: 0.5,
        stagger: 0.02
    });
});

// Form Animations
const formGroups = document.querySelectorAll('.form-group');
formGroups.forEach(group => {
    const input = group.querySelector('input, textarea');
    const line = group.querySelector('.line-animation');

    input.addEventListener('focus', () => {
        line.style.width = '100%';
    });

    input.addEventListener('blur', () => {
        if (!input.value) {
            line.style.width = '0';
        }
    });
});

// Parallax Effect
document.addEventListener('mousemove', (e) => {
    const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
    const moveY = (e.clientY - window.innerHeight / 2) * 0.01;

    gsap.to('.hero-text', {
        x: moveX,
        y: moveY,
        duration: 1
    });
});

// Navigation Background Change on Scroll
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (window.scrollY > 100) {
        nav.style.background = 'rgba(26, 26, 26, 0.9)';
    } else {
        nav.style.background = 'transparent';
    }
});

// Optimized 3D tilt effect for Behance projects
const behanceContainer = document.querySelector('.behance-projects');
const projects = document.querySelectorAll('.behance-embed');

// Initialize tilt values
projects.forEach(project => {
    project.tiltSettings = {
        currentX: 0,
        currentY: 0,
        targetX: 0,
        targetY: 0
    };
});

// Smooth animation function
function animateTilt() {
    projects.forEach(project => {
        const settings = project.tiltSettings;
        
        // Smooth interpolation
        settings.currentX += (settings.targetX - settings.currentX) * 0.1;
        settings.currentY += (settings.targetY - settings.currentY) * 0.1;
        
        // Apply transform
        project.style.transform = `
            perspective(1000px)
            rotateX(${settings.currentX}deg)
            rotateY(${settings.currentY}deg)
            scale(1.02)
        `;
    });
    
    // Continue animation loop
    requestAnimationFrame(animateTilt);
}

// Start animation loop
animateTilt();

// Optimized mouse move handler
function handleMouseMove(e) {
    projects.forEach(project => {
        const rect = project.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const percentX = (e.clientX - centerX) / (rect.width / 2);
        const percentY = (e.clientY - centerY) / (rect.height / 2);
        
        // Update target values
        project.tiltSettings.targetX = -percentY * 8; // Reduced tilt amount
        project.tiltSettings.targetY = percentX * 8;
    });
}

// Event listeners
behanceContainer.addEventListener('mousemove', handleMouseMove);
behanceContainer.addEventListener('mouseleave', () => {
    projects.forEach(project => {
        project.tiltSettings.targetX = 0;
        project.tiltSettings.targetY = 0;
    });
});

// Behance Projects Scroll Animation
projects.forEach((project, index) => {
    gsap.from(project, {
        scrollTrigger: {
            trigger: project,
            start: "top bottom-=100",
            end: "bottom center",
            toggleClass: "animate-in",
            once: true
        },
        duration: 1.2,
        delay: index * 0.2,
        ease: "power4.out"
    });
});
