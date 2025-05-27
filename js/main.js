
document.addEventListener('DOMContentLoaded', () => {
  // Initialize sections transition
  initSectionTransitions();
  
  // Initialize particles background if available
  if (window.particlesJS) {
    initParticles();
  }
  
  // Add ripple effect to buttons
  initRippleEffect();
  
  // Form validation
  initFormValidation();
});

// Intersection Observer for section transitions
function initSectionTransitions() {
  const sections = document.querySelectorAll('section');
  
  sections.forEach(section => {
    section.classList.add('section-transition');
  });
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        
        // Animate skill bars when skills section is visible
        if (entry.target.id === 'skills') {
          const skillBars = entry.target.querySelectorAll('.skill-progress');
          setTimeout(() => {
            skillBars.forEach(bar => {
              const width = bar.style.width;
              bar.style.width = '0';
              setTimeout(() => {
                bar.style.width = width;
              }, 100);
            });
          }, 300);
        }
      }
    });
  }, {
    threshold: 0.1
  });
  
  sections.forEach(section => {
    observer.observe(section);
  });
}

// Initialize particles background
function initParticles() {
  particlesJS('particles-js', {
    particles: {
      number: {
        value: 80,
        density: {
          enable: true,
          value_area: 800
        }
      },
      color: {
        value: '#4361ee'
      },
      shape: {
        type: 'circle',
        stroke: {
          width: 0,
          color: '#000000'
        }
      },
      opacity: {
        value: 0.1,
        random: true,
        anim: {
          enable: true,
          speed: 1,
          opacity_min: 0.05,
          sync: false
        }
      },
      size: {
        value: 3,
        random: true,
        anim: {
          enable: false,
          speed: 40,
          size_min: 0.1,
          sync: false
        }
      },
      line_linked: {
        enable: true,
        distance: 150,
        color: '#4361ee',
        opacity: 0.1,
        width: 1
      },
      move: {
        enable: true,
        speed: 2,
        direction: 'none',
        random: false,
        straight: false,
        out_mode: 'out',
        bounce: false,
        attract: {
          enable: false,
          rotateX: 600,
          rotateY: 1200
        }
      }
    },
    interactivity: {
      detect_on: 'canvas',
      events: {
        onhover: {
          enable: true,
          mode: 'grab'
        },
        onclick: {
          enable: true,
          mode: 'push'
        },
        resize: true
      },
      modes: {
        grab: {
          distance: 140,
          line_linked: {
            opacity: 0.4
          }
        },
        push: {
          particles_nb: 4
        }
      }
    },
    retina_detect: true
  });
}

// Add ripple effect to buttons
function initRippleEffect() {
  const buttons = document.querySelectorAll('.btn, .filter-btn, .skill-tag');
  
  buttons.forEach(button => {
    button.classList.add('ripple');
    
    button.addEventListener('click', e => {
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const ripple = document.createElement('span');
      ripple.classList.add('ripple-effect');
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;
      
      button.appendChild(ripple);
      
      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });
}

// Form validation
function initFormValidation() {
  const contactForm = document.getElementById('contact-form');
  
  if (contactForm) {
    contactForm.addEventListener('submit', e => {
      e.preventDefault();
      
      // Get form fields
      const nameField = document.getElementById('name');
      const emailField = document.getElementById('email');
      const subjectField = document.getElementById('subject');
      const messageField = document.getElementById('message');
      
      // Validate email
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      let isValid = true;
      
      if (!nameField.value.trim()) {
        markInvalid(nameField, 'Name is required');
        isValid = false;
      } else {
        markValid(nameField);
      }
      
      if (!emailField.value.trim()) {
        markInvalid(emailField, 'Email is required');
        isValid = false;
      } else if (!emailPattern.test(emailField.value.trim())) {
        markInvalid(emailField, 'Please enter a valid email');
        isValid = false;
      } else {
        markValid(emailField);
      }
      
      if (!subjectField.value.trim()) {
        markInvalid(subjectField, 'Subject is required');
        isValid = false;
      } else {
        markValid(subjectField);
      }
      
      if (!messageField.value.trim()) {
        markInvalid(messageField, 'Message is required');
        isValid = false;
      } else if (messageField.value.length < 10) {
        markInvalid(messageField, 'Message must be at least 10 characters');
        isValid = false;
      } else {
        markValid(messageField);
      }
      
      if (isValid) {
        // Show success message (in real application, this would send the form)
        const successMessage = document.createElement('div');
        successMessage.className = 'form-success';
        successMessage.style.padding = '16px';
        successMessage.style.marginTop = '16px';
        successMessage.style.backgroundColor = 'rgba(74, 222, 128, 0.1)';
        successMessage.style.color = 'var(--color-accent-green)';
        successMessage.style.borderRadius = 'var(--border-radius-sm)';
        successMessage.style.textAlign = 'center';
        successMessage.style.fontWeight = '500';
        successMessage.textContent = 'Message sent successfully! I will get back to you soon.';
        
        contactForm.insertAdjacentElement('afterend', successMessage);
        contactForm.reset();
        
        // Remove success message after 5 seconds
        setTimeout(() => {
          successMessage.remove();
        }, 5000);
      }
    });
  }
}

function markInvalid(field, message) {
  field.style.borderColor = 'var(--color-error)';
  
  // Remove existing error message if any
  const existingError = field.parentElement.querySelector('.error-message');
  if (existingError) {
    existingError.remove();
  }
  
  // Create and append error message
  const errorMessage = document.createElement('div');
  errorMessage.className = 'error-message';
  errorMessage.style.color = 'var(--color-error)';
  errorMessage.style.fontSize = '12px';
  errorMessage.style.marginTop = '4px';
  errorMessage.textContent = message;
  
  field.parentElement.appendChild(errorMessage);
}

function markValid(field) {
  field.style.borderColor = 'var(--color-success)';
  
  // Remove existing error message if any
  const existingError = field.parentElement.querySelector('.error-message');
  if (existingError) {
    existingError.remove();
  }
}