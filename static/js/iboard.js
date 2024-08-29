document.addEventListener('DOMContentLoaded', function () {
    // Add any interactive functionalities here

    // Example: Add sound effect on hover for the features
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
            window.location.href = '/witness';  // Replace with the actual URL of the next page
        }
        if (event.key === 'ArrowLeft') {
            window.location.href = '/goal';  // Replace with the actual URL of the previous page
        }
    });
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
