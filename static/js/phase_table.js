document.addEventListener('DOMContentLoaded', function () {
    // Adding hover effects to table rows
    document.querySelectorAll('tbody tr').forEach(row => {
        row.addEventListener('mouseenter', () => {
            row.style.backgroundColor = '#e6f7ff';
        });

        row.addEventListener('mouseleave', () => {
            const phaseClass = row.classList[0];
            if (phaseClass === 'phase1') {
                row.style.backgroundColor = '#d9e8ff';
            } else if (phaseClass === 'phase2') {
                row.style.backgroundColor = '#ffd9d9';
            } else if (phaseClass === 'phase3') {
                row.style.backgroundColor = '#d9ffd9';
            } else if (phaseClass === 'phase4') {
                row.style.backgroundColor = '#fff0d9';
            }
        });
    });

    // Add sounds on hover (optional)
    const sounds = [
        new Audio('/static/sounds/do.mp3'),
        new Audio('/static/sounds/re.mp3'),
        new Audio('/static/sounds/mi.mp3'),
        new Audio('/static/sounds/fa.mp3'),
        new Audio('/static/sounds/sol.mp3'),
    ];

    document.querySelectorAll('tbody tr').forEach((row, index) => {
        row.addEventListener('mouseenter', () => {
            const sound = sounds[index % sounds.length];
            sound.currentTime = 0;
            sound.play().catch(error => {
                console.error('Error playing sound:', error);
            });
        });
    });

    // Navigation through keyboard arrows
    document.addEventListener('keydown', function(event) {
        if (event.key === 'ArrowRight') {
            window.location.href = '/gantt';  // Replace with actual next page URL
        }
        if (event.key === 'ArrowLeft') {
            window.location.href = '/outlooks';  // Replace with actual previous page URL
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
                window.location.href = '/gantt';
            } else if (touchendX > touchstartX) {
                // Swipe right - navigate to the previous page
                window.location.href = '/outlooks';
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
