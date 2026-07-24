// =============================================================================
// Chinmaya Sports — Express Server
// =============================================================================

require('dotenv').config();

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const seedDefaultTeams = require('./config/seed');

const teamsRouter = require('./routes/teams');
const fixturesRouter = require('./routes/fixtures');
const matchEventsRouter = require('./routes/matchEvents');
const commentsRouter = require('./routes/comments');

const mongoose = require('mongoose');

// ─── Connect to MongoDB & Seed Default Teams ──────────────────────────────
connectDB().then((connected) => {
  if (connected) {
    seedDefaultTeams();
  }
});

// ─── App setup ───────────────────────────────────────────────────────────────
const app = express();

// CORS — allow all origins in development.
// In production, replace '*' with your frontend domain.
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Parse JSON bodies
app.use(express.json());

// Parse URL-encoded bodies (form data)
app.use(express.urlencoded({ extended: true }));

// ─── Health check ─────────────────────────────────────────────────────────────
app.get('/health', (req, res) => {
  const isDbConnected = mongoose.connection.readyState === 1;
  res.json({
    success: true,
    message: 'Chinmaya Sports API is running 🏆',
    database: isDbConnected ? 'connected' : 'disconnected (Check MongoDB Atlas IP Whitelist)',
    timestamp: new Date().toISOString(),
  });
});

// ─── API Routes ───────────────────────────────────────────────────────────────
//
// Route structure:
//   /api/:sport/teams               → teams CRUD
//   /api/:sport/fixtures            → fixtures CRUD
//   /api/:sport/fixtures/:id/events → live match events
//
// Valid sport values: cricket | football | hockey | volleyball | basketball | badminton | athletics
// ─────────────────────────────────────────────────────────────────────────────

app.use('/api/:sport/teams', teamsRouter);
app.use('/api/:sport/fixtures/:fixtureId/events', matchEventsRouter);
app.use('/api/:sport/fixtures', fixturesRouter);

// ─── 404 handler ─────────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ success: false, message: `Route not found: ${req.method} ${req.originalUrl}` });
});

// ─── Global error handler ─────────────────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error('💥 Unhandled error:', err);
  res.status(500).json({ success: false, message: err.message || 'Internal server error.' });
});

// ─── Start server ─────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log('');
  console.log('🏆  ============================================');
  console.log('🏆   Chinmaya Sports API — Annual Meet 2026');
  console.log(`🏆   Server running on http://localhost:${PORT}`);
  console.log('🏆  ============================================');
  console.log('');
  console.log('📡  Endpoints:');
  console.log(`    GET  /health`);
  console.log(`    GET  /api/:sport/teams`);
  console.log(`    POST /api/:sport/teams`);
  console.log(`    GET  /api/:sport/fixtures`);
  console.log(`    POST /api/:sport/fixtures`);
  console.log(`    GET  /api/:sport/fixtures/:id/events`);
  console.log(`    POST /api/:sport/fixtures/:id/events`);
  console.log('');
  console.log('⚽  Sports: cricket | football | hockey | volleyball | basketball | badminton | athletics');
  console.log('');
});
