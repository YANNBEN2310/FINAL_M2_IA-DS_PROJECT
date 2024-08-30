document.addEventListener('DOMContentLoaded', function () {
    // Open a new window when the button is clicked
    document.getElementById('btnNotebook').addEventListener('click', function() {
        window.open('static/links/SIMILARITE.html', '_blank');
    });

    // Process the addresses and calculate TF-IDF and cosine similarity
    document.getElementById('btnPlay').addEventListener('click', function() {
        const originalContainer = document.getElementById('originalAddresses');
        const preprocessedContainer = document.getElementById('preprocessedAddresses');
        const tfidfContainer = document.getElementById('tfidfVectors');
        const similarityContainer = document.getElementById('cosineSimilarity');
        const tfidfFormula = document.getElementById('tfidfFormula');
        const cosineFormula = document.getElementById('cosineFormula');
        const cosineGraphContainer = document.getElementById('cosineGraphContainer');
        const cosineGraph = document.getElementById('cosineGraph');
        
        originalContainer.innerHTML = '';
        preprocessedContainer.innerHTML = '';
        tfidfContainer.innerHTML = '';
        similarityContainer.innerHTML = '';
        
        const originalAddresses = [
            "123 Main St., Apt #4A, New York, NY 10001",
            "456 Broadway, Suite 200, San Francisco, CA 94133"
        ];

        originalAddresses.forEach(address => {
            const div = document.createElement('div');
            div.className = 'address';
            div.textContent = address;
            originalContainer.appendChild(div);
        });

        setTimeout(() => {
            preprocessedContainer.classList.remove('hidden');
            const preprocessedAddresses = originalAddresses.map(preprocessAddress);
            preprocessedAddresses.forEach(address => {
                const div = document.createElement('div');
                div.className = 'address preprocessed';
                div.textContent = address;
                preprocessedContainer.appendChild(div);
            });

            setTimeout(() => {
                tfidfContainer.classList.remove('hidden');
                tfidfFormula.classList.remove('hidden');
                const { tfidf, words } = calculateTfIdf(preprocessedAddresses);
                tfidf.forEach((vector, index) => {
                    const div = document.createElement('div');
                    div.className = 'vector';
                    div.innerHTML = `Adresse ${index + 1}: [${vector.join(', ')}]<br>`;
                    words.forEach((word, idx) => {
                        const span = document.createElement('span');
                        span.textContent = `${word}: ${vector[idx]}`;
                        span.style.color = index === 0 ? 'blue' : 'red';
                        div.appendChild(span);
                    });
                    tfidfContainer.appendChild(div);
                });

                setTimeout(() => {
                    similarityContainer.classList.remove('hidden');
                    cosineFormula.classList.remove('hidden');
                    cosineGraphContainer.classList.remove('hidden');
                    cosineGraph.classList.remove('hidden');
                    tfidf.forEach((vector, index) => {
                        const similarity = cosineSimilarity(tfidf[0], vector);
                        const div = document.createElement('div');
                        div.className = 'similarity';
                        div.textContent = `Similarité cosinus entre l'Adresse 1 et l'Adresse ${index + 1}: ${similarity.toFixed(2)}`;
                        similarityContainer.appendChild(div);

                        // Detailed Calculation Display
                        if (index === 1) {
                            const detailedCalcDiv = document.createElement('div');
                            detailedCalcDiv.className = 'formula';
                            detailedCalcDiv.innerHTML = `
                                <h3>Calcul Détailé</h3>
                                <p>Vecteur TF-IDF pour l'Adresse 1 : [${tfidf[0].join(', ')}]</p>
                                <p>Vecteur TF-IDF pour l'Adresse 2 : [${tfidf[1].join(', ')}]</p>
                                <p>Produit Scalaire (A · B) : ${calculateDotProduct(tfidf[0], tfidf[1]).toFixed(2)}</p>
                                <p>Norme de A (||A||) : ${calculateMagnitude(tfidf[0]).toFixed(2)}</p>
                                <p>Norme de B (||B||) : ${calculateMagnitude(tfidf[1]).toFixed(2)}</p>
                                <p>Similarité Cosinus : ${similarity.toFixed(2)}</p>
                            `;
                            similarityContainer.appendChild(detailedCalcDiv);
                        }
                    });

                    drawCosineGraph(tfidf[0], tfidf[1]);
                }, 2000); // Show cosine similarity after 2 seconds
            }, 2000); // Show TF-IDF vectors after 2 seconds
        }, 2000); // Show preprocessed addresses after 2 seconds
    });

    // Toggle dark mode
    document.getElementById('btnToggle').addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
    });

    function preprocessAddress(address) {
        address = address.toLowerCase();
        address = address.replace(/[^a-z0-9\s]/g, '');
        return address.split(' ').join(' ');
    }

    function calculateTfIdf(addresses) {
        const words = [...new Set(addresses.join(' ').split(' '))];
        const tfidf = addresses.map(address => {
            const vector = words.map(word => address.split(' ').filter(w => w === word).length);
            return vector;
        });
        return { tfidf, words };
    }

    function cosineSimilarity(A, B) {
        const dotProduct = A.reduce((sum, a, idx) => sum + a * B[idx], 0);
        const magnitudeA = Math.sqrt(A.reduce((sum, a) => sum + a * a, 0));
        const magnitudeB = Math.sqrt(B.reduce((sum, b) => sum + b * b, 0));
        return dotProduct / (magnitudeA * magnitudeB);
    }

    function calculateDotProduct(A, B) {
        return A.reduce((sum, a, idx) => sum + a * B[idx], 0);
    }

    function calculateMagnitude(vector) {
        return Math.sqrt(vector.reduce((sum, val) => sum + val * val, 0));
    }

    function drawCosineGraph(A, B) {
        const canvas = document.getElementById('cosineGraph');
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const origin = { x: 300, y: 200 };
        const scale = 50;

        function drawVector(v, color, label) {
            ctx.beginPath();
            ctx.moveTo(origin.x, origin.y);
            ctx.lineTo(origin.x + v[0] * scale, origin.y - v[1] * scale);
            ctx.strokeStyle = color;
            ctx.lineWidth = 2;
            ctx.stroke();
            ctx.fillStyle = color;
            ctx.fillText(label, origin.x + v[0] * scale + 5, origin.y - v[1] * scale + 5);
        }

        function drawAxes() {
            ctx.beginPath();
            ctx.moveTo(origin.x, 0);
            ctx.lineTo(origin.x, canvas.height);
            ctx.moveTo(0, origin.y);
            ctx.lineTo(canvas.width, origin.y);
            ctx.strokeStyle = 'black';
            ctx.lineWidth = 1;
            ctx.stroke();
        }

        drawAxes();
        drawVector(A, 'blue', 'A');
        drawVector(B, 'red', 'B');

        const angle = Math.acos(cosineSimilarity(A, B));
        ctx.beginPath();
        ctx.arc(origin.x, origin.y, scale, 0, angle, false);
        ctx.strokeStyle = 'green';
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.fillStyle = 'green';
        ctx.fillText(`θ = ${angle.toFixed(2)} rad`, origin.x + scale + 10, origin.y - scale + 10);
    }

    // Navigation through keyboard arrows
    document.addEventListener('keydown', function(event) {
        if (event.key === 'ArrowRight') {
            window.location.href = '/mlp';  // Replace with actual next page URL
        }
        if (event.key === 'ArrowLeft') {
            window.location.href = '/gantt';  // Replace with actual previous page URL
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
                window.location.href = '/mlp';
            } else if (touchendX > touchstartX) {
                // Swipe right - navigate to the previous page
                window.location.href = '/gantt';
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
