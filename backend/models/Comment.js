const mongoose = require('mongoose');

// ─── Comment Model (User / Live Commentary comments for matches) ──────────────
const CommentSchema = new mongoose.Schema(
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
    userName: {
      type: String,
      required: true,
      trim: true,
      default: 'Anonymous Fan',
    },
    text: {
      type: String,
      required: true,
      trim: true,
    },
    isOfficial: {
      type: Boolean,
      default: false, // true if posted by referee / admin commentator
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

CommentSchema.index({ fixtureId: 1, createdAt: -1 });

module.exports = mongoose.model('Comment', CommentSchema);
