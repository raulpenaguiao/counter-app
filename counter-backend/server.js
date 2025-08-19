const express = require('express');
const path = require('path');
const app = express();

// In-memory key/value store (replace with Redis/database for production)
let store = {
  counter: 0
};

// Middleware
app.use(express.json());
app.use(express.static('public'));

// API Routes
app.get('/api/counter', (req, res) => {
  res.json({ value: store.counter });
});

app.post('/api/upcounter', (req, res) => {
  store.counter++;
  res.json({ 
    success: true, 
    newValue: store.counter 
  });
});

// Serve the counter page
app.get('/counter', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'counter.html'));
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, '127.0.0.1', () => {
  console.log(`Server running on port ${PORT}`);
});