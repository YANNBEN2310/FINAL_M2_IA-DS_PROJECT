const form = document.getElementById('networkForm');
const inputNamesDiv = document.getElementById('inputNames');
const hiddenLayerSizesDiv = document.getElementById('hiddenLayerSizes');
const svg = document.getElementById('networkSVG');
const playAnimationBtn = document.getElementById('playAnimationBtn');

// Event listener for form submission
form.addEventListener('submit', function(event) {
    event.preventDefault();
    generateNetwork();
});

// Event listener for changes in the number of input neurons
form.elements['inputCount'].addEventListener('input', function() {
    const count = parseInt(this.value);
    inputNamesDiv.innerHTML = '';
    for (let i = 0; i < count; i++) {
        inputNamesDiv.innerHTML += `<label for="inputName${i}">Name of Input ${i + 1}: </label>
            <input type="text" id="inputName${i}" name="inputName${i}" required>`;
    }
});

// Event listener for changes in the number of hidden layers
form.elements['hiddenLayerCount'].addEventListener('input', function() {
    const count = parseInt(this.value);
    hiddenLayerSizesDiv.innerHTML = '';
    for (let i = 0; i < count; i++) {
        hiddenLayerSizesDiv.innerHTML += `<label for="hiddenLayerSize${i}">Size of Hidden Layer ${i + 1}: </label>
            <input type="number" id="hiddenLayerSize${i}" name="hiddenLayerSize${i}" required>`;
    }
});

// Function to generate the network visualization
function generateNetwork() {
    const inputCount = parseInt(form.elements['inputCount'].value);
    const hiddenLayerCount = parseInt(form.elements['hiddenLayerCount'].value);
    const outputCount = parseInt(form.elements['outputCount'].value);

    const inputNames = [];
    for (let i = 0; i < inputCount; i++) {
        inputNames.push(form.elements['inputName' + i].value);
    }

    const hiddenLayerSizes = [];
    for (let i = 0; i < hiddenLayerCount; i++) {
        hiddenLayerSizes.push(parseInt(form.elements['hiddenLayerSize' + i].value));
    }

    svg.innerHTML = '';
    let layerX = 100; // Starting X position
    const layerYGap = 80;
    const layerXGap = 200;

    let previousLayer = createLayer(svg, inputCount, inputNames, layerX, calculateLayerYOffset(hiddenLayerSizes[0], inputCount, layerYGap), layerYGap, 'blue');
    layerX += layerXGap;

    for (let i = 0; i < hiddenLayerCount; i++) {
        const hiddenLayer = createLayer(svg, hiddenLayerSizes[i], [`Hidden Layer ${i + 1}`], layerX, calculateLayerYOffset(hiddenLayerSizes[0], hiddenLayerSizes[i], layerYGap), layerYGap, getRandomColor());
        createLinks(svg, previousLayer, hiddenLayer);
        previousLayer = hiddenLayer;
        layerX += layerXGap;
    }

    const outputLayer = createLayer(svg, outputCount, ['Output Layer'], layerX, calculateLayerYOffset(hiddenLayerSizes[hiddenLayerCount - 1], outputCount, layerYGap), layerYGap, 'red');
    createLinks(svg, previousLayer, outputLayer);

    // Adjust SVG width dynamically based on the number of layers
    svg.setAttribute('width', `${layerX + 100}px`);

    // Adjust SVG height dynamically based on the largest layer
    let maxLayerHeight = Math.max(inputCount, ...hiddenLayerSizes, outputCount) * layerYGap + 100;
    svg.setAttribute('height', `${maxLayerHeight}px`);
}

// Function to create a layer of neurons
function createLayer(svg, count, names, x, yStart, yGap, color) {
    const neurons = [];
    for (let i = 0; i < count; i++) {
        const cy = yStart + i * yGap;
        const neuron = createNeuron(svg, x, cy, color);
        neurons.push({ x: x, y: cy });
        if (names[i]) {
            createLabel(svg, names[i], x - 30, cy);
        }
    }
    return neurons;
}

// Function to calculate the vertical offset for layers
function calculateLayerYOffset(referenceCount, currentCount, yGap) {
    const totalHeight = (referenceCount - 1) * yGap;
    const currentHeight = (currentCount - 1) * yGap;
    return (totalHeight - currentHeight) / 2 + 50; // +50 for top margin
}

