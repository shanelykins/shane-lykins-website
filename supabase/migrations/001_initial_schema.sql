-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Profiles table (linked to Supabase auth users)
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  title TEXT NOT NULL,
  tagline TEXT NOT NULL,
  avatar TEXT, -- Data URL or URL to avatar image
  linkedin_url TEXT,
  twitter_url TEXT,
  tiktok_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Ideas table
CREATE TABLE ideas (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('considering', 'committed')),
  next_step TEXT,
  link TEXT,
  committed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Participants table (can be users or external contacts)
CREATE TABLE participants (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE, -- If it's a registered user
  name TEXT NOT NULL,
  avatar TEXT, -- URL to avatar
  email TEXT, -- For external participants
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Many-to-many relationship between ideas and participants
CREATE TABLE idea_participants (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  idea_id UUID NOT NULL REFERENCES ideas(id) ON DELETE CASCADE,
  participant_id UUID NOT NULL REFERENCES participants(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(idea_id, participant_id)
);

-- Beta signups table
CREATE TABLE beta_signups (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Invites table (for tracking invitations sent)
CREATE TABLE invites (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT NOT NULL,
  inviter_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'declined')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Invite ideas junction table (many invites can be for many ideas)
CREATE TABLE invite_ideas (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  invite_id UUID NOT NULL REFERENCES invites(id) ON DELETE CASCADE,
  idea_id UUID NOT NULL REFERENCES ideas(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(invite_id, idea_id)
);

-- Indexes for better query performance
CREATE INDEX idx_ideas_user_id ON ideas(user_id);
CREATE INDEX idx_ideas_status ON ideas(status);
CREATE INDEX idx_ideas_committed_at ON ideas(committed_at);
CREATE INDEX idx_idea_participants_idea_id ON idea_participants(idea_id);
CREATE INDEX idx_idea_participants_participant_id ON idea_participants(participant_id);
CREATE INDEX idx_participants_user_id ON participants(user_id);
CREATE INDEX idx_invites_inviter_id ON invites(inviter_id);
CREATE INDEX idx_invite_ideas_invite_id ON invite_ideas(invite_id);
CREATE INDEX idx_invite_ideas_idea_id ON invite_ideas(idea_id);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers to automatically update updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_ideas_updated_at BEFORE UPDATE ON ideas
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_participants_updated_at BEFORE UPDATE ON participants
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_invites_updated_at BEFORE UPDATE ON invites
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Row Level Security (RLS) Policies

-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE ideas ENABLE ROW LEVEL SECURITY;
ALTER TABLE participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE idea_participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE beta_signups ENABLE ROW LEVEL SECURITY;
ALTER TABLE invites ENABLE ROW LEVEL SECURITY;
ALTER TABLE invite_ideas ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view all profiles" ON profiles
  FOR SELECT USING (true);

CREATE POLICY "Users can update their own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Ideas policies
CREATE POLICY "Users can view all ideas" ON ideas
  FOR SELECT USING (true);

CREATE POLICY "Users can create their own ideas" ON ideas
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own ideas" ON ideas
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own ideas" ON ideas
  FOR DELETE USING (auth.uid() = user_id);

-- Participants policies
CREATE POLICY "Users can view all participants" ON participants
  FOR SELECT USING (true);

CREATE POLICY "Users can create participants" ON participants
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can update participants they created" ON participants
  FOR UPDATE USING (auth.uid() = user_id OR user_id IS NULL);

-- Idea participants policies
CREATE POLICY "Users can view all idea participants" ON idea_participants
  FOR SELECT USING (true);

CREATE POLICY "Users can manage idea participants for their ideas" ON idea_participants
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM ideas
      WHERE ideas.id = idea_participants.idea_id
      AND ideas.user_id = auth.uid()
    )
  );

-- Beta signups policies (public read, authenticated insert)
CREATE POLICY "Anyone can view beta signups" ON beta_signups
  FOR SELECT USING (true);

CREATE POLICY "Anyone can sign up for beta" ON beta_signups
  FOR INSERT WITH CHECK (true);

-- Invites policies
CREATE POLICY "Users can view invites they sent" ON invites
  FOR SELECT USING (auth.uid() = inviter_id);

CREATE POLICY "Users can create invites" ON invites
  FOR INSERT WITH CHECK (auth.uid() = inviter_id);

CREATE POLICY "Users can update invites they sent" ON invites
  FOR UPDATE USING (auth.uid() = inviter_id);

-- Invite ideas policies
CREATE POLICY "Users can view invite ideas for their invites" ON invite_ideas
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM invites
      WHERE invites.id = invite_ideas.invite_id
      AND invites.inviter_id = auth.uid()
    )
  );

CREATE POLICY "Users can manage invite ideas for their invites" ON invite_ideas
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM invites
      WHERE invites.id = invite_ideas.invite_id
      AND invites.inviter_id = auth.uid()
    )
  );
