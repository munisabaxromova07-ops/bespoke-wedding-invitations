# Project rules
- All invitation details (names, date, venue, map pin) live in `src/lib/wedding.ts`; components read from it so details change in one place.
- Guest replies go to the `rsvps` table via an insert-only public policy; nobody can read replies through the app, so guest data stays private.
- Invitation sections live in `src/components/invitation/`, one file per section, composed in `src/routes/index.tsx`.