// Function to create a neuron
function createNeuron(svg, cx, cy, color) {
    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle.setAttribute('class', 'neuron');
    circle.setAttribute('cx', cx);
    circle.setAttribute('cy', cy);
    circle.setAttribute('r', 20);
    circle.setAttribute('stroke', color); // Set color based on the layer
    svg.appendChild(circle);
    return circle;
}

// Function to create a label
function createLabel(svg, text, x, y) {
    const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    label.setAttribute('x', x);
    label.setAttribute('y', y + 5);
    label.setAttribute('text-anchor', 'end');
    label.setAttribute('font-size', '12px');
    label.textContent = text;
    svg.appendChild(label);
}

// Function to create links between layers
function createLinks(svg, layer1, layer2) {
    layer1.forEach(neuron1 => {
        layer2.forEach(neuron2 => {
            const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            path.setAttribute('d', `M${neuron1.x + 20},${neuron1.y} C${neuron1.x + 80},${neuron1.y} ${neuron2.x - 80},${neuron2.y} ${neuron2.x - 20},${neuron2.y}`);
            path.setAttribute('class', 'link');
            path.setAttribute('stroke', getRandomColor());
            svg.appendChild(path);
        });
    });
}

// Function to generate random colors for connections
function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// Neuron simulation with animation
function simulateNeuronOperation() {
    const inputVector = [1, 2, 3, 4, 5];
    const weights = [0.2, 0.4, 0.6, 0.8, 1.0];
    const bias = 1.0;

    const inputVectorDisplay = document.getElementById('inputVectorDisplay');
    const weightedSumDisplay = document.getElementById('weightedSumDisplay');
    const activationFunctionDisplay = document.getElementById('activationFunctionDisplay');
    const outputDisplay = document.getElementById('outputDisplay');

    let weightedSum = 0;

    inputVectorDisplay.textContent = '';
    weightedSumDisplay.textContent = '';
    activationFunctionDisplay.textContent = '';
    outputDisplay.textContent = '';

    // Animate input vector display with delay
    inputVector.forEach((value, index) => {
        setTimeout(() => {
            const vectorElement = document.querySelector(`.neuron-operation .symbol:nth-child(${index + 1})`);
            vectorElement.classList.add('highlight');
            inputVectorDisplay.textContent += `x${index + 1} = ${value}\n`;
            vectorElement.classList.remove('highlight');
        }, index * 1000);
    });

    // Animate operations with highlighting in "Weighted Sum"
    inputVector.forEach((value, index) => {
        setTimeout(() => {
            const product = value * weights[index];
            weightedSum += product;

            const weightedSumElement = document.createElement('div');
            weightedSumElement.textContent = `${weights[index]} * ${value} = ${product.toFixed(2)}`;
            weightedSumElement.classList.add('highlight');
            weightedSumDisplay.appendChild(weightedSumElement);

            // Remove highlight after delay
            setTimeout(() => {
                weightedSumElement.classList.remove('highlight');
            }, 1000);

        }, inputVector.length * 1000 + index * 1000);
    });

    // Animate bias addition and final weighted sum
    setTimeout(() => {
        const biasElement = document.createElement('div');
        biasElement.textContent = `Adding bias: ${bias}`;
        biasElement.classList.add('highlight');
        weightedSumDisplay.appendChild(biasElement);

        const finalSumElement = document.createElement('div');
        finalSumElement.textContent = `Weighted Sum: ${weightedSum + bias}`;
        finalSumElement.classList.add('highlight');
        weightedSumDisplay.appendChild(finalSumElement);

        setTimeout(() => {
            biasElement.classList.remove('highlight');
            finalSumElement.classList.remove('highlight');
        }, 1000);
    }, inputVector.length * 2000 + 1000);

    // Animate activation function with highlighting in "Activation Function"
    setTimeout(() => {
        const activatedOutput = Math.max(0, weightedSum + bias);
        const activationDetailsElement = document.createElement('div');
        activationDetailsElement.textContent = `Applying ReLU:\nMax(0, ${weightedSum + bias}) = ${activatedOutput.toFixed(2)}`;
        activationDetailsElement.classList.add('highlight');
        activationFunctionDisplay.appendChild(activationDetailsElement);

        setTimeout(() => {
            activationDetailsElement.classList.remove('highlight');
        }, 1000);
    }, inputVector.length * 2000 + 2000);

    // Final output with highlighting in "Output"
    setTimeout(() => {
        const activatedOutput = Math.max(0, weightedSum + bias);
        const finalOutputElement = document.createElement('div');
        finalOutputElement.textContent = `Final Output: ${activatedOutput.toFixed(2)}`;
        finalOutputElement.classList.add('highlight');
        outputDisplay.appendChild(finalOutputElement);

        setTimeout(() => {
            finalOutputElement.classList.remove('highlight');
        }, 1000);
    }, inputVector.length * 2000 + 3000);
}

