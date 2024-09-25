// src/server.js
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import os from 'os';
import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new pg.Pool({
      user: process.env.PG_USER,
      host: process.env.PG_HOST || 'localhost',
      database: process.env.PG_DATABASE,
      password: process.env.PG_PASSWORD,
      port: process.env.PG_PORT || 5432,
});

pool.on('error', (err) => {
  console.error('Unexpected error on idle PostgreSQL client', err);
  process.exit(-1);
});

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
    //networkInterfaces: os.networkInterfaces(),
    // Add more stats as needed
  };

  res.json(osStats);
});

app.get('/v2/nitrado/servers/:sid/leaderboard', async (req, res) => {
  const { sid } = req.params;

  const query = `
    SELECT
      ROW_NUMBER() OVER (ORDER BY (ps.psheadshots + ps.psbrainshots + ps.pskd + (ps.psbestmeters * 0.005) + (ps.psdamage * 0.005) + ps.pskills - ps.psdeaths) DESC) AS rankk,
      ps.psname AS survivor,
      ps.pskills AS kills,
      ps.psdeaths AS deaths,
      ps.pskd AS kd,
      ps.psdamage AS damage,
      ps.psbestmeters AS bestmeters,
      ps.psheadshots AS hs,
      ps.psbrainshots AS bs,
      ps.pstokens AS bank,
      ps.pswages AS wages,
      ps.pscurrentsurvivaltime AS cst,
      ps.psbestsurvivaltime AS bst,
      ps.pstimeonserver AS ton,
      ps.psconnected AS online,
      (ps.psheadshots + ps.psbrainshots + ps.pskd + (ps.psbestmeters * 0.005) + (ps.psdamage * 0.005) + ps.pskills - ps.psdeaths) AS score,
      (
        SELECT COUNT(*)
        FROM dayz_players_rolling_stats ps_inner
        JOIN nitrado_servers s ON ps_inner.sid = s.sid
        WHERE s.sid = $1
      ) AS of
    FROM
      dayz_players_rolling_stats ps
    JOIN dayz_players p ON ps.pid = p.pid
    JOIN nitrado_servers s ON ps.sid = s.sid
    WHERE
      s.sid = $1
    GROUP BY
      ps.psname, ps.pskills, ps.psdeaths, ps.pskd, ps.psdamage, ps.psbestmeters,
      ps.psheadshots, ps.psbrainshots, ps.psconnected, ps.pstokens, ps.pswages,
      ps.pscurrentsurvivaltime, ps.psbestsurvivaltime, ps.pstimeonserver
    ORDER BY
      score DESC
    LIMIT 50;
  `;

  try {
    const { rows } = await pool.query(query, [sid]);
    res.json(rows);
  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

