const mongoose = require('mongoose');

// ─── Match Event (live goal / card / wicket / etc.) ───────────────────────────
// One document per in-match event. Referenced by fixtureId.
//
// Event types by sport:
//   Football / Hockey: goal | yellow_card | red_card | green_card | penalty
//   Cricket:           wicket | boundary4 | boundary6 | wide | noball | dot
//   Volleyball:        point | timeout | substitution
//   Basketball:        basket2 | basket3 | freethrow | foul | timeout
//   Badminton:         point | service | timeout
//   Athletics:         result (final ranking logged once)

const MatchEventSchema = new mongoose.Schema(
  {
    fixtureId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Fixture',
      required: true,
    },
    sport: {
      type: String,
      required: true,
      lowercase: true,
      enum: ['cricket', 'football', 'hockey', 'volleyball', 'basketball', 'badminton', 'athletics'],
    },
    // Clock position at which the event occurred
    minute: { type: Number, default: 0 },

    // The event type (sport-specific, see comments above)
    type: { type: String, required: true, trim: true },

    // Who was involved
    player: { type: String, default: '', trim: true },

    // 'A' or 'B' (home / away team), or team name
    team: { type: String, default: 'A', trim: true },

    // Any additional human-readable note (e.g., "Penalty corner", "Caught behind")
    detail: { type: String, default: '', trim: true },
  },
  {
    timestamps: true,   // createdAt acts as the event log timestamp
    versionKey: false,
  }
);

// Index for quickly loading all events for a specific match in time order
MatchEventSchema.index({ fixtureId: 1, createdAt: 1 });

module.exports = mongoose.model('MatchEvent', MatchEventSchema);
