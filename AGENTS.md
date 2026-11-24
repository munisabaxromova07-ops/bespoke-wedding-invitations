# Project rules
- All invitation details (names, date, venue, map pin) live in `src/lib/wedding.ts`; components read from it so details change in one place.
- Guest replies are saved by the `submitRsvp` server function (publishable client, insert-only public policy on `rsvps`) which then notifies the owner via the Telegram connector; nobody can read replies through the app, so guest data stays private.
- Invitation sections live in `src/components/invitation/`, one file per section, composed in `src/routes/index.tsx`.