playAnimationBtn.addEventListener('click', simulateNeuronOperation);

const darkModeToggle = document.getElementById('darkModeToggle');

darkModeToggle.addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
    document.querySelector('header').classList.toggle('dark-mode');
    document.querySelector('footer').classList.toggle('dark-mode');
    document.querySelector('.container').classList.toggle('dark-mode');
    document.querySelector('.svg-container').classList.toggle('dark-mode');
    document.querySelector('svg').classList.toggle('dark-mode');
    document.querySelector('.simulation-container').classList.toggle('dark-mode');
    
    document.querySelectorAll('.neuron').forEach(neuron => {
        neuron.classList.toggle('dark-mode');
    });

    document.querySelectorAll('.link').forEach(link => {
        link.classList.toggle('dark-mode');
    });

    document.querySelectorAll('.neuron-operation').forEach(operation => {
        operation.classList.toggle('dark-mode');
    });

    document.querySelectorAll('.arrow').forEach(arrow => {
        arrow.classList.toggle('dark-mode');
    });

    document.querySelectorAll('.output-subcontainer').forEach(container => {
        container.classList.toggle('dark-mode');
    });

    document.querySelectorAll('input[type="number"], input[type="text"]').forEach(input => {
        input.classList.toggle('dark-mode');
    });

    document.querySelectorAll('input[type="submit"], #playAnimationBtn, #darkModeToggle').forEach(button => {
        button.classList.toggle('dark-mode');
    });
});

// Existing JavaScript...

// Propagation Animation Event Listeners
document.getElementById('playPropagationModBtn').addEventListener('click', function() {
    playPropagationModAnimation();
});

document.getElementById('playReversePropagationModBtn').addEventListener('click', function() {
    playReversePropagationModAnimation();
});

function playPropagationModAnimation() {
    const svg = document.getElementById('networkSVGMod');
    svg.innerHTML = '';

    const layers = {
        input: { count: 4, yStart: 300, x: 150, yGap: 100, color: '#0000FF', labels: ['Temp', 'Week', 'Day', 'Month'] },
        hidden1: { count: 10, yStart: 300, x: 400, yGap: 60, color: '#32CD32' },
        hidden2: { count: 10, yStart: 300, x: 650, yGap: 60, color: '#006400' },
        output: { count: 1, yStart: 300, x: 900, yGap: 100, color: '#FF0000', labels: [''] }
    };

    const inputNeurons = createModLayer(svg, layers.input, 0);
    const hiddenLayer1 = createModLayer(svg, layers.hidden1, inputNeurons.length * 500);
    const hiddenLayer2 = createModLayer(svg, layers.hidden2, hiddenLayer1.length * 500 + inputNeurons.length * 500);
    const outputNeuron = createModLayer(svg, layers.output, hiddenLayer2.length * 500 + hiddenLayer1.length * 500);

    setTimeout(() => createModLinks(svg, inputNeurons, hiddenLayer1, 0, '#87CEEB'), inputNeurons.length * 500);
    setTimeout(() => createModLinks(svg, hiddenLayer1, hiddenLayer2, 0, '#32CD32'), hiddenLayer1.length * 500 + inputNeurons.length * 500);
    setTimeout(() => createModLinks(svg, hiddenLayer2, outputNeuron, 0, '#FF6347'), hiddenLayer2.length * 500 + hiddenLayer1.length * 500);

    animateModNetwork(inputNeurons, hiddenLayer1, hiddenLayer2, outputNeuron);
}

