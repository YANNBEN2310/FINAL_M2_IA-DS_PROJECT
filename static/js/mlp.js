document.getElementById('btnPlay').addEventListener('click', function () {
    const normalizationSection = document.getElementById('normalization');
    const formulaDisplay = document.getElementById('formulaDisplay');
    const mlpImage = document.getElementById('mlpImage');

    // Display the normalization formula
    let minLabel = "min(x)";
    let maxLabel = "max(x)";
    let formula = `x' = (x - ${minLabel}) / (${maxLabel} - ${minLabel})`;
    formulaDisplay.innerHTML = formula;

    // Clear content initially
    normalizationSection.innerHTML = '';

    // Simulated data for Temperature and Energy before normalization (3x3 matrix)
    const temperatureData = [
        [15.2, 14.0, 16.5],
        [10.5, 11.2, 12.0],
        [18.7, 17.8, 19.1]
    ];

    const energyData = [
        [120.5, 118.2, 125.6],
        [115.2, 117.0, 118.9],
        [130.3, 128.4, 132.1]
    ];

    // MinMaxScaler details
    const calculateMinMaxScaler = (data) => {
        const flatData = data.flat();
        const min = Math.min(...flatData);
        const max = Math.max(...flatData);
        const scalerInfo = { min, max };
        const normalizedData = data.map(row => row.map(x => ((x - min) / (max - min)).toFixed(3)));
        return { normalizedData, scalerInfo };
    };

    const { normalizedData: normalizedTemperature, scalerInfo: tempScalerInfo } = calculateMinMaxScaler(temperatureData);
    const { normalizedData: normalizedEnergy, scalerInfo: energyScalerInfo } = calculateMinMaxScaler(energyData);

    // Function to generate matrix HTML with additional scaler information
    const generateMatrixHTML = (matrix, title, scalerInfo) => {
        let html = `<h3>${title}</h3>`;
        if (scalerInfo) {
            html += `<p>Min Value: ${scalerInfo.min}, Max Value: ${scalerInfo.max}</p>`;
        }
        html += `<table border="1" style="margin-bottom: 20px;">`;
        matrix.forEach(row => {
            html += '<tr>';
            row.forEach(value => {
                html += `<td style="padding: 10px; text-align: center;">${value}</td>`;
            });
            html += '</tr>';
        });
        html += '</table>';
        return html;
    };

    // Display the matrices before normalization
    normalizationSection.innerHTML += generateMatrixHTML(temperatureData, 'Temperature Matrix Before Normalization');
    normalizationSection.innerHTML += generateMatrixHTML(energyData, 'Energy Matrix Before Normalization');

    normalizationSection.classList.add('active');

    // Display the normalized matrices with MinMaxScaler details after a delay
    setTimeout(() => {
        normalizationSection.innerHTML += generateMatrixHTML(normalizedTemperature, 'Temperature Matrix After Normalization', tempScalerInfo);
        normalizationSection.innerHTML += generateMatrixHTML(normalizedEnergy, 'Energy Matrix After Normalization', energyScalerInfo);

        // Animate the MLP process
        animateMLPProcess(normalizedTemperature, normalizedEnergy);
    }, 3000); // 3 seconds delay to simulate the normalization process
});

function animateMLPProcess(temperatureData, energyData) {
    const mlpImage = document.getElementById('mlpImage');

    // Initial animation setup
    mlpImage.classList.add('animate-mlp');

    // Simulate data flow through the MLP network
    setTimeout(() => {
        // Change the color of the lines or add a glowing effect to represent data flowing through layers
        // The animation can be done by updating CSS classes or directly manipulating SVG elements
        mlpImage.style.filter = 'brightness(1.2)';
        
        setTimeout(() => {
            // Simulate the first hidden layer processing
            mlpImage.style.filter = 'brightness(1.5) hue-rotate(20deg)';

            setTimeout(() => {
                // Simulate the second hidden layer processing
                mlpImage.style.filter = 'brightness(1.8) hue-rotate(40deg)';

                setTimeout(() => {
                    // Final output layer processing
                    mlpImage.style.filter = 'brightness(2) hue-rotate(60deg)';
                    
                    setTimeout(() => {
                        // End of the animation, reset to original state
                        mlpImage.style.filter = 'none';
                    }, 1000); // Final state duration
                }, 1000); // Second hidden layer duration
            }, 1000); // First hidden layer duration
        }, 1000); // Initial flow duration
    }, 500); // Start animation after showing normalized matrices
}

