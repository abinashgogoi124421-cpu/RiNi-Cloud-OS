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

## AI Chat (floating 💬 button)
Tap the floating chat bubble (bottom-right, on every screen) for a full-screen
AI chat like ChatGPT/Meta AI:
- **Multiple sessions** — tap ➕ for a new chat, ☰ to switch between or close
  past ones. Each session's conversation is kept only in the browser's memory
  for as long as the page stays open — closing/reloading the app clears it
  automatically (true session memory, nothing written to disk).
- **Permanent memory** — when you ask the assistant to remember something
  long-term (or it decides something's worth keeping), it saves a real text
  file into a `/ai-memories` folder in your cloud drive, browsable like any
  other folder and available in every future session.
- **File operations by chat** — "create a folder called Bills", "move
  photo.png to /Pictures", "delete old notes", "restore report.pdf",
  "organize everything", "empty my trash" all work as plain-language
  requests; the assistant translates them into the same safe operations the
  manual UI uses.
- **Read / analyze files — only when you ask.** There's no built-in "analyze"
  button. Say "show me what's in notes.txt" and it displays the file's exact
  contents; say "analyse config.js" and it displays the contents *and* adds
  its own analysis underneath. Nothing is scanned automatically.
- **Web search** — ask a general-knowledge or lookup question and it queries
  Wikipedia and DuckDuckGo, then rewrites the results into a clean answer.
  Note: DuckDuckGo's public API doesn't always allow direct browser requests
  (CORS) — when that happens the assistant falls back to whatever it already
  knows and says so, rather than failing silently.
- **Rich text formatting** in every reply: `**bold**`, `__italic__` (or
  `_italic_`), `~~strikethrough~~`, `**__bold italic__**`, and simple
  pipe-style tables (`| A | B |` / `|---|---|`) all render properly instead
  of showing raw symbols.

All of this requires signing in with Puter first (button in the Me tab, or
the chat will prompt you the first time you send a message).

## Real file-manager features
- **Path system** — every file/folder has a real virtual path; new files/folders
  are created inside whatever folder you're currently browsing.
- **Trash / Recycle Bin** — deleting a file or folder moves it to Trash
  (Clean tab) instead of destroying it immediately. Restore it (♻️) or empty
  Trash to permanently remove it and free space.
- **Multi-select** — Quick menu → "Select multiple" turns on checkboxes on
  every file row; a selection bar lets you bulk-move or bulk-trash at once.
- **Duplicate, Details, Copy path, Preview** — full per-file action sheet.
- **Drag-and-drop upload** (desktop) — drop files onto the file list or onto
  a specific folder card to upload straight into it.
- **Sort** — tap the sort icon above a file list to cycle name/size/date.
- **AI chat "writing slot"** (Me tab) — type instructions in plain language
  (create, rename, move, delete, restore, organize, empty trash, or just ask
  a question about your storage) and the assistant carries them out.
- Native text selection / long-press callouts are disabled everywhere except
  inside actual text fields, so the app feels like a native file manager
  rather than a web page.

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
