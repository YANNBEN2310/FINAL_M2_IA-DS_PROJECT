document.addEventListener("DOMContentLoaded", function () {
    const inputLayerCircles = document.querySelectorAll('.input_layer');
    const hiddenLayerCircles1 = document.querySelectorAll('.h_layer_1');
    const hiddenLayerCircles2 = document.querySelectorAll('.h_layer_2');
    const outputLayerCircle = document.querySelectorAll('.output_1');
    const inputTexts = document.querySelectorAll('.input');
    const layerTexts = document.querySelectorAll('text[class^="text-layer"]');
    const connectionsInputToHidden1 = document.querySelectorAll('.link_input_h_layer_1');
    const connectionsHidden1ToHidden2 = document.querySelectorAll('.link_h_layer_1_h_layer_2');
    const connectionsHidden2ToOutput = document.querySelectorAll('.link_ouput_1_h_layer_2');

    // Hide all elements initially
    [...inputLayerCircles, ...hiddenLayerCircles1, ...hiddenLayerCircles2, ...outputLayerCircle, ...inputTexts, ...layerTexts, ...connectionsInputToHidden1, ...connectionsHidden1ToHidden2, ...connectionsHidden2ToOutput].forEach(el => {
        el.style.opacity = '0';
    });

    // Function to display elements with a delay
    function displayElements(elements, delay) {
        elements.forEach((el, index) => {
            setTimeout(() => {
                el.style.transition = 'opacity 0.5s';
                el.style.opacity = '1';
            }, delay * index);
        });
    }

    // Animate input layer circles first, then texts
    displayElements(inputLayerCircles, 500);

    setTimeout(() => {
        displayElements(inputTexts, 500);
    }, inputLayerCircles.length * 500);

    // Then display the input layer description text
    setTimeout(() => {
        displayElements([layerTexts[0]], 500); // Input Layer ∈ ℝ⁴
    }, (inputLayerCircles.length + inputTexts.length) * 500);

    // Then display the first hidden layer circles
    setTimeout(() => {
        displayElements(hiddenLayerCircles1, 500);
    }, (inputLayerCircles.length + inputTexts.length + 1) * 500);

    // Then display the connections between input layer and hidden layer 1
    setTimeout(() => {
        displayElements(connectionsInputToHidden1, 100);
    }, (inputLayerCircles.length + inputTexts.length + 1 + hiddenLayerCircles1.length) * 500);

    // Then display the first hidden layer description text
    setTimeout(() => {
        displayElements([layerTexts[1]], 500); // Hidden Layer ∈ ℝ¹⁰
    }, (inputLayerCircles.length + inputTexts.length + 1 + hiddenLayerCircles1.length + connectionsInputToHidden1.length) * 500);

    // Then display the second hidden layer circles
    setTimeout(() => {
        displayElements(hiddenLayerCircles2, 500);
    }, (inputLayerCircles.length + inputTexts.length + 1 + hiddenLayerCircles1.length + connectionsInputToHidden1.length + 1) * 500);

    // Then display the connections between hidden layer 1 and hidden layer 2
    setTimeout(() => {
        displayElements(connectionsHidden1ToHidden2, 100);
    }, (inputLayerCircles.length + inputTexts.length + 1 + hiddenLayerCircles1.length + connectionsInputToHidden1.length + hiddenLayerCircles2.length) * 500);

    // Then display the second hidden layer description text
    setTimeout(() => {
        displayElements([layerTexts[2]], 500); // Hidden Layer ∈ ℝ¹⁰
    }, (inputLayerCircles.length + inputTexts.length + 1 + hiddenLayerCircles1.length + connectionsInputToHidden1.length + hiddenLayerCircles2.length + connectionsHidden1ToHidden2.length) * 500);

    // Finally display the output layer circle and its text
    setTimeout(() => {
        displayElements(outputLayerCircle, 500);
    }, (inputLayerCircles.length + inputTexts.length + 1 + hiddenLayerCircles1.length + connectionsInputToHidden1.length + hiddenLayerCircles2.length + connectionsHidden1ToHidden2.length + 1) * 500);

    // Then display the connections between hidden layer 2 and output layer
    setTimeout(() => {
        displayElements(connectionsHidden2ToOutput, 100);
    }, (inputLayerCircles.length + inputTexts.length + 1 + hiddenLayerCircles1.length + connectionsInputToHidden1.length + hiddenLayerCircles2.length + connectionsHidden1ToHidden2.length + 1 + outputLayerCircle.length) * 500);

    // Display the output layer description text
    setTimeout(() => {
        displayElements([layerTexts[3]], 500); // Output Layer ∈ ℝ¹
    }, (inputLayerCircles.length + inputTexts.length + 1 + hiddenLayerCircles1.length + connectionsInputToHidden1.length + hiddenLayerCircles2.length + connectionsHidden1ToHidden2.length + 1 + outputLayerCircle.length + connectionsHidden2ToOutput.length) * 500);
});
