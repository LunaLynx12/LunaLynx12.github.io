document.addEventListener('DOMContentLoaded', () => {
  // Initialize mobile navigation
  initMobileNav();
  
  // Smooth scroll for navigation links
  initSmoothScroll();
  
  // Header scroll effect
  initHeaderScroll();
});

// Initialize mobile navigation
function initMobileNav() {
  const menuToggle = document.getElementById('menu-toggle');
  const mobileNav = document.getElementById('mobile-nav');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
  
  if (!menuToggle || !mobileNav) return;
  
  // Toggle mobile menu
  menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    mobileNav.classList.toggle('active');
    
    // Prevent scrolling when menu is open
    document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
  });
  
  // Close mobile menu when a link is clicked
  mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      menuToggle.classList.remove('active');
      mobileNav.classList.remove('active');
      document.body.style.overflow = '';
    });
  });
}

// Initialize smooth scroll for navigation links
function initSmoothScroll() {
  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link, .btn[href^="#"]');
  
  navLinks.forEach(link => {
    link.addEventListener('click', event => {
      // Check if link href is # or starts with #
      const href = link.getAttribute('href');
      if (href === '#' || !href.startsWith('#')) return;
      
      event.preventDefault();
      
      const targetId = href;
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        // Get header height
        const headerHeight = document.querySelector('.header').offsetHeight;
        
        // Calculate target position
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        
        // Smooth scroll to target
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

// Header scroll effect
function initHeaderScroll() {
  const header = document.querySelector('.header');
  if (!header) return;
  
  // Initial state
  let lastScrollTop = 0;
  
  window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Check if scrolling down
    if (scrollTop > lastScrollTop) {
      // Scrolling down
      if (scrollTop > 100) {
        header.style.backgroundColor = 'rgba(10, 10, 10, 0.95)';
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
      }
    } else {
      // Scrolling up
      if (scrollTop <= 10) {
        header.style.backgroundColor = 'rgba(10, 10, 10, 0.8)';
        header.style.boxShadow = 'none';
      }
    }
    
    lastScrollTop = scrollTop;
  });
  
  // Add active class to current section in navigation
  window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.offsetHeight;
      
      if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}