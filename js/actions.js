// ===== AUTH ACTIONS =====

async function doLogin() {
  const email = document.getElementById('loginEmail')?.value.trim().toLowerCase();
  const pass  = document.getElementById('loginPass')?.value;
  if (!email || !pass) return notify('Fill in all fields', 'error');

  try {
    const response = await apiPost('/users/login', { email, password: pass });
    if (response.error) {
      return notify(response.error, 'error');
    }
    state.currentUser = response.user;
    saveState(state);
    closeModal();
    notify('Welcome back!', 'success');
    render();
  } catch (error) {
    notify('Login failed', 'error');
  }
}

async function doRegister() {
  const name  = document.getElementById('regName')?.value.trim();
  const email = document.getElementById('regEmail')?.value.trim().toLowerCase();
  const pass  = document.getElementById('regPass')?.value;
  const pass2 = document.getElementById('regPass2')?.value;
  const orgId = document.getElementById('regOrg')?.value;
  const role  = document.getElementById('regRole')?.value || 'complainer';

  if (!name || !email || !pass) return notify('Fill in all required fields', 'error');
  if (pass !== pass2)            return notify('Passwords do not match', 'error');
  if (pass.length < 8)           return notify('Password must be at least 8 characters', 'error');

  try {
    const response = await apiPost('/users/register', { email, password: pass, name, role, orgId, address: '' });
    if (response.error) {
      return notify(response.error, 'error');
    }
    state.currentUser = { email, name };
    saveState(state);
    closeModal();
    notify('Account created!', 'success');
    render();
  } catch (error) {
    notify('Registration failed', 'error');
  }
}

function logoutUser() {
  state.currentUser = null;
  saveState(state); notify('Logged out', 'info'); currentPage = 'org-select'; render();
}

function doRequestReset() {
  const email = document.getElementById('resetEmail')?.value.trim().toLowerCase();
  if (!email) return notify('Enter your email', 'error');
  const u = state.users.find(x => x.email === email);
  if (!u) return notify('No account found with that email', 'error');
  const token = Math.random().toString(36).slice(2, 12).toUpperCase();
  state.passwordResets.push({ email, token, createdAt: Date.now() });
  saveState(state);
  notify(`Reset token: ${token} (In production this is emailed to ${email})`, 'info');
  currentModal = 'doReset'; renderModal();
}

function doResetPassword() {
  const email = document.getElementById('doResetEmail')?.value.trim().toLowerCase();
  const token = document.getElementById('doResetToken')?.value.trim().toUpperCase();
  const pass  = document.getElementById('doResetPass')?.value;
  if (!email || !token || !pass) return notify('Fill in all fields', 'error');
  if (pass.length < 8) return notify('Password too short', 'error');
  const reset = state.passwordResets.find(r => r.email === email && r.token === token);
  if (!reset) return notify('Invalid email or token', 'error');
  if (Date.now() - reset.createdAt > 3600000) return notify('Token expired (1 hour)', 'error');
  state.users.forEach(u => { if (u.email === email) u.password = hashStr(pass); });
  state.passwordResets = state.passwordResets.filter(r => !(r.email === email && r.token === token));
  saveState(state); closeModal(); notify('Password reset! Please login.', 'success'); render();
}

// ===== PROFILE =====

function saveProfile() {
  const name    = document.getElementById('profileName')?.value.trim();
  const address = document.getElementById('profileAddress')?.value.trim();
  const newPass = document.getElementById('newPass')?.value;
  const newPass2= document.getElementById('newPass2')?.value;
  if (newPass && newPass !== newPass2)  return notify('Passwords do not match', 'error');
  if (newPass && newPass.length < 8)    return notify('Password too short', 'error');
  state.users.forEach(u => {
    if (u.email === state.currentUser?.email) {
      if (name)    u.name    = name;
      if (address) u.address = address;
      if (window._pendingProfilePhoto) u.photo = window._pendingProfilePhoto;
      if (newPass) u.password = hashStr(newPass);
    }
  });
  if (name) state.currentUser.name = name;
  window._pendingProfilePhoto = null;
  saveState(state); closeModal(); notify('Profile saved!', 'success'); render();
}

// ===== ORGANIZATION =====

function selectOrg(orgId) {
  state.currentOrg = orgId;
  saveState(state);
  currentPage = 'feed'; currentSection = 'All'; render();
  // Auto-join if logged in and not already a member
  if (state.currentUser && state.currentUser.email !== SUPER_ADMIN) {
    const existing = state.users.find(u => u.email === state.currentUser.email && u.orgId === orgId);
    if (!existing) {
      const base = state.users.find(u => u.email === state.currentUser.email);
      if (base) { state.users.push({ ...base, orgId, role: 'complainer' }); saveState(state); }
    }
  }
}

