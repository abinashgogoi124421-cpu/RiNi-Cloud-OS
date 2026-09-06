# RiNi Cloud OS

A cartoon-bubbly, installable PWA file manager whose storage is a Telegram
channel, with an AI one-tap organizer powered by Puter.js.

## Files
- `index.html` — the whole app (markup, styling, and logic in one file)
- `config.js` — hardcoded bot token / channel id / app settings (loaded before index.html)
- `manifest.json` — PWA install manifest
- `sw.js` — service worker (caches the app shell only, never Telegram/Puter calls)

## One-time Telegram setup (required before first launch)
1. The bot (`8835604359:...`) must be an **admin** of channel `-1003953146702`,
   with permission to **post messages, delete messages, and pin messages**.
   Without pin permission the app cannot save its file index.
2. Nothing else to configure — the app creates its index automatically on
   first run (a pinned `index.json` message in the channel).

## Running it
This needs to be served over `http://localhost` or `https://` (not opened as
a plain `file://`) for the service worker and manifest to work. Any static
file server works, e.g.:
```
npx serve .
```
Then open it on your phone/desktop and use "Add to Home Screen" / the
browser's install prompt.

## How storage works
- Every upload is sent to the channel with Telegram's `sendDocument`.
- A single pinned message (`index.json`) is the source of truth for your
  virtual folders/paths/filenames — it's what makes "rename," "move," and
  "path" features possible, since Telegram itself has no real folders.
- Deleting a file calls Telegram's `deleteMessage` on that file's message.
- Editing a text note replaces the same message's content in place
  (`editMessageMedia`), so its message id never changes.
- A local cache (`localStorage`) is kept for fast reloads, but the channel's
  pinned index is always re-synced on launch and after every change.

## Known, real platform limits (not app bugs)
- **50MB per file** — the plain Telegram Bot API's hard upload/download cap.
  Total number of files / total storage is effectively unlimited.
- Storage is a **single shared channel** — there's no per-user separation.
  This build is meant for one owner's personal cloud drive, not a multi-user
  public product.

## AI Organizer (Puter.js)
The "One-tap Organize" button and the AI panel in **Me** require signing in
with a Puter account first (button provided in **Me**, and the app checks
`puter.auth.isSignedIn()` automatically so it won't re-prompt once you're
in). Once signed in, tapping Organize sends your file list (names/paths/
types only — never file contents) to `puter.ai.chat`, which proposes a
tidier folder layout, and the app applies it.

## ⚠️ Security note — please read before sharing this build
`config.js` hardcodes your bot token and channel id in plain text, exactly
as requested. Because this is a **client-side** app, that file is fully
readable by anyone who opens the app and checks the browser's dev tools —
there is no way to hide a secret that ships to the browser.

Practically, that means:
- Treat this as a **personal, private** tool. Don't publish the hosted link
  publicly.
- Anyone with that token can read, post to, and delete everything in the
  channel — rotate the token in @BotFather immediately if you ever suspect
  it's leaked.
- If you later want multiple people to use this safely, the token needs to
  move to a small backend server that the browser talks to instead — the
  browser should never hold it directly.
