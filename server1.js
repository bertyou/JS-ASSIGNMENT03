// First: import "express"
import express from 'express'; // ES module

// Creating an instance of Express
const app = express();

// Define the root route with a GET method
app.get('/', (req, res) => {
  // Sending an HTML response with group names
  res.send('<h1>Group 11</h1><ul><li>Shu-Han Yang</li><li>Shuhua You</li></ul>');
});

// Setting the server to listen on port 3000
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
