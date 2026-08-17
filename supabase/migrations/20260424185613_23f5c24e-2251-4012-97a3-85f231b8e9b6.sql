
-- Fix function search_path
CREATE OR REPLACE FUNCTION public.set_inquiries_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Server-side validation trigger (replaces "WITH CHECK (true)" being too permissive)
CREATE OR REPLACE FUNCTION public.validate_inquiry()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NEW.name IS NULL OR length(btrim(NEW.name)) < 2 OR length(NEW.name) > 100 THEN
    RAISE EXCEPTION 'Invalid name: must be 2-100 characters';
  END IF;
  IF NEW.email IS NULL OR NEW.email !~* '^[A-Za-z0-9._%+\-]+@[A-Za-z0-9.\-]+\.[A-Za-z]{2,}$' OR length(NEW.email) > 255 THEN
    RAISE EXCEPTION 'Invalid email address';
  END IF;
  IF NEW.company IS NOT NULL AND length(NEW.company) > 200 THEN
    RAISE EXCEPTION 'Company name too long (max 200)';
  END IF;
  IF NEW.message IS NULL OR length(btrim(NEW.message)) < 5 OR length(NEW.message) > 4000 THEN
    RAISE EXCEPTION 'Invalid message: must be 5-4000 characters';
  END IF;
  -- Force safe defaults; clients cannot escalate status
  NEW.status := 'new';
  NEW.source := COALESCE(NEW.source, 'home_contact');
  IF length(NEW.source) > 50 THEN
    NEW.source := substr(NEW.source, 1, 50);
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_validate_inquiry ON public.inquiries;
CREATE TRIGGER trg_validate_inquiry
  BEFORE INSERT ON public.inquiries
  FOR EACH ROW
  EXECUTE FUNCTION public.validate_inquiry();
