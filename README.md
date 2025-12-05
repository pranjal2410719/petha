# Braynix Studios

A modern creator-collaboration platform built with Next.js 16, enabling project discovery, proposal submission, and team formation.

## 🚀 Features

- **Project Discovery** - Browse and explore innovative projects
- **Real-time Collaboration** - Live updates and collaboration requests
- **3D Animations** - Interactive Three.js hyperspeed effects
- **Authentication** - Secure Supabase auth with protected routes
- **Responsive Design** - Mobile-first with Tailwind CSS
- **Project Management** - Create, manage, and track projects

## 🛠️ Tech Stack

- **Frontend**: Next.js 16, React 19, Tailwind CSS 4
- **Backend**: Supabase (Auth, Database, Real-time)
- **3D Graphics**: Three.js, PostProcessing
- **Animations**: GSAP
- **Styling**: Tailwind CSS with custom components

## 📁 Project Structure

```
src/
├── app/                 # App Router pages
│   ├── auth/           # Authentication
│   ├── dashboard/      # User dashboard
│   ├── projects/       # Project pages
│   └── project/[id]/   # Dynamic project details
├── components/         # Reusable UI components
├── lib/               # Database & Supabase config
└── utils/             # Helper functions
```

## 🚀 Getting Started

1. **Install dependencies**:
```bash
npm install
```

2. **Set up Supabase**:
   - Create a Supabase project
   - Run the SQL schema from `supabase-schema.sql`
   - Update Supabase credentials in `src/lib/supabase.js`

3. **Run development server**:
```bash
npm run dev
```

4. **Open [http://localhost:3000](http://localhost:3000)**

## 🔐 Authentication

- Sign up/Login required for project creation
- Protected routes with automatic redirects
- Real-time auth state management

## 📊 Database Schema

- **Projects**: Core project data with RLS policies
- **Collaboration Requests**: User collaboration system
- **Banned Users**: Moderation system

## 🎨 Key Components

- **CardNav**: Animated navigation with GSAP
- **Hyperspeed**: 3D WebGL scene with shaders
- **ProjectCard**: Interactive project displays
- **Dashboard**: User project management

## 🚀 Deployment

Deploy on [Vercel](https://vercel.com) with automatic Supabase integration.

## 📝 License

MIT License - Built by Braynix Studios
