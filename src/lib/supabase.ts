import { createClient } from '@supabase/supabase-js';

const supabaseUrl = (import.meta as any).env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = (import.meta as any).env.VITE_SUPABASE_ANON_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// ── Types ──────────────────────────────────────────────

export type MenuCategory = 'fruehstueck' | 'salziges' | 'sandwich' | 'suess' | 'getraenke';

export interface MenuItem {
  id: string;
  category: MenuCategory;
  name: string;
  description: string | null;
  price: string;
  image_url: string | null;
  sort_order: number;
  created_at: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  description: string;
  image_url: string | null;
  sort_order: number;
  created_at: string;
}

export interface MediaItem {
  id: string;
  type: 'tv' | 'presse' | 'online';
  title: string;
  url: string | null;
  description: string | null;
  sort_order: number;
  created_at: string;
}

export interface Job {
  id: string;
  title: string;
  location: string;
  type: string;
  shift: string | null;
  description: string;
  requirements: string[];
  is_active: boolean;
  sort_order: number;
  created_at: string;
}

export interface DailySpecial {
  id: string;
  title: string;
  description: string | null;
  original_price: string | null;
  special_price: string;
  image_url: string | null;
  valid_date: string;
  is_active: boolean;
  created_at: string;
}

export interface DealItem {
  name: string;
  price: string;
  oldPrice?: string;
  note?: string;
}

export interface Deal {
  id: string;
  title: string;
  subtitle: string | null;
  description: string | null;
  gradient: string;
  accent_color: string;
  is_new: boolean;
  is_special: boolean;
  items: DealItem[];
  sort_order: number;
  created_at: string;
}

export interface InstagramPost {
  id: string;
  image_url: string;
  post_url: string;
  caption: string | null;
  created_at: string;
}