function playReversePropagationModAnimation() {
    const svg = document.getElementById('networkSVGMod');

    const layers = {
        input: { count: 4, yStart: 300, x: 150, yGap: 100, color: '#0000FF', labels: ['Temp', 'Week', 'Day', 'Month'] },
        hidden1: { count: 10, yStart: 300, x: 400, yGap: 60, color: '#32CD32' },
        hidden2: { count: 10, yStart: 300, x: 650, yGap: 60, color: '#006400' },
        output: { count: 1, yStart: 300, x: 900, yGap: 100, color: '#FF0000', labels: ['O'] }
    };

    const inputNeurons = createModLayer(svg, layers.input, 0);
    const hiddenLayer1 = createModLayer(svg, layers.hidden1, inputNeurons.length * 500);
    const hiddenLayer2 = createModLayer(svg, layers.hidden2, hiddenLayer1.length * 500 + inputNeurons.length * 500);
    const outputNeuron = createModLayer(svg, layers.output, hiddenLayer2.length * 500 + hiddenLayer1.length * 500);

    setTimeout(() => createModLinks(svg, outputNeuron, hiddenLayer2, 0, '#FF6347'), outputNeuron.length * 500);
    setTimeout(() => createModLinks(svg, hiddenLayer2, hiddenLayer1, 0, '#32CD32'), hiddenLayer2.length * 500 + outputNeuron.length * 500);
    setTimeout(() => createModLinks(svg, hiddenLayer1, inputNeurons, 0, '#87CEEB'), hiddenLayer1.length * 500 + hiddenLayer2.length * 500);

    animateModReverseNetwork(outputNeuron, hiddenLayer2, hiddenLayer1, inputNeurons);
}

function createModLayer(svg, layer, delay) {
    const neurons = [];
    for (let i = 0; i < layer.count; i++) {
        const cx = layer.x;
        const cy = layer.yStart + i * layer.yGap - (layer.count - 1) * layer.yGap / 2;
        const neuron = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        neuron.setAttribute('class', 'neuron-mod');
        neuron.setAttribute('cx', cx);
        neuron.setAttribute('cy', cy);
        neuron.setAttribute('r', 17);
        neuron.setAttribute('stroke', '#333');
        neuron.setAttribute('fill', layer.color);
        neuron.style.opacity = 0;
        svg.appendChild(neuron);
        neurons.push({ cx, cy, element: neuron });

        setTimeout(() => {
            neuron.style.opacity = 1;
            neuron.classList.add('neuron-visible-mod');
        }, delay + i * 500);

        if (layer.labels && layer.labels[i]) {
            const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            label.setAttribute('x', cx - 30);
            label.setAttribute('y', cy + 5);
            label.setAttribute('text-anchor', 'end');
            label.setAttribute('font-size', '12px');
            label.textContent = layer.labels[i];
            svg.appendChild(label);
        }
    }
    return neurons;
}

function createModLinks(svg, layer1, layer2, delay, color) {
    layer1.forEach((neuron1, i) => {
        layer2.forEach((neuron2, j) => {
            const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            path.setAttribute('class', 'link-mod');

            const startX = neuron1.cx;
            const startY = neuron1.cy;
            const endX = neuron2.cx;
            const endY = neuron2.cy;

            const controlX1 = (startX + endX) / 2;
            const controlY1 = startY;
            const controlX2 = (startX + endX) / 2;
            const controlY2 = endY;

            const pathData = `M${startX},${startY} C${controlX1},${controlY1} ${controlX2},${controlY2} ${endX},${endY}`;
            path.setAttribute('d', pathData);

            path.setAttribute('stroke', color);
            path.setAttribute('fill', 'none');
            svg.appendChild(path);

            setTimeout(() => {
                path.classList.add('link-visible-mod');
                path.classList.add('link-active-mod');
                setTimeout(() => {
                    path.classList.remove('link-active-mod');
                }, 1000);
            }, delay + (i + j) * 200);
        });
    });
}

