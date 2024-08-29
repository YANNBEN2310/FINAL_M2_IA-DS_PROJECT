document.addEventListener('keydown', function(event) {
    if (event.key === 'ArrowRight') {
        window.location.href = '/problem';  // Replace '/nextpage' with the actual URL of the next page
    }
    if (event.key === 'ArrowLeft') {
        window.location.href = '/resume';  // Navigate to the previous page (summary.html)
    }
});
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