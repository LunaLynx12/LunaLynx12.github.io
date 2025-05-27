const labelLinePlugin = {
    id: 'labelLinePlugin',
    afterDraw(chart, args, options) {
        const {ctx, chartArea: {left, right, top, bottom}, data} = chart;
        const meta = chart.getDatasetMeta(0);
        const radius = chart._metasets[0].data[0].outerRadius;
        const centerX = chart.getDatasetMeta(0).data[0].x;
        const centerY = chart.getDatasetMeta(0).data[0].y;

        ctx.save();
        ctx.font = '12px sans-serif';
        ctx.fillStyle = '#fff';
        ctx.strokeStyle = '#fff';

        meta.data.forEach((arc, index) => {
            const angle = (arc.startAngle + arc.endAngle) / 2;
            const x = centerX + Math.cos(angle) * (radius + 10);
            const y = centerY + Math.sin(angle) * (radius + 10);

            const label = `${data.labels[index]} - ${data.datasets[0].data[index]} (${((data.datasets[0].data[index] / data.datasets[0].data.reduce((a, b) => a + b)) * 100).toFixed(2)}%)`;

            const lineEndX = x + (Math.cos(angle) > 0 ? 40 : -40);
            ctx.beginPath();
            ctx.moveTo(centerX + Math.cos(angle) * radius, centerY + Math.sin(angle) * radius);
            ctx.lineTo(x, y);
            ctx.lineTo(lineEndX, y);
            ctx.stroke();

            ctx.textAlign = Math.cos(angle) > 0 ? 'left' : 'right';
            ctx.fillText(label, lineEndX + (Math.cos(angle) > 0 ? 5 : -5), y);
        });

        ctx.restore();
    }
};

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
        cutout: '60%',
        layout: {
            padding: {
                left: 180,
                right: 180,
            }
        },
        plugins: {
            legend: { display: false },
            title: {
                display: true,
                text: 'Category Breakdown',
                font: {
                    size: 17,
                    family: 'Arial',
                    weight: 'bold'
                },
                color: '#fff'
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
    },
    plugins: [labelLinePlugin]
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
                font: {
                    size: 17,
                    family: 'Arial',
                    weight: 'bold'
                },
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