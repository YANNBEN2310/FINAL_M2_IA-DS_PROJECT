document.addEventListener('DOMContentLoaded', function () {
    // Arrow key navigation
    document.addEventListener('keydown', function(event) {
        if (event.key === 'ArrowRight') {
            window.location.href = '/problem';  // Replace with the actual URL of the next page
        }
        if (event.key === 'ArrowLeft') {
            window.location.href = '/resume';  // Navigate to the previous page
        }
    });

    // Toggle content visibility
    function toggleContent() {
        const content = document.getElementById('context-content');
        const button = document.getElementById('toggle-button');
        if (content.style.display === 'none') {
            content.style.display = 'block';
            button.textContent = 'Masquer';
        } else {
            content.style.display = 'none';
            button.textContent = 'Afficher';
        }
    }

    // Array of sound files
    const sounds = [
        new Audio('/static/sounds/do.mp3'),
        new Audio('/static/sounds/re.mp3'),
        new Audio('/static/sounds/mi.mp3'),
        new Audio('/static/sounds/fa.mp3'),
        new Audio('/static/sounds/sol.mp3'),
        new Audio('/static/sounds/la.mp3')
    ];

    // Play sound on hover
    document.querySelectorAll('.circle-container').forEach((subcontainer, index) => {
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
                // Swipe left - navigate to the next page (problem.html)
                window.location.href = '/problem';
            } else if (touchendX > touchstartX) {
                // Swipe right - navigate to the previous page (resume.html)
                window.location.href = '/resume';
            }
        }
    }

    document.addEventListener('touchstart', function (event) {
        touchstartX = event.changedTouches[0].screenX;
    }, false);

    document.addEventListener('touchend', function (event) {
        touchendX = event.changedTouches[0].screenX;
        handleGesture();
    }, false);
});
