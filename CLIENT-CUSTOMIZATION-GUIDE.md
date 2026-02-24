# 🎨 Client Customization Guide

## 📱 Social Media Links Update Kaise Karein

### Method 1: Footer Links (Recommended)
File: `frontend/src/components/Footer.js`

Line 16-47 pe jao aur apne links update karo:

```javascript
<a
  href="https://youtube.com/@YOUR_CHANNEL_NAME"  // ← Yahan apna YouTube channel
  target="_blank"
  rel="noopener noreferrer"
  className="w-10 h-10 bg-red-600 rounded-full..."
>
  <span className="text-xl">📺</span>
</a>

<a
  href="https://instagram.com/YOUR_USERNAME"  // ← Yahan apna Instagram
  target="_blank"
  rel="noopener noreferrer"
  className="w-10 h-10 bg-gradient-to-br from-purple-600..."
>
  <span className="text-xl">📷</span>
</a>
```

### Method 2: Navbar Social Links
File: `frontend/src/components/SocialLinks.js`

Line 8-31 pe jao:

```javascript
const socialLinks = [
  {
    name: 'YouTube',
    url: 'https://youtube.com/@YOUR_CHANNEL',  // ← Update here
    icon: Youtube,
  },
  {
    name: 'Instagram',
    url: 'https://instagram.com/YOUR_USERNAME',  // ← Update here
    icon: Instagram,
  },
  // ... etc
];
```

---

## 📝 Daily Blogs Kaise Add Karein

### Option 1: Backend se (Recommended)
File: `backend/src/routes/blogs.js`

Line 6 se blogs array mein naye blogs add karo:

```javascript
const blogs = [
  {
    id: 7,  // New ID
    title: 'Apna Blog Title',
    excerpt: 'Short description (2-3 lines)',
    content: 'Full blog content yahan likho...',
    image: 'https://your-image-url.com/image.jpg',
    date: 'Feb 25, 2024',
    readTime: '5 min read',
    author: 'Your Name',
    category: 'Meditation',  // Categories: Meditation, Mantras, Yoga, Healing, Lifestyle, Culture
    views: 0,
    likes: 0
  },
  // ... existing blogs
];
```

### Option 2: Frontend Fallback Data
File: `frontend/src/components/DailyBlogs.js`

Line 130 se sample blogs update karo (agar backend nahi chal raha)

---

## 🖼️ Blog Images Kaise Change Karein

### Free Image Sources:
1. **Unsplash**: https://unsplash.com (Free, high quality)
2. **Pexels**: https://pexels.com (Free stock photos)
3. **Pixabay**: https://pixabay.com (Free images)

### Image URL Kaise Use Karein:
```javascript
image: 'https://images.unsplash.com/photo-1234567890?w=800'
```

### Apni Images Upload Karein:
1. Firebase Storage use karo (free 5GB)
2. Ya Cloudinary (free tier)
3. Direct URL paste karo blog mein

---

## 📧 Contact Information Update

File: `frontend/src/components/Footer.js`

Line 80-95 pe contact details update karo:

```javascript
<li className="flex items-center gap-3 text-white/60">
  <Mail size={20} />
  <span>your-email@domain.com</span>  // ← Update
</li>
<li className="flex items-center gap-3 text-white/60">
  <Phone size={20} />
  <span>+91 98765 43210</span>  // ← Update
</li>
<li className="flex items-center gap-3 text-white/60">
  <MapPin size={20} />
  <span>Your City, India</span>  // ← Update
</li>
```

---

## 🎨 Colors Change Kaise Karein

File: `frontend/tailwind.config.js`

```javascript
colors: {
  spiritual: {
    orange: '#FF6B35',  // ← Change colors
    gold: '#F7B801',
    purple: '#6A4C93',
    blue: '#1982C4',
  },
}
```

---

## 📱 Backend API Connect Karna

### Local Development:
File: `frontend/.env.local`
```
NEXT_PUBLIC_API_URL=http://localhost:5000
```

### Production (After Deployment):
```
NEXT_PUBLIC_API_URL=https://your-backend.onrender.com
```

---