document.getElementById('btnNotebook').addEventListener('click', function () {
    window.open('static/links/SIMILARITE.html', '_blank');
});

document.getElementById('btnToggle').addEventListener('click', function () {
    document.body.classList.toggle('dark-mode');
});
 // Navigation through keyboard arrows
document.addEventListener('keydown', function(event) {
    if (event.key === 'ArrowRight') {
        window.location.href = '/mlp';  // Replace with actual next page URL
    }
    if (event.key === 'ArrowLeft') {
        window.location.href = '/nlp';  // Replace with actual previous page URL
    }
});   

document.getElementById('btnAnimation').addEventListener('click', function () {
    window.open('/neuron', '_blank');
});

// bagging regressor 
document.getElementById('btnBaggingAnimation').addEventListener('click', function () {
    const baggingContainer = document.getElementById('baggingAnimationContainer');
    
    // Clear any existing content
    baggingContainer.innerHTML = '';

    // Simulated input data for illustration
    const inputData = [15.2, 120.5];  // For simplicity, use temperature and energy
    const weights = [0.8, 0.5];       // Hypothetical weights for MLPs
    const biases = [2.0, 1.5];        // Hypothetical biases for MLPs
    const n_estimators = 5;

    // Function to calculate the output of a single MLP model
    const calculateMLPOutput = (inputData, weights, bias) => {
        // Simple linear combination + bias
        let output = inputData.reduce((sum, x, i) => sum + x * weights[i], 0) + bias;
        return output.toFixed(1);  // Return a rounded result
    };

    // Function to create an MLP model box with the computed prediction and formula
    const createMLPBoxWithFormula = (inputData, weights, bias, index) => {
        const output = calculateMLPOutput(inputData, weights, bias);
        const formula = `(${weights[0]} * ${inputData[0]}) + (${weights[1]} * ${inputData[1]}) + ${bias} = ${output}`;

        const box = document.createElement('div');
        box.classList.add('bagging-mlp');
        box.innerHTML = `
            <div class="model-title">Modèle MLP ${index + 1}</div>
            <div class="formula">${formula}</div>
            <div class="prediction">${output} kWh</div>
        `;
        return box;
    };

    // Generate and display predictions for each MLP model
    const mlpBoxes = [];
    for (let i = 0; i < n_estimators; i++) {
        // Adjust weights and bias slightly for each model to simulate different MLPs
        const adjustedWeights = weights.map(w => w + (Math.random() * 0.1 - 0.05));
        const adjustedBias = biases[i % biases.length] + (Math.random() * 0.2 - 0.1);
        const mlpBox = createMLPBoxWithFormula(inputData, adjustedWeights, adjustedBias, i);
        mlpBoxes.push(mlpBox);
        baggingContainer.appendChild(mlpBox);
    }

    // Calculate the final prediction as the average of the MLP outputs
    const finalPrediction = mlpBoxes.reduce((sum, box) => sum + parseFloat(box.querySelector('.prediction').textContent), 0) / n_estimators;

    // Display the final prediction box
    const finalBox = document.createElement('div');
    finalBox.classList.add('bagging-final');
    finalBox.innerHTML = `
        <div>Prédiction Finale:</div>
        <div>${finalPrediction.toFixed(1)} kWh</div>
    `;
    setTimeout(() => {
        baggingContainer.appendChild(finalBox);
        finalBox.classList.add('active');
    }, n_estimators * 600);  // Show after all MLPs are displayed

    // Animate each MLP box
    mlpBoxes.forEach((box, index) => {
        setTimeout(() => {
            box.classList.add('active');
        }, index * 600); // Delay between each MLP activation
    });
});

