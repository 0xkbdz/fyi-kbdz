// src/server.js
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import os from 'os';

// __dirname and __filename are not available in ES modules, so we define them
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 33000;

// Middleware to serve static files from 'public/' directory
app.use(express.static(path.join(__dirname, '..', 'public'))); // Adjusted path

// Route for /v2/health to return OS stats
app.get('/v2/health', (req, res) => {
  const osStats = {
    platform: os.platform(),
    architecture: os.arch(),
    cpu: os.cpus(),
    totalMemory: os.totalmem(),
    freeMemory: os.freemem(),
    uptime: os.uptime(),
    loadAverage: os.loadavg(),
    networkInterfaces: os.networkInterfaces(),
    // Add more stats as needed
  };

  res.json(osStats);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

