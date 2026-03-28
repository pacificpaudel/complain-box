// ===== MAIN RENDER =====
function render() {
  document.getElementById('app').innerHTML = buildApp();
  bindEvents();
  updateClock();
}

function buildApp() {
  if (currentPage === 'org-select') return buildOrgSelect();
  return `
    ${buildTopBar()}
    ${buildOrgBar()}
    <div id="main">
      ${buildSidebar()}
      <div id="content">${buildContent()}</div>
      ${buildRightPanel()}
    </div>
    ${buildFooter()}
    ${currentModal ? buildModal() : ''}
  `;
}

// ===== ORG SELECT =====
function buildOrgSelect() {
  return `
  <div id="org-select-page">
    <div style="display:flex;align-items:center;gap:12px;margin-bottom:8px;">
      <div style="width:48px;height:48px;background:var(--accent);border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:24px;">📬</div>
      <h1>Complaint Box</h1>
    </div>
    <p>Select an organization to continue, or create a new one</p>
    <div class="org-grid">
      ${state.orgs.map(org => `
        <div class="org-card" onclick="selectOrg('${org.id}')">
          ${org.logo ? `<img src="${org.logo}" class="org-card-logo" alt="${org.name}">` : `<div class="org-card-logo-ph">🏢</div>`}
          <h3>${org.name}</h3>
          <p>${getOrgMembers(org.id).length} members</p>
          <div class="subdomain-badge">${org.subdomain}.complaintbox.app</div>
        </div>`).join('')}
    </div>
    <div style="display:flex;gap:12px;align-items:center;flex-wrap:wrap;justify-content:center;">
      ${!state.currentUser ? `
        <button class="btn btn-primary" onclick="openModal('login')">Login</button>
        <button class="btn btn-secondary" onclick="openModal('register')">Sign Up</button>
      ` : `
        <span style="color:var(--text2);font-size:13px;">Logged in as <strong>${state.currentUser.name || state.currentUser.email}</strong></span>
        ${state.currentUser.email === SUPER_ADMIN ? `<button class="btn btn-primary" onclick="openModal('createOrg')">+ New Organization</button>` : ''}
        <button class="btn btn-secondary" onclick="logoutUser()">Logout</button>
      `}
    </div>
    ${currentModal ? buildModal() : ''}
  </div>`;
}

// ===== TOP BAR =====
function buildTopBar() {
  return `
  <div id="top-bar">
    <div class="brand">
      <div class="logo-icon">📬</div>
      <span>Complaint Box</span>
    </div>
    <div class="datetime" id="clock">${new Date().toLocaleString()}</div>
  </div>`;
}

// ===== ORG BAR =====
function buildOrgBar() {
  if (!state.currentOrg) return '';
  const org = state.orgs.find(o => o.id === state.currentOrg);
  if (!org) return '';
  const sections = ['All', ...(org.sections || DEFAULT_SECTIONS)];
  const role = getUserRole();
  return `
  <div id="org-bar">
    <div class="org-identity">
      ${org.logo ? `<img src="${org.logo}" class="org-logo" alt="">` : `<div class="org-logo-placeholder">🏢</div>`}
      <div class="org-name">${org.name}</div>
    </div>
    <div class="sections-nav">
      ${sections.map(s => `<button class="${currentSection === s ? 'active' : ''}" onclick="setSection('${s}')">${s}</button>`).join('')}
    </div>
    <div class="user-actions">
      ${state.currentUser ? `
        <button onclick="currentPage='org-select';render()">🏠 Orgs</button>
        <button onclick="openModal('profile')">👤 ${state.currentUser.name || 'Profile'}</button>
        ${(role === 'admin' || role === 'super') ? `<button onclick="currentPage='admin';render()">⚙️ Admin</button>` : ''}
        <button onclick="logoutUser()">Logout</button>
      ` : `
        <button onclick="openModal('login')">Login</button>
        <button class="primary" onclick="openModal('register')">Sign Up</button>
      `}
    </div>
  </div>`;
}

