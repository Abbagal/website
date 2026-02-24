# ✅ Deployment Checklist

## Before You Start
- [ ] GitHub account ready
- [ ] Vercel account (free)
- [ ] Render account (free)
- [ ] Firebase account (Google)

---

## Firebase Setup (10 min)
- [ ] Create Firebase project
- [ ] Enable Firestore Database (test mode)
- [ ] Enable Authentication (Email/Password)
- [ ] Copy Frontend config (6 values)
- [ ] Download Admin SDK JSON (for backend)

---

## GitHub Push (2 min)
```bash
git init
git add .
git commit -m "Ready for deployment"
git remote add origin YOUR_REPO_URL
git push -u origin main
```

---

## Vercel Deployment (5 min)
- [ ] Import GitHub repo
- [ ] Root directory: `frontend`
- [ ] Add 7 environment variables:
  - NEXT_PUBLIC_FIREBASE_API_KEY
  - NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
  - NEXT_PUBLIC_FIREBASE_PROJECT_ID
  - NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
  - NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
  - NEXT_PUBLIC_FIREBASE_APP_ID
  - NEXT_PUBLIC_API_URL (add after backend deploy)
- [ ] Click Deploy
- [ ] Copy Vercel URL

---

## Render Deployment (10 min)
- [ ] Create Web Service
- [ ] Connect GitHub repo
- [ ] Root directory: `backend`
- [ ] Build: `npm install`
- [ ] Start: `npm start`
- [ ] Add 5 environment variables:
  - NODE_ENV=production
  - PORT=5000
  - ALLOWED_ORIGINS=YOUR_VERCEL_URL
  - FIREBASE_PROJECT_ID
  - FIREBASE_CLIENT_EMAIL
  - FIREBASE_PRIVATE_KEY
- [ ] Click Deploy
- [ ] Copy Render URL

---

## Connect Frontend to Backend (2 min)
- [ ] Go to Vercel Dashboard
- [ ] Update NEXT_PUBLIC_API_URL with Render URL
- [ ] Redeploy

---

## Test Everything (5 min)
- [ ] Visit Vercel URL
- [ ] Check 3D loads
- [ ] Check console (no errors)
- [ ] Visit Render URL (should show API message)
- [ ] Test API calls (Network tab)

---

## 🎉 DONE!

Your URLs:
- Frontend: https://your-site.vercel.app
- Backend: https://your-backend.onrender.com

---

## Next Steps
- [ ] Add custom domain (optional)
- [ ] Create admin panel for blogs
- [ ] Add Razorpay for donations
- [ ] Optimize 3D models
- [ ] Add Google Analytics

---

## Need Help?
See `DEPLOYMENT-STEPS.md` for detailed instructions.
