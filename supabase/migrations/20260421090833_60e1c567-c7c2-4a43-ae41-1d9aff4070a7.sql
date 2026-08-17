-- 1. Sequence used to generate EMP-#### codes
CREATE SEQUENCE IF NOT EXISTS public.employee_id_seq START 1;

-- 2. Add columns to profiles
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS employee_id text,
  ADD COLUMN IF NOT EXISTS is_active boolean NOT NULL DEFAULT true;

-- 3. Helper to mint the next employee id
CREATE OR REPLACE FUNCTION public.next_employee_id()
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _next int;
  _candidate text;
BEGIN
  LOOP
    _next := nextval('public.employee_id_seq');
    _candidate := 'EMP-' || lpad(_next::text, 4, '0');
    -- guard against collisions with manually inserted ids
    EXIT WHEN NOT EXISTS (SELECT 1 FROM public.profiles WHERE employee_id = _candidate);
  END LOOP;
  RETURN _candidate;
END;
$$;

-- 4. Backfill existing profiles
UPDATE public.profiles
SET employee_id = public.next_employee_id()
WHERE employee_id IS NULL;

-- 5. Lock the column down
ALTER TABLE public.profiles
  ALTER COLUMN employee_id SET NOT NULL;

CREATE UNIQUE INDEX IF NOT EXISTS profiles_employee_id_key
  ON public.profiles (employee_id);

-- 6. Update the new-user trigger to assign an employee id automatically
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _emp_id text;
  _role app_role;
BEGIN
  _emp_id := coalesce(new.raw_user_meta_data->>'employee_id', public.next_employee_id());

  INSERT INTO public.profiles (
    user_id, email, full_name, phone, organization, role_interest,
    approval_status, approved_at, employee_id, is_active
  ) VALUES (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', new.email),
    new.raw_user_meta_data->>'phone',
    new.raw_user_meta_data->>'organization',
    new.raw_user_meta_data->>'role_interest',
    'approved',
    now(),
    _emp_id,
    true
  );

  -- role chosen by the admin during creation, default staff
  _role := coalesce((new.raw_user_meta_data->>'role')::app_role, 'staff');
  INSERT INTO public.user_roles (user_id, role) VALUES (new.id, _role);

  RETURN new;
END;
$$;

-- 7. Public lookup helper used by the login form
-- Returns the email tied to an Employee ID so the client can call
-- supabase.auth.signInWithPassword. SECURITY DEFINER so it bypasses RLS,
-- but only ever returns the email (not the full profile).
CREATE OR REPLACE FUNCTION public.get_email_for_employee_id(_employee_id text)
RETURNS text
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT email
  FROM public.profiles
  WHERE employee_id = _employee_id
    AND is_active = true
  LIMIT 1;
$$;

GRANT EXECUTE ON FUNCTION public.get_email_for_employee_id(text) TO anon, authenticated;