require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('.'));

// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB Atlas'))
.catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/orgs', require('./routes/orgs'));
app.use('/api/users', require('./routes/users'));
app.use('/api/complaints', require('./routes/complaints'));
app.use('/api/action-plans', require('./routes/actionPlans'));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});