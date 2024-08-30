document.addEventListener('DOMContentLoaded', function () {
    // Time Savings Chart
    var timeCtx = document.getElementById('timeChart').getContext('2d');
    var timeChart = new Chart(timeCtx, {
        type: 'doughnut',
        data: {
            labels: ['Temps Manuel (23,45h)', 'Temps Automatisé (3,57h)'],
            datasets: [{
                data: [23.45, 3.57],
                backgroundColor: ['#ff6384', '#36a2eb'],
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: true,
                    position: 'bottom',
                },
                tooltip: {
                    callbacks: {
                        label: function (context) {
                            let label = context.label || '';
                            let value = context.raw || 0;
                            let total = context.dataset.data.reduce((acc, val) => acc + val, 0);
                            let percentage = (value / total * 100).toFixed(2);
                            return `${label}: ${value}h (${percentage}%)`;
                        }
                    }
                }
            }
        }
    });

    // Budget Savings Chart
    var budgetCtx = document.getElementById('budgetChart').getContext('2d');
    var budgetChart = new Chart(budgetCtx, {
        type: 'doughnut',
        data: {
            labels: ['Mensuel (497€)', 'Annuel (5964€)', '5 ans (29820€)'],
            datasets: [{
                data: [497, 5964, 29820],
                backgroundColor: ['#4bc0c0', '#ffcd56', '#ff9f40'],
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: true,
                    position: 'bottom',
                },
                tooltip: {
                    callbacks: {
                        label: function (context) {
                            let label = context.label || '';
                            let value = context.raw || 0;
                            return `${label}: ${value}€`;
                        }
                    }
                }
            }
        }
    });

    // Data Management Chart
    var dataCtx = document.getElementById('dataChart').getContext('2d');
    var dataChart = new Chart(dataCtx, {
        type: 'doughnut',
        data: {
            labels: ['Sites Traités (297)', 'Temps par Site (2,14 min)'],
            datasets: [{
                data: [297, 2.14],
                backgroundColor: ['#9966ff', '#ff6384'],
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: true,
                    position: 'bottom',
                },
                tooltip: {
                    callbacks: {
                        label: function (context) {
                            let label = context.label || '';
                            let value = context.raw || 0;
                            return `${label}: ${value}`;
                        }
                    }
                }
            }
        }
    });

    // Calculate Savings
    function calculateSavings() {
        var siteCount = document.getElementById('siteCount').value;
        if (siteCount && siteCount > 0) {
            var manualTime = 23.45 / 297 * siteCount;
            var autoTime = 3.57 / 297 * siteCount;
            var timeSaved = (manualTime - autoTime).toFixed(2);
            var budgetSaved = (timeSaved * (25 / 60)).toFixed(2); // Assuming 25€/hour

            document.getElementById('timeSaved').innerText = `${timeSaved} heures`;
            document.getElementById('budgetSaved').innerText = `${budgetSaved} euros`;
        } else {
            document.getElementById('timeSaved').innerText = "0 heures";
            document.getElementById('budgetSaved').innerText = "0 euros";
        }
    }

    // Function to download SVG
    document.getElementById('download-svg').addEventListener('click', function () {
        var content = document.getElementById('content-to-capture').innerHTML;

        // Create an SVG element with a foreignObject
        var svg = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600">
                        <foreignObject width="100%" height="100%">
                            <div xmlns="http://www.w3.org/1999/xhtml" style="font-size:40px">
                                ${content}
                            </div>
                        </foreignObject>
                    </svg>`;

        var blob = new Blob([svg], { type: 'image/svg+xml' });
        var link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'impact_gestion_energetique.svg';
        link.click();
    });

    // Function to download PNG
    document.getElementById('download-png').addEventListener('click', function () {
        html2canvas(document.getElementById('content-to-capture'), {
            scale: 2,  // Increase scale factor for higher resolution
            useCORS: true,  // Ensures that images from different origins are rendered correctly
            allowTaint: true // Allows cross-origin images to be loaded without using CORS
        }).then(function (canvas) {
            canvas.toBlob(function (blob) {
                var link = document.createElement('a');
                link.href = URL.createObjectURL(blob);
                link.download = 'impact_gestion_energetique.png';
                link.click();
            });
        });
    });

    // Function to download GIF using gifshot
    document.getElementById('download-gif').addEventListener('click', function () {
        var gifFrames = [];
        var containers = document.querySelectorAll('.section');

        function captureFrame(index) {
            if (index < containers.length) {
                containers[index].classList.add('hoverable');
                html2canvas(document.getElementById('content-to-capture'), {
                    scale: 2,  // Increase scale factor for better resolution
                    useCORS: true,
                    allowTaint: true
                }).then(function (canvas) {
                    gifFrames.push(canvas.toDataURL("image/png"));
                    containers[index].classList.remove('hoverable');
                    captureFrame(index + 1);
                });
            } else {
                // Create the GIF using gifshot with higher resolution settings
                gifshot.createGIF({
                    images: gifFrames,
                    gifWidth: 1200,  // Increase the width for a wider GIF
                    gifHeight: 800,  // Adjust the height accordingly to maintain aspect ratio
                    interval: 0.5,
                    numFrames: gifFrames.length,
                    frameDuration: 1,
                    sampleInterval: 10,
                    numWorkers: 4
                }, function (obj) {
                    if (!obj.error) {
                        var link = document.createElement('a');
                        link.href = obj.image;
                        link.download = 'impact_gestion_energetique.gif';
                        link.click();
                    }
                });
            }
        }

        captureFrame(0); // Start capturing frames
    });

    // Navigation through keyboard arrows
    document.addEventListener('keydown', function(event) {
        if (event.key === 'ArrowRight') {
            window.location.href = '/outlooks';  // Replace with actual next page URL
        }
        if (event.key === 'ArrowLeft') {
            window.location.href = '/scrap_result';  // Replace with actual previous page URL
        }
    });

    // Swipe navigation for mobile devices
    let touchstartX = 0;
    let touchendX = 0;
    const swipeThreshold = 50; // Minimum distance in pixels to be considered a swipe

    function handleGesture() {
        if (Math.abs(touchstartX - touchendX) > swipeThreshold) { // Ensure the swipe is significant enough
            if (touchendX < touchstartX) {
                // Swipe left - navigate to the next page
                window.location.href = '/outlooks';
            } else if (touchendX > touchstartX) {
                // Swipe right - navigate to the previous page
                window.location.href = '/scrap_result';
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
