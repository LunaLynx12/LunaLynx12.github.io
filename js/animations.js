document.addEventListener('DOMContentLoaded', () => {
  // Matrix-like animation effect
  createMatrixEffect();
  
  // Animation for glitch text
  initGlitchText();
  
  // Scroll animations
  initScrollAnimations();
});

// Create matrix-like falling characters animation
function createMatrixEffect() {
  const section = document.querySelector('.hero');
  if (!section) return;
  
  // Create container for matrix effect
  const container = document.createElement('div');
  container.className = 'matrix-effect';
  section.appendChild(container);
  
  // Define possible characters
  const characters = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲンABCDEFGHIJKLMNOPQRSTUVWXYZ';
  
  // Number of characters
  const colCount = Math.floor(window.innerWidth / 20);
  
  // Create initial characters
  for (let i = 0; i < colCount; i++) {
    createMatrixCharacter(container, characters);
  }
  
  // Continue creating characters periodically
  setInterval(() => {
    if (container.children.length < colCount * 2) {
      createMatrixCharacter(container, characters);
    }
  }, 100);
}

function createMatrixCharacter(container, characters) {
  const element = document.createElement('div');
  element.className = 'matrix-character';
  element.textContent = characters.charAt(Math.floor(Math.random() * characters.length));
  
  // Random positioning
  const x = Math.floor(Math.random() * window.innerWidth);
  element.style.left = `${x}px`;
  
  // Random falling speed
  const speed = Math.floor(Math.random() * 10) + 5;
  element.style.animationDuration = `${speed}s`;
  
  // Add to container
  container.appendChild(element);
  
  // Remove after animation completes
  setTimeout(() => {
    if (element.parentNode === container) {
      container.removeChild(element);
    }
  }, speed * 1000);
}

// Initialize glitch text effect
function initGlitchText() {
  // Add data-text attribute and glitch class to elements
  const glitchElements = document.querySelectorAll('.section-title');
  
  glitchElements.forEach(element => {
    const text = element.textContent;
    element.setAttribute('data-text', text);
    
    // Add event listener for hover
    element.addEventListener('mouseenter', () => {
      element.classList.add('glitch');
      setTimeout(() => {
        element.classList.remove('glitch');
      }, 1000);
    });
  });
}

// Initialize scroll animations
function initScrollAnimations() {
  // Add floating animation to stat cards
  const statCards = document.querySelectorAll('.stat-card');
  
  statCards.forEach((card, index) => {
    card.classList.add('floating');
    card.style.animationDelay = `${index * 0.2}s`;
  });
  
  // Add reveal text animation to specific text elements
  const headings = document.querySelectorAll('.category-title, .expertise-item h4');
  
  headings.forEach(heading => {
    heading.classList.add('reveal-text');
    heading.setAttribute('data-text', heading.textContent);
  });
  
  // Animate elements when they enter viewport
  const animatedElements = document.querySelectorAll('.expertise-item, .skill-item, .about-text p');
  
  const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animation = 'fadeInUp 0.6s forwards';
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  animatedElements.forEach(element => {
    element.style.opacity = '0';
    observer.observe(element);
  });
}

// Parallax effect on scroll
window.addEventListener('scroll', () => {
  const scrollTop = window.pageYOffset;
  
  // Parallax for hero section
  const heroSection = document.querySelector('.hero');
  if (heroSection) {
    heroSection.style.backgroundPositionY = `${scrollTop * 0.5}px`;
  }
  
  // Parallax for particles
  const particles = document.getElementById('particles-js');
  if (particles) {
    particles.style.transform = `translateY(${scrollTop * 0.2}px)`;
  }
});