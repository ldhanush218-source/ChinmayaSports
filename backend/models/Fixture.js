const mongoose = require('mongoose');

// ─── Flexible match data (score state) ───────────────────────────────────────
// Each sport stores different live-score fields.
// We use Mixed type so any JSON shape is accepted, e.g.:
//
//  Cricket:   { innings, battingTeam, scoreA, wicketsA, scoreB, wicketsB,
//               overs, balls, batsmen:[...], bowlers:[...] }
//
//  Football:  { scoreA, scoreB, half, minute }
//
//  Hockey:    { goalsA, goalsB, quarter, minute,
//               penaltyA:[true,false,...], penaltyB:[...] }
//
//  Volleyball:{ setsA, setsB, setScoresA:[...], setScoresB:[...] }
//
//  Basketball:{ scoreA, scoreB, quarter, foulsA, foulsB }
//
//  Badminton: { setsA, setsB, setScoresA:[...], setScoresB:[...] }
//
//  Athletics: { results:[{ name, team, time/distance, rank }] }

const FixtureSchema = new mongoose.Schema(
  {
    sport: {
      type: String,
      required: true,
      lowercase: true,
      enum: ['cricket', 'football', 'hockey', 'volleyball', 'basketball', 'badminton', 'athletics'],
    },
    teamA:  { type: String, required: true, trim: true },
    teamB:  { type: String, required: false, trim: true, default: '' }, // athletics may not have teamB
    date:   { type: String, required: true },   // ISO date string e.g. "2026-07-25"
    time:   { type: String, default: 'TBD' },   // e.g. "14:00"
    venue:  { type: String, default: 'TBD', trim: true },
    status: {
      type: String,
      enum: ['upcoming', 'live', 'done'],
      default: 'upcoming',
    },
    // Flexible sport-specific score/match state
    match:  { type: mongoose.Schema.Types.Mixed, default: {} },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// Index for fast sport + status queries (e.g., "all live hockey fixtures")
FixtureSchema.index({ sport: 1, status: 1 });
FixtureSchema.index({ sport: 1, date: 1 });

module.exports = mongoose.model('Fixture', FixtureSchema);
