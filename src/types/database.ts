// Minimal, clean Supabase Types matching exact database tables

export interface FormerStudent {
  id?: number;
  name: string;
  title: string;
  batch?: string | null;
  photo_url?: string | null;
  display_order?: number;
  is_active?: boolean;
}

export interface HeritageItem {
  id?: number;
  name: string;
  photo_url: string;
  display_order?: number;
  is_active?: boolean;
}

export interface LegacyBuilder {
  id?: number;
  name: string;
  title: string;
  photo_url: string;
  display_order?: number;
  is_active?: boolean;
}

export interface Leader {
  id?: number;
  name: string;
  title: string;
  category: 'headmaster' | 'committee';
  photo_url: string;
  display_order?: number;
  is_active?: boolean;
}

export interface NewsUpdate {
  id?: number | string;
  title: string;
  secondary_text?: string | null;
  photo_url: string;
  external_link?: string | null;
  display_order?: number;
  is_active?: boolean;
}

export interface GalleryItem {
  id?: number;
  name: string;
  photo_url: string;
  display_order?: number;
  is_active?: boolean;
}

export interface BranchItem {
  id?: number;
  name: string;
  display_order?: number;
  is_active?: boolean;
}

export interface Registration {
  id?: number;
  user_id?: string | null;
  full_name: string;
  relative_name?: string;
  dob?: string;
  branch?: string;
  batch_year?: string;
  phone: string;
  created_at?: string;
}
