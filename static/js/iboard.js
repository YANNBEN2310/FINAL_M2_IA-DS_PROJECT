document.addEventListener('DOMContentLoaded', function () {
    // Add sound effect on hover for the features
    const featureItems = document.querySelectorAll('.features-container, .usage-item, .limit-item');
    const hoverSound = new Audio('/static/sounds/hover-sound.mp3');  // Example sound file

    featureItems.forEach(item => {
        item.addEventListener('mouseenter', function () {
            hoverSound.currentTime = 0;
            hoverSound.play();
        });
    });

    // Keyboard navigation
    document.addEventListener('keydown', function (event) {
        if (event.key === 'ArrowRight') {
            window.location.href = '/witness';  // Navigate to the next page
        }
        if (event.key === 'ArrowLeft') {
            window.location.href = '/goal';  // Navigate to the previous page
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
                // Swipe left - navigate to the next page (witness.html)
                window.location.href = '/witness';
            } else if (touchendX > touchstartX) {
                // Swipe right - navigate to the previous page (goal.html)
                window.location.href = '/goal';
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
