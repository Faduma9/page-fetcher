const request = require('request');
const fs = require('fs');

// Get command line arguments
const url = process.argv[2];
const filePath = process.argv[3];

// Check if both URL and file path are provided
if (!url || !filePath) {
  console.error('Usage: node fetcher.js <http://www.example.edu/> <index.html>');
  process.exit(1);
}

// Make an HTTP request to the URL
request(url, (error, response, body) => {
  if (error || response.statusCode !== 200) {
    console.error('Error:', error || `HTTP Status Code: ${response.statusCode}`);
  } else {
    // Write the response body to the local file
    fs.writeFile(filePath, body, (writeError) => {
      if (writeError) {
        console.error('Error writing to file:', writeError);
      } else {
        const fileSize = Buffer.byteLength(body, 'utf8');
        console.log(`Downloaded and saved ${fileSize} bytes to ${filePath}`);
      }
    });
  }
});