// ===== SIDEBAR =====
function buildSidebar() {
  const org = state.orgs.find(o => o.id === state.currentOrg);
  if (!org) return '';
  const sections = org.sections || DEFAULT_SECTIONS;
  const role = getUserRole();
  const orgComplaints = state.complaints.filter(c => c.orgId === state.currentOrg && !c.deleted);
  return `
  <div id="sidebar">
    <div class="sidebar-section">
      <div class="sidebar-section-title">Browse</div>
      <div class="sidebar-item ${currentPage==='feed'&&currentSection==='All'?'active':''}" onclick="setSection('All');currentPage='feed';render()">
        <span class="icon">🏠</span> All Complaints <span class="count">${orgComplaints.length}</span>
      </div>
      <div class="sidebar-item ${currentSection==='unsolved'?'active':''}" onclick="setSection('unsolved');currentPage='feed';render()">
        <span class="icon">🔴</span> Unsolved <span class="count">${orgComplaints.filter(c=>!c.solved).length}</span>
      </div>
      <div class="sidebar-item ${currentSection==='solved'?'active':''}" onclick="setSection('solved');currentPage='feed';render()">
        <span class="icon">✅</span> Solved <span class="count">${orgComplaints.filter(c=>c.solved).length}</span>
      </div>
    </div>
    <hr>
    <div class="sidebar-section">
      <div class="sidebar-section-title">Sections</div>
      ${sections.map(s => {
        const cnt = orgComplaints.filter(c => c.section === s).length;
        return `<div class="sidebar-item ${currentSection===s&&currentPage==='feed'?'active':''}" onclick="setSection('${s}');currentPage='feed';render()">
          <span class="icon">${getSectionIcon(s)}</span> ${s} <span class="count">${cnt}</span>
        </div>`;
      }).join('')}
    </div>
    ${state.currentUser ? `
    <hr>
    <div class="sidebar-section">
      <div class="sidebar-section-title">My Account</div>
      <div class="sidebar-item" onclick="openModal('profile')"><span class="icon">👤</span> Profile</div>
      ${role==='complainer'||role==='admin'||role==='super' ? `<div class="sidebar-item" onclick="openNewComplaint()"><span class="icon">📝</span> New Complaint</div>` : ''}
      <div class="sidebar-item" onclick="currentPage='mycomplaints';render()"><span class="icon">📋</span> My Complaints</div>
      ${role==='admin'||role==='super' ? `<div class="sidebar-item ${currentPage==='admin'?'active':''}" onclick="currentPage='admin';render()"><span class="icon">⚙️</span> Admin Panel</div>` : ''}
      <div class="sidebar-item" onclick="logoutUser()"><span class="icon">🚪</span> Logout</div>
    </div>` : ''}
  </div>`;
}

// ===== RIGHT PANEL =====
function buildRightPanel() {
  const org = state.orgs.find(o => o.id === state.currentOrg);
  if (!org) return '<div id="right-panel"></div>';
  const orgComplaints = state.complaints.filter(c => c.orgId === state.currentOrg && !c.deleted);
  const recentSolved = orgComplaints.filter(c => c.solved).slice(-3).reverse();
  const role = getUserRole();
  return `
  <div id="right-panel">
    <div class="widget">
      <div class="widget-title">About ${org.name}</div>
      ${org.website ? `<a href="${org.website}" target="_blank" style="color:var(--accent);font-size:13px;text-decoration:none;">🔗 ${org.website}</a><br>` : ''}
      <p style="color:var(--text2);font-size:13px;margin-top:8px;">Subdomain: <span style="font-family:'DM Mono',monospace;color:var(--text3)">${org.subdomain}.complaintbox.app</span></p>
      <div style="margin-top:12px;display:flex;gap:16px;">
        <div><div style="font-size:20px;font-weight:700;font-family:'Playfair Display',serif">${orgComplaints.length}</div><div style="font-size:11px;color:var(--text3)">Total</div></div>
        <div><div style="font-size:20px;font-weight:700;font-family:'Playfair Display',serif;color:var(--green)">${orgComplaints.filter(c=>c.solved).length}</div><div style="font-size:11px;color:var(--text3)">Solved</div></div>
        <div><div style="font-size:20px;font-weight:700;font-family:'Playfair Display',serif;color:var(--red)">${orgComplaints.filter(c=>!c.solved).length}</div><div style="font-size:11px;color:var(--text3)">Open</div></div>
      </div>
    </div>
    ${state.currentUser && (role==='complainer'||role==='admin'||role==='super') ? `
    <div class="widget">
      <button class="btn btn-primary btn-full" onclick="openNewComplaint()">+ New Complaint</button>
    </div>` : ''}
    ${recentSolved.length ? `
    <div class="widget">
      <div class="widget-title">Recently Solved</div>
      ${recentSolved.map(c => `<div style="padding:8px 0;border-bottom:1px solid var(--border);cursor:pointer;font-size:13px;color:var(--text2);" onclick="viewComplaint('${c.id}')">${c.title.slice(0,45)}${c.title.length>45?'...':''}</div>`).join('')}
    </div>` : ''}
  </div>`;
}

// ===== CONTENT ROUTER =====
function buildContent() {
  if (currentPage === 'admin')        return buildAdminPage();
  if (currentPage === 'complaint')    return buildComplaintDetail();
  if (currentPage === 'mycomplaints') return buildMyComplaints();
  return buildFeed();
}

