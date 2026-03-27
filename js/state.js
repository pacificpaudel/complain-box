// ===== CONSTANTS =====
const SUPER_ADMIN = 'praspaudel@gmail.com';
const DEFAULT_SECTIONS = ['Government', 'Environment', 'Health', 'Education', 'Infrastructure', 'Safety', 'Other'];

// ===== APP STATE =====
let state = loadState();
let currentPage = 'org-select';
let currentSection = 'All';
let currentModal = null;
let currentComplaintId = null;
let searchQuery = '';

// Temporary in-memory buffers for file uploads
window._pendingImages = [];
window._pendingVideos = [];
window._pendingProfilePhoto = null;

// ===== PERSISTENCE =====
function loadState() {
  return {
    orgs:             JSON.parse(localStorage.getItem('cb_orgs')    || '[]'),
    users:            JSON.parse(localStorage.getItem('cb_users')   || '[]'),
    complaints:       JSON.parse(localStorage.getItem('cb_complaints') || '[]'),
    currentUser:      JSON.parse(localStorage.getItem('cb_currentUser') || 'null'),
    currentOrg:       JSON.parse(localStorage.getItem('cb_currentOrg')  || 'null'),
    passwordResets:   JSON.parse(localStorage.getItem('cb_resets')  || '[]'),
    deletedComplaints:JSON.parse(localStorage.getItem('cb_deleted') || '[]'),
    usedPhotos:       JSON.parse(localStorage.getItem('cb_photos')  || '[]'),
  };
}

function saveState(s) {
  localStorage.setItem('cb_orgs',        JSON.stringify(s.orgs));
  localStorage.setItem('cb_users',       JSON.stringify(s.users));
  localStorage.setItem('cb_complaints',  JSON.stringify(s.complaints));
  localStorage.setItem('cb_currentUser', JSON.stringify(s.currentUser));
  localStorage.setItem('cb_currentOrg',  JSON.stringify(s.currentOrg));
  localStorage.setItem('cb_resets',      JSON.stringify(s.passwordResets));
  localStorage.setItem('cb_deleted',     JSON.stringify(s.deletedComplaints));
  localStorage.setItem('cb_photos',      JSON.stringify(s.usedPhotos));
}
