// First: import "express"
import express from 'express'; // ES module

// Importing JSON data using ES module syntax
import data from './data/data.json' assert { type: 'json' };

// Creating an instance of Express
const app = express();

// Define a route to display JSON data
app.get('/data', (req, res) => {
  // Sending the imported JSON data as a response
  res.json(data);
});

// Setting the server to listen on port 3001
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
