# Braynix Studios

A modern creator-collaboration platform built with Next.js 16, enabling project discovery, proposal submission, and team formation with real-time updates.

## 🚀 Features

- **Project Discovery** - Browse and explore innovative projects with real-time updates
- **Real-time Collaboration** - Live collaboration requests and team management
- **3D Animations** - Interactive Three.js hyperspeed effects across pages
- **Authentication** - Google OAuth + Email/Password with Supabase
- **Responsive Design** - Mobile-first with animated navigation
- **Project Management** - Full CRUD operations with author permissions
- **Contact System** - Unified contact page with multiple inquiry types
- **Company Information** - Full-screen company page with mission and values
- **Upcoming Features** - Roadmap page showcasing future social features
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
│   ├── about/             # Company information
│   │   └── company/       # Full-screen company page
│   ├── auth/              # Authentication (Google OAuth + Email)
│   ├── contact/           # Unified contact system
│   ├── dashboard/         # User dashboard with project management
│   ├── pricing/           # Pricing plans (Coming Soon)
│   ├── projects/          # Project-related pages
│   │   ├── discover/      # Browse all projects
│   │   ├── new-proposal/  # Create new projects
│   │   ├── top-growing/   # Trending projects
│   │   └── edit/[id]/     # Edit project (authors only)
│   ├── project/[id]/      # Dynamic project details
│   ├── upcoming-features/ # Feature roadmap page
│   └── page.js           # Homepage with Hyperspeed
├── components/            # Reusable UI components
│   ├── auth/             # Login/Signup forms
│   ├── dashboard/        # Dashboard components
│   ├── CardNav.jsx       # Animated navigation with GSAP
│   └── Hyperspeed.jsx    # 3D WebGL background component
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

- **CardNav**: Animated navigation with GSAP, responsive hamburger menu, auth-aware content
- **Hyperspeed**: 3D WebGL scene with multiple distortion effects used across pages
- **ProjectCard**: Interactive project displays with author controls
- **Dashboard**: Real-time project management with edit/delete capabilities
- **Auth Forms**: Google OAuth + traditional email/password forms
- **Contact System**: Comprehensive contact form with FAQ and support info
- **Company Page**: Full-screen sections with scroll effects and statistics

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

- `database-migration.sql` - Complete database setup (Version 2.0)
- `next.config.mjs` - Next.js configuration with React Compiler
- `tailwind.config.js` - Tailwind CSS configuration
- `src/utils/navigation.js` - Centralized navigation configuration

## 🔮 Upcoming Features

- **Real-time Chat System** - Instant messaging with file sharing (Q2 2024)
- **Comment System** - Rich commenting with mentions and notifications (Q2 2024)
- **Profile Search & Discovery** - Advanced creator search by skills (Q3 2024)
- **Following System** - Follow creators and get project updates (Q3 2024)
- **AI-Powered Matching** - Smart project-creator matching (Q4 2024)
- **Mobile App** - Native iOS/Android apps (Q1 2025)

## 📞 Contact & Support

- **General Support**: 2k24.cs1l.2410719@gmail.com
- **Partnerships**: yapranjal31@gmail.com
- **Support Hours**: Monday-Friday, 9 AM - 6 PM IST

## 📝 License

MIT License - Built by Braynix Studios

---

**Version**: 2.0
**Last Updated**: December 2024
**Status**: Active Development
