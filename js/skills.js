const skillTags = [
    // Web Security
    "OWASP ZAP", "Burp Suite", "SQLmap", "Nmap", "XSStrike", "CSRFTester", "DVWA", "Mutillidae",

    // OSINT
    "Maltego", "Shodan", "TheHarvester", "Recon-ng", "Google Dorks", "Whois", "Pastebin Scraper",

    // Cryptography
    "John the Ripper", "Hashcat", "OpenSSL", "CyberChef", "Stegsolve", "Binwalk", "Foremost",

    // Forensics
    "Volatility", "Wireshark", "Tcpdump", "Autopsy", "Sleuth Kit", "ExifTool", "Log2Timeline",

    // Reverse Engineering
    "IDA Pro", "Ghidra", "Radare2", "x64dbg", "GDB", "Dependency Walker", "Cutter",

    // Pwn / Exploitation
    "Metasploit Framework", "Netcat", "Responder", "Impacket", "pwntools", "ROPgadget", "Frida",

    // Blockchain
    "Ethereum Wallet", "Solidity", "Truffle Suite", "MyEtherWallet", "Remix IDE", "Etherscan", "Slither",

    // Miscellaneous
    "Kali Linux", "Linux Enumeration", "LinEnum", "BloodHound", "Mimikatz", "DNS Enumeration", "Cloud Misconfigurations",

    // SQL Injection
    "SQLMap", "Blind SQLi", "Union-Based SQLi", "Error-Based SQLi", "Time-Based SQLi", "NoSQL Injection", "Second Order SQLi",

    // Remote Code Execution (RCE)
    "Command Injection", "PHPMailer", "Deserialization RCE", "XML External Entity (XXE)", "Local File Inclusion (LFI)",
    "Remote File Inclusion (RFI)", "Template Engine Injection", "Code Evaluation",

    // Cross-Site Scripting (XSS)
    "XSStrike", "DOM XSS Scanner", "Stored XSS", "Reflected XSS", "DOM-Based XSS", "XSS Filters Evasion", "Clickjacking",

    // Cross-Site Request Forgery (CSRF)
    "CSRF PoC Generator", "CSRF Token Bruteforce", "CSRF with XSS Combination", "CSRF via Email",
    "SameSite Cookie Attribute", "Origin Header Validation"
];

function loadSkillTags() {
    const skillTagsContainer = document.getElementById("dynamic-skill-tags");
    if (!skillTagsContainer) return;

    skillTags.forEach(tag => {
        const span = document.createElement("span");
        span.className = "skill-tag";
        span.textContent = tag;
        skillTagsContainer.appendChild(span);
    });
  }

window.onload = loadSkillTags;