const express = require('express');
const app = express();
app.use(express.json());

// Test auth endpoints
app.post('/v1/auth/register', (req, res) => {
  console.log('Register:', req.body);
  res.json({
    message: 'User registered via test server',
    user: {
      id: 'test-id',
      email: req.body.email,
      phone: req.body.phone,
      userType: req.body.userType
    }
  });
});

app.post('/v1/auth/login', (req, res) => {
  console.log('Login:', req.body);
  res.json({
    accessToken: 'test-jwt-token',
    refreshToken: 'test-refresh-token',
    user: {
      id: 'test-user-id',
      email: req.body.email,
      phone: req.body.phone
    }
  });
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok', server: 'test' });
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Test server running on port ${PORT}`);
  console.log('Endpoints available at:');
  console.log(`  http://localhost:${PORT}/v1/auth/register`);
  console.log(`  http://localhost:${PORT}/v1/auth/login`);
  console.log(`  http://localhost:${PORT}/health`);
});