// ===== FEED =====
function buildFeed() {
  const org = state.orgs.find(o => o.id === state.currentOrg);
  if (!org) return '';
  let complaints = state.complaints.filter(c => c.orgId === state.currentOrg && !c.deleted);
  if (currentSection === 'unsolved') complaints = complaints.filter(c => !c.solved);
  else if (currentSection === 'solved') complaints = complaints.filter(c => c.solved);
  else if (currentSection !== 'All') complaints = complaints.filter(c => c.section === currentSection);
  if (searchQuery) {
    const q = searchQuery.toLowerCase();
    complaints = complaints.filter(c => c.title.toLowerCase().includes(q) || c.description.toLowerCase().includes(q));
  }
  complaints = complaints.sort((a, b) => b.createdAt - a.createdAt);
  return `
    <div class="page-header"><h1>${currentSection === 'All' ? 'All Complaints' : currentSection}</h1></div>
    <div class="search-bar">
      <span class="search-icon">🔍</span>
      <input type="text" placeholder="Search complaints..." value="${searchQuery}" oninput="searchQuery=this.value;render()">
    </div>
    ${!complaints.length ? `<div class="empty-state"><div class="icon">📭</div><h3>No complaints here</h3><p>Be the first to raise a complaint in this section.</p></div>` : ''}
    ${complaints.map(c => buildComplaintCard(c)).join('')}`;
}

function buildComplaintCard(c) {
  const author = state.users.find(u => u.email === c.authorEmail && u.orgId === state.currentOrg)
              || state.users.find(u => u.email === c.authorEmail);
  const commentCount = (c.comments || []).length;
  return `
  <div class="complaint-card" onclick="viewComplaint('${c.id}')">
    <div class="card-header">
      ${author?.photo ? `<img src="${author.photo}" class="user-avatar" alt="">` : `<div class="user-avatar-placeholder">👤</div>`}
      <div class="card-meta">
        <div class="user-name">${author?.name || c.authorEmail} <span class="section-tag">${c.section}</span></div>
        <div class="card-date">${new Date(c.createdAt).toLocaleDateString()} · ${daysAgo(c.createdAt)}</div>
      </div>
    </div>
    <h3>${c.title}</h3>
    <p>${c.description.slice(0, 180)}${c.description.length > 180 ? '...' : ''}</p>
    ${c.images && c.images.length ? `<div class="media-preview">${c.images.slice(0,3).map(img => `<img src="${img}" alt="">`).join('')}</div>` : ''}
    <div class="card-footer">
      <span class="stat">👁️ ${c.views || 0} views</span>
      <span class="stat">💬 ${commentCount} comments</span>
      <span class="stat">👥 ${c.opened ? 'Opened' : 'Not opened'}</span>
      <span class="stat">${timeAgo(c.createdAt)}</span>
      ${c.solved ? `<span class="solved-badge">✓ Solved</span>` : `<span class="unsolved-badge">● Open</span>`}
    </div>
  </div>`;
}