async function doCreateOrg() {
  const name       = document.getElementById('orgName')?.value.trim();
  const subdomain  = document.getElementById('orgSubdomain')?.value.trim().toLowerCase();
  const website    = document.getElementById('orgWebsite')?.value.trim();
  const adminEmail = document.getElementById('orgAdminEmail')?.value.trim().toLowerCase();
  if (!name || !subdomain || !adminEmail) return notify('Fill in all required fields', 'error');
  if (!/^[a-z0-9-]+$/.test(subdomain)) return notify('Subdomain: letters, numbers, hyphens only', 'error');

  try {
    // Create org
    const org = await apiPost('/orgs', { name, subdomain, website, sections: [...DEFAULT_SECTIONS] });
    if (org.error) return notify(org.error, 'error');

    // Create or update admin user
    let adminUser = state.users.find(u => u.email === adminEmail);
    if (adminUser) {
      // Update existing user to admin for this org
      await apiPut(`/users/${adminUser._id}`, { ...adminUser, role: 'admin', orgId: org._id });
    } else {
      const tempPass = Math.random().toString(36).slice(2, 10);
      await apiPost('/users/register', { email: adminEmail, password: tempPass, name: adminEmail.split('@')[0], role: 'admin', orgId: org._id, address: '' });
      notify(`Admin created. Temp password: ${tempPass} — note this down!`, 'info');
    }

    await loadState(); // Reload state
    closeModal();
    notify('Organization created!', 'success');
    render();
  } catch (error) {
    notify('Failed to create organization', 'error');
  }
}
  saveState(state); closeModal(); notify(`Organization "${name}" created!`, 'success'); render();
}

function saveOrgSettings() {
  const org = state.orgs.find(o => o.id === state.currentOrg);
  if (!org) return;
  org.name    = document.getElementById('orgNameInput')?.value.trim() || org.name;
  org.website = document.getElementById('orgWebInput')?.value.trim();
  saveState(state); notify('Organization settings saved', 'success'); render();
}

// ===== COMPLAINTS =====

function openNewComplaint() {
  if (!state.currentUser) return openModal('login');
  const u = state.users.find(x => x.email === state.currentUser.email && x.orgId === state.currentOrg)
         || state.users.find(x => x.email === state.currentUser.email);
  if (!isProfileComplete(u)) {
    notify('Please complete your profile first (name, address, photo)', 'error');
    openModal('profile'); return;
  }
  window._pendingImages = []; window._pendingVideos = [];
  openModal('newComplaint');
}

async function submitComplaint() {
  if (!state.currentUser) return notify('Please login', 'error');
  const u = state.users.find(x => x.email === state.currentUser.email && x.orgId === state.currentOrg)
         || state.users.find(x => x.email === state.currentUser.email);
  if (!isProfileComplete(u)) return notify('Please complete your profile (name, address, photo) before submitting', 'error');

  const title   = document.getElementById('cTitle')?.value.trim();
  const desc    = document.getElementById('cDesc')?.value.trim();
  const section = document.getElementById('cSection')?.value;
  if (!title || !desc) return notify('Title and description are required', 'error');

  const dupDiv = document.getElementById('dupCheck');
  if (dupDiv) dupDiv.innerHTML = `<div class="ai-checking"><div class="spinner"></div> AI is checking for duplicate complaints...</div>`;

  const dupResult = await checkDuplicate(title, desc, state.currentOrg);
  if (dupDiv) dupDiv.innerHTML = '';

  if (dupResult.isDuplicate) {
    return notify(`Similar complaint already exists: "${dupResult.matchTitle}". ${dupResult.reason}`, 'error');
  }

  const complaint = {
    id: genId(),
    orgId: state.currentOrg,
    title, description: desc, section,
    authorEmail: state.currentUser.email,
    images: window._pendingImages || [],
    videos: window._pendingVideos || [],
    createdAt: Date.now(),
    views: 0, opened: false, solved: false,
    comments: []
  };
  state.complaints.push(complaint);
  window._pendingImages = []; window._pendingVideos = [];
  saveState(state); closeModal(); notify('Complaint submitted!', 'success');
  currentPage = 'feed'; render();
}

function viewComplaint(id) {
  const c = state.complaints.find(x => x.id === id);
  if (!c) return;
  c.views = (c.views || 0) + 1;
  if (state.currentUser && state.currentUser.email !== c.authorEmail) c.opened = true;
  saveState(state);
  currentComplaintId = id; currentPage = 'complaint'; render();
}

