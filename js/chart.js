const ctx = document.getElementById('ctfDoughnutChart').getContext('2d');
const ctfDoughnutChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
        labels: [
            'Web', 'OSINT', 'Cryptography', 'Forensics', 'Reverse', 'Pwn', 'Blockchain', 'Miscellaneous'
        ],
        datasets: [{
            data: [19, 8, 18, 15, 11, 6, 8, 12],
            backgroundColor: [
                '#2c3e50', // Web
                '#e74c3c', // OSINT
                '#16a085', // Cryptography
                '#00ffcc', // Forensics
                '#f39c12', // Reverse
                '#8e44ad', // Pwn
                '#1abc9c', // Blockchain
                '#95a5a6' // Miscellaneous
            ],
            borderWidth: 0
        }]
    },
    options: {
        responsive: true,
        cutout: '70%',
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    color: '#fff',
                    boxWidth: 12,
                    padding: 15
                }
            },
            tooltip: {
                callbacks: {
                    label: function(context) {
                        const total = context.chart._metasets[context.datasetIndex].total;
                        const value = context.raw;
                        const percentage = ((value / total) * 100).toFixed(2);
                        return `${context.label} - ${value} (${percentage}%)`;
                    }
                }
            }
        }
    }
});

const vulnBarChartCtx = document.getElementById('vulnBarChart').getContext('2d');
const vulnBarChart = new Chart(vulnBarChartCtx, {
    type: 'bar',
    data: {
        labels: ['SQLi', 'XSS', 'CSRF', 'RCE', 'LFI', 'IDOR', 'XXE', 'SSRF'],
        datasets: [{
            label: 'Vulnerabilities Found',
            data: [12, 9, 7, 4, 6, 8, 3, 5],
            backgroundColor: [
                '#e74c3c', '#f39c12', '#16a085', '#8e44ad',
                '#2c3e50', '#1abc9c', '#00ffcc', '#95a5a6'
            ],
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: { display: false },
            title: {
                display: true,
                text: 'Vulnerabilities Discovered by Type',
                color: '#fff'
            }
        },
        scales: {
            x: {
                ticks: { color: '#fff' }
            },
            y: {
                beginAtZero: true,
                ticks: { color: '#fff' }
            }
        }
    }
});