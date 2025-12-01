# ClueGo

# 🔎 Scavenger Hunt Creator & Player Platform

A modern web app to **create, share, and play custom scavenger hunts**.  
Users can build interactive hunts with puzzles, QR codes, photos, GPS-based tasks, or simple clues, then share a link for players to join instantly—no app install required.

## ✨ Features

### 🧩 Hunt Creation

- Creator dashboard to manage all your hunts
- Step-by-step or free-order progression
- Multiple challenge types:
  - Text answers
  - Number answers
  - Password clues
  - QR code scanning
  - GPS/location validation
  - Image-based clues
  - Photo upload
  - Audio/video clues
- Optional hints and time limits
- Custom cover image, description, difficulty, and visibility settings

### 🎮 Player Experience

- Join via unique link (no login required)
- Mobile-friendly UI
- Animated feedback for correct/incorrect answers
- Progress tracking
- Final results screen with optional ranking

### 🌍 Supports different types of hunts

- Urban / city routes
- At-home scavenger hunts
- Escape-room style puzzles
- School or office activities
- Online-only hunts

### 📊 Optional Stats

- Completion rate
- Time tracking
- Where players get stuck
- Player sessions history

## 🛠️ Tech Stack

**Frontend**

- React + Vite
- TailwindCSS
- React Router

**Backend**

- Node.js + Express
- JWT authentication

**Database**

- MongoDB Atlas or Supabase

**Storage**

- Cloudinary / Supabase Storage

**Deployment**

- Frontend → Vercel
- Backend → Railway / Render

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/KarolFrame/cluego.git
cd your-repo
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start development server

```bash
npm run dev
```

### 4. Backend setup

Go to the `/server` folder and run:

```bash
npm install
npm run dev
```

## 📦 Environment Variables

Create a `.env` file in the backend with:

```
JWT_SECRET=yourSecretKey
DATABASE_URL=yourDatabaseURL
CLOUD_STORAGE_URL=optional
```

## 📄 License

NO License © 2025 KarolFrame

---

If you build something with this project, feel free to share it! 🎉