// ===== COMPLAINT DETAIL =====
function buildComplaintDetail() {
  const c = state.complaints.find(x => x.id === currentComplaintId);
  if (!c) return '<div class="empty-state"><h3>Complaint not found</h3></div>';
  const author = state.users.find(u => u.email === c.authorEmail && u.orgId === state.currentOrg)
              || state.users.find(u => u.email === c.authorEmail);
  const role = getUserRole();
  const canComment = state.currentUser && (role === 'listener' || role === 'admin' || role === 'super' || role === 'complainer');
  const isAdmin = role === 'admin' || role === 'super';
  return `
  <button class="btn btn-secondary btn-sm" style="margin-bottom:16px" onclick="currentPage='feed';render()">← Back</button>
  <div class="complaint-detail">
    <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:16px;">
      <span class="section-tag">${c.section}</span>
      <div style="display:flex;gap:8px;">
        ${isAdmin ? `<button class="btn btn-sm" onclick="toggleSolved('${c.id}')" style="background:rgba(90,224,160,0.1);color:var(--green);border:1px solid rgba(90,224,160,0.3)">${c.solved ? 'Mark Unsolved' : 'Mark Solved'}</button>` : ''}
        ${isAdmin ? `<button class="btn btn-sm btn-danger" onclick="openDeleteComplaint('${c.id}')">Delete</button>` : ''}
      </div>
    </div>
    <h2>${c.title}</h2>
    <div style="display:flex;align-items:center;gap:12px;margin:12px 0 20px;">
      ${author?.photo ? `<img src="${author.photo}" class="user-avatar" alt="">` : `<div class="user-avatar-placeholder">👤</div>`}
      <div>
        <div style="font-size:13px;font-weight:600;">${author?.name || c.authorEmail}</div>
        <div style="font-size:11px;color:var(--text3);font-family:'DM Mono',monospace;">${new Date(c.createdAt).toLocaleString()} · ${daysAgo(c.createdAt)}</div>
      </div>
      ${c.solved ? `<span class="solved-badge">✓ Solved</span>` : `<span class="unsolved-badge">● Open</span>`}
    </div>
    <p style="color:var(--text2);line-height:1.7;white-space:pre-wrap;margin-bottom:20px;">${c.description}</p>
    ${c.images && c.images.length ? `<div class="media-gallery">${c.images.map(img => `<img src="${img}" alt="">`).join('')}</div>` : ''}
    <div style="display:flex;gap:20px;padding:16px 0;border-top:1px solid var(--border);border-bottom:1px solid var(--border);font-size:13px;color:var(--text3);">
      <span>👁️ ${c.views || 0} views</span>
      <span>💬 ${(c.comments||[]).length} comments</span>
      <span>👥 ${c.opened ? '<span style="color:var(--green)">Opened</span>' : 'Not yet opened'}</span>
    </div>
    <div style="margin-top:24px;">
      <div style="font-size:12px;font-weight:600;color:var(--text3);text-transform:uppercase;letter-spacing:1px;margin-bottom:16px;">Comments</div>
      ${(c.comments || []).map(comment => {
        const cu = state.users.find(u => u.email === comment.authorEmail && u.orgId === state.currentOrg)
                || state.users.find(u => u.email === comment.authorEmail);
        return `<div class="comment">
          ${cu?.photo ? `<img src="${cu.photo}" class="user-avatar" alt="">` : `<div class="user-avatar-placeholder" style="width:32px;height:32px;font-size:12px;">👤</div>`}
          <div>
            <div style="font-size:13px;font-weight:600;">${cu?.name || comment.authorEmail} <span style="font-size:11px;color:var(--text3);font-weight:400;">${timeAgo(comment.at)}</span></div>
            <div style="font-size:13px;color:var(--text2);margin-top:4px;">${comment.text}</div>
          </div>
        </div>`;
      }).join('')}
      ${!(c.comments||[]).length ? `<div style="color:var(--text3);font-size:13px;padding:16px 0;">No comments yet.</div>` : ''}
      ${canComment ? `
      <div class="comment-input" style="margin-top:16px;">
        <input type="text" id="comment-input" placeholder="Add a comment..." onkeydown="if(event.key==='Enter')addComment('${c.id}')">
        <button class="btn btn-primary btn-sm" onclick="addComment('${c.id}')">Post</button>
      </div>` : !state.currentUser ? `<div style="color:var(--text3);font-size:13px;margin-top:12px;">Login to comment</div>` : ''}
    </div>
  </div>`;
}

// ===== MY COMPLAINTS =====
function buildMyComplaints() {
  if (!state.currentUser) return '<div class="empty-state"><h3>Please login</h3></div>';
  const complaints = state.complaints.filter(c => c.orgId === state.currentOrg && c.authorEmail === state.currentUser.email && !c.deleted);
  const deleted = state.deletedComplaints.filter(c => c.orgId === state.currentOrg && c.authorEmail === state.currentUser.email);
  return `
  <div class="page-header"><h1>My Complaints</h1></div>
  ${!complaints.length && !deleted.length ? `<div class="empty-state"><div class="icon">📋</div><h3>No complaints yet</h3></div>` : ''}
  ${complaints.map(c => buildComplaintCard(c)).join('')}
  ${deleted.length ? `
  <div style="margin-top:32px;">
    <h3 style="color:var(--red);font-size:16px;margin-bottom:16px;">Deleted Complaints</h3>
    ${deleted.map(c => `
    <div style="background:var(--surface);border:1px solid rgba(224,90,90,0.3);border-radius:var(--radius-lg);padding:16px;margin-bottom:12px;opacity:0.7;">
      <h3 style="font-size:15px;margin-bottom:8px;">${c.title}</h3>
      <div style="font-size:12px;color:var(--red);">Deleted by admin: "${c.deleteReason}"</div>
      <div style="font-size:11px;color:var(--text3);margin-top:4px;">${new Date(c.deletedAt).toLocaleString()}</div>
    </div>`).join('')}
  </div>` : ''}`;
}

