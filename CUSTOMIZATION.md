# CUSTOMIZATION GUIDE - READ THIS FIRST! 🎨

## ⚠️ IMPORTANT: Personalize Before Deploying!

This website is a template. You MUST customize it with your girlfriend's information to make it truly special!

## 🎯 Essential Customizations

### 1. Quiz Questions (MOST IMPORTANT!)

**File:** `app/quiz/page.tsx`

**Lines to edit:** 8-52

Replace ALL 10 questions with real facts about your girlfriend:

```typescript
const questions = [
  {
    id: 1,
    question: "What's her favorite color?",  // ← Change this
    options: ["Pink", "Purple", "Blue", "Red"],  // ← Change these
    correctAnswer: 0,  // ← Update this (0=first option, 1=second, etc.)
  },
  // ... Change all 10 questions!
];
```

**How to find correct answer index:**
- If correct answer is option #1 → `correctAnswer: 0`
- If correct answer is option #2 → `correctAnswer: 1`
- If correct answer is option #3 → `correctAnswer: 2`
- If correct answer is option #4 → `correctAnswer: 3`

### 2. Main Page Title & Message

**File:** `app/page.tsx`

**Line 47:** Change the main heading
```typescript
Happy 21st Anniversary! 💖
// Change to match your anniversary (1 year, 2 years, etc.)
```

**Line 53-56:** Personalize the message
```typescript
To the most incredible person in my life.
I created something special just for you! 💝
// Make it more personal!
```

**Line 109-111:** Customize the final quote
```typescript
"Every moment with you is a gift. Here's to many more adventures together!" 🌹
// Add your own romantic message!
```

### 3. Browser Tab Title

**File:** `app/layout.tsx`

**Lines 6-7:**
```typescript
title: "Happy 21st Anniversary! 💝",
description: "A special gift for the most amazing person in the world",
```

### 4. Customize Floppy Elf Character

**File:** `app/floppy-elf/page.tsx`

**Option A - Keep Simple (Recommended):**

**Line 74:** Change the emoji
```typescript
ctx.fillText('🧚', bird.x, bird.y);
// Try: 💝, 🎀, 🦄, 🌸, 👸, or any emoji!
```

**Option B - Add Her Photo (Advanced):**

1. Save a square photo as `public/her-face.png` (200x200px recommended)
2. Replace line 74 with:
```typescript
const img = new Image();
img.src = '/her-face.png';
ctx.drawImage(img, bird.x - bird.radius, bird.y - bird.radius, bird.radius * 2, bird.radius * 2);
```

### 5. Update Colors (Optional)

**File:** `tailwind.config.ts`

Change the romantic color scheme if she prefers different colors:
```typescript
romantic: {
  500: '#f43f5e',  // Main color - change to her favorite!
  600: '#e11d48',  // Darker shade
}
```

**Popular color codes:**
- Pink: `#f43f5e`
- Purple: `#a855f7`
- Blue: `#3b82f6`
- Red: `#ef4444`

## 📋 Pre-Deployment Checklist

Before deploying, make sure you've:

- [ ] Changed ALL 10 quiz questions to be about HER
- [ ] Updated the correctAnswer indices for each question
- [ ] Changed the anniversary number (if not 21st)
- [ ] Personalized the romantic messages
- [ ] Updated the browser tab title
- [ ] (Optional) Customized the Floppy Elf character
- [ ] (Optional) Changed colors to her favorites
- [ ] Tested locally with `npm run dev`

## 🚀 Quick Deploy Steps

1. **Customize** (use this guide!)
2. **Test locally:**
   ```bash
   npm install
   npm run dev
   ```
3. **Push to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Anniversary gift for my love 💝"
   git remote add origin YOUR-GITHUB-REPO-URL
   git push -u origin main
   ```
4. **Deploy on Vercel:**
   - Go to vercel.com
   - Click "New Project"
   - Import your GitHub repo
   - Click "Deploy"
5. **Add Database:**
   - In Vercel, go to Storage tab
   - Create Postgres database
   - Done!

## 💡 Ideas to Make It Even More Special

### Add a Photo Gallery

Create `app/photos/page.tsx`:
```typescript
// Display photos of you two together
// Use the memory game structure as a template
```

### Add a Love Letter Page

Create `app/letter/page.tsx`:
```typescript
// Write a heartfelt message
// Add romantic animations
```

### Hidden Easter Egg

Add a secret page at `app/secret/page.tsx` that she can discover!

### Personal Music

Add background music (her favorite song):
```typescript
// In app/page.tsx, add:
<audio autoPlay loop>
  <source src="/our-song.mp3" type="audio/mpeg" />
</audio>
```

## 🆘 Need Help?

- **Quiz not working?** → Check correctAnswer indices (start from 0!)
- **Colors wrong?** → Edit tailwind.config.ts
- **Deployment failed?** → Make sure all files are saved
- **Database error?** → Add Postgres in Vercel Storage tab

## 🎁 Final Touch

Add a file `public/love-letter.txt` with a secret message, then tell her:
"There's a secret file at yourdomain.com/love-letter.txt"

---

**Remember:** The more you personalize it, the more special it becomes! 💕

Take your time, make it yours, and she'll absolutely love it! 🌹
