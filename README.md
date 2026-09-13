# Bookmark Manager

A Chrome extension that replaces the new-tab page with a carousel for reviewing bookmarks one at a time — keep, delete, or open each one, with progress tracked across sessions.

**Started:** October 29, 2024

## Features

- Recursively collects all bookmarks from every folder
- Presents one bookmark at a time with a progress bar (`N of Total`, percentage)
- **Keep** — advance to the next bookmark
- **Delete** — remove the bookmark (with confirmation) and advance
- **Previous** — step back to the last bookmark
- Bookmarks are sorted by domain, so duplicates/related sites surface together
- Progress (current index) persists across sessions via `localStorage`
- Click the bookmark title to open it in a new tab

## Keyboard shortcuts

| Key | Action |
|---|---|
| `→` | Keep |
| `Enter` | Delete |
| `←` / `P` | Previous |
| `K` | Keep |
| `D` | Delete |
| `O` | Open bookmark in new tab |

## Files

- `manifest.json` — Chrome extension manifest (Manifest V3), overrides the new-tab page
- `bookmark_manager.html` — carousel UI
- `bookmark_manager.js` — bookmark collection, sorting, and carousel logic
- `styles.css` — styling
- `jquery.min.js` — bundled jQuery dependency
- `icons/` — extension icons

## Installation

1. Open `chrome://extensions`
2. Enable **Developer mode**
3. Click **Load unpacked** and select this project directory
4. Open a new tab to start reviewing bookmarks

## Permissions

Requires `bookmarks` and `tabs` permissions to read, remove, and open bookmarks.
