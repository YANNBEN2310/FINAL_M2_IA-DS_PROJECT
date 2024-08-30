document.addEventListener('DOMContentLoaded', function () {
    // Array of sound files
    const sounds = [
        new Audio('/static/sounds/do.mp3'),   // do
        new Audio('/static/sounds/re.mp3'),   // re
        new Audio('/static/sounds/mi.mp3'),   // mi
        new Audio('/static/sounds/fa.mp3'),   // fa
        new Audio('/static/sounds/sol.mp3'),  // sol
        new Audio('/static/sounds/la.mp3')    // la
    ];

    // Select both section and sub-section elements
    const items = document.querySelectorAll('.section-title, .sub-section-title');

    // Play sound on hover
    items.forEach((item, index) => {
        item.addEventListener('mouseenter', function () {
            const soundIndex = index % sounds.length; // Cycle through the sounds array
            sounds[soundIndex].currentTime = 0; // Reset sound to start
            sounds[soundIndex].play(); // Play sound
        });
    });

    // Navigate using arrow keys
    document.addEventListener('keydown', function (event) {
        if (event.key === 'ArrowLeft') {
            // Navigate to the previous page (home.html)
            window.location.href = '/';
        } else if (event.key === 'ArrowRight') {
            // Navigate to the next page (resume.html)
            window.location.href = '/resume';
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
                window.location.href = '/resume';
            } else if (touchendX > touchstartX) {
                // Swipe right - navigate to the previous page
                window.location.href = '/';
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
