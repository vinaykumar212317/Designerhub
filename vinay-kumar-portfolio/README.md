# Vinay Kumar — Premium Graphic Design Portfolio

## Run locally
1. Install Node.js 18+.
2. Extract this folder.
3. Run `npm install`
4. Copy `.env.example` to `.env.local` and add your OpenAI API key.
5. Run `npm run dev` and open http://localhost:3000

## Deploy free on Vercel
1. Create a GitHub repository and upload these files.
2. Import the repository at https://vercel.com/new
3. Add `OPENAI_API_KEY` and optionally `OPENAI_MODEL` in Vercel Project Settings → Environment Variables.
4. Deploy.

## Important before publishing
- Replace hello@example.com with your real professional email in `app/page.tsx`.
- Replace the sample project names/images/descriptions with your own work.
- The current admin at `/admin` stores edits in browser localStorage only. That means changes are not shared across browsers or visitors and can be lost when browser storage is cleared. For a real multi-device AI-managed admin panel, connect Supabase (database + image storage) and add authentication before public launch.
- Add a proper admin password/authentication before exposing admin tools publicly.
- AI features require your own OpenAI API key. Keep it in server-side environment variables only; never put it in client-side code.
- Chatbot replies are generated from a basic portfolio profile prompt. Review and customize claims before launch.
