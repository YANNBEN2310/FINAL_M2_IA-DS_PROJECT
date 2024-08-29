document.addEventListener('keydown', function(event) {
    if (event.key === 'ArrowRight') {
        window.location.href = '/iboard';  // Replace '/nextpage.html' with the actual next page
    }
    if (event.key === 'ArrowLeft') {
        window.location.href = '/problem';  // Navigate to the previous page (intro.html)
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
