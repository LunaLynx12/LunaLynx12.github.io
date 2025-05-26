document.addEventListener('DOMContentLoaded', () => {
  initTerminal();
});

function initTerminal() {
  const terminalBody = document.querySelector('.terminal-body');

  const commands = [
    { command: '$ whoami', output: 'luna@lynx:~$' },
    { command: '$ cat banner.txt', output: 'Red Teamer | Penetration Tester | CTF Player | Bug Bounty Enthusiast' },
    { command: '$ echo "Welcome to the terminal!"', output: 'Welcome to the terminal!' }
  ];

  const commandElements = [];
  const outputElements = [];

  for (const { command, output } of commands) {
    const cmdEl = document.createElement('div');
    cmdEl.className = 'terminal-command';
    cmdEl.innerHTML = `<span class="prompt">$</span> ${command.slice(2)}`;
    cmdEl.style.visibility = 'hidden';
    terminalBody.appendChild(cmdEl);
    commandElements.push(cmdEl);

    const outEl = document.createElement('div');
    outEl.className = 'terminal-output';
    outEl.textContent = output;
    outEl.style.display = 'none';
    terminalBody.appendChild(outEl);
    outputElements.push(outEl);
  }

  const currentLine = document.createElement('div');
  currentLine.className = 'terminal-current';
  terminalBody.appendChild(currentLine);

  showCommandSequence(commandElements, outputElements, () => {
    setTimeout(() => startRandomTyping(currentLine), 1000);
  });
}

function showCommandSequence(commands, outputs, onComplete) {
  let index = 0;

  function next() {
    if (index >= commands.length) {
      onComplete?.();
      return;
    }

    const cmd = commands[index];
    const out = outputs[index];

    animateTyping(cmd, () => {
      showOutput(out);
      index++;
      setTimeout(next, 1000);
    });
  }

  next();
}

function animateTyping(element, callback) {
  const fullText = element.textContent;
  element.textContent = '';
  element.style.visibility = 'visible';
  element.classList.add('typing');

  let i = 0;
  const interval = setInterval(() => {
    if (i < fullText.length) {
      element.textContent += fullText[i++];
    } else {
      clearInterval(interval);
      callback?.();
    }
  }, 120);
}

function showOutput(element) {
  element.style.display = 'block';
  element.classList.add('fade-in');
}

function startRandomTyping(currentLine) {
  const commands = [
    '$ ls -la',
    '$ cd /home/hacker',
    '$ sudo nmap -sS -p- target.com',
    '$ hydra -l admin -P wordlist.txt target.com ssh',
    '$ sqlmap -u "http://target.com/page.php?id=1" --dbs',
    '$ dirb http://target.com/ /usr/share/wordlists/dirb/big.txt',
    '$ python3 exploit.py',
    '$ msfconsole',
    '$ cat /etc/passwd',
    '$ ssh root@target.com',
    '$ gcc exploit.c -o exploit',
    '$ nc -lvp 4444',
    '$ curl -s https://target.com/api '
  ];

  let currentIndex = 0;
  let isDeleting = false;
  let currentText = '';
  let delay = 120;
  let waitCounter = 0;

  function typeLoop() {
    const fullCommand = commands[currentIndex];

    if (isDeleting) {
      currentText = currentText.slice(0, -1);
      delay = 50;
    } else {
      currentText = fullCommand.slice(0, currentText.length + 1);
      delay = 120;
    }

    currentLine.className = 'terminal-command';
    currentLine.innerHTML = `<span class="prompt">$</span> ${currentText.slice(2)}`;

    if (!isDeleting && currentText === fullCommand) {
      if (++waitCounter < 30) {
        setTimeout(typeLoop, 100);
        return;
      }
      isDeleting = true;
      waitCounter = 0;
      delay = 1000;
    }

    if (isDeleting && currentText === '') {
      isDeleting = false;
      currentIndex = (currentIndex + 1) % commands.length;
      delay = 500;
    }

    setTimeout(typeLoop, delay);
  }

  typeLoop();
}
