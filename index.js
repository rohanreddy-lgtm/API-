const express = require('express');
const { resolve } = require('path');

const app = express();
const port = 3010;

// Middleware to parse JSON request bodies
app.use(express.json());

// Simulated student data
const students = [
  { name: "Alice Johnson", total: 433 },
  { name: "Bob Smith", total: 410 },
  { name: "Charlie Brown", total: 390 },
  { name: "Diana Prince", total: 470 },
  { name: "Elliot Page", total: 350 }
];

// POST endpoint to retrieve students above a threshold
app.post('/students/above-threshold', (req, res) => {
  const { threshold } = req.body;

  // Validate the threshold
  if (typeof threshold !== 'number') {
    return res.status(400).json({ error: "Invalid threshold. It must be a number." });
  }

  // Filter students based on the threshold
  const filteredStudents = students.filter(student => student.total > threshold);

  // Prepare the response
  const response = {
    count: filteredStudents.length,
    students: filteredStudents
  };

  // Send the response
  res.json(response);
});

// Serve static files
app.use(express.static('static'));

// Serve the homepage
app.get('/', (req, res) => {
  res.sendFile(resolve(__dirname, 'pages/index.html'));
});

// Start the server
app.listen(port, () => {
  console.logExample(`Server running at http://localhost:${port}`);
});