document.addEventListener('DOMContentLoaded', function () {
    // Chart.js Configuration for the rolesChart
    const rolesCtx = document.getElementById('rolesChart').getContext('2d');
    new Chart(rolesCtx, {
        type: 'doughnut',
        data: {
            labels: ['Energy Managers', 'Référents', 'Coordinateurs', 'Responsables', 'Support Client'],
            datasets: [{
                data: [40, 20, 20, 20],
                backgroundColor: ['#42a5f5', '#66bb6a', '#ffa726', '#ef5350', '#ab47bc'],
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });

    // Chart.js Configuration for the responseChart
    const responseCtx = document.getElementById('responseChart').getContext('2d');
    new Chart(responseCtx, {
        type: 'doughnut',
        data: {
            labels: ['Participants', 'Non Participants'],
            datasets: [{
                data: [71, 29],
                backgroundColor: ['#42a5f5', '#ef5350'],
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });

    // Chart.js Configuration for the satisfactionChart with different colors for each bar
    const satisfactionCtx = document.getElementById('satisfactionChart').getContext('2d');
    new Chart(satisfactionCtx, {
        type: 'bar',
        data: {
            labels: ['Avg Satisfied', 'Avg Deceptive', 'Deceptive', 'Satisfied', 'V.Satisfied'],
            datasets: [{
                label: 'Satisfaction Scores',
                data: [3, 5, 8, 2, 1],
                backgroundColor: [
                    '#42a5f5', // Blue
                    '#66bb6a', // Green
                    '#ffa726', // Orange
                    '#ef5350', // Red 
                    '#ab47bc'  // Purple
                ]
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    // Chart.js Configuration for the energyTypeChart
    const energyTypeCtx = document.getElementById('energyTypeChart').getContext('2d');
    new Chart(energyTypeCtx, {
        type: 'doughnut',
        data: {
            labels: ['Electricité', 'Gaz', 'Eau'],
            datasets: [{
                data: [100, 80, 60],
                backgroundColor: ['#42a5f5', '#66bb6a', '#ffa726'],
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });

    // Chart.js Configuration for the besoinsChart
    const besoinsCtx = document.getElementById('besoinsChart').getContext('2d');
    new Chart(besoinsCtx, {
        type: 'doughnut',
        data: {
            labels: [
                'Analyse des trous de données avec des intervalles',
                'Détection automatique des trous de données',
                'Détection automatique des erreurs de données',
                'Visualisation claire des anomalies de consommation',
                'Intégration de prédictions automatiques'
            ],
            datasets: [{
                data: [20, 20, 20, 20, 20], // Assuming equal distribution for simplicity
                backgroundColor: [
                    '#42a5f5',
                    '#64b5f6',
                    '#ef5350',
                    '#66bb6a',
                    '#aed581'
                ],
                hoverOffset: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'right'
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            let label = context.label || '';
                            if (label) {
                                label += ': ';
                            }
                            label += context.raw + '%';
                            return label;
                        }
                    }
                }
            }
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', function(event) {
        if (event.key === 'ArrowRight') {
            window.location.href = '/scrap';  // Navigate to the next page
        }
        if (event.key === 'ArrowLeft') {
            window.location.href = '/iboard';  // Navigate to the previous page
        }
    });

    // Array of sound files
    const sounds = [
        new Audio('/static/sounds/do.mp3'),
        new Audio('/static/sounds/re.mp3'),
        new Audio('/static/sounds/mi.mp3'),
        new Audio('/static/sounds/fa.mp3'),
        new Audio('/static/sounds/sol.mp3'),
        new Audio('/static/sounds/la.mp3')
    ];

    document.querySelectorAll('.section-container').forEach((subcontainer, index) => {
        subcontainer.addEventListener('mouseenter', function () {
            const soundIndex = index % sounds.length;
            const sound = sounds[soundIndex];

            // Ensure the audio is reset before playing
            sound.currentTime = 0;

            // Attempt to play sound
            sound.play().catch((error) => {
                console.error('Error playing sound:', error);
            });
        });
    });

    // Swipe navigation for mobile devices
    let touchstartX = 0;
    let touchendX = 0;
    const swipeThreshold = 50; // Minimum distance in pixels to be considered a swipe

    function handleGesture() {
        if (Math.abs(touchstartX - touchendX) > swipeThreshold) { // Ensure the swipe is significant enough
            if (touchendX < touchstartX) {
                // Swipe left - navigate to the next page (scrap.html)
                window.location.href = '/scrap';
            } else if (touchendX > touchstartX) {
                // Swipe right - navigate to the previous page (iboard.html)
                window.location.href = '/iboard';
            }
        }
    }

    document.addEventListener('touchstart', function(event) {
        touchstartX = event.changedTouches[0].screenX;
    }, false);

    document.addEventListener('touchend', function(event) {
        touchendX = event.changedTouches[0].screenX;
        handleGesture();
    }, false);
});
