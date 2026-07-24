const express    = require('express');
const router     = express.Router({ mergeParams: true });
const MatchEvent = require('../models/MatchEvent');
const Fixture    = require('../models/Fixture');

// ─────────────────────────────────────────────────────────────────────────────
// GET /api/:sport/fixtures/:fixtureId/events
// Returns all events for a specific match, ordered chronologically.
// ─────────────────────────────────────────────────────────────────────────────
router.get('/', async (req, res) => {
  try {
    const events = await MatchEvent
      .find({ fixtureId: req.params.fixtureId, sport: req.params.sport })
      .sort({ createdAt: 1 });

    res.json({ success: true, count: events.length, data: events });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ─────────────────────────────────────────────────────────────────────────────
// POST /api/:sport/fixtures/:fixtureId/events
// Logs a new in-match event (goal, card, wicket, etc.).
// Body: { minute, type, player, team, detail }
// ─────────────────────────────────────────────────────────────────────────────
router.post('/', async (req, res) => {
  try {
    // Verify the parent fixture exists
    const fixture = await Fixture.findById(req.params.fixtureId);
    if (!fixture) {
      return res.status(404).json({ success: false, message: 'Parent fixture not found.' });
    }

    const { minute, type, player, team, detail } = req.body;

    if (!type) {
      return res.status(400).json({ success: false, message: 'Event "type" is required.' });
    }

    const event = await MatchEvent.create({
      fixtureId: req.params.fixtureId,
      sport:     req.params.sport,
      minute:    minute  ?? 0,
      type:      type.trim(),
      player:    player  ? player.trim()  : '',
      team:      team    ? team.trim()    : 'A',
      detail:    detail  ? detail.trim()  : '',
    });

    res.status(201).json({ success: true, data: event });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ─────────────────────────────────────────────────────────────────────────────
// DELETE /api/:sport/fixtures/:fixtureId/events/:eventId
// Deletes a single event (undo last goal, etc.).
// ─────────────────────────────────────────────────────────────────────────────
router.delete('/:eventId', async (req, res) => {
  try {
    const event = await MatchEvent.findOneAndDelete({
      _id:       req.params.eventId,
      fixtureId: req.params.fixtureId,
      sport:     req.params.sport,
    });

    if (!event) return res.status(404).json({ success: false, message: 'Event not found.' });
    res.json({ success: true, message: 'Event deleted.' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ─────────────────────────────────────────────────────────────────────────────
// DELETE /api/:sport/fixtures/:fixtureId/events
// Clears ALL events for a match (reset match).
// ─────────────────────────────────────────────────────────────────────────────
router.delete('/', async (req, res) => {
  try {
    const result = await MatchEvent.deleteMany({
      fixtureId: req.params.fixtureId,
      sport:     req.params.sport,
    });
    res.json({ success: true, message: `Cleared ${result.deletedCount} event(s).` });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
