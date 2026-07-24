const express = require('express');
const router = express.Router({ mergeParams: true });
const Comment = require('../models/Comment');
const Fixture = require('../models/Fixture');

// ─── GET /api/:sport/fixtures/:fixtureId/comments ────────────────────────────
// Fetch all comments for a given fixture, ordered newest first
router.get('/', async (req, res) => {
  try {
    const { fixtureId, sport } = req.params;

    const comments = await Comment.find({ fixtureId, sport }).sort({ createdAt: -1 });
    res.json({ success: true, count: comments.length, data: comments });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ─── POST /api/:sport/fixtures/:fixtureId/comments ───────────────────────────
// Add a comment to a fixture
// Body: { userName, text, isOfficial }
router.post('/', async (req, res) => {
  try {
    const { fixtureId, sport } = req.params;
    const { userName, text, isOfficial } = req.body;

    if (!text || !text.trim()) {
      return res.status(400).json({ success: false, message: 'Comment text is required.' });
    }

    // Verify fixture exists
    const fixture = await Fixture.findOne({ _id: fixtureId, sport });
    if (!fixture) {
      return res.status(404).json({ success: false, message: 'Fixture not found.' });
    }

    const comment = await Comment.create({
      fixtureId,
      sport,
      userName: userName ? userName.trim() : 'Anonymous Fan',
      text: text.trim(),
      isOfficial: Boolean(isOfficial),
    });

    res.status(201).json({ success: true, data: comment });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ─── DELETE /api/:sport/fixtures/:fixtureId/comments/:commentId ──────────────
// Delete a comment by ID
router.delete('/:commentId', async (req, res) => {
  try {
    const { fixtureId, commentId } = req.params;

    const deleted = await Comment.findOneAndDelete({ _id: commentId, fixtureId });
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Comment not found.' });
    }

    res.json({ success: true, message: 'Comment deleted successfully.' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
