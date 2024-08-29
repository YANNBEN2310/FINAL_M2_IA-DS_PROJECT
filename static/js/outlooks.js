// Function to download SVG
document.getElementById('download-svg').addEventListener('click', function () {
    var content = document.getElementById('content-to-capture').innerHTML;

    // Create an SVG element with a foreignObject
    var svg = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600">
                <foreignObject width="100%" height="100%">
                    <div xmlns="http://www.w3.org/1999/xhtml" style="font-size:40px">
                        ${content}
                    </div>
                </foreignObject>
              </svg>`;

    var blob = new Blob([svg], { type: 'image/svg+xml' });
    var link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'perspectives_evolution.svg';
    link.click();
});

// Function to download PNG
document.getElementById('download-png').addEventListener('click', function () {
    html2canvas(document.getElementById('content-to-capture'), {
        scale: 2,  // Increase scale factor for higher resolution
        useCORS: true,  // This ensures that images from different origins are rendered correctly
        allowTaint: true // Allows cross-origin images to be loaded without using CORS
    }).then(function (canvas) {
        canvas.toBlob(function (blob) {
            var link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = 'perspectives_evolution.png';
            link.click();
        });
    });
});

// Function to download GIF using gifshot
document.getElementById('download-gif').addEventListener('click', function () {
    var gifFrames = [];
    var containers = document.querySelectorAll('.sub-container, .sub-sub-container');

    function captureFrame(index) {
        if (index < containers.length) {
            containers[index].classList.add('hoverable');
            html2canvas(document.getElementById('content-to-capture'), {
                scale: 2,  // Increase scale factor for better resolution
                useCORS: true,
                allowTaint: true
            }).then(function (canvas) {
                gifFrames.push(canvas.toDataURL("image/png"));
                containers[index].classList.remove('hoverable');
                captureFrame(index + 1);
            });
        } else {
            // Create the GIF using gifshot with higher resolution settings
            gifshot.createGIF({
                images: gifFrames,
                gifWidth: 1200,  // Increase the width for a wider GIF
                gifHeight: 800,  // Adjust the height accordingly to maintain aspect ratio
                interval: 0.5,
                numFrames: gifFrames.length,
                frameDuration: 1,
                sampleInterval: 10,
                numWorkers: 4
            }, function (obj) {
                if (!obj.error) {
                    var link = document.createElement('a');
                    link.href = obj.image;
                    link.download = 'perspectives_evolution.gif';
                    link.click();
                }
            });
        }
    }

    captureFrame(0); // Start capturing frames
});

// Play sound on hover over sub-containers
const sounds = [
    new Audio('/static/sounds/do.mp3'),
    new Audio('/static/sounds/re.mp3'),
    new Audio('/static/sounds/mi.mp3'),
    new Audio('/static/sounds/fa.mp3'),
    new Audio('/static/sounds/sol.mp3'),
    new Audio('/static/sounds/la.mp3'),
    new Audio('/static/sounds/si.mp3')
];

document.querySelectorAll('.sub-container, .sub-sub-container').forEach((container, index) => {
    container.addEventListener('mouseenter', function () {
        const sound = sounds[index % sounds.length];
        sound.currentTime = 0;
        sound.play().catch((error) => {
            console.error('Error playing sound:', error);
        });
    });
});

 // Navigation through keyboard arrows
document.addEventListener('keydown', function(event) {
    if (event.key === 'ArrowRight') {
        window.location.href = '/phase_table';  // Replace with actual next page URL
    }
    if (event.key === 'ArrowLeft') {
        window.location.href = '/impact';  // Replace with actual previous page URL
    }
});   
