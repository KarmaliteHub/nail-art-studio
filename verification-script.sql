-- Verification script - Execute this after the migration
-- This will show you all the tables and their structure

-- Check if tables exist
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('workers', 'gallery_images', 'app_settings');

-- Check RLS policies
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual 
FROM pg_policies 
WHERE tablename IN ('workers', 'gallery_images', 'app_settings');

-- Check storage bucket
SELECT * FROM storage.buckets WHERE name = 'images';

-- Check initial settings data
SELECT * FROM public.app_settings;