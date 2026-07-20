# Orca Content Hub

Next.js app for role-first GTM content, synced with Google Drive.

## Local

```bash
cp .env.example .env.local   # fill in Google OAuth + NEXTAUTH_* values
npm install
npm run dev
```

See [SETUP.md](./SETUP.md) for Google Cloud OAuth and Vercel env vars.

## Deploy

Push to `main`. In Vercel, set **Framework Preset** to **Next.js**, then add the env vars from SETUP.md and redeploy.
