document.addEventListener('keydown', function(event) {
    if (event.key === 'ArrowRight') {
        window.location.href = '/summary';
    }
});

let touchstartX = 0;
let touchendX = 0;

function handleGesture() {
    if (touchendX < touchstartX) {
        // Swipe left - go back to the previous page
        window.history.back();
    }

    if (touchendX > touchstartX) {
        // Swipe right - go to the summary page
        window.location.href = '/summary';
    }
}

document.addEventListener('touchstart', function(event) {
    touchstartX = event.changedTouches[0].screenX;
}, false);

document.addEventListener('touchend', function(event) {
    touchendX = event.changedTouches[0].screenX;
    handleGesture();
}, false);
