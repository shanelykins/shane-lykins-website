# Supabase Database Schema

This directory contains the database schema and migrations for the Commitment Canvas project.

## Setup

1. Create a new Supabase project at https://supabase.com
2. Go to the SQL Editor in your Supabase dashboard
3. Run the migration files in order:
   - `001_initial_schema.sql`

## Database Schema Overview

### Tables

1. **profiles** - User profile information
   - Linked to Supabase Auth users
   - Stores name, title, tagline, avatar, and social links

2. **ideas** - Ideas/commitments
   - Belongs to a user
   - Has status: 'considering' or 'committed'
   - Optional fields: next_step, link, committed_at

3. **participants** - People who can be invited to ideas
   - Can be registered users or external contacts
   - Stores name, avatar, and optionally email

4. **idea_participants** - Many-to-many relationship
   - Links ideas to participants

5. **beta_signups** - Beta program signups
   - Stores email addresses

6. **invites** - Invitation tracking
   - Links inviter to invitee email
   - Tracks status (pending, accepted, declined)

7. **invite_ideas** - Many-to-many relationship
   - Links invites to multiple ideas

## Row Level Security (RLS)

All tables have RLS enabled with policies that:
- Allow users to view all profiles and ideas (public read)
- Restrict updates/deletes to the owner
- Allow public beta signups

## Next Steps

After running the migration:
1. Install Supabase client: `npm install @supabase/supabase-js`
2. Create a `.env.local` file with your Supabase credentials
3. Set up the Supabase client in your app
