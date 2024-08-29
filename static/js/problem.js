// problem.js
document.addEventListener('keydown', function(event) {
    if (event.key === 'ArrowRight') {
        window.location.href = '/goal';  // Navigate to the goal page
    }
    if (event.key === 'ArrowLeft') {
        window.location.href = '/intro';  // Navigate to the intro page
    }
});
document.addEventListener('DOMContentLoaded', function() {
    const problemSection = document.getElementById('problem-section');
    const problemAudio = document.getElementById('problem-audio');

    // Play audio on mouse enter
    problemSection.addEventListener('mouseenter', function() {
        problemAudio.currentTime = 0; // Reset audio to the beginning
        problemAudio.play(); // Play the audio
    });

    // Pause audio on mouse leave
    problemSection.addEventListener('mouseleave', function() {
        problemAudio.pause(); // Pause the audio
        problemAudio.currentTime = 0; // Optionally, reset audio to the beginning
    });
});
