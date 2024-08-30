document.addEventListener('DOMContentLoaded', function () {
    function toggleDisplay() {
        var table = document.querySelector('.gantt-table');
        var chartContainer = document.querySelector('.chart-container');
        var timeline = document.querySelector('.timeline');

        if (chartContainer.style.display === 'none') {
            chartContainer.style.display = 'block';
            timeline.style.display = 'flex';
            table.style.display = 'none';
        } else {
            chartContainer.style.display = 'none';
            timeline.style.display = 'none';
            table.style.display = 'table';
        }
    }

    const bars = document.querySelectorAll('.gantt-bar');
    bars.forEach(bar => {
        bar.addEventListener('mouseenter', function () {
            const duration = this.getAttribute('data-duration');
            const tooltip = document.createElement('div');
            tooltip.innerText = duration;
            tooltip.className = 'tooltip';
            tooltip.style.position = 'absolute';
            tooltip.style.background = '#000';
            tooltip.style.color = '#fff';
            tooltip.style.padding = '5px';
            tooltip.style.borderRadius = '3px';
            tooltip.style.top = '-25px';
            this.appendChild(tooltip);
        });

        bar.addEventListener('mouseleave', function () {
            this.removeChild(this.lastChild);
        });
    });

    function downloadChart() {
        html2canvas(document.querySelector("#ganttChart")).then(function (canvas) {
            var link = document.createElement('a');
            link.href = canvas.toDataURL();
            link.download = 'gantt_chart.png';
            link.click();
        });
    }

    // Navigation through keyboard arrows
    document.addEventListener('keydown', function(event) {
        if (event.key === 'ArrowRight') {
            window.location.href = '/nlp';  // Replace with actual next page URL
        }
        if (event.key === 'ArrowLeft') {
            window.location.href = '/phase_table';  // Replace with actual previous page URL
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
                window.location.href = '/nlp';
            } else if (touchendX > touchstartX) {
                // Swipe right - navigate to the previous page
                window.location.href = '/phase_table';
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
