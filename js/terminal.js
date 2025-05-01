document.addEventListener('DOMContentLoaded', () => {
  // Initialize terminal animation
  initTerminal();
});

function initTerminal() {
  const commands = [
    document.getElementById('command-1'),
    document.getElementById('command-2'),
    document.getElementById('command-3')
  ];
  
  const outputs = [
    document.getElementById('output-1'),
    document.getElementById('output-2'),
    document.getElementById('output-3')
  ];
  
  const currentCommand = document.getElementById('current-command');
  
  // Hide outputs initially
  outputs.forEach(output => {
    output.style.display = 'none';
  });
  
  // Animation sequence
  setTimeout(() => {
    animateTyping(commands[0], () => {
      setTimeout(() => {
        outputs[0].style.display = 'inline-block';
        outputs[0].classList.add('typing');
        
        setTimeout(() => {
          animateTyping(commands[1], () => {
            setTimeout(() => {
              outputs[1].style.display = 'inline-block';
              outputs[1].classList.add('typing');
              
              setTimeout(() => {
                animateTyping(commands[2], () => {
                  setTimeout(() => {
                    outputs[2].style.display = 'inline-block';
                    outputs[2].classList.add('typing');
                    
                    setTimeout(() => {
                      // Start random typing after the sequence is done
                      startRandomTyping(currentCommand);
                    }, 1000);
                  }, 300);
                });
              }, 1000);
            }, 300);
          });
        }, 1000);
      }, 300);
    });
  }, 500);
}

function animateTyping(element, callback) {
  const text = element.textContent;
  element.textContent = '';
  element.classList.add('typing');
  
  let i = 0;
  const typeInterval = setInterval(() => {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
    } else {
      clearInterval(typeInterval);
      if (callback) callback();
    }
  }, 50);
}

function startRandomTyping(element) {
  const commands = [
    'ls -la',
    'cd /home/hacker',
    'sudo nmap -sS -p- target.com',
    'hydra -l admin -P wordlist.txt target.com ssh',
    'sqlmap -u "http://target.com/page.php?id=1" --dbs',
    'dirb http://target.com/ /usr/share/wordlists/dirb/big.txt',
    'python3 exploit.py',
    'msfconsole',
    'cat /etc/passwd',
    'ssh root@target.com',
    'gcc exploit.c -o exploit',
    'nc -lvp 4444',
    'curl -s https://target.com/api'
  ];
  
  let currentIndex = 0;
  let isDeleting = false;
  let txt = '';
  let typeSpeed = 100;
  let waitCount = 0;
  const waitMax = 20;
  
  function tick() {
    const command = commands[currentIndex];
    
    if (isDeleting) {
      // Delete character
      txt = txt.substring(0, txt.length - 1);
      typeSpeed = 50;
    } else {
      // Add character
      txt = command.substring(0, txt.length + 1);
      typeSpeed = 100;
    }
    
    // Update text content
    element.innerHTML = txt + '<span class="cursor">|</span>';
    
    // If complete word
    if (!isDeleting && txt === command) {
      // Wait before starting to delete
      isDeleting = true;
      typeSpeed = 1000;
      waitCount = 0;
    // If deleted
    } else if (isDeleting && txt === '') {
      isDeleting = false;
      typeSpeed = 500;
      
      // Move to next command
      currentIndex = (currentIndex + 1) % commands.length;
    }
    
    // If waiting
    if (isDeleting && txt.length > 0 && txt === command) {
      waitCount++;
      if (waitCount < waitMax) {
        setTimeout(tick, 100);
        return;
      }
    }
    
    setTimeout(tick, typeSpeed);
  }
  
  tick();
}