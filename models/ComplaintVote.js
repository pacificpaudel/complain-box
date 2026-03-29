const mongoose = require('mongoose');
const complaintVoteSchema = new mongoose.Schema({
  complaintId: { type: String, required: true },
  ipAddress:   { type: String, required: true },
  vote:        { type: Number, enum: [1, -1], required: true }
});
complaintVoteSchema.index({ complaintId: 1, ipAddress: 1 }, { unique: true });
module.exports = mongoose.model('ComplaintVote', complaintVoteSchema);
