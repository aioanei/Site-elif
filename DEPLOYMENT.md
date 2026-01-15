# 🚀 VERCEL DEPLOYMENT GUIDE

Complete step-by-step guide to deploy your anniversary website!

## Prerequisites

- [ ] GitHub account (free)
- [ ] Vercel account (free)
- [ ] Your website customized (see CUSTOMIZATION.md)

## Step 1: Install Git (if needed)

### Windows:
Download from: https://git-scm.com/download/win

### Check if Git is installed:
```bash
git --version
```

## Step 2: Push Your Code to GitHub

### 2.1 Create a New Repository on GitHub

1. Go to https://github.com
2. Click the "+" icon → "New repository"
3. Name it: `anniversary-website` (or any name you like)
4. Keep it **PRIVATE** (so it stays a surprise!)
5. Don't initialize with README (we already have one)
6. Click "Create repository"

### 2.2 Push Your Code

Open terminal in your project folder and run:

```bash
# Initialize git repository
git init

# Add all files
git add .

# Create first commit
git commit -m "Initial commit - Anniversary website 💝"

# Set main branch
git branch -M main

# Add GitHub as remote (replace YOUR-USERNAME and REPO-NAME)
git remote add origin https://github.com/YOUR-USERNAME/anniversary-website.git

# Push to GitHub
git push -u origin main
```

**Note:** Replace `YOUR-USERNAME` with your actual GitHub username!

## Step 3: Deploy on Vercel

### 3.1 Sign Up / Login

1. Go to https://vercel.com
2. Click "Sign Up" or "Login"
3. Choose "Continue with GitHub"
4. Authorize Vercel to access your GitHub

### 3.2 Create New Project

1. Click "Add New..." → "Project"
2. You'll see your GitHub repositories
3. Find `anniversary-website` and click "Import"

### 3.3 Configure Project

Vercel auto-detects Next.js, so you just need to:

1. **Project Name:** `anniversary-website` (or choose your own)
2. **Framework Preset:** Next.js (already selected)
3. **Root Directory:** `./` (leave as is)
4. **Build Command:** `npm run build` (leave as is)
5. Click **"Deploy"**

🎉 Your site is now deploying! This takes about 2-3 minutes.

### 3.4 Get Your URL

Once deployed, you'll see:
```
🎉 Congratulations! Your project has been deployed!
https://anniversary-website-abc123.vercel.app
```

**Save this URL!** You'll share it with your girlfriend.

## Step 4: Add Database for Leaderboard

### 4.1 Create Postgres Database

1. In your Vercel project dashboard, click the **"Storage"** tab
2. Click **"Create Database"**
3. Select **"Postgres"**
4. Click **"Continue"**

### 4.2 Configure Database

1. **Database Name:** `anniversary-db` (or any name)
2. **Region:** Choose closest to you (e.g., Washington D.C. for US East)
3. Click **"Create"**

### 4.3 Connect to Project

1. Check the box next to your project name
2. Click **"Connect"**
3. ✅ Environment variables are automatically added!

### 4.4 Verify

1. Go to project **Settings** → **Environment Variables**
2. You should see:
   - `POSTGRES_URL`
   - `POSTGRES_PRISMA_URL`
   - `POSTGRES_URL_NON_POOLING`
   - `POSTGRES_USER`
   - `POSTGRES_HOST`
   - `POSTGRES_PASSWORD`
   - `POSTGRES_DATABASE`

## Step 5: Redeploy (Important!)

After adding the database:

1. Go to **"Deployments"** tab
2. Click the **3 dots** (•••) on the latest deployment
3. Click **"Redeploy"**
4. Click **"Redeploy"** again to confirm

✅ Now your leaderboard will work!

## Step 6: Test Everything

Visit your Vercel URL and test:

- [ ] Homepage loads with animations
- [ ] Quiz game works and saves scores
- [ ] Floppy Elf game runs smoothly
- [ ] Memory game functions correctly
- [ ] Leaderboard displays scores
- [ ] All navigation links work