function addComment(complaintId) {
  const input = document.getElementById('comment-input');
  if (!input || !input.value.trim()) return;
  const c = state.complaints.find(x => x.id === complaintId);
  if (!c) return;
  c.comments = c.comments || [];
  c.comments.push({ id: genId(), authorEmail: state.currentUser.email, text: input.value.trim(), at: Date.now() });
  saveState(state); currentPage = 'complaint'; render();
}

function toggleSolved(id) {
  const c = state.complaints.find(x => x.id === id);
  if (!c) return;
  c.solved = !c.solved;
  saveState(state); render();
  notify(c.solved ? 'Marked as solved' : 'Marked as unsolved', 'success');
}

function openDeleteComplaint(id) {
  currentComplaintId = id; currentModal = 'deleteComplaint'; renderModal();
}

function confirmDelete() {
  const reason = document.getElementById('deleteReason')?.value.trim();
  if (!reason) return notify('Please provide a reason', 'error');
  const c = state.complaints.find(x => x.id === currentComplaintId);
  if (!c) return;
  c.deleted = true; c.deleteReason = reason; c.deletedAt = Date.now();
  state.deletedComplaints.push({ ...c });
  saveState(state); closeModal();
  notify('Complaint deleted. Complainer notified.', 'success');
  if (currentPage === 'complaint') currentPage = 'feed';
  render();
}

// ===== ADMIN =====

function changeRole(email, orgId, newRole) {
  const u = state.users.find(x => x.email === email && x.orgId === orgId);
  if (u) { u.role = newRole; saveState(state); notify(`Role updated to ${newRole}`, 'success'); }
}

function removeMember(email, orgId) {
  state.users = state.users.filter(u => !(u.email === email && u.orgId === orgId));
  saveState(state); notify('Member removed', 'success'); render();
}

function doInviteUser() {
  const email = document.getElementById('inviteEmail')?.value.trim().toLowerCase();
  const role  = document.getElementById('inviteRole')?.value;
  if (!email) return notify('Enter an email', 'error');
  if (state.users.find(u => u.email === email && u.orgId === state.currentOrg)) return notify('User already in this org', 'error');
  const base = state.users.find(u => u.email === email);
  const entry = { email, password: base?.password || hashStr('changeme'), name: base?.name || email.split('@')[0], role, orgId: state.currentOrg, address: base?.address || '', photo: base?.photo || '', createdAt: Date.now() };
  state.users.push(entry);
  saveState(state); closeModal(); notify('User added to organization', 'success'); render();
}

function addNewSection() {
  const name = prompt('New section name:');
  if (!name || !name.trim()) return;
  const org = state.orgs.find(o => o.id === state.currentOrg);
  if (!org) return;
  if (org.sections.includes(name.trim())) return notify('Section already exists', 'error');
  org.sections.push(name.trim()); saveState(state); notify('Section added', 'success'); render();
}

function removeSection(name) {
  if (!confirm(`Remove section "${name}"? Complaints will be moved to Other.`)) return;
  const org = state.orgs.find(o => o.id === state.currentOrg);
  if (!org) return;
  org.sections = org.sections.filter(s => s !== name);
  state.complaints.forEach(c => { if (c.orgId === state.currentOrg && c.section === name) c.section = 'Other'; });
  saveState(state); notify('Section removed', 'success'); render();
}

function moveComplaintSection() {
  const cId = document.getElementById('moveComplaintSel')?.value;
  const sec  = document.getElementById('moveSectionSel')?.value;
  if (!cId || !sec) return notify('Select complaint and section', 'error');
  const c = state.complaints.find(x => x.id === cId);
  if (c) { c.section = sec; saveState(state); notify('Complaint moved', 'success'); render(); }
}

// ===== NAVIGATION =====

function setSection(s) { currentSection = s; currentPage = 'feed'; render(); }
function openModal(name) { currentModal = name; renderModal(); }
function closeModal() { currentModal = null; if (currentPage === 'org-select') render(); else renderModal(); }

function renderModal() {
  if (currentPage === 'org-select') { render(); return; }
  const existing = document.querySelector('.modal-overlay');
  if (existing) existing.remove();
  if (currentModal) {
    const tmp = document.createElement('div');
    tmp.innerHTML = buildModal();
    document.body.appendChild(tmp.firstElementChild);
  }
}

function switchAdminTab(e, tabId) {
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  e.target.classList.add('active');
  ['tab-org', 'tab-members', 'tab-sections', 'tab-complaints'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.style.display = id === tabId ? 'block' : 'none';
  });
}