function animateModNetwork(inputNeurons, hiddenLayer1, hiddenLayer2, outputNeuron) {
    inputNeurons.forEach((neuron, i) => {
        setTimeout(() => {
            highlightSingleModNeuron(neuron);
            sendModSignalsFromNeuron(neuron, hiddenLayer1);
        }, i * 1000);
    });

    setTimeout(() => {
        highlightModNeurons(hiddenLayer1);
        sendModSignals(hiddenLayer1, hiddenLayer2);
    }, inputNeurons.length * 1000 + 2000);

    setTimeout(() => {
        highlightModNeurons(hiddenLayer2);
        sendModSignals(hiddenLayer2, outputNeuron);
    }, inputNeurons.length * 1000 + hiddenLayer1.length * 1000 + 4000);

    setTimeout(() => highlightSingleModNeuron(outputNeuron[0]), inputNeurons.length * 1000 + hiddenLayer1.length * 1000 + hiddenLayer2.length * 1000 + 6000);
}

function animateModReverseNetwork(outputNeuron, hiddenLayer2, hiddenLayer1, inputNeurons) {
    highlightSingleModNeuron(outputNeuron[0]);
    sendModSignalsFromNeuron(outputNeuron[0], hiddenLayer2);

    setTimeout(() => {
        highlightModNeurons(hiddenLayer2);
        sendModSignals(hiddenLayer2, hiddenLayer1);
    }, 2000);

    setTimeout(() => {
        highlightModNeurons(hiddenLayer1);
        sendModSignals(hiddenLayer1, inputNeurons);
    }, 4000);

    setTimeout(() => highlightModNeurons(inputNeurons), 6000);
}

function highlightModNeurons(neurons) {
    neurons.forEach((neuron, i) => {
        setTimeout(() => {
            neuron.element.classList.add('neuron-highlight-mod');
            setTimeout(() => neuron.element.classList.remove('neuron-highlight-mod'), 500);
        }, i * 500);
    });
}

function highlightSingleModNeuron(neuron) {
    neuron.element.classList.add('neuron-highlight-mod');
    setTimeout(() => neuron.element.classList.remove('neuron-highlight-mod'), 1000);
}

function sendModSignalsFromNeuron(neuron, targetLayer, reverse = false) {
    targetLayer.forEach((targetNeuron, j) => {
        const link = findModLink(reverse ? targetNeuron.element : neuron.element, reverse ? neuron.element : targetNeuron.element);
        if (link) {
            setTimeout(() => {
                link.classList.add('link-active-mod');
                targetNeuron.element.classList.add('neuron-highlight-mod');
                setTimeout(() => {
                    link.classList.remove('link-active-mod');
                    targetNeuron.element.classList.remove('neuron-highlight-mod');
                }, 1000);
            }, j * 200);
        }
    });
}

function sendModSignals(layer1, layer2, reverse = false) {
    layer1.forEach((sourceNeuron, i) => {
        layer2.forEach((targetNeuron, j) => {
            const link = findModLink(reverse ? targetNeuron.element : sourceNeuron.element, reverse ? sourceNeuron.element : targetNeuron.element);
            if (link) {
                setTimeout(() => {
                    link.classList.add('link-active-mod');
                    targetNeuron.element.classList.add('neuron-highlight-mod');
                    setTimeout(() => {
                        link.classList.remove('link-active-mod');
                        targetNeuron.element.classList.remove('neuron-highlight-mod');
                    }, 1000);
                }, i * 200 + j * 200);
            }
        });
    });
}

function findModLink(sourceElement, targetElement) {
    const svg = document.getElementById('networkSVGMod');
    const links = svg.querySelectorAll('.link-mod');
    for (let link of links) {
        const pathData = link.getAttribute('d');
        if (pathData.includes(sourceElement.getAttribute('cx')) && pathData.includes(targetElement.getAttribute('cx'))) {
            return link;
        }
    }
    return null;
}

function cyclicModNeuronActivity(inputNeurons, hiddenLayer1, hiddenLayer2, outputNeuron) {
    setInterval(() => {
        animateModNetwork(inputNeurons, hiddenLayer1, hiddenLayer2, outputNeuron);
        setTimeout(() => {
            animateModReverseNetwork(outputNeuron, hiddenLayer2, hiddenLayer1, inputNeurons);
        }, 8000);
    }, 16000);
}

// Integrate dark mode toggle for new subcontainer
darkModeToggle.addEventListener('click', function() {
    document.querySelector('.propagation-container').classList.toggle('dark-mode');
    document.querySelector('.propagation-content-mod').classList.toggle('dark-mode');
    document.querySelector('#networkSVGMod').classList.toggle('dark-mode');
});