document.getElementById('btnMetricsAnimation').addEventListener('click', function () {
    const metricsContainer = document.getElementById('metricsAnimationContainer');
    
    // Clear any existing content
    metricsContainer.innerHTML = '';

    // Simulated data: actual and predicted values
    const actual = [120.5, 115.2, 130.3, 118.7, 135.4];
    const predicted = [120.6, 114.8, 129.7, 119.0, 136.2];
    const n = actual.length;

    // Calculate RMSE
    const rmse = Math.sqrt(actual.reduce((sum, y, i) => sum + Math.pow(y - predicted[i], 2), 0) / n).toFixed(3);

    // Calculate MAE
    const mae = (actual.reduce((sum, y, i) => sum + Math.abs(y - predicted[i]), 0) / n).toFixed(3);

    // Calculate R²
    const meanActual = actual.reduce((sum, y) => sum + y, 0) / n;
    const ssTot = actual.reduce((sum, y) => sum + Math.pow(y - meanActual, 2), 0);
    const ssRes = actual.reduce((sum, y, i) => sum + Math.pow(y - predicted[i], 2), 0);
    const rSquared = (1 - ssRes / ssTot).toFixed(3);

    // RMSE Explanation
    const rmseStep = document.createElement('div');
    rmseStep.classList.add('metric-step');
    rmseStep.innerHTML = `
        <h4>Calcul du RMSE</h4>
        <p>Formule:</p>
        <p>$$\\text{RMSE} = \\sqrt{\\frac{1}{n} \\sum_{i=1}^{n} (y_i - \\hat{y}_i)^2}$$</p>
        <p>Calcul:</p>
        <ul>
            ${actual.map((y, i) => `<li>$$(${y} - ${predicted[i]})^2 = ${(Math.pow(y - predicted[i], 2)).toFixed(3)}$$</li>`).join('')}
        </ul>
        <p>Somme des erreurs quadratiques : $$\\sum_{i=1}^{n} (y_i - \\hat{y}_i)^2 = ${actual.reduce((sum, y, i) => sum + Math.pow(y - predicted[i], 2), 0).toFixed(3)}$$</p>
        <p>RMSE = <strong>${rmse}</strong></p>
    `;
    metricsContainer.appendChild(rmseStep);

    // MAE Explanation
    const maeStep = document.createElement('div');
    maeStep.classList.add('metric-step');
    maeStep.innerHTML = `
        <h4>Calcul du MAE</h4>
        <p>Formule:</p>
        <p>$$\\text{MAE} = \\frac{1}{n} \\sum_{i=1}^{n} |y_i - \\hat{y}_i|$$</p>
        <p>Calcul:</p>
        <ul>
            ${actual.map((y, i) => `<li>$$|${y} - ${predicted[i]}| = ${Math.abs(y - predicted[i]).toFixed(3)}$$</li>`).join('')}
        </ul>
        <p>Somme des erreurs absolues : $$\\sum_{i=1}^{n} |y_i - \\hat{y}_i| = ${actual.reduce((sum, y, i) => sum + Math.abs(y - predicted[i]), 0).toFixed(3)}$$</p>
        <p>MAE = <strong>${mae}</strong></p>
    `;
    metricsContainer.appendChild(maeStep);

    // R² Explanation
    const r2Step = document.createElement('div');
    r2Step.classList.add('metric-step');
    r2Step.innerHTML = `
        <h4>Calcul du R²</h4>
        <p>Formule:</p>
        <p>$$R^2 = 1 - \\frac{\\sum_{i=1}^{n} (y_i - \\hat{y}_i)^2}{\\sum_{i=1}^{n} (y_i - \\bar{y})^2}$$</p>
        <p>Calcul:</p>
        <p>Moyenne des valeurs réelles : $$\\bar{y} = ${meanActual.toFixed(3)}$$</p>
        <p>SS<sub>tot</sub> = $$\\sum_{i=1}^{n} (y_i - \\bar{y})^2 = ${ssTot.toFixed(3)}$$</p>
        <p>SS<sub>res</sub> = $$\\sum_{i=1}^{n} (y_i - \\hat{y}_i)^2 = ${ssRes.toFixed(3)}$$</p>
        <p>R² = <strong>${rSquared}</strong></p>
    `;
    metricsContainer.appendChild(r2Step);

    // Animate the steps
    const steps = document.querySelectorAll('.metric-step');
    steps.forEach((step, index) => {
        setTimeout(() => {
            step.classList.add('active');
            // Re-render MathJax equations
            MathJax.typeset();
        }, index * 1000); // Delay between each step activation
    });
});

