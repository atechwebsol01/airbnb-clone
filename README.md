# Full Stack Airbnb Clone — Next.js 13 App Router

Built by [@atechwebsol01](https://github.com/atechwebsol01).

Full feature set, based on the "Full Stack Airbnb Clone" tutorial (Code With Antonio):

- **Auth**: credentials (email/password with bcrypt), Google OAuth, GitHub OAuth via NextAuth + Prisma adapter
- **Listings**: create (6-step Rent modal), delete, Cloudinary image upload
- **Reservations**: booking with price calculation, guest cancellation, owner cancellation
- **Search**: shareable URL filters — category, country, date range, guests, rooms, bathrooms; date-range filtering excludes already-booked listings
- **Favorites** system, trips / reservations / properties pages, loading & empty states
- **Map**: Leaflet + OpenStreetMap, responsive Tailwind UI

## Stack

Next.js 13.4 (App Router, server components) · TypeScript · Tailwind CSS · Prisma + **MongoDB** · NextAuth v4 · Zustand · react-hook-form · react-date-range · react-hot-toast · react-leaflet · next-cloudinary

### Deviations from the tutorial (deliberate, non-breaking)

| Tutorial | This repo | Why |
|---|---|---|
| Next 13.2 (`experimental.appDir`) | Next 13.4.19 (App Router stable) | Same APIs, no experimental flag, works on Node 22 |
| `bcrypt` (native) | `bcryptjs` (pure JS, same API) | Avoids node-gyp compile failures on Windows |
| Prisma 4 | Prisma 5 | Same schema/API, better Node 22 support |
| Hardcoded Cloudinary preset | `NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET` env var | No code edit needed to configure |
| Antonio's logo asset | Generated placeholder logo/avatar PNGs | Original assets aren't distributable |

## Setup

1. **MongoDB**: create a free cluster at [MongoDB Atlas](https://cloud.mongodb.com), allow your IP (Network Access), create a DB user, and paste the connection string into `.env` as `DATABASE_URL`. **It must end with a database name**, e.g. `...mongodb.net/airbnb-clone?retryWrites=true&w=majority`.
2. **Cloudinary** (image uploads): create an account, then in *Settings → Upload → Upload presets* create an **unsigned** preset. Put your cloud name and preset name into `.env`.
3. **OAuth (optional)**: create GitHub / Google OAuth apps with callback URLs `http://localhost:3000/api/auth/callback/github` and `.../callback/google`, fill the four env vars.
4. Push the schema and run:

```bash
npx prisma db push
npm run dev
```

`NEXTAUTH_SECRET` was already generated for you in `.env`.

## Scripts

- `npm run dev` — development server on http://localhost:3000
- `npm run build` / `npm start` — production
- `npx prisma db push` — sync schema to MongoDB
- `npx prisma studio` — DB GUI
