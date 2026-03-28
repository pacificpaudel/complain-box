// ===== BOOTSTRAP =====
async function init() {
  await loadState();

  // Seed Super Admin account on first load
  if (!state.users.find(u => u.email === SUPER_ADMIN)) {
    try {
      await apiPost('/users/register', {
        email: SUPER_ADMIN,
        password: 'superadmin123',
        name: 'Super Admin',
        role: 'super',
        orgId: null,
        address: 'Kathmandu'
      });
      await loadState(); // Reload after seeding
    } catch (error) {
      console.error('Failed to seed super admin:', error);
    }
  }

  // Initial render
  render();
}

init();
