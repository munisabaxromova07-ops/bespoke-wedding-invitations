DROP VIEW IF EXISTS public.rsvp_wishes;
DROP POLICY IF EXISTS "Only non-empty wishes are publicly readable" ON public.rsvps;
REVOKE SELECT ON public.rsvps FROM anon, authenticated;