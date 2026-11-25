# Project rules
- All invitation details (names, date, venue, map pin) live in `src/lib/wedding.ts`; components read from it so details change in one place.
- Guest replies are saved by the `submitRsvp` server function (publishable client) which then notifies the owner via the Telegram connector; only non-empty wishes are publicly readable through the column-limited `rsvp_wishes` view, while attendance and guest counts stay private.
- Invitation sections live in `src/components/invitation/`, one file per section, composed in `src/routes/index.tsx`.