// ===== ADMIN PAGE =====
function buildAdminPage() {
  const org = state.orgs.find(o => o.id === state.currentOrg);
  if (!org) return '';
  const members = getOrgMembers(state.currentOrg);
  const complaints = state.complaints.filter(c => c.orgId === state.currentOrg && !c.deleted);
  const sections = org.sections || DEFAULT_SECTIONS;
  return `
  <div class="page-header">
    <h1>Admin Panel</h1>
    <span class="role-badge role-admin">Admin</span>
  </div>
  <div class="stats-grid">
    <div class="stat-card"><div class="stat-label">Total</div><div class="stat-value">${complaints.length}</div></div>
    <div class="stat-card"><div class="stat-label">Solved</div><div class="stat-value text-green">${complaints.filter(c=>c.solved).length}</div></div>
    <div class="stat-card"><div class="stat-label">Open</div><div class="stat-value text-red">${complaints.filter(c=>!c.solved).length}</div></div>
    <div class="stat-card"><div class="stat-label">Members</div><div class="stat-value">${members.length}</div></div>
  </div>
  <div class="tabs">
    <button class="tab active" onclick="switchAdminTab(event,'tab-org')">Organization</button>
    <button class="tab" onclick="switchAdminTab(event,'tab-members')">Members</button>
    <button class="tab" onclick="switchAdminTab(event,'tab-sections')">Sections</button>
    <button class="tab" onclick="switchAdminTab(event,'tab-complaints')">Complaints</button>
  </div>
  <div id="tab-org">
    <div class="profile-card">
      <h3 style="margin-bottom:20px;font-family:'Playfair Display',serif;">Organization Settings</h3>
      <div class="form-group">
        <label>Logo</label>
        <div class="avatar-upload">
          ${org.logo ? `<img src="${org.logo}" class="avatar-preview" alt="">` : `<div class="avatar-preview-placeholder">🏢</div>`}
          <div class="file-upload-zone" onclick="document.getElementById('orgLogoInput').click()">
            <input type="file" id="orgLogoInput" accept="image/*" onchange="handleOrgLogo(event)">📷 Upload Logo
          </div>
        </div>
      </div>
      <div class="form-group"><label>Name</label><input type="text" id="orgNameInput" value="${org.name}"></div>
      <div class="form-group"><label>Website</label><input type="text" id="orgWebInput" value="${org.website||''}"></div>
      <button class="btn btn-primary" onclick="saveOrgSettings()">Save Settings</button>
    </div>
  </div>
  <div id="tab-members" style="display:none">
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;">
      <h3 style="font-family:'Playfair Display',serif;">Members (${members.length})</h3>
      <button class="btn btn-primary btn-sm" onclick="openModal('inviteUser')">+ Invite User</button>
    </div>
    ${members.map(m => `
    <div class="user-row">
      ${m.photo ? `<img src="${m.photo}" class="user-avatar-sm" alt="">` : `<div style="width:32px;height:32px;border-radius:50%;background:var(--surface3);display:flex;align-items:center;justify-content:center;">👤</div>`}
      <div class="user-info"><div class="name">${m.name||'—'}</div><div class="email">${m.email}</div></div>
      <span class="role-badge role-${m.role}">${m.role}</span>
      <select onchange="changeRole('${m.email}','${m.orgId}',this.value)" style="background:var(--surface3);border:1px solid var(--border);border-radius:6px;color:var(--text);padding:4px 8px;font-size:12px;margin-left:8px;">
        <option value="complainer" ${m.role==='complainer'?'selected':''}>Complainer</option>
        <option value="listener"   ${m.role==='listener'?'selected':''}>Listener</option>
        <option value="admin"      ${m.role==='admin'?'selected':''}>Admin</option>
      </select>
      <button class="btn btn-danger btn-sm" style="margin-left:8px;" onclick="removeMember('${m.email}','${m.orgId}')">Remove</button>
    </div>`).join('')}
  </div>
  <div id="tab-sections" style="display:none">
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;">
      <h3 style="font-family:'Playfair Display',serif;">Sections</h3>
      <button class="btn btn-primary btn-sm" onclick="addNewSection()">+ Add Section</button>
    </div>
    ${sections.map(s => `
    <div style="display:flex;align-items:center;gap:12px;padding:12px 16px;background:var(--surface2);border:1px solid var(--border);border-radius:var(--radius);margin-bottom:8px;">
      <span style="font-size:20px;">${getSectionIcon(s)}</span>
      <span style="flex:1;font-size:14px;">${s}</span>
      <span style="font-size:12px;color:var(--text3);">${complaints.filter(c=>c.section===s).length} complaints</span>
      ${!DEFAULT_SECTIONS.includes(s) ? `<button class="btn btn-danger btn-sm" onclick="removeSection('${s}')">Remove</button>` : ''}
    </div>`).join('')}
    <div style="margin-top:20px;">
      <h4 style="margin-bottom:12px;font-size:14px;">Move Complaint to Section</h4>
      <div style="display:flex;gap:12px;flex-wrap:wrap;align-items:flex-end;">
        <div class="form-group" style="flex:1;margin:0;"><label>Complaint</label>
          <select id="moveComplaintSel">
            <option value="">-- Choose --</option>
            ${complaints.map(c => `<option value="${c.id}">[${c.section}] ${c.title.slice(0,50)}</option>`).join('')}
          </select>
        </div>
        <div class="form-group" style="flex:1;margin:0;"><label>Target Section</label>
          <select id="moveSectionSel">${sections.map(s => `<option value="${s}">${s}</option>`).join('')}</select>
        </div>
        <button class="btn btn-primary" onclick="moveComplaintSection()">Move</button>
      </div>
    </div>
  </div>
  <div id="tab-complaints" style="display:none">
    <h3 style="font-family:'Playfair Display',serif;margin-bottom:16px;">All Complaints</h3>
    ${complaints.map(c => `
    <div style="background:var(--surface2);border:1px solid var(--border);border-radius:var(--radius);padding:14px;margin-bottom:10px;display:flex;align-items:flex-start;gap:12px;">
      <div style="flex:1;">
        <div style="font-weight:600;font-size:14px;margin-bottom:4px;">${c.title}</div>
        <div style="font-size:12px;color:var(--text3);">${c.section} · ${new Date(c.createdAt).toLocaleDateString()} · 👁️${c.views||0} · 💬${(c.comments||[]).length}</div>
      </div>
      <div style="display:flex;gap:8px;flex-shrink:0;">
        <button class="btn btn-sm" onclick="toggleSolved('${c.id}')" style="background:rgba(90,224,160,0.1);color:var(--green);border:1px solid rgba(90,224,160,0.3)">${c.solved?'Unsolved':'Solved'}</button>
        <button class="btn btn-sm btn-danger" onclick="openDeleteComplaint('${c.id}')">Delete</button>
        <button class="btn btn-sm btn-secondary" onclick="viewComplaint('${c.id}')">View</button>
      </div>
    </div>`).join('')}
  </div>`;
}

