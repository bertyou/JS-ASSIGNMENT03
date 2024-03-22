// Importing required modules
import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Convert the URL to a file path and then get the directory name
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Creating an instance of Express
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Path to the data.json file
const dataFilePath = path.join(__dirname, 'data', 'data.json');

// Helper function to read data from the JSON file
const readData = () => {
  const jsonData = fs.readFileSync(dataFilePath);
  return JSON.parse(jsonData);
};

// Helper function to write data to the JSON file
const writeData = (data) => {
  const jsonData = JSON.stringify(data, null, 2); // null, 2 for pretty formatting
  fs.writeFileSync(dataFilePath, jsonData);
};

// Read operation (GET request)
app.get('/read', (req, res) => {
  // Code to handle 'read' operation
  const data = readData(); // Use the helper function to read data from the JSON file
  res.json(data); // Send the data as a JSON response
});

// Create operation (POST request)
app.post('/create', (req, res) => {
  const newData = req.body; // Data sent in the request body
  const data = readData();
  data.push(newData); // Add the new data to the existing data
  writeData(data); // Write the updated data back to the file
  res.status(201).send('Data created');
});

// Update operation (PUT request)
app.put('/update/:id', (req, res) => {
  const { id } = req.params; // Get the id from the URL
  const updatedData = req.body; // Data sent in the request body
  const data = readData();
  const dataIndex = data.findIndex(item => item.id === parseInt(id));
  if (dataIndex !== -1) {
    data[dataIndex] = updatedData; // Update the data at the specified index
    writeData(data); // Write the updated data back to the file
    res.send('Data updated');
  } else {
    res.status(404).send('Data not found');
  }
});

// Delete operation (DELETE request)
app.delete('/delete/:id', (req, res) => {
  const { id } = req.params; // Get the id from the URL
  let data = readData();
  const filteredData = data.filter(item => item.id !== parseInt(id));
  if (data.length !== filteredData.length) {
    writeData(filteredData); // Write the filtered data back to the file
    res.send('Data deleted');
  } else {
    res.status(404).send('Data not found');
  }
});

// Setting the server to listen on port 3000
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
