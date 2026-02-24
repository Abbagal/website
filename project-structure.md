# 3D Spiritual Website - Complete Setup Guide

## Project Structure
```
spiritual-website/
├── frontend/                 # Next.js app
│   ├── src/
│   │   ├── app/
│   │   ├── components/
│   │   │   ├── 3d/          # Three.js components
│   │   │   ├── ui/          # UI components
│   │   │   └── layout/
│   │   ├── lib/
│   │   │   ├── firebase.js  # Firebase config
│   │   │   └── api.js       # API calls
│   │   └── styles/
│   ├── public/
│   │   └── models/          # 3D models (.glb files)
│   └── package.json
│
└── backend/                  # Express API
    ├── src/
    │   ├── routes/
    │   ├── controllers/
    │   ├── models/
    │   ├── middleware/
    │   └── config/
    ├── package.json
    └── railway.json
```

## Budget Breakdown (₹5000/year)
- Domain: ₹600/year (Namecheap)
- Railway Backend: $5/month × 12 = ₹4800/year
- Vercel Frontend: FREE
- Firebase Auth: FREE
- Total: ₹5400/year ✅

## Deployment URLs
- Frontend: https://your-site.vercel.app
- Backend: https://your-api.up.railway.app
- Custom Domain: https://yourspiritual.com