// ===== MODALS =====
function buildModal() {
  if (currentModal === 'login')           return buildLoginModal();
  if (currentModal === 'register')        return buildRegisterModal();
  if (currentModal === 'createOrg')       return buildCreateOrgModal();
  if (currentModal === 'newComplaint')    return buildNewComplaintModal();
  if (currentModal === 'profile')         return buildProfileModal();
  if (currentModal === 'inviteUser')      return buildInviteUserModal();
  if (currentModal === 'deleteComplaint') return buildDeleteComplaintModal();
  if (currentModal === 'resetPassword')   return buildResetPasswordModal();
  if (currentModal === 'doReset')         return buildDoResetModal();
  return '';
}

function buildLoginModal() {
  return `<div class="modal-overlay" onclick="if(event.target===this)closeModal()">
  <div class="modal">
    <button class="modal-close" onclick="closeModal()">✕</button>
    <h2>Welcome back</h2><div class="subtitle">Sign in to your account</div>
    <div class="form-group"><label>Email</label><input type="email" id="loginEmail" placeholder="you@example.com"></div>
    <div class="form-group"><label>Password</label><input type="password" id="loginPass" placeholder="••••••••" onkeydown="if(event.key==='Enter')doLogin()"></div>
    <button class="btn btn-primary btn-full" onclick="doLogin()">Sign In</button>
    <div style="text-align:center;margin-top:16px;font-size:13px;color:var(--text3);">
      <span style="cursor:pointer;color:var(--accent)" onclick="currentModal='resetPassword';renderModal()">Forgot password?</span> ·
      <span style="cursor:pointer;color:var(--accent)" onclick="currentModal='register';renderModal()">Create account</span>
    </div>
  </div></div>`;
}

function buildRegisterModal() {
  return `<div class="modal-overlay" onclick="if(event.target===this)closeModal()">
  <div class="modal">
    <button class="modal-close" onclick="closeModal()">✕</button>
    <h2>Create Account</h2><div class="subtitle">Join Complaint Box</div>
    <div class="form-group"><label>Full Name</label><input type="text" id="regName" placeholder="Your name"></div>
    <div class="form-group"><label>Email</label><input type="email" id="regEmail" placeholder="you@example.com"></div>
    <div class="form-group"><label>Password</label><input type="password" id="regPass" placeholder="Min 8 chars"></div>
    <div class="form-group"><label>Confirm Password</label><input type="password" id="regPass2" placeholder="Repeat password"></div>
    ${state.orgs.length ? `
    <div class="form-group"><label>Organization</label>
      <select id="regOrg"><option value="">-- Select Organization --</option>${state.orgs.map(o=>`<option value="${o.id}">${o.name}</option>`).join('')}</select>
    </div>
    <div class="form-group"><label>Role</label>
      <select id="regRole"><option value="complainer">Complainer</option><option value="listener">Listener</option></select>
    </div>` : ''}
    <button class="btn btn-primary btn-full" onclick="doRegister()">Create Account</button>
    <div style="text-align:center;margin-top:16px;font-size:13px;color:var(--text3);">
      Already have an account? <span style="cursor:pointer;color:var(--accent)" onclick="currentModal='login';renderModal()">Sign in</span>
    </div>
  </div></div>`;
}

