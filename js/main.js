// ===== BOOTSTRAP =====
// Seed Super Admin account on first load
if (!state.users.find(u => u.email === SUPER_ADMIN)) {
  state.users.push({
    email: SUPER_ADMIN,
    password: hashStr('superadmin123'),
    name: 'Super Admin',
    role: 'super',
    orgId: null,
    address: 'Kathmandu',
    photo: '',
    createdAt: Date.now()
  });
  saveState(state);
}

// Initial render
render();
