const express = require('express');
const Org = require('../models/Org');

const router = express.Router();

// Create org
router.post('/', async (req, res) => {
  try {
    const org = new Org(req.body);
    await org.save();
    res.status(201).json(org);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all orgs
router.get('/', async (req, res) => {
  try {
    const orgs = await Org.find();
    res.json(orgs);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get org by ID
router.get('/:id', async (req, res) => {
  try {
    const org = await Org.findById(req.params.id);
    res.json(org);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update org
router.put('/:id', async (req, res) => {
  try {
    const org = await Org.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(org);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;