# Setup: wiring this app to real Google Drive data

This app is code-complete and builds cleanly, but it can't do anything until
it has its own Google OAuth credentials — that part only you (or whoever owns
the orca.security Google Workspace / Google Cloud Console access) can do.
There's no way for me to create these on your behalf.

## 1. Create OAuth credentials in Google Cloud Console

1. Go to https://console.cloud.google.com/ and create a new project (or reuse
   an existing one for internal tools).
2. **APIs & Services → Library** → enable **Google Drive API**.
3. **APIs & Services → OAuth consent screen**:
   - User type: **Internal** (this restricts sign-in to @orca.security accounts
     automatically and skips Google's verification review, since Orca Security
     is a Google Workspace org).
   - Add the scope `https://www.googleapis.com/auth/drive.readonly`.
4. **APIs & Services → Credentials → Create Credentials → OAuth client ID**:
   - Application type: **Web application**.
   - Authorized redirect URIs:
     - `http://localhost:3000/api/auth/callback/google` (local dev)
     - `https://<your-vercel-domain>/api/auth/callback/google` (production —
       e.g. `https://content-library-iota.vercel.app/api/auth/callback/google`)
   - Save, then copy the **Client ID** and **Client Secret**.

## 2. Set environment variables

Locally: copy `.env.example` to `.env.local` and fill in the values.

On Vercel: **Project → Settings → Environment Variables**, add:

| Name | Value |
|---|---|
| `GOOGLE_CLIENT_ID` | from step 1 |
| `GOOGLE_CLIENT_SECRET` | from step 1 |
| `NEXTAUTH_SECRET` | output of `openssl rand -base64 32` |
| `NEXTAUTH_URL` | your production URL, e.g. `https://content-library-iota.vercel.app` |

Redeploy after adding these — Vercel doesn't pick up new env vars until the
next deploy.

## 3. Push the code

This folder isn't a git repo yet. Two options:

- **If `content-library-iota.vercel.app` is already linked to a GitHub repo**:
  copy these files into that repo (replacing whatever's there now), commit,
  and push. Vercel will redeploy automatically.
- **If it was deployed some other way** (e.g. `vercel` CLI drag-and-drop):
  run `vercel` from inside this folder (after `npm install`) to link and
  deploy it fresh. You'll need to be logged into the Vercel CLI yourself —
  I can't do that step for you.

## 4. Sanity check locally (optional but recommended)

```
npm install
npm run dev
```

Visit `http://localhost:3000`, sign in with your @orca.security Google
account, and confirm the role pages populate with real files.

## What this app does differently from the Cowork mockup

The Cowork artifact version used `window.cowork.callMcpTool(...)`, which only
works inside Cowork's sandbox because it rides on your already-authenticated
Drive connection there. This app is a real, deployable Next.js app: it has its
own `/api/drive` route that calls the Google Drive API v3 directly using each
signed-in user's own OAuth token (read-only scope). Sign-in is restricted to
`@orca.security` addresses.

## Known gaps carried over from the mockup

- The folder → role mapping (SE / AE / CS) in `lib/driveConfig.ts` is a
  first-pass guess based on folder names — see the Housekeeping section on
  the Home page and the notes in Legacy Archive.
- No onboarding/QBR/renewal-playbook content was found anywhere in the shared
  Content Library folder — that likely lives elsewhere and needs confirming
  with the CS team.
- AE and CS tool cards (Salesforce, Gong, Highspot, Gainsight, etc. — see
  `lib/driveConfig.ts` → `ROLE_TOOLS`) are still placeholders (`url: "#"`).
  Swap in real links the same way Opine/Confluence/Crayon were fixed on the
  SE side.
