// src/server.js
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import os from 'os';
import pg from 'pg';
import dotenv from 'dotenv';
import get_survivor_stats_query from './helpers/get-survivor-stats-query.js'

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

// Utility function to handle async route handlers
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

app.get(
  '/servers',
  asyncHandler(async (req, res) => {
    const { sname } = req.query;

    // Validate query parameter
    if (!sname || sname.trim().length === 0) {
      return res.status(400).json({ error: 'sname query parameter is required.' });
    }

    const uid = 1; // Hardcoded as per provided code

    // SQL Query with parameterized inputs to prevent SQL injection
    const query = `
      SELECT
        sid,
        sname
      FROM
        nitrado_servers
      WHERE
        uid = $1
        AND sactive = 1
        AND sname ILIKE '%' || $2 || '%'
      ORDER BY
        sname ASC
      LIMIT 50;
    `;

    const { rows: servers } = await pool.query(query, [uid, sname]);

    // Format response
    const response = servers.map((server) => ({
      sid: server.sid,
      sname: server.sname,
    }));

    return res.json(response);
  })
);

app.get(
  '/survivors',
  asyncHandler(async (req, res) => {
    const { psname, sid } = req.query;

    // Validate query parameter
    if (!psname || psname.trim().length < 3) {
      return res
        .status(400)
        .json({ error: 'psname query parameter must be at least 3 characters long.' });
    }

    const uid = 1; // Hardcoded as per provided code

    // Base SQL Query
    let query = `
      SELECT
        ps.psid,
        ps.psname
      FROM
        nitrado_servers s
        JOIN dayz_players_rolling_stats ps ON s.sid = ps.sid
      WHERE
        s.uid = $1
        AND s.sactive = 1
        AND ps.psname ILIKE '%' || $2 || '%'
    `;
    const params = [uid, psname];

    // If sid is provided, filter by server id
    if (sid) {
      query += ' AND s.sid = $3';
      params.push(parseInt(sid, 10));
    }

    query += `
      ORDER BY
        ps.psname ASC
      LIMIT 100;
    `;

    const { rows: survivors } = await pool.query(query, params);

    // If no survivors found, attempt to fetch without Discord associations
    if (survivors.length === 0) {
      // Extended Query including Discord associations
      const extendedQuery = `
        SELECT
          ps.psid,
          ps.psname
        FROM
          nitrado_servers s
          JOIN dayz_players_rolling_stats ps ON s.sid = ps.sid
          LEFT JOIN discords_dayz_players dp ON ps.pid = dp.pid
          LEFT JOIN discords d ON dp.did = d.did
        WHERE
          s.uid = $1
          AND s.sactive = TRUE
          AND ps.psname ILIKE '%' || $2 || '%'
      `;
      const extendedParams = [uid, psname];

      // If sid is provided, filter by server id
      if (sid) {
        extendedQuery += ' AND s.sid = $3';
        extendedParams.push(parseInt(sid, 10));
      }

      const { rows: extendedSurvivors } = await pool.query(extendedQuery, extendedParams);

      // Format response
      const response = extendedSurvivors.map((survivor) => ({
        psid: survivor.psid,
        psname: survivor.psname,
      }));

      return res.json(response);
    }

    // Format response
    const response = survivors.map((survivor) => ({
      psid: survivor.psid,
      psname: survivor.psname,
    }));

    return res.json(response);
  })
);

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

app.get('/survivors/:psid/servers/:sid', async (req, res) => {
  const { psid, sid } = req.params;

  // Input validation
  const parsedSid = parseInt(sid, 10);
  const parsedPsid = parseInt(psid, 10);

  if (isNaN(parsedSid) || isNaN(parsedPsid)) {
    return res.status(400).json({ error: 'Invalid pid or sid parameter. They must be integers.' });
  }

  // Assume uid is obtained from authentication middleware
  // For demonstration, we'll hardcode it. Replace with actual authentication logic.
  const uid = 1; // Example UID

  try {
    // First Query: Check if the player is linked via Discord
    const discordQuery = `
      SELECT
        *
      FROM
        nitrado_servers s
        JOIN dayz_players_rolling_stats ps ON s.sid = ps.sid
        JOIN discords_dayz_players dp ON ps.pid = dp.pid
        JOIN discords d ON dp.did = d.did
      WHERE
        s.uid = $1
        AND s.sactive = 1
        AND s.sid = $2
        AND ps.psid = $3;
    `;

    // Assuming psid is equivalent to pid. If not, adjust accordingly.
    const { rows: discordPlayers } = await pool.query(discordQuery, [uid, parsedSid, parsedPsid]);

    const isLinked = discordPlayers.length > 0;

    // Second Query: Retrieve survivor stats based on linkage
    const survivorStatsQuery = get_survivor_stats_query(isLinked);

    // Execute the survivor stats query with parameters [sid, psid]
    const { rows: survivorStatsRows } = await pool.query(survivorStatsQuery, [parsedSid, parsedPsid]);

    if (survivorStatsRows.length === 0) {
      return res.status(404).json({ error: 'Survivor stats not found for the given player and server.' });
    }

    const survivorStats = survivorStatsRows[0];

    // Construct the response
    const response = {
      psid: parsedPsid,
      sid: parsedSid,
      is_linked: isLinked,
      survivor_stats: {
        did: survivorStats.did,
        //pid: survivorStats.pid,
        psid: survivorStats.psid,
        survivor: survivorStats.survivor,
        rankk: survivorStats.rankk,
        of: survivorStats.of,
        kills: survivorStats.kills,
        deaths: survivorStats.deaths,
        kd: parseFloat(survivorStats.kd),
        damage: survivorStats.damage,
        cks: survivorStats.cks,
        bks: survivorStats.bks,
        bestmeters: survivorStats.bestmeters,
        hs: survivorStats.hs,
        bs: survivorStats.bs,
        bank: survivorStats.bank,
        wages: survivorStats.wages,
        cst: survivorStats.cst,
        bst: survivorStats.bst,
        ton: survivorStats.ton,
        online: survivorStats.online,
        score: parseFloat(survivorStats.score),
        kosauthorized: survivorStats.kosauthorized,
      },
    };

    return res.json(response);
  } catch (error) {
    console.error('Error fetching player server stats:', error);
    return res.status(500).json({ error: 'Internal server error.' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

