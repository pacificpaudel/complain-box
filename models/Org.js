const mongoose = require('mongoose');

const orgSchema = new mongoose.Schema({
  name: { type: String, required: true },
  subdomain: { type: String, required: true, unique: true },
  website: String,
  logo: String,
  sections: [{ type: String }],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Org', orgSchema);