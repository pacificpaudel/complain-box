const mongoose = require('mongoose');

const actionCommentSchema = new mongoose.Schema({
  itemId: { type: Number, required: true },
  userEmail: { type: String, required: true },
  userName: { type: String, default: '' },
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ActionComment', actionCommentSchema);
