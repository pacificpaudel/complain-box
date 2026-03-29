const express = require('express');
const router = express.Router();
const ActionVote = require('../models/ActionVote');
const ActionComment = require('../models/ActionComment');

// Helper: get real client IP
function getClientIP(req) {
  const forwarded = req.headers['x-forwarded-for'];
  if (forwarded) return forwarded.split(',')[0].trim();
  return req.socket?.remoteAddress || req.ip || 'unknown';
}

// GET all votes aggregated by itemId
router.get('/votes', async (req, res) => {
  try {
    const votes = await ActionVote.find();
    const aggregated = {};
    votes.forEach(v => {
      if (!aggregated[v.itemId]) aggregated[v.itemId] = { up: 0, down: 0, voters: {}, ipVoters: {} };
      if (v.vote === 1) aggregated[v.itemId].up++;
      else aggregated[v.itemId].down++;
      aggregated[v.itemId].voters[v.userEmail] = v.vote;
      if (v.ipAddress) aggregated[v.itemId].ipVoters[v.ipAddress] = v.vote;
    });
    res.json(aggregated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET votes already cast by current request's IP
router.get('/votes/my-ip', async (req, res) => {
  try {
    const ip = getClientIP(req);
    const votes = await ActionVote.find({ ipAddress: ip });
    const result = {};
    votes.forEach(v => { result[v.itemId] = v.vote; });
    res.json({ ip: ip.replace(/\d+$/, '***'), votes: result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST vote (upsert) — enforces unique IP per item
router.post('/vote', async (req, res) => {
  try {
    const { itemId, userEmail, vote } = req.body;
    if (!itemId || !userEmail || ![1, -1].includes(vote)) {
      return res.status(400).json({ error: 'Invalid request' });
    }
    const ip = getClientIP(req);

    // Check if a DIFFERENT user on same IP already voted this item
    const ipConflict = await ActionVote.findOne({
      itemId,
      ipAddress: ip,
      userEmail: { $ne: userEmail }
    });
    if (ipConflict) {
      return res.status(409).json({
        error: 'ip_conflict',
        message: 'This IP address has already voted on this item'
      });
    }

    // Upsert vote for this user (same user changing up↔down is fine)
    await ActionVote.findOneAndUpdate(
      { itemId, userEmail },
      { vote, ipAddress: ip },
      { upsert: true, new: true }
    );
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE vote (unvote)
router.delete('/vote', async (req, res) => {
  try {
    const { itemId, userEmail } = req.body;
    await ActionVote.findOneAndDelete({ itemId, userEmail });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE all votes (super-admin reset)
router.delete('/votes/reset', async (req, res) => {
  try {
    const { adminEmail } = req.body;
    if (adminEmail !== 'praspaudel@gmail.com') {
      return res.status(403).json({ error: 'Unauthorized' });
    }
    const result = await ActionVote.deleteMany({});
    res.json({ success: true, deleted: result.deletedCount });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET all comments
router.get('/comments', async (req, res) => {
  try {
    const comments = await ActionComment.find().sort({ createdAt: 1 });
    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST comment
router.post('/comments/:itemId', async (req, res) => {
  try {
    const { userEmail, userName, text } = req.body;
    const itemId = parseInt(req.params.itemId);
    if (!itemId || !userEmail || !text || !text.trim()) {
      return res.status(400).json({ error: 'Invalid request' });
    }
    const comment = new ActionComment({
      itemId,
      userEmail,
      userName: userName || userEmail,
      text: text.trim()
    });
    await comment.save();
    res.status(201).json(comment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
