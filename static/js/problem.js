document.addEventListener('DOMContentLoaded', function() {
    // Arrow key navigation
    document.addEventListener('keydown', function(event) {
        if (event.key === 'ArrowRight') {
            window.location.href = '/goal';  // Navigate to the goal page
        }
        if (event.key === 'ArrowLeft') {
            window.location.href = '/intro';  // Navigate to the intro page
        }
    });

    // Audio playback on hover
    const problemSection = document.getElementById('problem-section');
    const problemAudio = document.getElementById('problem-audio');

    problemSection.addEventListener('mouseenter', function() {
        problemAudio.currentTime = 0; // Reset audio to the beginning
        problemAudio.play(); // Play the audio
    });

    problemSection.addEventListener('mouseleave', function() {
        problemAudio.pause(); // Pause the audio
        problemAudio.currentTime = 0; // Optionally, reset audio to the beginning
    });

    // Swipe navigation for mobile devices
    let touchstartX = 0;
    let touchendX = 0;
    const swipeThreshold = 50; // Minimum distance in pixels to be considered a swipe

    function handleGesture() {
        if (Math.abs(touchstartX - touchendX) > swipeThreshold) { // Ensure the swipe is significant enough
            if (touchendX < touchstartX) {
                // Swipe left - navigate to the goal page
                window.location.href = '/goal';
            } else if (touchendX > touchstartX) {
                // Swipe right - navigate to the intro page
                window.location.href = '/intro';
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
