-- 103.Dev Supabase Schema setup

-- Enable UUID extension if not enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

----------------------------------------------------------------------
-- 1. Create Tables
----------------------------------------------------------------------

-- USERS: linked to auth.users
CREATE TABLE public.users (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- TEMPLATES: Marketplace assets
CREATE TABLE public.templates (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  price NUMERIC(10, 2) NOT NULL DEFAULT 0.00,
  file_url TEXT, -- Could link to Supabase Storage bucket later
  author_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- USER_WISHLISTS
CREATE TABLE public.user_wishlists (
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  template_id UUID REFERENCES public.templates(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (user_id, template_id)
);

-- USER_DOWNLOADS
CREATE TABLE public.user_downloads (
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  template_id UUID REFERENCES public.templates(id) ON DELETE CASCADE,
  purchased_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (user_id, template_id)
);

----------------------------------------------------------------------
-- 2. Auth Trigger for Profiles
----------------------------------------------------------------------

-- Trigger function to create a profile automatically when a user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS TRIGGER 
SECURITY DEFINER 
SET search_path = public
LANGUAGE plpgsql 
AS $$
BEGIN
  INSERT INTO public.users (id, full_name, avatar_url)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'avatar_url'
  );
  RETURN NEW;
END;
$$;

-- Trigger attached to auth.users
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

----------------------------------------------------------------------
-- 3. Row Level Security (RLS) Policies
----------------------------------------------------------------------

-- Enable RLS on all tables
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_wishlists ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_downloads ENABLE ROW LEVEL SECURITY;

-- Profiles: Anyone can read, users can update their own
CREATE POLICY "Public profiles are viewable by everyone" ON public.users FOR SELECT USING (true);
CREATE POLICY "Users can insert their own profile" ON public.users FOR INSERT WITH CHECK ((select auth.uid()) = id);
CREATE POLICY "Users can update their own profile" ON public.users FOR UPDATE USING ((select auth.uid()) = id);

-- Templates: Anyone can read, only authenticated users (or authors) can insert/update (simplified for now to authors)
CREATE POLICY "Templates are viewable by everyone" ON public.templates FOR SELECT USING (true);
CREATE POLICY "Authors can insert templates" ON public.templates FOR INSERT TO authenticated WITH CHECK ((select auth.uid()) = author_id);
CREATE POLICY "Authors can update templates" ON public.templates FOR UPDATE TO authenticated USING ((select auth.uid()) = author_id);

-- User Wishlists: Users can manage their own wishlists
CREATE POLICY "Users can view own wishlists" ON public.user_wishlists FOR SELECT TO authenticated USING ((select auth.uid()) = user_id);
CREATE POLICY "Users can insert own wishlists" ON public.user_wishlists FOR INSERT TO authenticated WITH CHECK ((select auth.uid()) = user_id);
CREATE POLICY "Users can delete own wishlists" ON public.user_wishlists FOR DELETE TO authenticated USING ((select auth.uid()) = user_id);

-- User Downloads: Users can view their own downloads
CREATE POLICY "Users can view own downloads" ON public.user_downloads FOR SELECT TO authenticated USING ((select auth.uid()) = user_id);
-- Insert/Update to downloads should ideally be handled by a secure backend checkout webhook (Stripe, etc.) or a security definer function, 
-- but for initial development we'll allow users to insert their own free downloads.
CREATE POLICY "Users can insert own downloads" ON public.user_downloads FOR INSERT TO authenticated WITH CHECK ((select auth.uid()) = user_id);
