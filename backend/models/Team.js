const mongoose = require('mongoose');

// ─── Player sub-document ─────────────────────────────────────────────────────

const PlayerSchema = new mongoose.Schema(
  {
    number:      { type: Number, required: true },
    name:        { type: String, required: true, trim: true },
    // Role varies per sport: Goalkeeper/Defender/Midfielder/Forward (hockey, football)
    //   Batsman/Bowler/All-Rounder/Wicketkeeper (cricket)
    //   Setter/Libero/Outside Hitter/... (volleyball)
    //   Point Guard/Shooting Guard/... (basketball)
    //   Shuttle/Feather (badminton)
    //   Sprinter/Long Distance/... (athletics)
    role:        { type: String, required: true, trim: true },
    captain:     { type: Boolean, default: false },
    viceCaptain: { type: Boolean, default: false },
  },
  { _id: false }   // embedded sub-docs don't need their own _id
);

// ─── Team ────────────────────────────────────────────────────────────────────

const TeamSchema = new mongoose.Schema(
  {
    sport: {
      type: String,
      required: true,
      lowercase: true,
      enum: ['cricket', 'football', 'hockey', 'volleyball', 'basketball', 'badminton', 'athletics'],
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    players: {
      type: [PlayerSchema],
      default: [],
    },
  },
  {
    timestamps: true,   // createdAt + updatedAt
    versionKey: false,
  }
);

// Compound index: each team name must be unique within a sport
TeamSchema.index({ sport: 1, name: 1 }, { unique: true });

module.exports = mongoose.model('Team', TeamSchema);
