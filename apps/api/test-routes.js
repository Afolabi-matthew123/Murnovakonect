const http = require('http');

const endpoints = [
  '/',
  '/health',
  '/health/database', 
  '/api/v1/',
  '/api/docs',
  '/api/health'
];

endpoints.forEach(endpoint => {
  http.get(`http://localhost:3000${endpoint}`, (res) => {
    console.log(`${endpoint}: ${res.statusCode}`);
  }).on('error', (err) => {
    console.log(`${endpoint}: ERROR - ${err.message}`);
  });
});
