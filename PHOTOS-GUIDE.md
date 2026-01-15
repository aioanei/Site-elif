# How to Add Photos to Your Memory Game 📸

## Step 1: Prepare Your Photos

1. **Choose 8 photos** of you and your girlfriend together
2. **Rename them** to simple names:
   - `photo1.jpg`
   - `photo2.jpg`
   - `photo3.jpg`
   - ... up to `photo8.jpg`

3. **Recommended:** Make them square (crop to 500x500px or similar)

## Step 2: Add Photos to the Project

1. **Create a `public` folder** in your project root if it doesn't exist:
   ```
   Site elif/
   ├── public/          ← Create this folder
   │   ├── photo1.jpg   ← Put photos here
   │   ├── photo2.jpg
   │   ├── photo3.jpg
   │   └── ...
   ├── app/
   ├── package.json
   └── ...
   ```

2. **Copy your 8 photos** into the `public` folder

## Step 3: The Code is Already Updated!

The memory game now supports images automatically! It will:
- Display your photos instead of emojis
- Keep all the matching game logic
- Still look beautiful with the same animations

## Alternative: Mix Photos and Emojis

Want some photos and some heart emojis? Edit [app/memory-game/page.tsx](app/memory-game/page.tsx):

```typescript
const emojis = [
  '/photo1.jpg',
  '/photo2.jpg',
  '/photo3.jpg',
  '/photo4.jpg',
  '💖',  // Mix with emojis!
  '💝',
  '💕',
  '💗',
];
```

## Step 4: Test It!

```bash
npm run dev
```

Visit the Memory Hearts game and see your photos!

## Tips:

- **Photo quality:** Use clear, high-quality photos
- **File size:** Keep photos under 1MB each for faster loading
- **Orientation:** Square photos work best (1:1 aspect ratio)
- **Format:** JPG, PNG, or WEBP all work fine

---

## Changes Made:

✅ **Floppy Elf:** Reduced gravity from 0.5 to 0.3 (easier to control!)  
✅ **Memory Game:** Now supports photo images instead of just emojis  

Just add your photos to the `public` folder and you're all set! 💕
