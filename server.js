const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;


// Serve static files from the "static" directory
app.use('/static', express.static(path.join(__dirname, 'static')));

// Serve the home.html file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'templates', 'home.html'));
});

// Serve the summary.html file
app.get('/summary', (req, res) => {
    res.sendFile(path.join(__dirname, 'templates', 'summary.html'));
});

// Serve the resume.html file
app.get('/resume', (req, res) => {
    res.sendFile(path.join(__dirname, 'templates', 'resume.html'));
});

// Serve the intro.html file
app.get('/intro', (req, res) => {
    res.sendFile(path.join(__dirname, 'templates', 'intro.html'));
});

// Serve the problem.html file
app.get('/problem', (req, res) => {
    res.sendFile(path.join(__dirname, 'templates', 'problem.html'));
});

// Serve the goal.html file
app.get('/goal', (req, res) => {
    res.sendFile(path.join(__dirname, 'templates', 'goal.html'));
});

// Serve the iboard.html file
app.get('/iboard', (req, res) => {
    res.sendFile(path.join(__dirname, 'templates', 'iboard.html'));
});

// Serve the witness.html file
app.get('/witness', (req, res) => {
    res.sendFile(path.join(__dirname, 'templates', 'witness.html'));
});

// Serve the scrap.html file
app.get('/scrap', (req, res) => {
    res.sendFile(path.join(__dirname, 'templates', 'scrap.html'));
});

// Serve the techno.html file
app.get('/techno', (req, res) => {
    res.sendFile(path.join(__dirname, 'templates', 'techno.html'));
});

// Serve the automation.html file
app.get('/automation', (req, res) => {
    res.sendFile(path.join(__dirname, 'templates', 'automation.html'));
});

// Serve the phase_scrap.html file
app.get('/phase_scrap', (req, res) => {
    res.sendFile(path.join(__dirname, 'templates', 'phase_scrap.html'));
});

// Serve the data_ai.html file
app.get('/data_ai', (req, res) => {
    res.sendFile(path.join(__dirname, 'templates', 'data_ai.html'));
});

// Serve the phase_project.html file
app.get('/phase_project', (req, res) => {
    res.sendFile(path.join(__dirname, 'templates', 'phase_project.html'));
});

// Serve the scrap_result.html file
app.get('/scrap_result', (req, res) => {
    res.sendFile(path.join(__dirname, 'templates', 'scrap_result.html'));
});

// Serve the impact.html file
app.get('/impact', (req, res) => {
    res.sendFile(path.join(__dirname, 'templates', 'impact.html'));
});

// Serve the outlooks.html file
app.get('/outlooks', (req, res) => {
    res.sendFile(path.join(__dirname, 'templates', 'outlooks.html'));
});

// Serve the phase_table.html file
app.get('/phase_table', (req, res) => {
    res.sendFile(path.join(__dirname, 'templates', 'phase_table.html'));
});

// Serve the gantt.html file
app.get('/gantt', (req, res) => {
    res.sendFile(path.join(__dirname, 'templates', 'gantt.html'));
});

// Serve the nlp.html file
app.get('/nlp', (req, res) => {
    res.sendFile(path.join(__dirname, 'templates', 'nlp.html'));
});

// Serve the mlp.html file
app.get('/mlp', (req, res) => {
    res.sendFile(path.join(__dirname, 'templates', 'mlp.html'));
});

// Serve the neuron.html file
app.get('/neuron', (req, res) => {
    res.sendFile(path.join(__dirname, 'templates', 'neuron.html'));
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
