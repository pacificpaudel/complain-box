# 📬 Complaint Box

A multi-tenant complaint management platform with AI-powered duplicate detection, role-based access control, and a Reddit-style interface.

## 🚀 Quick Start

### Backend Setup
1. Set up MongoDB Atlas:
   - Create a free cluster at [mongodb.com/atlas](https://www.mongodb.com/atlas)
   - Get your connection string
   - Update `.env` with your `MONGODB_URI`

2. Install dependencies and start the server:
   ```bash
   npm install
   npm start
   ```

3. Open `index.html` in any modern browser.



> Data is now persisted in MongoDB Atlas instead of localStorage.

---

## 📁 Project Structure

```
complaint-box/
├── index.html          # Entry point
├── server.js           # Express backend
├── models/             # Mongoose models
├── routes/             # API routes
├── middleware/         # Auth middleware
├── .env                # Environment variables
├── package.json        # Dependencies
├── css/
│   └── style.css       # All styles (CSS variables, layout, components)
├── js/
│   ├── state.js        # App state + API calls
│   ├── helpers.js      # Utility functions, file handlers, clock
│   ├── ai.js           # Anthropic API duplicate detection
│   ├── actions.js      # All user action handlers
│   ├── render.js       # HTML template builders
│   └── main.js         # Bootstrap / entry point
└── README.md
```

---

## ✨ Features

### Multi-Tenant Organizations
- Super Admin (`praspaudel@gmail.com`) creates organizations
- Each org has a unique subdomain (e.g. `myorg.complaintbox.app`)
- Each org has its own logo, name, website, members, and complaints

### Role System
| Role | Can Do |
|---|---|
| **Super Admin** | Create organizations, access all |
| **Admin** | Manage org settings, members, sections, complaints |
| **Listener** | View and comment on complaints |
| **Complainer** | Submit complaints (with photo/video), comment |

### AI Duplicate Detection
Uses the Claude API (`claude-sonnet-4-20250514`) to semantically check whether a new complaint is substantially the same as an existing one — catching paraphrased duplicates, not just exact matches.

### Complaint Management
- Title, description, section, photos (max 5), videos (max 2)
- Views counter, opened/not-opened status, days elapsed
- Comments (Listeners, Admins, Complainers)
- Solved / Unsolved toggle (Admin)
- Delete with reason — notifies the complainer

### Sections
- 7 defaults: Government, Environment, Health, Education, Infrastructure, Safety, Other
- Admin can add custom sections or remove non-default ones
- Admin can move complaints between sections

### Auth
- Email/password registration and login (form-based only)
- Password reset via token (displayed in notification; hook up email in production)
- Unique email enforcement, unique profile photo enforcement

### Profile
- Full name, address, and profile photo required before submitting complaints
- Password change from profile page

### UI
- Dark theme with gold accent (`Playfair Display` + `DM Sans` + `DM Mono`)
- Reddit-style left sidebar with section counts
- Sticky top bar with live clock
- Org bar with section navigation tabs
- Right panel with org stats and quick actions
- Responsive footer with App Store / Google Play links

---

## 🔧 Configuration

| Item | Location | Default |
|---|---|---|
| Super Admin email | `js/state.js` → `SUPER_ADMIN` | `praspaudel@gmail.com` |
| Default sections | `js/state.js` → `DEFAULT_SECTIONS` | Government, Environment… |
| Super Admin password | `js/main.js` → `hashStr('superadmin123')` | `superadmin123` |
| AI model | `js/ai.js` | `claude-sonnet-4-20250514` |

---

## 🌐 Hosting

### GitHub Pages (free)
1. Push this folder to a GitHub repo
2. Go to **Settings → Pages → Source: main branch**
3. Your app will be live at `https://username.github.io/complaint-box/`

### Any Static Host
Works on Netlify, Vercel, Cloudflare Pages, or any web server — just serve the files as-is.

---

## 📱 Mobile Apps

The footer links to App Store and Google Play. To build native apps, wrap the web app using:
- **React Native WebView**
- **Capacitor** (recommended)
- **Cordova**

---

## 🔒 Production Checklist

- [ ] Replace `localStorage` with a real database (Supabase, Firebase, etc.)
- [ ] Implement real email sending for password resets (SendGrid, Resend, etc.)
- [ ] Add HTTPS / SSL
- [ ] Set up proper subdomain routing per organization
- [ ] Add rate limiting on complaint submissions
- [ ] Store uploaded media in object storage (S3, Cloudflare R2)
- [ ] Add CSRF protection
- [ ] Audit the photo uniqueness hash for collision resistance

---

## 📄 License

MIT — free to use, modify, and redistribute.
