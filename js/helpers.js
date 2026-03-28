// ===== NOTIFICATION =====
function notify(msg, type = 'info') {
  const el = document.createElement('div');
  el.className = `notif ${type}`;
  const icon = type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️';
  el.innerHTML = `<span>${icon}</span> <span>${msg}</span>`;
  document.getElementById('notification').appendChild(el);
  setTimeout(() => el.remove(), 4000);
}

// ===== ID GENERATION =====
function genId() {
  return Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
}

// ===== TIME =====
function timeAgo(ts) {
  const diff = Date.now() - ts;
  const mins = Math.floor(diff / 60000);
  const hrs  = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);
  if (mins < 1)  return 'just now';
  if (mins < 60) return `${mins}m ago`;
  if (hrs  < 24) return `${hrs}h ago`;
  return `${days}d ago`;
}

function daysAgo(ts) {
  const days = Math.floor((Date.now() - ts) / 86400000);
  if (days === 0) return 'Today';
  if (days === 1) return '1 day ago';
  return `${days} days ago`;
}

// ===== HASHING =====
function hashStr(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = ((h << 5) - h) + str.charCodeAt(i);
    h |= 0;
  }
  return h.toString();
}

// ===== GETTERS =====
function getCurrentOrgSections() {
  if (!state.currentOrg) return DEFAULT_SECTIONS;
  const org = state.orgs.find(o => o.id === state.currentOrg);
  return org ? (org.sections || DEFAULT_SECTIONS) : DEFAULT_SECTIONS;
}

function getOrgMembers(orgId) {
  return state.users.filter(u => u.orgId === orgId);
}

function getUserRole() {
  if (!state.currentUser) return null;
  if (state.currentUser.email === SUPER_ADMIN) return 'super';
  if (!state.currentOrg) return null;
  const m = state.users.find(u => u.email === state.currentUser.email && u.orgId === state.currentOrg);
  return m ? m.role : null;
}

function isProfileComplete(user) {
  return user && user.name && user.address && user.photo;
}

function getSectionIcon(s) {
  const icons = {
    Government: '🏛️', Environment: '🌿', Health: '🏥',
    Education: '📚', Infrastructure: '🔧', Safety: '🛡️', Other: '📌'
  };
  return icons[s] || '📌';
}

// ===== CLOCK =====
function updateClock() {
  const el = document.getElementById('clock');
  if (el) el.textContent = new Date().toLocaleString();
}
setInterval(updateClock, 10000);

// ===== FILE HANDLERS =====
function previewMedia(event, previewId) {
  const files = Array.from(event.target.files);
  const isPhoto = previewId === 'photo-preview';
  const maxFiles = isPhoto ? 5 : 2;
  const preview = document.getElementById(previewId);
  if (!preview) return;
  if (isPhoto) window._pendingImages = [];
  else window._pendingVideos = [];

  files.slice(0, maxFiles).forEach(file => {
    const reader = new FileReader();
    reader.onload = e => {
      const dataUrl = e.target.result;
      const hash = hashStr(dataUrl.slice(0, 500));
      if (isPhoto) {
        if (state.usedPhotos.includes(hash)) {
          notify('This photo has already been used', 'error');
          return;
        }
        state.usedPhotos.push(hash);
        saveState(state);
        window._pendingImages.push(dataUrl);
        const img = document.createElement('img');
        img.src = dataUrl;
        img.style = 'width:80px;height:60px;object-fit:cover;border-radius:6px;border:1px solid var(--border)';
        preview.appendChild(img);
      } else {
        window._pendingVideos.push(dataUrl);
        const div = document.createElement('div');
        div.style = 'width:80px;height:60px;background:var(--surface3);border-radius:6px;display:flex;align-items:center;justify-content:center;font-size:20px;';
        div.textContent = '▶️';
        preview.appendChild(div);
      }
    };
    reader.readAsDataURL(file);
  });
}

function handleOrgLogo(event) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = e => {
    const org = state.orgs.find(o => o.id === state.currentOrg);
    if (org) { org.logo = e.target.result; saveState(state); render(); }
  };
  reader.readAsDataURL(file);
}

function handleProfilePhoto(event) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = e => {
    const dataUrl = e.target.result;
    const hash = hashStr(dataUrl.slice(0, 500));
    const currentUserPhoto = state.users.find(u => u.email === state.currentUser?.email)?.photo;
    const currentHash = currentUserPhoto ? hashStr(currentUserPhoto.slice(0, 500)) : null;
    if (state.usedPhotos.includes(hash) && hash !== currentHash) {
      return notify('This photo has already been used by another user', 'error');
    }
    if (hash !== currentHash) { state.usedPhotos.push(hash); saveState(state); }
    window._pendingProfilePhoto = dataUrl;
    const preview = document.querySelector('.avatar-preview');
    const ph = document.querySelector('.avatar-preview-placeholder');
    if (preview) preview.src = dataUrl;
    else if (ph) {
      const img = document.createElement('img');
      img.src = dataUrl; img.className = 'avatar-preview';
      ph.replaceWith(img);
    }
  };
  reader.readAsDataURL(file);
}
