const express = require('express');
const router  = express.Router({ mergeParams: true }); // gives access to :sport from parent
const Team    = require('../models/Team');

// ─── Helper: validate sport param ────────────────────────────────────────────
const VALID_SPORTS = ['cricket', 'football', 'hockey', 'volleyball', 'basketball', 'badminton', 'athletics'];

function validateSport(req, res, next) {
  if (!VALID_SPORTS.includes(req.params.sport)) {
    return res.status(400).json({ success: false, message: `Unknown sport: "${req.params.sport}"` });
  }
  next();
}

router.use(validateSport);

// ─────────────────────────────────────────────────────────────────────────────
// GET /api/:sport/teams
// Returns all teams for the given sport, sorted by name.
// ─────────────────────────────────────────────────────────────────────────────
router.get('/', async (req, res) => {
  try {
    const teams = await Team.find({ sport: req.params.sport }).sort({ name: 1 });
    res.json({ success: true, count: teams.length, data: teams });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ─────────────────────────────────────────────────────────────────────────────
// GET /api/:sport/teams/:id
// Returns a single team by id.
// ─────────────────────────────────────────────────────────────────────────────
router.get('/:id', async (req, res) => {
  try {
    const team = await Team.findOne({ _id: req.params.id, sport: req.params.sport });
    if (!team) return res.status(404).json({ success: false, message: 'Team not found.' });
    res.json({ success: true, data: team });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ─────────────────────────────────────────────────────────────────────────────
// POST /api/:sport/teams
// Creates a new team.
// Body: { name: String, players: [...] }
// ─────────────────────────────────────────────────────────────────────────────
router.post('/', async (req, res) => {
  try {
    const { name, players } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ success: false, message: 'Team name is required.' });
    }

    // Check for duplicate name within sport
    const existing = await Team.findOne({ sport: req.params.sport, name: name.trim() });
    if (existing) {
      return res.status(409).json({ success: false, message: `A team named "${name.trim()}" already exists in ${req.params.sport}.` });
    }

    const team = await Team.create({
      sport:   req.params.sport,
      name:    name.trim(),
      players: players || [],
    });

    res.status(201).json({ success: true, data: team });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({ success: false, message: 'Duplicate team name.' });
    }
    res.status(500).json({ success: false, message: err.message });
  }
});

// ─────────────────────────────────────────────────────────────────────────────
// PUT /api/:sport/teams/:id
// Updates a team's name and/or players.
// Body: { name?: String, players?: [...] }
// ─────────────────────────────────────────────────────────────────────────────
router.put('/:id', async (req, res) => {
  try {
    const updates = {};
    if (req.body.name    !== undefined) updates.name    = req.body.name.trim();
    if (req.body.players !== undefined) updates.players = req.body.players;

    const team = await Team.findOneAndUpdate(
      { _id: req.params.id, sport: req.params.sport },
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!team) return res.status(404).json({ success: false, message: 'Team not found.' });
    res.json({ success: true, data: team });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ─────────────────────────────────────────────────────────────────────────────
// DELETE /api/:sport/teams/:id
// Deletes a team.
// ─────────────────────────────────────────────────────────────────────────────
router.delete('/:id', async (req, res) => {
  try {
    const team = await Team.findOneAndDelete({ _id: req.params.id, sport: req.params.sport });
    if (!team) return res.status(404).json({ success: false, message: 'Team not found.' });
    res.json({ success: true, message: `Team "${team.name}" deleted.` });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
