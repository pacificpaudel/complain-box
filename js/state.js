// ===== CONSTANTS =====
const SUPER_ADMIN = 'praspaudel@gmail.com';
const DEFAULT_SECTIONS = ['Government', 'Environment', 'Health', 'Education', 'Infrastructure', 'Safety', 'Other'];
const API_BASE = 'http://localhost:3001/api';

// ===== APP STATE =====
let state = {
  orgs: [],
  users: [],
  complaints: [],
  complaintVotes: {},   // { complaintId: { up, down, myVote } }
  currentUser: null,
  currentOrg: null,
  passwordResets: [],
  deletedComplaints: [],
  usedPhotos: []
};
let currentPage = 'org-select';
let currentSection = 'All';
let currentModal = null;
let currentComplaintId = null;
let searchQuery = '';

// Temporary in-memory buffers for file uploads
window._pendingImages = [];
window._pendingVideos = [];
window._pendingProfilePhoto = null;

// ===== API FUNCTIONS =====
async function apiGet(endpoint) {
  const response = await fetch(`${API_BASE}${endpoint}`);
  return response.json();
}

async function apiPost(endpoint, data) {
  const response = await fetch(`${API_BASE}${endpoint}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return response.json();
}

async function apiPut(endpoint, data) {
  const response = await fetch(`${API_BASE}${endpoint}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return response.json();
}

// ===== PERSISTENCE =====
async function loadState() {
  try {
    const [orgs, users, complaints, ipVotes] = await Promise.all([
      apiGet('/orgs'),
      apiGet('/users'),
      apiGet('/complaints'),
      apiGet('/complaints/my-ip-votes').catch(() => ({}))
    ]);
    state.orgs = orgs;
    state.users = users;
    state.complaints = complaints;
    // Build complaintVotes from fetched data
    state.complaintVotes = {};
    complaints.forEach(c => {
      const id = c._id || c.id;
      state.complaintVotes[id] = { up: c.voteUp || 0, down: c.voteDown || 0, myVote: ipVotes[id] || 0 };
    });
    state.currentUser = JSON.parse(localStorage.getItem('cb_currentUser') || 'null');
    state.currentOrg  = JSON.parse(localStorage.getItem('cb_currentOrg')  || 'null');
    state.passwordResets   = JSON.parse(localStorage.getItem('cb_resets')  || '[]');
    state.deletedComplaints= JSON.parse(localStorage.getItem('cb_deleted') || '[]');
    state.usedPhotos       = JSON.parse(localStorage.getItem('cb_photos')  || '[]');
  } catch (error) {
    console.error('Failed to load state from API:', error);
  }
}

function saveState(s) {
  // For now, keep localStorage for session data
  localStorage.setItem('cb_currentUser', JSON.stringify(s.currentUser));
  localStorage.setItem('cb_currentOrg', JSON.stringify(s.currentOrg));
  localStorage.setItem('cb_resets', JSON.stringify(s.passwordResets));
  localStorage.setItem('cb_deleted', JSON.stringify(s.deletedComplaints));
  localStorage.setItem('cb_photos', JSON.stringify(s.usedPhotos));
}
