import { createClient } from '@supabase/supabase-js';

// These should be set in your .env.local file
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase URL and Anon Key must be set in environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});

// Database Types
export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          name: string;
          title: string;
          tagline: string;
          avatar: string | null;
          linkedin_url: string | null;
          twitter_url: string | null;
          tiktok_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          name: string;
          title: string;
          tagline: string;
          avatar?: string | null;
          linkedin_url?: string | null;
          twitter_url?: string | null;
          tiktok_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          title?: string;
          tagline?: string;
          avatar?: string | null;
          linkedin_url?: string | null;
          twitter_url?: string | null;
          tiktok_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      ideas: {
        Row: {
          id: string;
          user_id: string;
          title: string;
          description: string;
          status: 'considering' | 'committed';
          next_step: string | null;
          link: string | null;
          committed_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          title: string;
          description: string;
          status: 'considering' | 'committed';
          next_step?: string | null;
          link?: string | null;
          committed_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          title?: string;
          description?: string;
          status?: 'considering' | 'committed';
          next_step?: string | null;
          link?: string | null;
          committed_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      participants: {
        Row: {
          id: string;
          user_id: string | null;
          name: string;
          avatar: string | null;
          email: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id?: string | null;
          name: string;
          avatar?: string | null;
          email?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string | null;
          name?: string;
          avatar?: string | null;
          email?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      idea_participants: {
        Row: {
          id: string;
          idea_id: string;
          participant_id: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          idea_id: string;
          participant_id: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          idea_id?: string;
          participant_id?: string;
          created_at?: string;
        };
      };
      beta_signups: {
        Row: {
          id: string;
          email: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          created_at?: string;
        };
      };
      invites: {
        Row: {
          id: string;
          email: string;
          inviter_id: string;
          status: 'pending' | 'accepted' | 'declined';
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          inviter_id: string;
          status?: 'pending' | 'accepted' | 'declined';
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          inviter_id?: string;
          status?: 'pending' | 'accepted' | 'declined';
          created_at?: string;
          updated_at?: string;
        };
      };
      invite_ideas: {
        Row: {
          id: string;
          invite_id: string;
          idea_id: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          invite_id: string;
          idea_id: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          invite_id?: string;
          idea_id?: string;
          created_at?: string;
        };
      };
    };
  };
};
