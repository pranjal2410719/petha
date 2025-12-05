# DOPO by BStudios - Database Installation Guide

## ⚠️ WARNING: COMPLETE DATA WIPE

This installation will **DELETE ALL EXISTING DATA** in your Supabase database and create fresh tables.

## 📋 Installation Steps

### Step 1: Backup (Optional)
If you have important data, export it first from Supabase Dashboard.

### Step 2: Run Fresh Installation
1. Open your Supabase project
2. Go to **SQL Editor**
3. Copy and paste the entire content of `database-fresh-install.sql`
4. Click **Run** to execute

### Step 3: Verify Installation
Check that these tables were created:
- ✅ `projects`
- ✅ `collaboration_requests` 
- ✅ `banned_users`
- ✅ `audit_log`

### Step 4: Test Application
1. Deploy your application
2. Try creating a project
3. Test collaboration requests
4. Verify admin dashboard works

## 🔧 What This Script Does

### Destroys:
- All existing tables and data
- All functions and triggers
- All RLS policies

### Creates:
- Fresh table structure
- Proper relationships
- Working RLS policies (except collaboration_requests)
- Required functions and triggers
- Realtime subscriptions

## 🚨 Troubleshooting

If you get errors:

1. **Permission errors**: Make sure you're using the `postgres` role
2. **Function errors**: Run the script again, it will overwrite
3. **RLS errors**: The script disables RLS on collaboration_requests to prevent update issues

## 📞 Support

If installation fails, check:
- Supabase project is active
- You have admin access
- No other applications are using the database

---

**DOPO by BStudios** - Fresh Start Database Installation
**Version**: 2.0 - Production Ready