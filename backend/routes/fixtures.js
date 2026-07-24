const express    = require('express');
const router     = express.Router({ mergeParams: true });
const Fixture    = require('../models/Fixture');
const MatchEvent = require('../models/MatchEvent');

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
// GET /api/:sport/fixtures
// Returns all fixtures for the sport.
// Optional query params:
//   ?status=live|upcoming|done
//   ?date=2026-07-25
// ─────────────────────────────────────────────────────────────────────────────
router.get('/', async (req, res) => {
  try {
    const filter = { sport: req.params.sport };
    if (req.query.status) filter.status = req.query.status;
    if (req.query.date)   filter.date   = req.query.date;

    const fixtures = await Fixture.find(filter).sort({ date: 1, time: 1 });
    res.json({ success: true, count: fixtures.length, data: fixtures });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ─────────────────────────────────────────────────────────────────────────────
// GET /api/:sport/fixtures/:id
// Returns a single fixture.
// ─────────────────────────────────────────────────────────────────────────────
router.get('/:id', async (req, res) => {
  try {
    const fixture = await Fixture.findOne({ _id: req.params.id, sport: req.params.sport });
    if (!fixture) return res.status(404).json({ success: false, message: 'Fixture not found.' });
    res.json({ success: true, data: fixture });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ─────────────────────────────────────────────────────────────────────────────
// POST /api/:sport/fixtures
// Creates a new fixture.
// Body: { teamA, teamB, date, time, venue, status, match }
// ─────────────────────────────────────────────────────────────────────────────
router.post('/', async (req, res) => {
  try {
    const { teamA, teamB, date, time, venue, status, match } = req.body;

    if (!teamA || !date) {
      return res.status(400).json({ success: false, message: 'teamA and date are required.' });
    }

    const fixture = await Fixture.create({
      sport:  req.params.sport,
      teamA:  teamA.trim(),
      teamB:  (teamB || '').trim(),
      date,
      time:   time  || 'TBD',
      venue:  venue ? venue.trim() : 'TBD',
      status: status || 'upcoming',
      match:  match  || {},
    });

    res.status(201).json({ success: true, data: fixture });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ─────────────────────────────────────────────────────────────────────────────
// PUT /api/:sport/fixtures/:id
// Updates a fixture — commonly used to update live score (match field) or status.
// Body: any subset of { teamA, teamB, date, time, venue, status, match }
// ─────────────────────────────────────────────────────────────────────────────
router.put('/:id', async (req, res) => {
  try {
    const fixture = await Fixture.findOne({ _id: req.params.id, sport: req.params.sport });
    if (!fixture) return res.status(404).json({ success: false, message: 'Fixture not found.' });

    const allowed = ['teamA', 'teamB', 'date', 'time', 'venue', 'status', 'match', 'score'];
    allowed.forEach(key => {
      if (req.body[key] !== undefined) {
        fixture[key] = req.body[key];
        if (key === 'match') fixture.markModified('match');
      }
    });

    await fixture.save();
    res.json({ success: true, data: fixture });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ─────────────────────────────────────────────────────────────────────────────
// PATCH /api/:sport/fixtures/:id/status
// Quick helper to update just the status of a fixture.
// Body: { status: 'live'|'upcoming'|'done' }
// ─────────────────────────────────────────────────────────────────────────────
router.patch('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    if (!['upcoming', 'live', 'done'].includes(status)) {
      return res.status(400).json({ success: false, message: 'status must be "upcoming", "live", or "done".' });
    }

    const fixture = await Fixture.findOneAndUpdate(
      { _id: req.params.id, sport: req.params.sport },
      { $set: { status } },
      { new: true }
    );

    if (!fixture) return res.status(404).json({ success: false, message: 'Fixture not found.' });
    res.json({ success: true, data: fixture });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ─────────────────────────────────────────────────────────────────────────────
// DELETE /api/:sport/fixtures/:id
// Deletes a fixture and all its associated match events.
// ─────────────────────────────────────────────────────────────────────────────
router.delete('/:id', async (req, res) => {
  try {
    const fixture = await Fixture.findOneAndDelete({ _id: req.params.id, sport: req.params.sport });
    if (!fixture) return res.status(404).json({ success: false, message: 'Fixture not found.' });

    // Clean up associated events
    const eventsDeleted = await MatchEvent.deleteMany({ fixtureId: req.params.id });

    res.json({
      success: true,
      message: `Fixture deleted along with ${eventsDeleted.deletedCount} match event(s).`,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
