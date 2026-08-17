
CREATE TABLE IF NOT EXISTS public.inquiries (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT,
  message TEXT NOT NULL,
  source TEXT NOT NULL DEFAULT 'home_contact',
  status TEXT NOT NULL DEFAULT 'new',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit an inquiry"
  ON public.inquiries
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Admins can view inquiries"
  ON public.inquiries
  FOR SELECT
  TO authenticated
  USING (public.has_role(_role => 'admin'::public.app_role, _user_id => auth.uid()));

CREATE POLICY "Admins can update inquiries"
  ON public.inquiries
  FOR UPDATE
  TO authenticated
  USING (public.has_role(_role => 'admin'::public.app_role, _user_id => auth.uid()));

CREATE POLICY "Admins can delete inquiries"
  ON public.inquiries
  FOR DELETE
  TO authenticated
  USING (public.has_role(_role => 'admin'::public.app_role, _user_id => auth.uid()));

CREATE OR REPLACE FUNCTION public.set_inquiries_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_inquiries_updated_at ON public.inquiries;
CREATE TRIGGER trg_inquiries_updated_at
  BEFORE UPDATE ON public.inquiries
  FOR EACH ROW
  EXECUTE FUNCTION public.set_inquiries_updated_at();

CREATE INDEX IF NOT EXISTS idx_inquiries_created_at ON public.inquiries (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_inquiries_status ON public.inquiries (status);
