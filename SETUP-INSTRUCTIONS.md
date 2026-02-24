# 🚀 Quick Setup Instructions (Hindi + English)

## Local Development Setup

### 1. Install Dependencies

**Frontend:**
```bash
cd frontend
npm install
```

**Backend:**
```bash
cd backend
npm install
```

### 2. Environment Setup

**Frontend (.env.local):**
```bash
cd frontend
copy .env.example .env.local
# Ab .env.local file mein apne Firebase credentials paste karo
```

**Backend (.env):**
```bash
cd backend
copy .env.example .env
# Ab .env file mein apne credentials paste karo
```

### 3. Run Development Servers

**Terminal 1 - Frontend:**
```bash
cd frontend
npm run dev
```
Frontend chalega: http://localhost:3000

**Terminal 2 - Backend:**
```bash
cd backend
npm run dev
```
Backend chalega: http://localhost:5000

### 4. Test Karo

Browser mein jao: http://localhost:3000
- 3D elements dikhne chahiye
- Smooth animations
- No errors in console

---

## Firebase Setup (Detailed)

### Step 1: Project Banao
1. https://console.firebase.google.com pe jao
2. "Add Project" click karo
3. Project name: "spiritual-website"
4. Continue karo

### Step 2: Authentication Enable Karo
1. Left sidebar mein "Authentication" click karo
2. "Get Started" button click karo
3. "Email/Password" enable karo
4. "Google" sign-in enable karo
5. Save karo

### Step 3: Firestore Database Banao
1. Left sidebar mein "Firestore Database" click karo
2. "Create Database" click karo
3. "Start in test mode" select karo
4. Location: "asia-south1" (Mumbai) select karo
5. Enable karo

### Step 4: Config Copy Karo
1. Project Settings (gear icon) pe click karo
2. Neeche scroll karo "Your apps" tak
3. Web icon (</>) click karo
4. App nickname: "spiritual-web"
5. Register app
6. Config values copy karo:
   ```javascript
   const firebaseConfig = {
     apiKey: "...",
     authDomain: "...",
     projectId: "...",
     // ... etc
   };
   ```
7. Ye values frontend/.env.local mein paste karo

---

## Project Structure

```
spiritual-website/
├── frontend/                    # Next.js app
│   ├── src/
│   │   ├── app/                # Pages
│   │   │   ├── page.js         # Home page
│   │   │   ├── layout.js       # Layout
│   │   │   └── globals.css     # Global styles
│   │   ├── components/         # React components
│   │   │   ├── Navbar.js       # Navigation
│   │   │   ├── Hero.js         # Hero section
│   │   │   └── 3d/             # 3D components
│   │   │       ├── Scene3D.js  # Main 3D scene
│   │   │       ├── OmSymbol.js # Om 3D model
│   │   │       └── Lotus.js    # Lotus 3D model
│   │   └── lib/
│   │       └── firebase.js     # Firebase config
│   ├── package.json
│   └── .env.local              # Environment variables
│
└── backend/                     # Express API
    ├── src/
    │   ├── server.js           # Main server
    │   └── routes/             # API routes
    │       ├── mantras.js      # Mantras API
    │       └── content.js      # Content API
    ├── package.json
    └── .env                    # Environment variables
```

---

## Features Included

### Frontend:
✅ Next.js 14 (Latest)
✅ React Three Fiber (3D)
✅ Framer Motion (Animations)
✅ Tailwind CSS (Styling)
✅ Firebase Auth (Login/Signup)
✅ Responsive Design
✅ SEO Optimized

### Backend:
✅ Express.js
✅ CORS enabled
✅ Rate limiting
✅ Compression
✅ Security headers (Helmet)
✅ RESTful API

### 3D Elements:
✅ Rotating Om Symbol (ॐ)
✅ Floating Lotus
✅ Particle stars background
✅ Smooth animations
✅ Auto-rotate camera

---

## Common Issues & Solutions

### Issue 1: npm install fail ho raha hai
**Solution:**
```bash
# Node version check karo
node --version
# Should be 18+ 

# Agar purana hai to update karo
# Download from: https://nodejs.org
```

### Issue 2: 3D elements nahi dikh rahe
**Solution:**
```bash
# Browser console check karo (F12)
# Three.js properly install hai ya nahi check karo
cd frontend
npm install three @react-three/fiber @react-three/drei --save
```

### Issue 3: Firebase error aa raha hai
**Solution:**
- .env.local file check karo
- Sab values properly paste kiye hai?
- Quotes (" ") mat lagao values mein
- Firebase console mein project enabled hai?

### Issue 4: Backend connect nahi ho raha
**Solution:**
```bash
# Backend chal raha hai check karo
# Browser mein jao: http://localhost:5000
# Agar error hai to:
cd backend
npm install
npm run dev
```

### Issue 5: Port already in use
**Solution:**
```bash
# Windows:
netstat -ano | findstr :3000
taskkill /PID <PID_NUMBER> /F

# Ya port change karo:
# frontend: npm run dev -- -p 3001
# backend: .env mein PORT=5001
```

---

## Testing Checklist

Before deployment, test karo:

- [ ] Frontend chal raha hai (localhost:3000)
- [ ] Backend chal raha hai (localhost:5000)
- [ ] 3D Om symbol dikh raha hai
- [ ] Lotus float kar raha hai
- [ ] Stars background dikh raha hai
- [ ] Navbar working hai
- [ ] Animations smooth hain
- [ ] Mobile pe responsive hai
- [ ] No console errors
- [ ] API calls working hain

---

## Next Steps

1. ✅ Local setup complete karo
2. ✅ Test karo thoroughly
3. ✅ Firebase setup karo
4. ✅ Git repository banao
5. ✅ Deploy karo (DEPLOYMENT-GUIDE.md dekho)
6. ✅ Client ko demo dikhaao
7. ✅ Feedback lo
8. ✅ Improvements karo

---

## Need Help?

**Check these files:**
- `README.md` - Overview
- `DEPLOYMENT-GUIDE.md` - Deployment steps
- `project-structure.md` - Architecture

**Test URLs:**
- Frontend: http://localhost:3000
- Backend: http://localhost:5000
- Backend Health: http://localhost:5000/api/health
- Mantras API: http://localhost:5000/api/mantras

---

## 🎉 All Set!

Ab tum ready ho:
1. Local development ke liye
2. Client demo ke liye
3. Production deployment ke liye

**Happy Coding! 🚀**
