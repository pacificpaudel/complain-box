const express = require('express');
const Complaint = require('../models/Complaint');

const router = express.Router();

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

// Get all complaints
router.get('/', async (req, res) => {
  try {
    const complaints = await Complaint.find().populate('userId').populate('orgId');
    res.json(complaints);
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