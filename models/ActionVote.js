const mongoose = require('mongoose');

const actionVoteSchema = new mongoose.Schema({
  itemId: { type: Number, required: true },
  userEmail: { type: String, required: true },
  ipAddress: { type: String, default: '' },
  vote: { type: Number, enum: [1, -1], required: true }
});

// Unique vote per user per item
actionVoteSchema.index({ itemId: 1, userEmail: 1 }, { unique: true });
// Index for IP lookups
actionVoteSchema.index({ itemId: 1, ipAddress: 1 });

module.exports = mongoose.model('ActionVote', actionVoteSchema);
