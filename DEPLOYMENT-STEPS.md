# 🚀 Quick Deployment Guide

## Prerequisites Checklist
- [ ] GitHub account
- [ ] Vercel account (sign up with GitHub)
- [ ] Render account (sign up with GitHub)
- [ ] Firebase account (Google account)

---

## STEP 1: Firebase Setup (10 minutes)

### 1.1 Create Firebase Project
1. Go to: https://console.firebase.google.com
2. Click "Add Project"
3. Project name: `spiritual-website` (or any name)
4. Disable Google Analytics (optional)
5. Click "Create Project"

### 1.2 Enable Firestore Database
1. Left sidebar → "Firestore Database"
2. Click "Create database"
3. Select "Start in test mode"
4. Location: `asia-south1 (Mumbai)`
5. Click "Enable"

### 1.3 Enable Authentication
1. Left sidebar → "Authentication"
2. Click "Get Started"
3. Go to "Sign-in method" tab
4. Enable "Email/Password"
5. Enable "Google" (optional)

### 1.4 Get Firebase Config (Frontend)
1. Project Settings (gear icon) → "Project settings"
2. Scroll to "Your apps" section
3. Click Web icon `</>`
4. App nickname: `spiritual-web`
5. Click "Register app"
6. Copy the config values:
   ```
   apiKey: "..."
   authDomain: "..."
   projectId: "..."
   storageBucket: "..."
   messagingSenderId: "..."
   appId: "..."
   ```

### 1.5 Get Firebase Admin SDK (Backend)
1. Project Settings → "Service accounts" tab
2. Click "Generate new private key"
3. Download JSON file
4. Copy these values:
   - `project_id`
   - `client_email`
   - `private_key`

---

## STEP 2: Push to GitHub (5 minutes)

```bash
# Initialize git (if not already)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - Ready for deployment"

# Create repo on GitHub (go to github.com/new)
# Then connect and push:
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git push -u origin main
```

---

## STEP 3: Deploy Frontend to Vercel (5 minutes)

### 3.1 Import Project
1. Go to: https://vercel.com
2. Click "Add New" → "Project"
3. Import your GitHub repository
4. Click on your repo

### 3.2 Configure Project
```
Framework Preset: Next.js
Root Directory: frontend
Build Command: npm run build (auto-detected)
Output Directory: .next (auto-detected)
Install Command: npm install (auto-detected)
```

### 3.3 Add Environment Variables
Click "Environment Variables" and add:
```
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_API_URL=https://your-backend.onrender.com
```

### 3.4 Deploy
1. Click "Deploy"
2. Wait 2-3 minutes
3. Your site is live! Copy the URL (e.g., `https://your-site.vercel.app`)

---

## STEP 4: Deploy Backend to Render (10 minutes)

### 4.1 Create Web Service
1. Go to: https://render.com
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Click "Connect" on your repo

### 4.2 Configure Service
```
Name: spiritual-backend
Region: Singapore (closest to India)
Branch: main
Root Directory: backend
Runtime: Node
Build Command: npm install
Start Command: npm start
Plan: Free
```

### 4.3 Add Environment Variables
Click "Environment" tab and add:
```
NODE_ENV=production
PORT=5000
ALLOWED_ORIGINS=https://your-site.vercel.app
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_CLIENT_EMAIL=your_client_email
FIREBASE_PRIVATE_KEY="your_private_key_with_newlines"
```

**Important:** For `FIREBASE_PRIVATE_KEY`, keep the quotes and `\n` characters as-is.

### 4.4 Deploy
1. Click "Create Web Service"
2. Wait 5-10 minutes for first deploy
3. Copy your backend URL (e.g., `https://spiritual-backend.onrender.com`)

---

## STEP 5: Connect Frontend to Backend (2 minutes)

### 5.1 Update Vercel Environment Variable
1. Go to Vercel Dashboard
2. Select your project
3. Settings → Environment Variables
4. Find `NEXT_PUBLIC_API_URL`
5. Update value to your Render backend URL
6. Click "Save"

### 5.2 Redeploy Frontend
1. Go to "Deployments" tab
2. Click "..." on latest deployment
3. Click "Redeploy"
4. Wait 2 minutes

---

## STEP 6: Update Firebase CORS (2 minutes)

### 6.1 Update Firestore Rules
1. Go to Firebase Console
2. Firestore Database → Rules
3. Replace with:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read for all
    match /{document=**} {
      allow read: if true;
    }
    
    // Allow write only for authenticated users
    match /blogs/{blogId} {
      allow write: if request.auth != null;
    }
    
    match /mantras/{mantraId} {
      allow write: if request.auth != null;
    }
  }
}
```
4. Click "Publish"

---

## STEP 7: Test Everything (5 minutes)

### 7.1 Test Frontend
1. Visit your Vercel URL
2. Check if 3D elements load
3. Check browser console for errors

### 7.2 Test Backend
1. Visit: `https://your-backend.onrender.com`
2. Should see: `{"message": "🕉️ Spiritual API is running"}`

### 7.3 Test Connection
1. Open browser DevTools (F12)
2. Go to Network tab
3. Visit your site
4. Check if API calls are successful

---

## 🎉 DONE! Your Site is Live!

### Your URLs:
- **Frontend**: https://your-site.vercel.app
- **Backend**: https://your-backend.onrender.com
- **Firebase Console**: https://console.firebase.google.com

---

## ⚠️ Important Notes

### Render Free Tier:
- Backend sleeps after 15 minutes of inactivity
- First request after sleep takes 30-50 seconds
- This is normal for free tier
- Upgrade to paid plan (₹400/month) to remove sleep

### Firebase Free Tier Limits:
- 50,000 reads/day
- 20,000 writes/day
- 1 GB storage
- Should be enough for initial launch

### Auto-Deploy:
- Every `git push` to main branch will auto-deploy
- Vercel: ~2 minutes
- Render: ~5 minutes

---

## 🔧 Troubleshooting

### Frontend not loading:
- Check Vercel logs
- Verify environment variables
- Check browser console

### Backend not responding:
- Wait 30 seconds (might be sleeping)
- Check Render logs
- Verify environment variables

### Firebase errors:
- Check Firebase config values
- Verify Firestore rules
- Check Firebase console for quota

---

## 📞 Need Help?

Check logs:
- Vercel: Dashboard → Your Project → Deployments → View Function Logs
- Render: Dashboard → Your Service → Logs
- Firebase: Console → Your Project → Usage

---

## 🚀 Next Steps After Deployment

1. Add custom domain (optional, ₹600/year)
2. Set up Firebase security rules properly
3. Add admin panel for blog posting
4. Integrate Razorpay for donations
5. Add Google Analytics
6. Optimize 3D models for faster loading

---

## 💰 Cost Summary

**Current Setup (FREE):**
- Vercel: ₹0
- Render: ₹0 (with sleep)
- Firebase: ₹0
- **Total: ₹0/month**

**After Upgrade:**
- Vercel: ₹0
- Railway: ₹400/month (no sleep)
- Firebase: ₹0-200/month
- Domain: ₹600/year
- **Total: ~₹5,400/year**
