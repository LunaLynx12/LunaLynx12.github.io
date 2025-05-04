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
    title: 'Signature-stealer Toolkit',
    description: 'A Python-based toolkit for analyzing and modifying Portable Executable (PE) files, designed for red teaming and security research purposes.',
    image: 'https://github.com/LunaLynx12/Signature-stealer/blob/dev/images/sample.png?raw=true',
    category: 'research',
    links: [
      { text: 'Details', url: 'https://github.com/LunaLynx12/Signature-stealer/blob/dev/README.md' },
      { text: 'GitHub', url: 'https://github.com/LunaLynx12/Signature-stealer' }
    ]
  },
  {
    id: 2,
    title: 'CTF Challenge: Hackfinity Battle',
    description: "🏆 Team Rank: 44 out of 4316<br>⚔️ Points Earned: 1665<br>✅ Tasks Completed: 44",
    image: 'https://media.discordapp.net/attachments/913676794622783489/1367564166650531840/image.png?ex=68150ae1&is=6813b961&hm=2e76bf4ab83a757f2af5f59565c92373369c37b4ec9edf7d41c2e593c5471416&=&format=webp&quality=lossless',
    category: 'ctf',
    links: [
      { text: 'Write-up', url: '#projects' }
    ]
  },
  {
    id: 3,
    title: 'MalwarePeek - PE File Analyzer with Advanced Malware Detection',
    description: 'A powerful Python tool for analyzing Portable Executable (PE) files with advanced malware detection capabilities, beautiful HTML reporting, and batch processing.',
    image: 'https://github.com/LunaLynx12/MalwarePeek/blob/dev/images/sample.png?raw=true',
    category: 'research',
    links: [
      { text: 'Details', url: 'https://github.com/LunaLynx12/MalwarePeek/blob/dev/README.md' },
      { text: 'GitHub', url: 'https://github.com/LunaLynx12/MalwarePeek' }
    ]
  },
  {
    id: 4,
    title: 'Apkocalypse - APK Injection Framework',
    description: 'Created an modular toolkit for injecting payloads into Android applications while maintaining original functionality.',
    image: 'https://media.discordapp.net/attachments/913676794622783489/1367559542069792788/assets2Ftask_01jt6fjzmqfpsvc46b944rxrf52F1746121968_img_0.png?ex=68150692&is=6813b512&hm=4b76f7b678a903ffeff38db81a93a12446f1ae4d6eb8f6989bad3a557c63317b&=&format=webp&quality=lossless&width=561&height=842',
    category: 'research',
    links: [
      { text: 'Details', url: 'https://github.com/LunaLynx12/Apkocalypse/blob/dev/README.md' },
      { text: 'GitHub', url: 'https://github.com/LunaLynx12/Apkocalypse' }
    ]
  },
  {
    id: 5,
    title: 'CTF Challenge: Cyber Apocalypse',
    description: '🏆 Team Rank: 122 out of 8130<br>⚔️ Points Earned: 48200<br>✅ Tasks Completed: 68 out of 77',
    image: 'https://media.discordapp.net/attachments/913676794622783489/1367564555059728476/image.png?ex=68150b3e&is=6813b9be&hm=baf940c8ba56e779ee91d4eee5324ea8856de64d78905232f01bdd63677dd76e&=&format=webp&quality=lossless',
    category: 'ctf',
    links: [
      { text: 'Write-up', url: '#projects' }
    ]
  },
  {
    id: 6,
    title: 'Procmon DLL Hijacking Analyzer',
    description: 'This tool is designed to help identify potential DLL hijacking vulnerabilities in applications by monitoring processes using Procmon (Process Monitor).',
    image: 'https://media.discordapp.net/attachments/913676794622783489/1367562127635648603/assets2Ftask_01jt6g72zbf8psapbrwx035nwk2F1746122606_img_0.png?ex=681508fb&is=6813b77b&hm=9acc8a70acad4533be32d42cd51904c4f560a086212df34aa37b0156d17ddab4&=&format=webp&quality=lossless&width=561&height=842',
    category: 'bugbounty',
    links: [
      { text: 'Details', url: 'https://github.com/LunaLynx12/Procmon-DLL-Hijacking-Analyzer/blob/dev/README.md' },
      { text: 'Github', url: 'https://github.com/LunaLynx12/Procmon-DLL-Hijacking-Analyzer' }
    ]
  },
  {
    id: 7,
    title: 'CVE Radar Browser Extension',
    description: "A lightweight browser extension that fetches and displays the latest CVEs from NVD with severity scores, persistent caching, and real-time updates while respecting API rate limits.",
    image: 'https://github.com/LunaLynx12/NVD-quicklook/blob/main/images/sample.png?raw=true',
    category: "research",
    links: [
      { 
        text: "Details", 
        url: "https://github.com/LunaLynx12/NVD-quicklook/blob/main/README.md" 
      },
      { 
        text: "Github", 
        url: "https://github.com/LunaLynx12/NVD-quicklook" 
      },
      { 
        text: "Chrome Web Store", 
        url: "#" 
      }
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