# Hammer Time Portfolio Game

## What This Is
An HTML5 Canvas game-portfolio for Kushagra Agarwal. Vanilla JS, no bundler, no frameworks. Uses GSAP for transitions and Pixel Frog sprite assets.

## Architecture
- Canvas: 1024×576 (64px tiles, 16 wide × 9 tall)
- Global canvas context `c` used across all files
- Sprite-based animation system with frame sheets
- Collision maps are flat arrays (144 values) parsed into 16-column 2D grids via `Array.prototype.parse2D()`
- Script load order matters — utils.js → collisions.js → Collision.js → Sprite.js → Player.js → event.js → index.js

## Build & Test
- No build step. Open index.html in browser to test.
- After changes, verify by checking browser console for errors.
- Test room transitions by walking the player off the right edge of canvas (triggers level 5 secret passage).

## Code Style
- Vanilla JS, ES5/ES6 mix. No modules, no imports — everything is global via window.
- All new classes must be exported to window (e.g., `window.Interactable = Interactable`)
- New JS files must be added as `<script>` tags in index.html in correct load order
- Font: 'Press Start 2P' for all in-game text
- Color scheme: dark purple (`rgb(54,2,54)`) background, orange (`#FFA500`) headers, white text

## Collision System
- Collision tile values: `292` (levels 1–2) and `250` (level 3) — both are treated as solid blocks
- Collision datasets: `collisionsLevel1`, `collisionsLevel2`, `collisionsLevel3` in `js/data/collisions.js`
- `createObjectsFrom2D()` checks for both `292` and `250` when building `CollisionBlock` objects
- Every room must have collision blocks for walls/floor or the player falls through
- When creating new collision data, verify it matches the 16×9 grid format (144 values)

## Player
- Hitbox is offset from sprite position: `x+58, y+34, w:50, h:53`. Account for this in all proximity checks.
- Movement speed: 5px/frame horizontal; gravity: 1px²/frame; jump velocity: -20
- Controls: A (left), D (right), W (jump + enter door)
- `player.preventInput = true` disables all movement (used during door animations)

## Level & Door System
- Levels defined in `levels` object in index.js; currently level 1 is active
- Doors are `Sprite` instances with `autoplay: false`; `door.play()` triggers open animation on W press
- Door proximity check uses hitbox bounds vs door position/size
- Doors navigate via `window.location.href` (LinkedIn, GitHub, Behance) after a 1000ms delay
- Walking off the right canvas edge transitions to level 5 (secret passage in `checkForHorizontalCollisions`)

## Cheat Code (Resume)
- Sequence: left(A), right(D), up(W), up(W)
- Tracked in `actionSequence[]` against `requiredSequence`; array capped at 4 entries via `shift()`
- Activating the sequence redirects to the resume Google Drive link

## IMPORTANT
- `utils.js` extends `Array.prototype` with `parse2D` and `createObjectsFrom2D`. Do NOT add further `Array.prototype` modifications — use standalone utility functions instead.
- Do NOT use `window.location.href` for new external links. Use `window.open(url, '_blank')`. (Existing door redirects are intentional portfolio behavior.)
- The `redirectTo()` helper in event.js does a HEAD-check before navigating — prefer it over bare `window.location.href` for any new navigation.
- The player hitbox is offset from sprite position (x+58, y+34, w:50, h:53). Account for this in all proximity checks.
