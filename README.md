# Lumen — Setup Guide

This folder is a complete, ready-to-deploy website. Follow these steps in order.

## 1. Get your Anthropic API key
1. Go to https://console.anthropic.com
2. Sign up / log in, add a payment method (you're billed per use — small scale usage is cheap, usually cents to a few dollars while testing)
3. Go to **Settings → API Keys → Create Key**
4. Copy the key somewhere safe. You will NOT paste it into any file — it goes into Vercel's settings instead (step 3).

## 2. Set up accounts (Supabase)

This gives Lumen real sign-up / log-in and daily usage limits for free users.

1. Go to https://supabase.com and sign up (free)
2. Click **New Project** — name it "lumen", set a database password (save it somewhere), pick any region
3. Once it's created, go to **Project Settings → API**
4. Copy the **Project URL** and the **anon public key**
5. Open `public/index.html`, find these two lines near the top of the `<script>` section:
   ```
   const SUPABASE_URL = "YOUR_SUPABASE_URL";
   const SUPABASE_ANON_KEY = "YOUR_SUPABASE_ANON_KEY";
   ```
   Replace the placeholder text with your actual values (keep the quotes).
6. In Supabase, go to **SQL Editor → New query**, paste in everything from `supabase-schema.sql` (included in this folder), and click **Run**. This creates the table that tracks each user's plan and daily usage.
7. Go to **Authentication → Providers** and confirm **Email** is enabled (it is by default).
8. (Do this after step 4 below, once you have your Vercel URL) Under **Authentication → URL Configuration**, add your Vercel URL so login redirects work smoothly.

## 3. Put this project on GitHub
1. Create a free account at https://github.com if you don't have one
2. Create a new repository (e.g. "lumen-ai")
3. Upload this whole `lumen-app` folder to that repository
   (Easiest way: on the repo page, click "uploading an existing file" and drag the folder contents in)

## 4. Deploy on Vercel
1. Go to https://vercel.com and sign up (you can sign up directly with your GitHub account)
2. Click **Add New → Project**
3. Select the GitHub repo you just created
4. Before clicking Deploy, open **Environment Variables** and add:
   - Name: `ANTHROPIC_API_KEY`
   - Value: (paste the key from step 1)
5. Click **Deploy**
6. Wait ~1 minute. Vercel gives you a live URL like `lumen-ai.vercel.app` — that's your real, public website.

## 5. Test it
Open your new URL. Send a message. If it works, congratulations — Lumen is live on the internet.
Then click "log in" → "sign up" to test that accounts work, and confirm the usage counter (top right) ticks up as you chat.

## What's already handled
- Your API key stays private (it lives on the server, never sent to visitors' browsers)
- Chat, web search, and image understanding all work through the `/api/chat` function
- Conversation memory is saved in each visitor's own browser (not shared between people)
- Real sign-up/log-in accounts (Supabase)
- Free tier capped at 20 messages/day per account; a `plan` column (`free`/`pro`) is ready for you to flip manually in Supabase's table editor for anyone you want to comp as Pro

## What's NOT handled yet (next steps when you're ready)
- **Taking payment / Stripe** — the "upgrade to Pro" button and actual charging isn't built yet. Right now, upgrading someone to Pro means manually editing their row in Supabase's table editor.
- **Custom domain** — Vercel gives you a free `.vercel.app` address; you can connect your own domain later in Vercel's settings.
- **App store presence** — turning this into an installable app (PWA or native wrapper) for Play Store / App Store.
- **Analytics** — knowing how many people use it and what they ask.

Come back to this chat any time and tell me which of these to build next.
