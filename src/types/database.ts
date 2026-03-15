export type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          username: string | null;
          full_name: string | null;
          avatar_url: string | null;
          bio: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          username?: string | null;
          full_name?: string | null;
          avatar_url?: string | null;
          bio?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          username?: string | null;
          full_name?: string | null;
          avatar_url?: string | null;
          bio?: string | null;
          updated_at?: string;
        };
        Relationships: [];
      };
      bookings: {
        Row: {
          id: string;
          user_id: string;
          table_id: number;
          table_name: string;
          date: string;
          time_slot: string;
          duration: string;
          game_type: string;
          players: number;
          notes: string | null;
          status: 'confirmed' | 'cancelled' | 'completed';
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          table_id: number;
          table_name: string;
          date: string;
          time_slot: string;
          duration: string;
          game_type: string;
          players: number;
          notes?: string | null;
          status?: 'confirmed' | 'cancelled' | 'completed';
          created_at?: string;
        };
        Update: {
          status?: 'confirmed' | 'cancelled' | 'completed';
          notes?: string | null;
        };
        Relationships: [];
      };
      event_signups: {
        Row: {
          id: string;
          user_id: string;
          event_id: number;
          event_title: string;
          event_date: string;
          event_time: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          event_id: number;
          event_title: string;
          event_date: string;
          event_time: string;
          created_at?: string;
        };
        Update: Record<string, never>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}

// Convenience row types
export type Profile = Database['public']['Tables']['profiles']['Row'];
export type Booking = Database['public']['Tables']['bookings']['Row'];
export type EventSignup = Database['public']['Tables']['event_signups']['Row'];
