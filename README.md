# Braynix Studios

A modern creator-collaboration platform built with Next.js 16, enabling project discovery, proposal submission, and team formation with real-time updates.

## 🚀 Features

- **Project Discovery** - Browse and explore innovative projects with real-time updates
- **Real-time Collaboration** - Live collaboration requests and team management
- **3D Animations** - Interactive Three.js hyperspeed effects on homepage
- **Authentication** - Google OAuth + Email/Password with Supabase
- **Responsive Design** - Mobile-first with animated navigation
- **Project Management** - Full CRUD operations with author permissions
- **Audit System** - Complete change tracking and logging

## 🛠️ Tech Stack

- **Frontend**: Next.js 16, React 19, Tailwind CSS 4
- **Backend**: Supabase (Auth, Database, Real-time, RLS)
- **3D Graphics**: Three.js, PostProcessing
- **Animations**: GSAP
- **Authentication**: Google OAuth, Supabase Auth
- **Database**: PostgreSQL with Row Level Security

## 📁 Project Structure

```
src/
├── app/                    # App Router pages
│   ├── auth/              # Authentication (Google OAuth + Email)
│   ├── dashboard/         # User dashboard with project management
│   ├── projects/          # Project-related pages
│   │   ├── discover/      # Browse all projects
│   │   ├── new-proposal/  # Create new projects
│   │   ├── top-growing/   # Trending projects
│   │   └── edit/[id]/     # Edit project (authors only)
│   └── project/[id]/      # Dynamic project details
├── components/            # Reusable UI components
│   ├── auth/             # Login/Signup forms
│   ├── dashboard/        # Dashboard components
│   └── CardNav.jsx       # Animated navigation
├── lib/                  # Database & Supabase config
└── utils/               # Helper functions and constants
```

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Set up Supabase
1. Create a Supabase project at [supabase.com](https://supabase.com)
2. Run the complete database migration:
   ```sql
   -- Copy and paste contents of database-migration.sql in Supabase SQL Editor
   ```
3. Update Supabase credentials in `src/lib/supabase.js`:
   ```javascript
   const supabaseUrl = 'YOUR_SUPABASE_URL'
   const supabaseKey = 'YOUR_SUPABASE_ANON_KEY'
   ```

### 3. Configure Google OAuth (Optional)
1. Create Google Cloud Console project
2. Enable Google+ API
3. Create OAuth 2.0 credentials
4. Add redirect URI: `https://YOUR_PROJECT.supabase.co/auth/v1/callback`
5. Configure in Supabase Auth > Providers > Google

### 4. Run Development Server
```bash
npm run dev
```

### 5. Open Application
Visit [http://localhost:3000](http://localhost:3000)

## 🔐 Authentication & Security

- **Multi-provider Auth**: Google OAuth + Email/Password
- **Protected Routes**: Authentication required for project creation/editing
- **Row Level Security**: Database-level access control
- **Author Permissions**: Only project authors can edit/delete their projects
- **Real-time Auth**: Automatic login state management

## 📊 Database Schema

### Core Tables
- **projects**: Project data with author permissions
- **collaboration_requests**: User collaboration system
- **banned_users**: Project-level moderation
- **audit_log**: Complete change tracking

### Key Features
- **Real-time Updates**: All tables publish changes instantly
- **Automatic Timestamps**: Created/updated timestamps with triggers
- **Team Management**: Auto-update collaborators when requests approved
- **Audit Trail**: Track all CRUD operations with user context

## 🎨 Key Components

- **CardNav**: Animated navigation with GSAP, responsive hamburger menu
- **Hyperspeed**: 3D WebGL scene with multiple distortion effects
- **ProjectCard**: Interactive project displays with author controls
- **Dashboard**: Real-time project management with edit/delete capabilities
- **Auth Forms**: Google OAuth + traditional email/password forms

## 🔄 Real-time Features

- **Live Project Updates**: Changes appear instantly across all clients
- **Collaboration Requests**: Real-time notifications and approvals
- **Team Management**: Automatic collaborator count and team updates
- **Audit Logging**: Live tracking of all database changes

## 🚀 Deployment

### Vercel Deployment
1. Connect GitHub repository to Vercel
2. Add environment variables:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```
3. Deploy automatically on push to main branch

### Database Migration
Run `database-migration.sql` in your Supabase SQL Editor for complete setup.

## 📋 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🔧 Configuration Files

- `database-migration.sql` - Complete database setup
- `next.config.mjs` - Next.js configuration with React Compiler
- `tailwind.config.js` - Tailwind CSS configuration
- `supabase-schema.sql` - Legacy schema file (use database-migration.sql instead)

## 📝 License

MIT License - Built by Braynix Studios

---

**Live Demo**: [Your Vercel URL]
**Repository**: [Your GitHub URL]
