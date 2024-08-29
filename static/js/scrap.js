// Function to download SVG
document.getElementById('download-svg').addEventListener('click', function() {
    var content = document.getElementById('content-to-capture').innerHTML;

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
    link.download = 'architecture.svg';
    link.click();
});

// Function to download PNG
document.getElementById('download-png').addEventListener('click', function() {
    html2canvas(document.getElementById('content-to-capture'), {
        scale: 2,
        useCORS: true,
        allowTaint: true
    }).then(function(canvas) {
        canvas.toBlob(function(blob) {
            var link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = 'architecture.png';
            link.click();
        });
    });
});

// Function to download GIF using gifshot
document.getElementById('download-gif').addEventListener('click', function() {
    var gifFrames = [];
    var containers = [
        document.getElementById('sub-container-1'),
        document.getElementById('sub-container-2'),
        document.getElementById('sub-container-3'),
        document.getElementById('sub-container-4'),
        document.getElementById('sub-container-5'),
        document.getElementById('sub-container-6'),
        document.getElementById('sub-container-7'),
        document.getElementById('sub-container-8')
    ];

    function captureFrame(index) {
        if (index < containers.length) {
            containers[index].classList.add('expand');
            html2canvas(document.getElementById('content-to-capture'), {
                scale: 2,
                useCORS: true,
                allowTaint: true
            }).then(function(canvas) {
                gifFrames.push(canvas.toDataURL("image/png"));
                containers[index].classList.remove('expand');
                captureFrame(index + 1);
            });
        } else {
            gifshot.createGIF({
                images: gifFrames,
                gifWidth: 1200,
                gifHeight: 800,
                interval: 0.5,
                numFrames: gifFrames.length,
                frameDuration: 1,
                sampleInterval: 10,
                numWorkers: 4
            }, function (obj) {
                if (!obj.error) {
                    var link = document.createElement('a');
                    link.href = obj.image;
                    link.download = 'animation.gif';
                    link.click();
                }
            });
        }
    }

    captureFrame(0);
});

// Adding sound effects on hover
const sounds = [
    new Audio('/static/sounds/do.mp3'),
    new Audio('/static/sounds/re.mp3'),
    new Audio('/static/sounds/mi.mp3'),
    new Audio('/static/sounds/fa.mp3'),
    new Audio('/static/sounds/sol.mp3'),
    new Audio('/static/sounds/la.mp3'),
    new Audio('/static/sounds/si.mp3'),
    new Audio('/static/sounds/do_high.mp3')
];

const containers = [
    document.getElementById('sub-container-1'),
    document.getElementById('sub-container-2'),
    document.getElementById('sub-container-3'),
    document.getElementById('sub-container-4'),
    document.getElementById('sub-container-5'),
    document.getElementById('sub-container-6'),
    document.getElementById('sub-container-7'),
    document.getElementById('sub-container-8')
];

containers.forEach((container, index) => {
    container.addEventListener('mouseenter', function() {
        const sound = sounds[index % sounds.length];
        sound.currentTime = 0; // Reset sound to the beginning
        sound.play(); // Play sound
    });
});

// Navigation through keyboard arrows
document.addEventListener('keydown', function(event) {
    if (event.key === 'ArrowRight') {
        window.location.href = '/techno'; // Replace with actual next page
    }
    if (event.key === 'ArrowLeft') {
        window.location.href = '/witness'; // Replace with actual previous page
    }
});

