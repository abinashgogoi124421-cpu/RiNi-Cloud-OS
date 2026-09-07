/* ==========================================================================
   RiNi Cloud OS — app configuration
   --------------------------------------------------------------------------
   ⚠️ SECURITY NOTE (please read)
   This file hardcodes a Telegram bot token + channel id, exactly as
   requested. Because this app is a client-side PWA, ANYONE who opens
   this app in a browser and looks at Network/Sources tab can read this
   token. That means:
     • Only use this for a PERSONAL single-owner storage channel.
     • Do not publish this build publicly / share the link widely —
       whoever has the token can post, delete, and read every file
       in the channel below.
     • For a real multi-user product, this token must live on a private
       backend server instead, never in browser code.
   ========================================================================== */

window.APP_CONFIG = {
  // Telegram bot + storage channel (hardcoded as requested)
  TELEGRAM_BOT_TOKEN: "8835604359:AAFDVBTEXWb7lwQsSMynshd3HNoOM8dG-3E",
  TELEGRAM_CHAT_ID: "-1003953146702",

  // Cosmetic
  APP_NAME: "RiNi Cloud",
  APP_FULL_NAME: "RiNi Cloud OS",

  // Telegram Bot API hard limit for file uploads/downloads (real platform
  // limit — not adjustable from here). Storage TOTAL is effectively
  // unlimited (as many files as you like), but no single file can exceed
  // this size through the plain Bot API.
  MAX_FILE_MB: 50,

  // Local cache key (per-browser fast listing; the channel's pinned
  // index.json document is always the real source of truth)
  CACHE_KEY: "rini_cloud_index_v1",

  // Puter.js — no key needed, it's the public web SDK loaded in index.html.
  // AI features are gated behind the user signing in with their own
  // Puter account (handled in-app, in the "Me" tab).
};