## Step 7: Custom Domain (Optional)

Want a custom domain like `ourlove.com`?

### 7.1 Buy a Domain

Popular registrars:
- Namecheap (https://www.namecheap.com) - ~$10/year
- Google Domains (https://domains.google)
- GoDaddy (https://www.godaddy.com)

### 7.2 Add to Vercel

1. In Vercel project, go to **Settings** → **Domains**
2. Enter your domain: `ourlove.com`
3. Click **"Add"**
4. Follow the DNS instructions provided
5. Wait 24-48 hours for DNS propagation

## 🐛 Troubleshooting

### Build Failed?

**Error:** "Module not found"
- Solution: Make sure all files are committed to GitHub
```bash
git add .
git commit -m "Fix missing files"
git push
```

**Error:** "TypeScript errors"
- Solution: Run locally first to catch errors
```bash
npm run build
```

### Leaderboard Not Working?

**Symptom:** Scores not saving

**Solutions:**
1. Check database is created in Storage tab
2. Verify environment variables in Settings
3. Redeploy after adding database
4. Check browser console for errors (F12)

### Database Connection Error?

**Error:** "Failed to connect to database"

**Solutions:**
1. Make sure database is in the same region
2. Verify environment variables are set
3. Try deleting and recreating the database
4. Redeploy after changes

### Site is Slow?

**Solutions:**
1. Vercel's free tier is fast! If slow, might be your connection
2. Check Vercel Analytics in dashboard
3. Consider upgrading region if users are far away

## 📊 Monitoring

### Check Analytics

1. Go to Vercel project dashboard
2. Click **"Analytics"** tab
3. See visitors, performance, and errors

### Check Logs

1. Go to **"Deployments"** tab
2. Click on a deployment
3. Click **"Functions"** or **"Build Logs"**
4. Debug any issues

## 🔒 Security & Privacy

### Keep Repository Private

1. Go to your GitHub repo
2. Click **Settings**
3. Scroll to **"Danger Zone"**
4. Keep repository **Private**

### Hide Scores from Public

If you want only you and your GF to see leaderboard:

1. Add password protection (advanced)
2. Or simply don't share the leaderboard URL

## 🎁 Sharing with Your Girlfriend

### Option 1: Direct Link

Send her the Vercel URL:
```
Hey! I made something special for you 💝
Check it out: https://your-site.vercel.app
```

### Option 2: QR Code

1. Go to https://www.qr-code-generator.com
2. Enter your Vercel URL
3. Download QR code
4. Print and give her the QR code!

### Option 3: Custom Short Link

Use a URL shortener:
1. Go to https://bit.ly or https://tinyurl.com
2. Shorten your Vercel URL
3. Get a nice short link like `bit.ly/ourlove`

## 🔄 Making Updates

Need to change something after deployment?

```bash
# Make your changes in the code
# Then:
git add .
git commit -m "Update quiz questions"
git push
```

Vercel automatically redeploys! Takes ~2 minutes.

## ✅ Pre-Launch Checklist

Before sharing with your girlfriend:

- [ ] All quiz questions are personalized
- [ ] All games work correctly
- [ ] Leaderboard saves and displays scores
- [ ] No test data in leaderboard
- [ ] Mobile responsive (test on phone)
- [ ] All text is proofread
- [ ] Romantic messages are personal
- [ ] Site loads quickly
- [ ] Database is connected

## 🎉 Launch Day Tips

1. **Test one more time** in the morning
2. **Clear leaderboard** if there's test data
3. **Take a screenshot** of the site (for memories!)
4. **Prepare** what you'll say when giving her the link
5. **Be there** when she first visits it to see her reaction!

---

## 📞 Need More Help?

- **Vercel Docs:** https://vercel.com/docs
- **Next.js Docs:** https://nextjs.org/docs
- **GitHub Help:** https://docs.github.com

---

Good luck! She's going to LOVE it! 💕✨

**Remember:** The fact that you built this yourself shows how much you care. That's what makes it truly special! 🌹
