# 💝 Anniversary Website - A Special Gift

A beautiful, romantic website with interactive games built with Next.js for your girlfriend's 21st anniversary!

## 🎮 Features

- **💖 Romantic Landing Page** - Animated hearts, beautiful gradients, and smooth transitions
- **💝 Quiz Game** - 10 personalized questions about her with a leaderboard
- **🧚 Floppy Elf** - A fun Flappy Bird-style game with a magical elf character
- **❤️ Memory Hearts** - Match the hearts in this romantic memory card game
- **🏆 Leaderboard** - Track high scores across all games with PostgreSQL database

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- A Vercel account (free)

### Installation

1. **Install dependencies:**
```bash
npm install
```

2. **Run locally:**
```bash
npm run dev
```

Visit `http://localhost:3000` to see the site!

## 🎨 Customization Guide

### 1. Personalize the Quiz Questions

Edit [app/quiz/page.tsx](app/quiz/page.tsx) and modify the `questions` array (lines 8-52):

```typescript
const questions = [
  {
    id: 1,
    question: "What's her favorite color?",
    options: ["Pink", "Purple", "Blue", "Red"],
    correctAnswer: 0, // Index starts at 0
  },
  // Add your own questions here!
];
```

### 2. Change Her Name/Title

- Edit [app/layout.tsx](app/layout.tsx) line 6-7 to change the page title
- Edit [app/page.tsx](app/page.tsx) line 47 to update the main heading

### 3. Customize Colors

Edit [tailwind.config.ts](tailwind.config.ts) to change the romantic color palette:

```typescript
romantic: {
  500: '#f43f5e', // Main romantic color
  600: '#e11d48', // Darker shade
  // Customize as needed!
}
```

### 4. Add Your Own Personal Touch

- Replace the elf emoji in [app/floppy-elf/page.tsx](app/floppy-elf/page.tsx) line 74 with an image:
  - Upload her photo to `/public/her-photo.jpg`
  - Replace the emoji drawing code with image loading

- Add romantic messages throughout the site
- Include inside jokes in the quiz questions
- Add more games using the existing templates

## 📦 Deploy to Vercel

### Step 1: Push to GitHub

```bash
git init
git add .
git commit -m "Anniversary website for my love 💝"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/anniversary-website.git
git push -u origin main
```

### Step 2: Deploy on Vercel

1. Go to [vercel.com](https://vercel.com) and sign up/login
2. Click "New Project"
3. Import your GitHub repository
4. Vercel will auto-detect Next.js - just click "Deploy"!

### Step 3: Add Database (for Leaderboard)

1. In your Vercel project dashboard, go to the "Storage" tab
2. Click "Create Database"
3. Select "Postgres" and click "Continue"
4. Choose a name (e.g., "anniversary-db") and region
5. Click "Create"
6. The environment variables will be automatically added!

### Step 4: Redeploy

After adding the database, Vercel will automatically redeploy. Your leaderboard will now work!

## 🎯 Optional Enhancements

### Add More Games

1. Create a new folder in `app/` (e.g., `app/word-puzzle`)
2. Add a `page.tsx` file
3. Copy the structure from existing games
4. Add the game card to [app/page.tsx](app/page.tsx)

### Add Photos

1. Create a `/public` folder
2. Add photos: `/public/us-photo-1.jpg`, etc.
3. Create a photo gallery page
4. Use Next.js `<Image>` component for optimization

### Custom Domain

1. Buy a domain (e.g., `ourlove.com`)
2. In Vercel project settings, go to "Domains"
3. Add your custom domain and follow DNS instructions

## 📝 Environment Variables (Local Development)

Create a `.env.local` file for local database testing:

```env
POSTGRES_URL="your-connection-string"
POSTGRES_PRISMA_URL="your-prisma-connection-string"
POSTGRES_URL_NON_POOLING="your-non-pooling-connection-string"
POSTGRES_USER="your-username"
POSTGRES_HOST="your-host"
POSTGRES_PASSWORD="your-password"
POSTGRES_DATABASE="your-database"
```

*Note: On Vercel, these are automatically configured when you add a Postgres database.*

## 🐛 Troubleshooting

### Leaderboard not working?

- Make sure you've added the Vercel Postgres database
- Check that environment variables are set in Vercel dashboard
- The table is created automatically on first use

### Games not responsive?

- The games work best on desktop/laptop
- For mobile optimization, add media queries in the game components

### Build errors?

```bash
# Clear cache and rebuild
rm -rf .next node_modules
npm install
npm run build
```

## 💕 Final Tips

1. **Test everything locally first** before deploying
2. **Customize all the questions** to make them personal
3. **Add a surprise** - maybe a hidden page with photos?
4. **Send her the link** on the special day!

## 📱 Technologies Used

- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Vercel Postgres** - Database for leaderboard
- **Canvas API** - For the Floppy Elf game

---

Made with ❤️ for the most amazing person in the world!

Good luck, and I hope she loves it! 💖
