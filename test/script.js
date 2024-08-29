document.addEventListener('DOMContentLoaded', () => {
    const inputs = [20, 3, 10, 7];
    const W1 = [
        [0.2, 0.4],
        [0.6, 0.8],
        [0.3, 0.5],
        [0.7, 0.9]
    ];
    const b1 = [0.1, 0.2];
    const W2 = [
        [0.1, 0.3],
        [0.5, 0.7]
    ];
    const b2 = [0.1, 0.2];
    const W3 = [0.2, 0.4];
    const b3 = 0.1;

    function relu(x) {
        return Math.max(0, x);
    }

    function forwardPropagation() {
        // First hidden layer
        let Z1 = [0, 0];
        for (let i = 0; i < 2; i++) {
            for (let j = 0; j < 4; j++) {
                Z1[i] += W1[j][i] * inputs[j];
            }
            Z1[i] += b1[i];
        }
        let A1 = [relu(Z1[0]), relu(Z1[1])];

        // Update hidden layer 1 neurons
        document.getElementById('h1').textContent = `H1: ${A1[0].toFixed(2)}`;
        document.getElementById('h2').textContent = `H2: ${A1[1].toFixed(2)}`;

        // Second hidden layer
        let Z2 = [0, 0];
        for (let i = 0; i < 2; i++) {
            for (let j = 0; j < 2; j++) {
                Z2[i] += W2[j][i] * A1[j];
            }
            Z2[i] += b2[i];
        }
        let A2 = [relu(Z2[0]), relu(Z2[1])];

        // Update hidden layer 2 neurons
        document.getElementById('h3').textContent = `H3: ${A2[0].toFixed(2)}`;
        document.getElementById('h4').textContent = `H4: ${A2[1].toFixed(2)}`;

        // Output layer
        let Z3 = 0;
        for (let i = 0; i < 2; i++) {
            Z3 += W3[i] * A2[i];
        }
        Z3 += b3;
        let output = Z3;

        // Update output neuron
        document.getElementById('output').textContent = `Output: ${output.toFixed(2)}`;
    }

    forwardPropagation();
});
