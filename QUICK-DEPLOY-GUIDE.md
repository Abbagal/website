# ⚡ Quick Deployment Guide

## ✅ What's Done So Far

- [x] Code pushed to GitHub: https://github.com/Abbagal/website
- [x] Firebase project created: "Spiritual-website"
- [ ] Firestore Database (waiting for region selection)
- [ ] Firebase Authentication
- [ ] Vercel deployment
- [ ] Render deployment

---

## 🎯 Next Steps (In Order)

### Step 1: Complete Firebase Setup
**Waiting for:** Client's region preference (Asia vs United States)

Once decided:
1. Select region in Firebase
2. Click "Start in test mode"
3. Click "Create"
4. Enable Authentication
5. Get config values

**Time:** 5 minutes

---

### Step 2: Deploy to Vercel (Frontend)

#### 2.1 Sign in to Vercel
- Go to: https://vercel.com
- Sign in with GitHub

#### 2.2 Import Project
1. Click "Add New" → "Project"
2. Select repository: `Abbagal/website`
3. Click "Import"

#### 2.3 Configure Project
```
Framework Preset: Next.js (auto-detected)
Root Directory: frontend
Build Command: npm run build
Output Directory: .next
Install Command: npm install
```

#### 2.4 Add Environment Variables
Use values from: `VERCEL-ENV-TEMPLATE.txt`

**Required variables (7 total):**
- NEXT_PUBLIC_FIREBASE_API_KEY
- NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
- NEXT_PUBLIC_FIREBASE_PROJECT_ID
- NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
- NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
- NEXT_PUBLIC_FIREBASE_APP_ID
- NEXT_PUBLIC_API_URL (add after backend deploy)

#### 2.5 Deploy
1. Click "Deploy"
2. Wait 2-3 minutes
3. Copy your Vercel URL

**Time:** 5 minutes

---

### Step 3: Deploy to Render (Backend)

#### 3.1 Sign in to Render
- Go to: https://render.com
- Sign in with GitHub

#### 3.2 Create Web Service
1. Click "New +" → "Web Service"
2. Connect repository: `Abbagal/website`
3. Click "Connect"

#### 3.3 Configure Service
```
Name: spiritual-backend
Region: Singapore (closest to India)
Branch: master
Root Directory: backend
Runtime: Node
Build Command: npm install
Start Command: npm start
Instance Type: Free
```

#### 3.4 Add Environment Variables
Use values from: `RENDER-ENV-TEMPLATE.txt`

**Required variables (8 total):**
- NODE_ENV=production
- PORT=5000
- ALLOWED_ORIGINS=YOUR_VERCEL_URL
- RATE_LIMIT_WINDOW_MS=900000
- RATE_LIMIT_MAX_REQUESTS=100
- FIREBASE_PROJECT_ID
- FIREBASE_CLIENT_EMAIL
- FIREBASE_PRIVATE_KEY

#### 3.5 Deploy
1. Click "Create Web Service"
2. Wait 5-10 minutes
3. Copy your Render URL

**Time:** 10 minutes

---

### Step 4: Connect Frontend to Backend

#### 4.1 Update Vercel Environment
1. Go to Vercel Dashboard
2. Select your project
3. Settings → Environment Variables
4. Find `NEXT_PUBLIC_API_URL`
5. Update with Render URL
6. Click "Save"

#### 4.2 Redeploy
1. Deployments tab
2. Click "..." on latest
3. Click "Redeploy"
4. Wait 2 minutes

**Time:** 2 minutes

---

### Step 5: Test Everything

#### 5.1 Test Frontend
- Visit your Vercel URL
- Check 3D elements load
- Open browser console (F12)
- Check for errors

#### 5.2 Test Backend
- Visit: `https://your-backend.onrender.com`
- Should see: `{"message": "🕉️ Spiritual API is running"}`

#### 5.3 Test API Connection
- Open DevTools → Network tab
- Visit your site
- Check API calls are successful

**Time:** 5 minutes

---

## 📋 Environment Variables Checklist

### Vercel (7 variables)
- [ ] NEXT_PUBLIC_FIREBASE_API_KEY
- [ ] NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
- [ ] NEXT_PUBLIC_FIREBASE_PROJECT_ID
- [ ] NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
- [ ] NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
- [ ] NEXT_PUBLIC_FIREBASE_APP_ID
- [ ] NEXT_PUBLIC_API_URL

### Render (8 variables)
- [ ] NODE_ENV
- [ ] PORT
- [ ] ALLOWED_ORIGINS
- [ ] RATE_LIMIT_WINDOW_MS
- [ ] RATE_LIMIT_MAX_REQUESTS
- [ ] FIREBASE_PROJECT_ID
- [ ] FIREBASE_CLIENT_EMAIL
- [ ] FIREBASE_PRIVATE_KEY

---

## 🎯 Total Time Estimate

```
Firebase setup:        5 min
Vercel deployment:     5 min
Render deployment:    10 min
Connect & test:        5 min
─────────────────────────
TOTAL:               25 min
```

---

## 💡 Pro Tips

1. **Copy environment variables carefully** - no extra spaces
2. **Firebase private key** - keep quotes and \n characters
3. **Render free tier** - first deploy takes longer (10 min)
4. **Vercel auto-deploys** - every git push triggers deploy
5. **Test locally first** - make sure everything works

---

## 🚨 Common Issues

### Issue 1: Vercel build fails
**Solution:** Check environment variables are correct

### Issue 2: Backend not responding
**Solution:** Wait 30 seconds (might be sleeping on free tier)

### Issue 3: Firebase errors
**Solution:** Verify config values match Firebase console

### Issue 4: CORS errors
**Solution:** Update ALLOWED_ORIGINS in Render with Vercel URL

---

## 📞 Files Reference

- `VERCEL-ENV-TEMPLATE.txt` - Vercel environment variables
- `RENDER-ENV-TEMPLATE.txt` - Render environment variables
- `DEPLOYMENT-STEPS.md` - Detailed step-by-step guide
- `DEPLOYMENT-CHECKLIST.md` - Quick checklist

---

## ✅ Current Status

**Completed:**
- ✅ Code on GitHub
- ✅ Firebase project created
- ✅ Environment templates ready

**Pending:**
- ⏳ Firebase region selection (waiting for client)
- ⏳ Firestore Database setup
- ⏳ Firebase Authentication
- ⏳ Vercel deployment
- ⏳ Render deployment

**Next Action:** Wait for client's region preference, then continue with Firebase setup.