document.getElementById('btnCrossValidationAnimation').addEventListener('click', function () {
    const cvContainer = document.getElementById('crossValidationAnimationContainer');
    
    // Clear any existing content
    cvContainer.innerHTML = '';

    // Simulated fold data
    const folds = [
        { training: [2, 3, 4], validation: 1, error: 0.12 },
        { training: [1, 3, 5], validation: 2, error: 0.15 },
        { training: [1, 2, 5], validation: 3, error: 0.10 }
    ];

    // Function to create a fold box
    const createFoldBox = (fold, index) => {
        const box = document.createElement('div');
        box.classList.add('fold-container');
        box.innerHTML = `
            <div><strong>Fold ${index + 1}</strong></div>
            <div>Entraînement: ${fold.training.join(', ')}</div>
            <div>Validation: ${fold.validation}</div>
            <div>Erreur: ${fold.error.toFixed(2)}</div>
        `;
        return box;
    };

    // Generate and display fold boxes
    folds.forEach((fold, index) => {
        const foldSet = document.createElement('div');
        foldSet.classList.add('fold-set');
        foldSet.appendChild(createFoldBox(fold, index));
        cvContainer.appendChild(foldSet);
    });

    // Calculate the Cross-Validation error
    const cvError = (folds.reduce((sum, fold) => sum + fold.error, 0) / folds.length).toFixed(3);

    // Display the final Cross-Validation error after all folds are shown
    const resultBox = document.createElement('div');
    resultBox.classList.add('result-container');
    resultBox.innerHTML = `
        <div>Erreur de Validation Croisée:</div>
        <div>${cvError}</div>
    `;
    
    setTimeout(() => {
        cvContainer.appendChild(resultBox);
        resultBox.classList.add('active');
    }, folds.length * 1000); // Show after all folds are displayed

    // Animate each fold set
    const foldSets = document.querySelectorAll('.fold-set');
    foldSets.forEach((set, index) => {
        setTimeout(() => {
            set.firstElementChild.classList.add('active');
        }, index * 1000); // Delay between each fold set activation
    });
});
document.getElementById('btnBaselineAnimation').addEventListener('click', function () {
    const baselineContainer = document.getElementById('baselineAnimationContainer');
    
    // Clear any existing content
    baselineContainer.innerHTML = '';

    // Simulated target values from the training set
    const targetValues = [120.5, 115.2, 130.3, 118.7, 135.4];
    const n = targetValues.length;

    // Calculate the mean value (Dummy Regressor prediction)
    const meanValue = (targetValues.reduce((sum, y) => sum + y, 0) / n).toFixed(2);

    // Dummy Regressor Prediction box
    const dummyBox = document.createElement('div');
    dummyBox.classList.add('dummy-box');
    dummyBox.innerHTML = `
        <div><strong>Dummy Regressor</strong></div>
        <div>Moyenne des cibles:</div>
        <div>$$\\hat{y} = \\frac{1}{${n}} \\sum_{i=1}^{${n}} y_i = ${meanValue}$$ kWh</div>
    `;
    baselineContainer.appendChild(dummyBox);

    // Simulated performance metrics based on Dummy Regressor
    const dummyPerformance = {
        RMSE: 5.12,
        MAE: 4.35,
        R2: 0.78
    };

    // Display the performance metrics after the Dummy Regressor prediction
    const resultBox = document.createElement('div');
    resultBox.classList.add('dummy-result-container');
    resultBox.innerHTML = `
        <div><strong>Performances du Dummy Regressor</strong></div>
        <div>RMSE: ${dummyPerformance.RMSE.toFixed(2)}</div>
        <div>MAE: ${dummyPerformance.MAE.toFixed(2)}</div>
        <div>R²: ${dummyPerformance.R2.toFixed(2)}</div>
    `;
    
    setTimeout(() => {
        baselineContainer.appendChild(resultBox);
        resultBox.classList.add('active');
        // Re-render MathJax equations after adding the content
        MathJax.typeset();
    }, 2000); // Show after the Dummy Regressor prediction

    // Animate the Dummy Regressor box
    setTimeout(() => {
        dummyBox.classList.add('active');
    }, 500); // Slight delay before showing the Dummy Regressor prediction
});
