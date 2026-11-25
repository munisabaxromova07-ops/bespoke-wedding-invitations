REVOKE SELECT ON public.rsvps FROM anon, authenticated;

GRANT SELECT (id, name, note, created_at) ON public.rsvps TO anon, authenticated;

CREATE VIEW public.rsvp_wishes
WITH (security_invoker = on) AS
SELECT id, name, note, created_at
FROM public.rsvps
WHERE note IS NOT NULL AND btrim(note) <> '';

GRANT SELECT ON public.rsvp_wishes TO anon, authenticated;
GRANT SELECT ON public.rsvp_wishes TO service_role;

CREATE POLICY "Only non-empty wishes are publicly readable"
ON public.rsvps
FOR SELECT
TO anon, authenticated
USING (note IS NOT NULL AND btrim(note) <> '');