## 🚀 New Blog Post Add Karne Ka Quick Process

1. **Backend file kholo**: `backend/src/routes/blogs.js`

2. **Naya blog object banao**:
```javascript
{
  id: 7,  // Last blog ka ID + 1
  title: 'Your Amazing Blog Title',
  excerpt: 'Short 2-3 line description that appears on card',
  content: 'Full detailed blog content here. You can write multiple paragraphs...',
  image: 'https://images.unsplash.com/photo-xyz?w=800',
  date: 'Feb 25, 2024',  // Today's date
  readTime: '5 min read',  // Estimate
  author: 'Your Name',
  category: 'Meditation',  // Choose: Meditation, Mantras, Yoga, Healing, Lifestyle, Culture
  views: 0,
  likes: 0
}
```

3. **Save karo** - Backend automatically restart hoga (nodemon)

4. **Browser refresh karo** - Naya blog dikhai dega!

---

## 🎥 YouTube Videos Embed Karna (Future)

Agar aap blog mein YouTube videos add karna chahte ho:

```javascript
// Blog content mein:
content: `
  <h2>Watch This Video</h2>
  <iframe 
    width="560" 
    height="315" 
    src="https://www.youtube.com/embed/YOUR_VIDEO_ID"
    frameborder="0"
    allowfullscreen
  ></iframe>
  
  <p>Rest of your blog content...</p>
`
```

---

## 📊 Blog Categories

Available categories:
- **Meditation** - Meditation techniques, tips
- **Mantras** - Mantra meanings, chanting guides
- **Yoga** - Yoga poses, practices
- **Healing** - Chakra healing, energy work
- **Lifestyle** - Mindful living, daily practices
- **Culture** - Temples, traditions, festivals

---

## 🔧 Testing Your Changes

### After updating social links:
1. Save file
2. Browser refresh (Ctrl+R)
3. Click links to verify they work

### After adding new blog:
1. Save backend file
2. Check terminal - should say "restarting"
3. Browser refresh
4. Scroll to blogs section
5. New blog should appear

---

## 📞 Quick Reference

### Important Files:
```
Social Links:
- frontend/src/components/Footer.js (lines 16-47)
- frontend/src/components/SocialLinks.js (lines 8-31)

Blogs:
- backend/src/routes/blogs.js (add new blogs here)
- frontend/src/components/DailyBlogs.js (fallback data)

Contact:
- frontend/src/components/Footer.js (lines 80-95)

Colors:
- frontend/tailwind.config.js
- frontend/src/app/globals.css
```

### Commands:
```bash
# Start frontend
cd frontend
npm run dev

# Start backend
cd backend
npm run dev

# Install new packages
npm install package-name
```

---

## 💡 Pro Tips

1. **Images**: Always use optimized images (< 500KB)
2. **Links**: Test all social links after updating
3. **Blogs**: Write engaging excerpts (2-3 lines max)
4. **Categories**: Stick to existing categories for consistency
5. **Dates**: Use format "Feb 25, 2024"
6. **Read Time**: Estimate: 200 words = 1 minute

---

## 🆘 Common Issues

### Blog not showing?
- Check backend is running (port 5000)
- Check browser console for errors
- Verify blog ID is unique

### Social links not working?
- Check URL format: https://...
- Verify target="_blank" is present
- Test link in new tab first

### Images not loading?
- Use direct image URLs
- Check image URL is accessible
- Use https:// not http://

---

## 📱 Client Contact for Updates

Agar aapko koi changes chahiye:

1. **Social Links**: Apne YouTube/Instagram URLs bhejo
2. **Blogs**: Blog title, content, aur image bhejo
3. **Contact Info**: Email, phone, address bhejo
4. **Colors**: Preferred color codes bhejo

Main 24 hours mein update kar dunga! 🚀

---

## 🎉 Ready to Go!

Sab kuch set hai:
✅ Social media links (YouTube, Instagram, Facebook, Twitter)
✅ Daily blogs section with backend API
✅ Beautiful blog cards with images
✅ Categories and filtering
✅ Responsive design
✅ Easy to update

**Happy Blogging! 📝✨**