function buildCreateOrgModal() {
  return `<div class="modal-overlay" onclick="if(event.target===this)closeModal()">
  <div class="modal">
    <button class="modal-close" onclick="closeModal()">✕</button>
    <h2>New Organization</h2><div class="subtitle">Create a new organization on Complaint Box</div>
    <div class="form-group"><label>Organization Name</label><input type="text" id="orgName" placeholder="Acme City Council"></div>
    <div class="form-group"><label>Subdomain</label>
      <input type="text" id="orgSubdomain" placeholder="acme-city" oninput="this.value=this.value.toLowerCase().replace(/[^a-z0-9-]/g,'')">
      <div class="form-hint">Will be: [subdomain].complaintbox.app</div>
    </div>
    <div class="form-group"><label>Website (optional)</label><input type="text" id="orgWebsite" placeholder="https://..."></div>
    <div class="form-group"><label>Admin Email</label><input type="email" id="orgAdminEmail" placeholder="admin@org.com"></div>
    <button class="btn btn-primary btn-full" onclick="doCreateOrg()">Create Organization</button>
  </div></div>`;
}

function buildNewComplaintModal() {
  const sections = getCurrentOrgSections();
  return `<div class="modal-overlay" onclick="if(event.target===this)closeModal()">
  <div class="modal wide">
    <button class="modal-close" onclick="closeModal()">✕</button>
    <h2>New Complaint</h2><div class="subtitle">Describe your issue in detail</div>
    <div id="dupCheck"></div>
    <div class="form-group"><label>Title</label><input type="text" id="cTitle" placeholder="Brief, clear title"></div>
    <div class="form-group"><label>Section</label>
      <select id="cSection">${sections.map(s=>`<option value="${s}" ${currentSection===s&&currentSection!=='All'?'selected':''}>${s}</option>`).join('')}</select>
    </div>
    <div class="form-group"><label>Description</label><textarea id="cDesc" placeholder="Describe the issue in detail..."></textarea></div>
    <div class="form-group">
      <label>Photos</label>
      <div class="file-upload-zone" onclick="document.getElementById('cPhotos').click()">
        <input type="file" id="cPhotos" accept="image/*" multiple onchange="previewMedia(event,'photo-preview')">
        📷 Attach photos (max 5)
      </div>
      <div id="photo-preview" style="display:flex;gap:8px;flex-wrap:wrap;margin-top:8px;"></div>
    </div>
    <div class="form-group">
      <label>Videos</label>
      <div class="file-upload-zone" onclick="document.getElementById('cVideos').click()">
        <input type="file" id="cVideos" accept="video/*" multiple onchange="previewMedia(event,'video-preview')">
        🎬 Attach videos (max 2)
      </div>
      <div id="video-preview" style="display:flex;gap:8px;flex-wrap:wrap;margin-top:8px;"></div>
    </div>
    <div class="btn-group">
      <button class="btn btn-primary" onclick="submitComplaint()">Submit Complaint</button>
      <button class="btn btn-secondary" onclick="closeModal()">Cancel</button>
    </div>
  </div></div>`;
}

function buildProfileModal() {
  const u = state.currentUser;
  const member = state.users.find(x => x.email === u?.email && x.orgId === state.currentOrg)
              || state.users.find(x => x.email === u?.email);
  return `<div class="modal-overlay" onclick="if(event.target===this)closeModal()">
  <div class="modal">
    <button class="modal-close" onclick="closeModal()">✕</button>
    <h2>Your Profile</h2>
    <div class="subtitle">${u?.email} · <span class="role-badge role-${getUserRole()}">${getUserRole() || 'user'}</span></div>
    <div class="avatar-upload" style="display:flex;align-items:center;gap:16px;margin-bottom:20px;">
      ${member?.photo ? `<img src="${member.photo}" class="avatar-preview" alt="">` : `<div class="avatar-preview-placeholder">👤</div>`}
      <div>
        <div class="file-upload-zone" style="padding:10px 16px;" onclick="document.getElementById('profilePhoto').click()">
          <input type="file" id="profilePhoto" accept="image/*" onchange="handleProfilePhoto(event)">📷 Change Photo
        </div>
        <div class="form-hint">Unique photo required</div>
      </div>
    </div>
    <div class="form-group"><label>Full Name</label><input type="text" id="profileName" value="${member?.name||u?.name||''}" placeholder="Your full name"></div>
    <div class="form-group"><label>Address</label><input type="text" id="profileAddress" value="${member?.address||''}" placeholder="Your address"></div>
    <div class="form-group"><label>New Password (optional)</label><input type="password" id="newPass" placeholder="Leave blank to keep current"></div>
    <div class="form-group"><label>Confirm New Password</label><input type="password" id="newPass2" placeholder="Confirm new password"></div>
    <button class="btn btn-primary btn-full" onclick="saveProfile()">Save Profile</button>
  </div></div>`;
}

function buildInviteUserModal() {
  return `<div class="modal-overlay" onclick="if(event.target===this)closeModal()">
  <div class="modal">
    <button class="modal-close" onclick="closeModal()">✕</button>
    <h2>Invite User</h2><div class="subtitle">Add a user to this organization</div>
    <div class="form-group"><label>User Email</label><input type="email" id="inviteEmail" placeholder="user@example.com"></div>
    <div class="form-group"><label>Role</label>
      <select id="inviteRole">
        <option value="complainer">Complainer</option>
        <option value="listener">Listener</option>
        <option value="admin">Admin</option>
      </select>
    </div>
    <button class="btn btn-primary btn-full" onclick="doInviteUser()">Add to Organization</button>
  </div></div>`;
}

