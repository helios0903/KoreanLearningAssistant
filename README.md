# 한국어 Flashcards — TOPIK Vocabulary Study Tool

A fast, minimal flashcard app for studying Korean vocabulary (Korean front,
Chinese definition back) with real-time cloud sync across all your devices
via [Supabase](https://supabase.com).

## Features

- One card at a time, click/tap (or Space) to flip
- Mark cards **Learned** or **Need review** — saved to the cloud instantly
- Progress bar showing how many words you've mastered
- Import vocabulary from a CSV file or paste a list directly
- Keyboard shortcuts: `Space` flip, `L` learned, `R` review, `←`/`→` navigate
- Real-time sync: sign in on your iPhone, Mac, and Windows PC — changes on
  one device appear on the others within a second
- Each user's data is private (Supabase Row Level Security)

---

## 1. Create a free Supabase account and project

1. Go to [supabase.com](https://supabase.com) and click **Start your project**, then sign up (GitHub or email is fine). It's free — no credit card required for the free tier.
2. Click **New project**.
   - Pick any organization (Supabase creates a default one for you).
   - **Name**: e.g. `korean-flashcards`.
   - **Database password**: generate/enter one and save it somewhere safe (you won't need it for this app, but keep it for future reference).
   - **Region**: pick the one closest to you.
3. Click **Create new project** and wait ~1–2 minutes while it provisions.

## 2. Create the database table

1. In your new project, open the left sidebar and click **SQL Editor**.
2. Click **New query**.
3. Open [`supabase/schema.sql`](./supabase/schema.sql) from this repo, copy its entire contents, and paste it into the SQL editor.
4. Click **Run**. This creates the `flashcards` table, locks it down with Row Level Security so each account only ever sees its own cards, and turns on real-time sync for the table.
5. (Optional sanity check) Go to **Database → Replication → supabase_realtime** and confirm `flashcards` is listed as a source table.

## 3. Get your API keys

1. In the left sidebar, click the gear icon → **API** (or **Project Settings → API**).
2. You'll need two values from this page:
   - **Project URL** (looks like `https://xxxxxxxxxxxx.supabase.co`)
   - **anon / public** API key (a long string under "Project API keys")

Keep this tab open — you'll paste these into the app next.

## 4. Configure email auth (already on by default)

Supabase projects have **Email** sign-in enabled out of the box, which is
all this app uses. No extra setup needed. (If you ever turn on "Confirm
email" under **Authentication → Providers → Email**, you'll need to click
the confirmation link Supabase emails you before your first sign-in works.)

---

## 5. Run the app locally

Requires [Node.js](https://nodejs.org) 18+.

```bash
# from the project root
npm install
cp .env.example .env
```

Open the new `.env` file and paste in the values from Step 3:

```
VITE_SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-public-key
```

Then start the dev server:

```bash
npm run dev
```

Open the printed `http://localhost:5173` URL, click **Don't have an
account? Sign up**, create a login with your email and a password, and
you're in.

---

## 6. Deploy it so you can use it from any device (iPhone, Mac, Windows)

The app is a static site — the easiest free host is **Vercel**:

1. Push this repository to GitHub (already done if you're reading this from the repo).
2. Go to [vercel.com](https://vercel.com), sign up/sign in with GitHub, and click **Add New → Project**.
3. Import this repository.
4. Under **Environment Variables**, add:
   - `VITE_SUPABASE_URL` = your Project URL
   - `VITE_SUPABASE_ANON_KEY` = your anon public key
5. Click **Deploy**. In about a minute you'll get a URL like `https://korean-flashcards.vercel.app`.
6. Open that URL on your iPhone, Mac, and Windows PC (any modern browser) and sign in with the same account on each — your cards and progress sync in real time between them.

(Netlify or Cloudflare Pages work the same way — build command `npm run build`, output directory `dist`, same two environment variables.)

---

## 7. Using the app

- **Import vocabulary**: click **Import vocab**, then either upload a CSV file (two columns: Korean word, Chinese definition — header row optional) or paste a list directly, one pair per line, separated by a comma, tab, or `" - "`. See [`sample-vocab-example.csv`](./sample-vocab-example.csv) for the expected format.
- **Study**: the front shows the Korean word, click the card (or press `Space`) to flip and reveal the Chinese definition.
- **Mark progress**: press `L` (or click **Learned**) once you know a word, `R` (or click **Need review**) if you want to see it again soon. This is saved to Supabase instantly and syncs to your other signed-in devices.
- **Filters**: switch between "Due to study" (everything not yet learned), "Marked review", and "All cards".
- **Progress bar**: shows how many words out of your total deck are mastered.

## Tech stack

- [Vite](https://vitejs.dev) + React + TypeScript
- [Supabase](https://supabase.com) (Postgres + Auth + Realtime) as the backend
- No UI framework — plain CSS for a small, fast bundle

## Project structure

```
src/
  components/       UI components (auth, flashcard, import, progress bar)
  hooks/            useAuth (session), useFlashcards (data + realtime sync)
  utils/parseVocab.ts   CSV / pasted-list parsing
  supabaseClient.ts Supabase client setup
  types.ts          Shared TypeScript types
supabase/schema.sql Database schema, RLS policies, realtime setup
```
