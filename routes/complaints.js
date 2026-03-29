const express = require('express');
const Complaint = require('../models/Complaint');
const ComplaintVote = require('../models/ComplaintVote');
const router = express.Router();

function getClientIP(req) {
  const fwd = req.headers['x-forwarded-for'];
  if (fwd) return fwd.split(',')[0].trim();
  return req.socket?.remoteAddress || req.ip || 'unknown';
}

// Create complaint
router.post('/', async (req, res) => {
  try {
    const complaint = new Complaint(req.body);
    await complaint.save();
    res.status(201).json(complaint);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all complaints (with aggregated vote counts)
router.get('/', async (req, res) => {
  try {
    const [complaints, votes] = await Promise.all([
      Complaint.find().populate('userId').populate('orgId'),
      ComplaintVote.find()
    ]);
    const voteTally = {};
    votes.forEach(v => {
      if (!voteTally[v.complaintId]) voteTally[v.complaintId] = { up: 0, down: 0 };
      if (v.vote === 1) voteTally[v.complaintId].up++;
      else voteTally[v.complaintId].down++;
    });
    const result = complaints.map(c => ({
      ...c.toObject(),
      voteUp:   (voteTally[c._id.toString()] || {}).up   || 0,
      voteDown: (voteTally[c._id.toString()] || {}).down || 0,
    }));
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get vote summary for current IP
router.get('/my-ip-votes', async (req, res) => {
  try {
    const ip = getClientIP(req);
    const votes = await ComplaintVote.find({ ipAddress: ip });
    const result = {};
    votes.forEach(v => { result[v.complaintId] = v.vote; });
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get complaints by org
router.get('/org/:orgId', async (req, res) => {
  try {
    const complaints = await Complaint.find({ orgId: req.params.orgId }).populate('userId').populate('orgId');
    res.json(complaints);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get complaint by ID
router.get('/:id', async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id).populate('userId').populate('orgId').populate('comments.userId');
    res.json(complaint);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update complaint
router.put('/:id', async (req, res) => {
  try {
    const complaint = await Complaint.findByIdAndUpdate(req.params.id, { ...req.body, updatedAt: Date.now() }, { new: true });
    res.json(complaint);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Vote on complaint (IP-unique)
router.post('/:id/vote', async (req, res) => {
  try {
    const { vote } = req.body;
    if (![1, -1].includes(vote)) return res.status(400).json({ error: 'Vote must be 1 or -1' });
    const ip = getClientIP(req);
    const complaintId = req.params.id;
    const existing = await ComplaintVote.findOne({ complaintId, ipAddress: ip });
    if (existing) {
      if (existing.vote === vote) {
        await ComplaintVote.deleteOne({ _id: existing._id });
        return res.json({ action: 'removed', vote: 0 });
      }
      existing.vote = vote;
      await existing.save();
      return res.json({ action: 'changed', vote });
    }
    await ComplaintVote.create({ complaintId, ipAddress: ip, vote });
    res.json({ action: 'added', vote });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Add comment
router.post('/:id/comments', async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id);
    complaint.comments.push(req.body);
    await complaint.save();
    res.json(complaint);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
