const axios = require('axios');

// Define the test data
const testData = {
  name: 'Black Pearl',
  type: 'Pirate Ship',
  crew: ['Jack Sparrow', 'Will Turner', 'Elizabeth Swann']
};

// Function to send a POST request
async function testRequest() {
  try {
    console.log('Sending request to http://localhost:3000/ships');
    // Send POST request to the endpoint
    const response = await axios.post('http://localhost:3000/ships', testData);
    console.log('Response:', response.data);
  } catch (error) {
    console.error('Error message:', error.message);
    if (error.response) {
      console.error('Error response data:', error.response.data);
      console.error('Error response status:', error.response.status);
    }
    console.error('Error stack:', error.stack);
  }
}

// Execute the function
testRequest();
