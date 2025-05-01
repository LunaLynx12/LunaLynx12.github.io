document.addEventListener('DOMContentLoaded', () => {
  // Initialize projects
  loadProjects();
  
  // Initialize filter buttons
  initFilterButtons();
});

// Project data
const projectsData = [
  {
    id: 1,
    title: 'Web App Vulnerability Scanner',
    description: 'Developed a custom scanner for detecting OWASP Top 10 vulnerabilities in web applications using Python and Selenium.',
    image: 'https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'research',
    links: [
      { text: 'Details', url: '#' },
      { text: 'GitHub', url: '#' }
    ]
  },
  {
    id: 2,
    title: 'CTF Challenge: Binary Exploitation',
    description: 'First place in the 2024 HackerCTF competition by solving a complex buffer overflow vulnerability in a C++ application.',
    image: 'https://images.pexels.com/photos/5380664/pexels-photo-5380664.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'ctf',
    links: [
      { text: 'Write-up', url: '#' }
    ]
  },
  {
    id: 3,
    title: 'SQL Injection in E-commerce Platform',
    description: 'Discovered and responsibly disclosed a critical SQL injection vulnerability in a major e-commerce platform.',
    image: 'https://images.pexels.com/photos/6804581/pexels-photo-6804581.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'bugbounty',
    links: [
      { text: 'Case Study', url: '#' },
      { text: 'CVE', url: '#' }
    ]
  },
  {
    id: 4,
    title: 'API Security Assessment Tool',
    description: 'Created an automated tool for scanning and testing REST APIs for common security vulnerabilities and misconfigurations.',
    image: 'https://images.pexels.com/photos/4670216/pexels-photo-4670216.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'research',
    links: [
      { text: 'Project', url: '#' },
      { text: 'Demo', url: '#' }
    ]
  },
  {
    id: 5,
    title: 'DNS Rebinding Attack Demo',
    description: 'Developed a demonstration of DNS rebinding attacks to highlight the potential risks to internal networks and IoT devices.',
    image: 'https://images.pexels.com/photos/5474285/pexels-photo-5474285.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'ctf',
    links: [
      { text: 'Presentation', url: '#' },
      { text: 'Code', url: '#' }
    ]
  },
  {
    id: 6,
    title: 'XSS in Social Media Platform',
    description: 'Identified and reported a stored XSS vulnerability in a major social media platform, awarded a substantial bug bounty.',
    image: 'https://images.pexels.com/photos/5380590/pexels-photo-5380590.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'bugbounty',
    links: [
      { text: 'Report', url: '#' }
    ]
  }
];

// Load projects
function loadProjects() {
  const projectsGrid = document.getElementById('projects-grid');
  if (!projectsGrid) return;
  
  // Clear existing content
  projectsGrid.innerHTML = '';
  
  // Populate with project cards
  projectsData.forEach(project => {
    const projectCard = createProjectCard(project);
    projectsGrid.appendChild(projectCard);
  });
}

// Create project card
function createProjectCard(project) {
  const card = document.createElement('div');
  card.className = `project-card ${project.category}`;
  
  let tagsLabel = '';
  switch(project.category) {
    case 'ctf':
      tagsLabel = 'CTF';
      break;
    case 'bugbounty':
      tagsLabel = 'Bug Bounty';
      break;
    case 'research':
      tagsLabel = 'Research';
      break;
    default:
      tagsLabel = 'Project';
  }
  
  card.innerHTML = `
    <img src="${project.image}" alt="${project.title}" class="project-image">
    <div class="project-content">
      <div class="project-tag ${project.category}">${tagsLabel}</div>
      <h3 class="project-title">${project.title}</h3>
      <p class="project-description">${project.description}</p>
      <div class="project-links">
        ${project.links.map(link => `<a href="${link.url}" class="project-link">${link.text}</a>`).join('')}
      </div>
    </div>
  `;
  
  return card;
}

// Initialize filter buttons
function initFilterButtons() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from all buttons
      filterButtons.forEach(btn => btn.classList.remove('active'));
      
      // Add active class to clicked button
      button.classList.add('active');
      
      // Get filter value
      const filter = button.getAttribute('data-filter');
      
      // Filter projects
      projectCards.forEach(card => {
        if (filter === 'all' || card.classList.contains(filter)) {
          card.style.display = 'block';
          
          // Add animation
          card.style.animation = 'fadeIn 0.5s forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}