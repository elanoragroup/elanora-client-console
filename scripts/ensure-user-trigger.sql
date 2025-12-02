-- =============================================
-- ENSURE USER PROFILE CREATION TRIGGER WORKS
-- =============================================
-- Run this in your Supabase SQL Editor to ensure the trigger is working

-- Step 1: Check if the trigger exists
SELECT 
  trigger_name,
  event_manipulation,
  action_timing,
  action_statement
FROM information_schema.triggers 
WHERE trigger_name = 'on_auth_user_created';

-- Step 2: If trigger doesn't exist, create it
DO $$
BEGIN
  -- Check if trigger exists
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.triggers 
    WHERE trigger_name = 'on_auth_user_created'
  ) THEN
    -- Create the function if it doesn't exist
    CREATE OR REPLACE FUNCTION public.handle_new_user()
    RETURNS TRIGGER AS $$
    BEGIN
      -- Insert a new row into public.users with basic data only
      INSERT INTO public.users (id, email, role, created_at, updated_at)
      VALUES (
        NEW.id,
        NEW.email,
        'client', -- default role
        NOW(),
        NOW()
      );
      RETURN NEW;
    END;
    $$ LANGUAGE plpgsql SECURITY DEFINER;

    -- Create the trigger
    CREATE TRIGGER on_auth_user_created
      AFTER INSERT ON auth.users
      FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

    RAISE NOTICE 'Trigger created successfully';
  ELSE
    RAISE NOTICE 'Trigger already exists';
  END IF;
END $$;

-- Step 3: Grant necessary permissions
GRANT USAGE ON SCHEMA public TO postgres, anon, authenticated, service_role;
GRANT ALL ON public.users TO postgres, anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.handle_new_user() TO postgres, anon, authenticated, service_role;

-- Step 4: Verify the trigger is working
SELECT 
  'Trigger Status' as check_type,
  CASE 
    WHEN EXISTS (SELECT 1 FROM information_schema.triggers WHERE trigger_name = 'on_auth_user_created') 
    THEN '✅ Trigger exists and should work'
    ELSE '❌ Trigger does not exist'
  END as result;
