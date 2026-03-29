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

// getOrgMembers — defined below with super-admin inclusion

function getUserRole() {
  if (!state.currentUser) return null;
  // Super admin always has 'super' role in any org
  if (state.currentUser.email === SUPER_ADMIN) return 'super';
  if (!state.currentOrg) return null;
  // Check org membership; also accept string or ObjectId match
  const m = state.users.find(u =>
    u.email === state.currentUser.email &&
    (u.orgId === state.currentOrg || String(u.orgId) === String(state.currentOrg))
  );
  return m ? m.role : null;
}

function getOrgMembers(orgId) {
  const members = state.users.filter(u =>
    u.orgId === orgId || String(u.orgId) === String(orgId)
  );
  // Always include super admin as a virtual member
  if (state.currentUser?.email === SUPER_ADMIN) {
    const already = members.find(m => m.email === SUPER_ADMIN);
    if (!already) {
      const superUser = state.users.find(u => u.email === SUPER_ADMIN);
      if (superUser) members.unshift({ ...superUser, orgId, role: 'super' });
    }
  }
  return members;
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

// ===== NEPALI TIME =====
const _NP_NUMS = ['०','१','२','३','४','५','६','७','८','९'];
function toNepDigit(s) { return String(s).split('').map(d => _NP_NUMS[parseInt(d)] || d).join(''); }

function getNepaliDateTime() {
  const now = new Date();
  // Nepal is UTC+5:45 = +345 minutes from UTC
  const offsetMin = now.getTimezoneOffset() + 345;
  const npt = new Date(now.getTime() + offsetMin * 60000);
  const nepDays = ['आइतबार','सोमबार','मंगलबार','बुधबार','बिहिबार','शुक्रबार','शनिबार'];
  const nepMonths = ['जनवरी','फेब्रुअरी','मार्च','अप्रिल','मे','जुन','जुलाई','अगस्ट','सेप्टेम्बर','अक्टोबर','नोभेम्बर','डिसेम्बर'];
  const h = npt.getHours(), m = npt.getMinutes();
  const period = h < 4 ? 'राति' : h < 12 ? 'बिहान' : h < 17 ? 'दिउँसो' : h < 20 ? 'साँझ' : 'राति';
  const h12 = h % 12 || 12;
  return `${nepDays[npt.getDay()]} ${toNepDigit(h12)}:${toNepDigit(String(m).padStart(2,'0'))} ${period} (NPT)`;
}

// ===== CLOCK =====
function updateClock() {
  const el = document.getElementById('clock');
  const enEl = document.getElementById('clock-en');
  const npEl = document.getElementById('clock-np');
  if (el) el.textContent = new Date().toLocaleString();
  if (enEl) enEl.textContent = new Date().toLocaleString('en-US', { weekday:'short', month:'short', day:'numeric', hour:'2-digit', minute:'2-digit' });
  if (npEl) npEl.textContent = getNepaliDateTime();
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