function buildDeleteComplaintModal() {
  return `<div class="modal-overlay" onclick="if(event.target===this)closeModal()">
  <div class="modal">
    <button class="modal-close" onclick="closeModal()">✕</button>
    <h2>Delete Complaint</h2><div class="subtitle">The complainer will be notified with your reason.</div>
    <div class="form-group"><label>Reason for deletion</label><textarea id="deleteReason" placeholder="Explain why this complaint is being removed..."></textarea></div>
    <div class="btn-group">
      <button class="btn btn-danger" onclick="confirmDelete()">Delete Complaint</button>
      <button class="btn btn-secondary" onclick="closeModal()">Cancel</button>
    </div>
  </div></div>`;
}

function buildResetPasswordModal() {
  return `<div class="modal-overlay" onclick="if(event.target===this)closeModal()">
  <div class="modal">
    <button class="modal-close" onclick="closeModal()">✕</button>
    <h2>Reset Password</h2><div class="subtitle">Enter your email to receive a reset link</div>
    <div class="form-group"><label>Email</label><input type="email" id="resetEmail" placeholder="you@example.com"></div>
    <button class="btn btn-primary btn-full" onclick="doRequestReset()">Send Reset Link</button>
    <div style="text-align:center;margin-top:12px;font-size:13px;">
      <span style="cursor:pointer;color:var(--accent)" onclick="currentModal='doReset';renderModal()">Already have a token?</span>
    </div>
  </div></div>`;
}

function buildDoResetModal() {
  return `<div class="modal-overlay" onclick="if(event.target===this)closeModal()">
  <div class="modal">
    <button class="modal-close" onclick="closeModal()">✕</button>
    <h2>Set New Password</h2><div class="subtitle">Enter your reset token and new password</div>
    <div class="form-group"><label>Email</label><input type="email" id="doResetEmail" placeholder="you@example.com"></div>
    <div class="form-group"><label>Reset Token</label><input type="text" id="doResetToken" placeholder="Token from email"></div>
    <div class="form-group"><label>New Password</label><input type="password" id="doResetPass" placeholder="Min 8 chars"></div>
    <button class="btn btn-primary btn-full" onclick="doResetPassword()">Reset Password</button>
  </div></div>`;
}

// ===== FOOTER =====
function buildFooter() {
  const org = state.orgs.find(o => o.id === state.currentOrg);
  const sections = org ? (org.sections || DEFAULT_SECTIONS) : DEFAULT_SECTIONS;
  return `
  <footer id="footer">
    <div class="footer-grid">
      <div class="footer-brand">
        <div style="display:flex;align-items:center;gap:10px;margin-bottom:10px;">
          <div style="width:32px;height:32px;background:var(--accent);border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:16px;">📬</div>
          <div class="brand-name">Complaint Box</div>
        </div>
        <p>A platform for transparent community complaint management. Every voice matters, every issue counts.</p>
        <div class="app-badges">
          <div class="app-badge"><span class="store-icon">🍎</span><div><div style="font-size:10px;color:var(--text3)">Download on the</div><div style="font-size:13px;font-weight:600;color:var(--text)">App Store</div></div></div>
          <div class="app-badge"><span class="store-icon">🤖</span><div><div style="font-size:10px;color:var(--text3)">Get it on</div><div style="font-size:13px;font-weight:600;color:var(--text)">Google Play</div></div></div>
        </div>
      </div>
      <div class="footer-col">
        <h4>Sections</h4>
        ${sections.slice(0, 5).map(s => `<a onclick="setSection('${s}');currentPage='feed';render()">${s}</a>`).join('')}
      </div>
      <div class="footer-col">
        <h4>Platform</h4>
        <a onclick="currentPage='org-select';render()">All Organizations</a>
        <a onclick="openModal('register')">Sign Up</a>
        <a onclick="openModal('login')">Login</a>
        <a onclick="openModal('resetPassword')">Reset Password</a>
      </div>
      <div class="footer-col">
        <h4>Legal</h4>
        <a>Privacy Policy</a>
        <a>Terms of Service</a>
        <a>Cookie Policy</a>
        <a>Contact Us</a>
      </div>
    </div>
    <div class="footer-bottom">
      <div class="copyright">© ${new Date().getFullYear()} Complaint Box. All rights reserved.</div>
      <div style="color:var(--text3);font-size:12px;">Built with ❤️ for transparent governance</div>
    </div>
  </footer>`;
}

// ===== EVENT BINDING =====
function bindEvents() {
  document.addEventListener('click', (e) => {
    if (e.target.closest('.modal-overlay') === e.target) closeModal();
  });
}
