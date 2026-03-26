# Hammer Time V2 — Exact Execution Playbook

**IGNORE the first upgrade plan (hammer-time-upgrade-plan.md). This V2 master plan replaces it entirely.**

---

## OVERVIEW: What You're Doing

You have 3 tools working together:

| Tool | What it does | When you use it |
|------|-------------|-----------------|
| **Claude Code** (terminal) | Writes and edits code in your repo | All coding work (8 sessions) |
| **Suno AI** (suno.com) | Generates music | Once, before Session 7 |
| **Any image tool** (NanoBanana, Gemini, Photoshop, Piskel) | Generates pixel art sprites & backgrounds | Between sessions, whenever ready |

**You do NOT need Cowork, Gemini for code, or any other AI tool.** Claude Code does all the coding. The other tools are only for generating art/music assets.

---

## STEP 0: SETUP (do this once, takes 5 minutes)

### 0A — Install Claude Code (if not already installed)

Open your terminal (not this chat) and run:
```bash
npm install -g @anthropic-ai/claude-code
```

If you don't have Node.js, install it first from https://nodejs.org (version 18+).

### 0B — Clone your new repo locally

```bash
cd ~/Desktop   # or wherever you want the project
git clone https://github.com/Kush3008/Kushlaude_time.git
cd Kushlaude_time
```

### 0C — Download the V2 master plan into the repo

Save the file `hammer-time-v2-master-plan.md` (the one you just downloaded from this chat) into the root of your `Kushlaude_time` folder. This is important — Claude Code will read it.

### 0D — Start Claude Code

Inside the `Kushlaude_time` folder, run:
```bash
claude
```

This opens Claude Code's interactive terminal. You're now ready to start.

---

## STEP 1: Session 1 — Cleanup + Room System

### What to type into Claude Code:

```
Read the file hammer-time-v2-master-plan.md in this repo. This is the master plan for the entire project.

Now execute Phase 0 (Code Cleanup) and Session 1 from the plan:

1. Read all existing source files (index.html, index.js, all js/ files)
2. Remove dead code: delete commented-out Particle class in index.js, remove drawHUD() debug display
3. Fix Array.prototype pollution in js/utils.js — replace with standalone functions parse2D() and createObjectsFrom2D(), update all call sites
4. Remove the broken level 5 secret passage in Player.js
5. Refactor the entire level system into a room-based system:
   - Replace `level` variable with `currentRoom` index
   - Replace `levels` object with `rooms` array (5 rooms)
   - Implement horizontal room transitions — walk off right edge of canvas → fade → load next room with player spawning on left side, and vice versa
   - Remove the old door-redirect system (no more window.location.href for LinkedIn/GitHub/Behance)
   - Doors now either show an in-game HTML overlay OR open URLs in a new tab via window.open()
6. Set up all 5 rooms using existing assets:
   - Room 0: "Kushagra's Room" — use backgroundLevel1.png + collisionsLevel1
   - Room 1: "University Lab" — use backgroundLevel2.png + collisionsLevel2
   - Room 2: "Art Studio" — use backgroundLevel3.png + collisionsLevel3
   - Room 3: "The Office" — use backgroundLevel2.png + collisionsLevel2 (reuse for now)
   - Room 4: "Trophy Hall" — use backgroundLevel3.png + collisionsLevel3 (reuse for now)
7. Test that walking between all 5 rooms works with smooth GSAP fade transitions
8. Keep the cheat code detection in event.js but don't redirect — just console.log('cheat activated') for now

After making changes, list all files you modified.
```

### After it finishes:
- Test locally by opening `index.html` in your browser
- Walk right to see if room transitions work
- If something broke, tell Claude Code what went wrong and it will fix it
- Commit your changes:
```bash
git add -A
git commit -m "Session 1: Cleanup + room system with 5 rooms"
git push
```

---

## STEP 2: Session 2 — Interactable System + Portfolio Content

### What to type into Claude Code:

```
Read hammer-time-v2-master-plan.md for context. Now execute Session 2:

Create an Interactable class in js/classes/Interactable.js that extends Sprite:
- Has a proximity detection radius (80px)
- When player is nearby, draws "Press W" prompt above it in yellow pixel font
- When player presses W near it, shows an HTML content overlay
- The overlay is a fixed-position div (#contentOverlay) with dark semi-transparent background
- Overlay content shows: title (orange), description (white), optional link (blue, opens in new tab)
- Press ESC or W again to close overlay
- Use the existing box.png sprite as placeholder for all interactables

Add the overlay HTML and CSS to index.html — style with Press Start 2P font matching the existing game aesthetic.

Now populate all 5 rooms with interactable content. Here is the exact content for each room:

ROOM 0 — "Kushagra's Room":
- Computer on desk: title="Hey there! 👋", description="I'm Kushagra Agarwal — a Software Engineer, Designer, and Creative. B.Tech CS (2020-2024). I build things for fun and make them look good while doing it. Welcome to my world!"
- Bookshelf: title="Skills & Tools", description="AI/ML • Python • JavaScript • React.js • C++ • SQL • Full Stack Dev • HTML5 Canvas • Figma • Blender • After Effects • Game Development • UI/UX Design • Data Structures & OOP"
- Poster: title="How to Play", description="A/D — Walk left/right\nW — Jump & Interact\nWalk to edges to explore other rooms\nLook for hidden collectibles!\n\nPsst... there might be a secret cheat code somewhere 👀"

ROOM 1 — "University Lab":
- Workstation 1: title="🏆 Safest Routing Algorithm", description="Hackathon 1st Place! Won ₹50,000 at Ja Assure Techno Hackathon.\n\nBuilt a Python + ML solution to find the safest walking path using crime data scraped from the web. Presented at NITTTR Chennai conference.", url="https://github.com/Kush3008"
- Workstation 2: title="🌾 Agriweather Wizard", description="AI/ML-powered crop yield, weather pattern, and plant disease predictor.\n\nBuilt with Python, Flask, and PowerBI. Year-long project (June 2023 - May 2024).", url="https://github.com/Kush3008"
- Workstation 3: title="🎮 Hammer Time (This Game!)", description="You're playing it right now! A canvas-based platformer portfolio built from scratch with vanilla JavaScript, HTML5 Canvas, sprite animations, collision detection, and GSAP.\n\nNo frameworks. No AI assistance. Pure code.", url="https://github.com/Kush3008/Kushlaude_time"
- Workstation 4: title="🛍️ Online Shopping App", description="UX/UI design for a startup connecting customers with local clothing shops.\n\nUser research, personas, wireframing — the full design process.", url="https://www.behance.net/Kush3008"
- Whiteboard: title="Other Projects", description="• Real-time Helmet Detection (OpenCV, ML)\n• Type Prediction (Image Processing, ML)\n• Kidney Stone Detection (Image Processing, ML)\n• Motion Detection (Computer Vision)\n• Safe Travel Tracker (GPS-based app)\n• Note-taking App (Java, Flutter)\n• AR Face Filter (Spark AR)"

ROOM 2 — "Art Studio":
- Easel 1: title="🎨 Creatives Lead — Google DSC", description="Creatives Lead at Google Developers Students Club (Feb 2021 – Present).\n\nShaping the club's visual identity, creating social media content, building UI/UX for the website. Branding, visual design, and front-end web dev."
- Easel 2: title="✏️ Freelance Designer", description="UI Designer & Graphic Designer (Oct 2021 – Present).\n\nHelping small businesses create visual identities — logos, branding, posters, and marketing materials. Client-focused, deadline-driven."
- Easel 3: title="🌐 Design Highlights", description="• Designer for G20 Event\n• Designed posts for Google Developers India\n• Visual identities for multiple small businesses"
- Door to Behance: label="Behance", target={ type: 'external', url: 'https://www.behance.net/Kush3008' }

ROOM 3 — "The Office":
- Desk 1: title="💼 AI & Data Engineer — Genpact", description="Feb 2024 – July 2024\n\nCompleted data engineering and machine learning training. Designed, built, and visualized a data pipeline using self-scraped data. Presented findings with Looker and Power BI dashboards."
- Desk 2: title="🎨 Graphic Designer — Zevamp", description="Feb 2022 – Mar 2022\n\nWorked as Graphic Designer for the team. Gained experience in meeting deadlines and professional workflow."
- Desk 3: title="✏️ Freelance UI/Graphic Designer", description="Oct 2021 – Present\n\nCreating visual identities for small businesses — logos, branding, posters, marketing materials. Delivering high-quality designs on time."
- Bulletin board: title="📜 Certifications", description="• Oracle — Database Foundations\n• Udemy — Python & Machine Learning Bootcamp\n• Udemy — SQL and PostgreSQL\n• Udemy — Data Warehousing & Cloud Fundamentals\n• AWS Braket Quantum Computing Workshop\n• National Conference on Industry 5.0 (NITTTR Chennai)"
- Door to LinkedIn: label="LinkedIn", target={ type: 'external', url: 'https://www.linkedin.com/in/kushagra-agarwal-88614b219/' }
- Door to GitHub: label="GitHub", target={ type: 'external', url: 'https://github.com/Kush3008' }
- Signpost: title="📧 Contact Me", description="Email: akush3008@gmail.com\nGitHub: github.com/Kush3008\nLinkedIn: Kushagra Agarwal\nBehance: behance.net/Kush3008"

ROOM 4 — "Trophy Hall":
- Wall plaque: title="🏆 Achievements", description="• 1st Prize — Ja Assure Techno Hackathon (₹50,000)\n• Designer for G20 Event\n• Creatives Lead — Google DSC\n• Designed for Google Developers India\n• Zonal Level Winner — Robotics Soccer\n• Zonal Level Archery Competitor\n• Research Paper — National Conference on Industry 5.0\n• AWS Braket Quantum Workshop"

Add all interactables to each room's init() function. Make sure the W key event handler checks for nearby interactables and opens the overlay.
```

### After it finishes:
- Test every room, interact with every signpost
- Make sure overlays open and close correctly
- Commit:
```bash
git add -A
git commit -m "Session 2: Interactable system + all portfolio content"
git push
```

---

## STEP 3: Session 3 — Collectibles + Trophy Hall

### What to type into Claude Code:

```
Read hammer-time-v2-master-plan.md for context. Execute Session 3:

Create a Collectible class in js/classes/Collectible.js:
- Small colored rectangle (20x20px) with a glow effect (shadow blur) as placeholder sprite
- Each has an id, name, emoji, and color
- Floats with a subtle sine-wave bob animation (2px up and down)
- When player hitbox overlaps, the collectible disappears with a brief sparkle effect
- Show a popup text for 2 seconds: "{emoji} {name} collected!"
- Store collected item IDs in localStorage key 'hammertime_collectibles'
- Don't show collectibles that are already collected (check localStorage on room init)

Place these 6 collectibles:

| ID | Name | Emoji | Color | Room | Position | Difficulty |
|----|------|-------|-------|------|----------|------------|
| coffee_mug | Coffee Mug | ☕ | #8B4513 | 0 | Hidden behind an interactable, slightly off the obvious path | Easy |
| pixel_crown | Pixel Crown | 👑 | #FFD700 | 1 | On a high platform requiring a precise jump | Medium |
| paint_palette | Paint Palette | 🎨 | #FF6347 | 2 | Behind an easel interactable | Easy |
| circuit_board | Circuit Board | ⚡ | #00FF00 | 3 | Requires jumping on desks to reach | Medium |
| game_controller | Game Controller | 🎮 | #9B59B6 | 0 | High up, needs a running jump from a specific spot | Hard |
| golden_star | Golden Star | ⭐ | #FFD700 | secret room | Only accessible via cheat code | Secret |

Update Trophy Hall (Room 4) to display collectibles:
- Show pedestals (simple rectangles) in a row
- Collected items: draw the colored rectangle with glow + item name below
- Uncollected items: draw dark gray "???" placeholder
- If ALL 6 collected: draw "🎉 100% Complete! You found everything!" text
- Add a small "Reset Progress" button/interactable to clear localStorage (for testing)

Add a collectible counter to the game HUD: "Items: 3/6" displayed small in the top-right corner of the canvas, always visible.
```

### After it finishes:
- Test collecting items, check they persist after page refresh
- Verify Trophy Hall displays them correctly
- Commit:
```bash
git add -A
git commit -m "Session 3: Collectible system + Trophy Hall"
git push
```

---

## STEP 4: Session 4 — Mobile Touch Controls

### What to type into Claude Code:

```
Read hammer-time-v2-master-plan.md for context. Execute Session 4:

Add mobile touch controls:

1. Add touch control HTML buttons to index.html:
   - Three circular buttons: ◀ (left), ▲ (jump/interact), ▶ (right)
   - Fixed at bottom center of screen
   - Only visible on touch devices (detect via 'ontouchstart' in window)

2. Create js/touch.js:
   - On touch devices: show touch buttons, hide keyboard instruction text and cheat code text
   - Map touchstart/touchend events to the existing keys object
   - The jump button (▲) should also trigger door/interactable checks (same as W key)
   - Use e.preventDefault() on all touch handlers to prevent scrolling
   - Buttons should have touch-action: manipulation and no tap highlight

3. CSS for touch controls:
   - Semi-transparent circular buttons (60px diameter)
   - White border, translucent white background
   - Active state slightly brighter
   - Positioned with flexbox, gap between buttons
   - z-index above canvas

4. Responsive canvas scaling:
   - Keep internal resolution at 1024×576
   - CSS scales canvas to fit viewport width (max 95vw)
   - On mobile, leave room at bottom for touch controls
   - Handle window resize events
   - Content overlay should also work well on mobile (smaller font, scrollable if needed)

5. Make the content overlay mobile-friendly:
   - Tap outside the overlay content box to close it
   - Scrollable if content is taller than viewport
   - Slightly smaller padding/font on narrow screens

Add the touch.js script tag to index.html before index.js. Call initTouchControls() after the game initializes.
```

### After it finishes:
- Test with Chrome DevTools → Toggle Device Toolbar (Ctrl+Shift+M)
- Try iPhone SE and Pixel 5 viewports
- Verify touch buttons appear and work
- Commit:
```bash
git add -A
git commit -m "Session 4: Mobile touch controls + responsive canvas"
git push
```

---

## STEP 5: Session 5 — Visual Polish

### What to type into Claude Code:

```
Read hammer-time-v2-master-plan.md for context. Execute Session 5:

1. Room transition polish:
   - Show room name during fade transition (e.g., "Kushagra's Room", "University Lab")
   - Draw the name centered on canvas in Press Start 2P font during the black overlay
   - Name fades in during black, fades out as room appears
   - Transition speed: 0.3s fade out, 0.2s pause with name, 0.3s fade in

2. Ambient floating particles:
   - Create 25 small particles (2-3px circles, white, opacity 0.1-0.4)
   - Drift slowly upward (speed 0.1-0.3 px/frame)
   - When a particle goes above canvas top, reset it to random x at canvas bottom
   - Draw particles AFTER background but BEFORE player
   - This should be very subtle — almost unnoticeable but adds atmosphere

3. Dynamic sky through window (Room 0 only):
   - Before drawing the Room 0 background, draw a sky gradient on the canvas
   - Use the user's current hour (new Date().getHours()):
     - 6-11: morning blues (#87CEEB → #E0F0FF)
     - 12-16: afternoon (#4A90D9 → #87CEEB)  
     - 17-19: sunset (#FF6B35 → #FFD700)
     - 20-5: night (#0D1B2A → #1B2838) with small white star dots
   - Draw this in the area where the background image has windows
   - Check the backgroundLevel1.png to find the window positions, or draw the gradient behind the full background (if the background has any transparent areas they'll show through)

4. Door proximity prompts:
   - When player is within 80px of a door, draw "↑ W" in yellow above the door
   - Animate with slight pulse (opacity oscillation using sin wave)

5. Improved door labels:
   - Position labels dynamically based on door sprite center
   - Use c.textAlign = 'center' for centering
   - Add subtle text shadow for readability

6. Collectible counter HUD:
   - Top-right corner: "✦ 3/6" in small white pixel font
   - Only show if at least 1 item has been collected
```

### After it finishes:
- Check particles aren't too distracting
- Verify sky changes if you change your system clock
- Commit:
```bash
git add -A
git commit -m "Session 5: Visual polish — particles, sky, transitions, prompts"
git push
```

---

## STEP 6: Session 6 — Secret Resume Dimension + Easter Eggs

### What to type into Claude Code:

```
Read hammer-time-v2-master-plan.md for context. Execute Session 6:

1. Secret Resume Dimension:
   - The cheat code A D W W (already detected in event.js) now triggers a room transition to a secret room (room index 5, outside the normal 0-4 range)
   - Save the current room index before transitioning so we can return later
   - Entry effect: brief screen shake (CSS transform on canvas, 200ms) + quick color flash (canvas filter invert for 100ms) before the fade transition
   - The secret room:
     - Dark/space-like background (draw a dark gradient #0a0a2e → #1a1a3e, with scattered small white dots as stars)
     - Create floating platform collision blocks at various heights
     - Render resume text as canvas text ON the platforms:
       - Top platform: "KUSHAGRA AGARWAL" in large orange text (16px Press Start 2P)
       - "Software Engineer / Programmer" below it (10px)
       - Mid platforms: Experience entries as shorter text blocks
       - Lower platforms: Skills as individual words scattered around
       - Bottom area: Contact info
     - Player can jump freely between platforms
     - A door on the far right labeled "Return" → transitions back to the room the player was in before
     - A door somewhere labeled "📄 Resume PDF" → window.open() to the Google Drive resume link: https://drive.google.com/file/d/1py7ypsmaevFG1JMuugt57QmmQCeXQtuq/view?usp=sharing
     - Place the golden_star collectible on the hardest-to-reach platform
   - Create appropriate collision data for the floating platforms

2. Easter eggs:
   - Click counter on the bio title: track clicks on #bio h1 element. At 10 clicks, temporarily show "You found the click egg! 🥚" as a small toast notification (auto-hides after 3 seconds)
   - AFK detection: if no key is pressed for 30 seconds, draw "Zzz" text floating above the player with gentle bobbing animation. Any keypress removes it.
   - Wall bonk counter: in Room 0, track how many times the player walks into the left wall (velocity.x < 0 and position doesn't change). At 5 bonks, briefly flash text near the wall: "No secrets here... or is there? 👀" (auto-hides after 3 seconds)

Make sure the cheat code still works from any room, and the return door brings the player back to the correct room.
```

### After it finishes:
- Test the cheat code from multiple rooms
- Jump around the Resume Dimension
- Try all easter eggs
- Commit:
```bash
git add -A
git commit -m "Session 6: Secret Resume Dimension + easter eggs"
git push
```

---

## STEP 7: Generate Music & Audio (NOT in Claude Code)

### 7A — Generate background music on Suno (suno.com)

Go to suno.com, create a free account, and generate a track with this prompt:

```
chill 8-bit chiptune lo-fi instrumental loop, cozy pixel art game background music,
relaxing and warm, 85 BPM, 60 seconds, no vocals
```

Download the MP3. Rename it to `bgm.mp3`.

### 7B — Get sound effects from Freesound.org

Go to freesound.org (free, CC0 licensed). Search and download:

| Search term | Save as | Duration |
|-------------|---------|----------|
| "8 bit coin collect" | `collect.mp3` | ~0.5s |
| "pixel door open" | `door.mp3` | ~0.5s |
| "8 bit jump" | `jump.mp3` | ~0.3s |
| "whoosh transition short" | `transition.mp3` | ~0.5s |

### 7C — Add audio files to repo

Create an `audio/` folder in your repo and put all 5 files there:
```
Kushlaude_time/
  audio/
    bgm.mp3
    collect.mp3
    door.mp3
    jump.mp3
    transition.mp3
```

### 7D — Now run Session 7 in Claude Code:

```
Read hammer-time-v2-master-plan.md for context. Execute Session 7:

Create js/audio.js with an AudioManager class:
- Loads background music from ./audio/bgm.mp3 (loop, volume 0.3)
- Loads SFX: collect, door, jump, transition from ./audio/ folder
- Has a toggleMute() method
- All audio operations wrapped in try-catch with .catch(() => {}) on play() calls
- If audio files are missing, fail silently (no errors, just no sound)
- BGM only starts after the FIRST user interaction (keypress or touch) — this is required by browser autoplay policy

Add a mute button to index.html:
- Positioned top-right corner, above the canvas
- Shows 🔊 when unmuted, 🔇 when muted
- Styled to match game aesthetic (Press Start 2P font, small, semi-transparent)

Wire up audio calls:
- First keydown/touchstart → audio.playBGM()
- Player jump → audio.playSFX('jump')
- Collectible picked up → audio.playSFX('collect')
- Door interaction → audio.playSFX('door')
- Room transition → audio.playSFX('transition')

Add the audio.js script tag to index.html.
```

### After it finishes:
- Test with sound on and off
- Verify mute button works
- Verify no errors if audio files are missing
- Commit:
```bash
git add -A
git commit -m "Session 7: Audio system with BGM + SFX"
git push
```

---

## STEP 8: Session 8 — Final QA + Deploy

### What to type into Claude Code:

```
Read hammer-time-v2-master-plan.md for context. Execute Session 8 — final QA pass:

1. Check every file for:
   - No console.log statements left (except behind DEBUG flag)
   - No unused variables or dead code
   - No reference errors (undefined variables, missing functions)

2. Test all functionality:
   - All 5 rooms accessible via horizontal walking
   - All interactables show correct content with working overlays
   - All doors work (in-game overlays + external links open in new tab)
   - All 6 collectibles can be found and persist in localStorage
   - Trophy Hall displays collected/uncollected items correctly
   - Cheat code A D W W works from any room → Secret Resume Dimension
   - Return door in Secret Room goes back to the correct room
   - Easter eggs work (click title, AFK Zzz, wall bonk)
   - Mute button works
   - Touch controls work (verify the HTML/JS is correct for mobile)

3. Update index.html meta tags:
   - Title: "Kushagra Agarwal — Interactive Portfolio"
   - Description: "Explore Kushagra's interactive game portfolio. Walk through rooms, discover projects, collect hidden items, and find easter eggs!"
   - Keep the og:url, add og:title and og:description matching above
   - Author: Kushagra Agarwal

4. Update README.md with:
   - New project name and description
   - How to play (controls)
   - List of rooms and what's in each
   - Mention the collectibles system and easter eggs (but don't spoil them)
   - Credits: Pixel Frog (sprites), GSAP, Chris Courses (original inspiration)
   - Link to live site

5. Add a simple loading screen:
   - Count total image assets that need to load
   - Show "Loading... X%" using the existing #loadingIndicator div
   - Only call animate() after all images are loaded

6. Performance check:
   - Make sure requestAnimationFrame is the only animation loop (no duplicates)
   - No event listeners being added repeatedly (check room init functions)
   - Particles array has a fixed size (no growing)

List all issues found and fixed.
```

### After it finishes:
- Do a full playthrough yourself
- Test on your phone (if deployed)
- Commit and push:
```bash
git add -A
git commit -m "Session 8: Final QA, meta tags, README, loading screen"
git push
```

---

## STEP 9: Deploy to GitHub Pages

Your repo is already set up for GitHub Pages. Just make sure it's enabled:

1. Go to https://github.com/Kush3008/Kushlaude_time/settings/pages
2. Under "Source", select: **Deploy from a branch**
3. Branch: **main**, folder: **/ (root)**
4. Click Save
5. Wait 2-3 minutes
6. Your site will be live at: `https://kush3008.github.io/Kushlaude_time/`

---

## OPTIONAL STEP 10: Custom Sprites & Backgrounds (do anytime)

This is independent of the code sessions. Do it whenever you want.

### 10A — Generate custom character sprite

Use NanoBanana, Piskel (free online pixel editor), or any pixel art tool.

You need 5 sprite sheets that match the EXACT dimensions of the current king sprites:

```
idle.png      — 11 frames side by side (character facing right, breathing/blinking)
idleLeft.png  — 11 frames side by side (character facing left)
runRight.png  — 8 frames side by side (running right animation)
runLeft.png   — 8 frames side by side (running left animation)
enterDoor.png — 8 frames side by side (entering door animation)
```

**To find exact dimensions needed, run in Claude Code:**
```
Run: identify img/king/idle.png img/king/runRight.png img/king/enterDoor.png
Tell me the dimensions of each sprite sheet.
```

Your new sprites must have the same total sheet dimensions. If they differ, you'll need to update `frameRate` values in the Player constructor.

Place new sprites in `img/king/` (replacing the old ones) or in a new `img/kushagra/` folder and update the `imageSrc` paths in index.js.

### 10B — Generate custom room backgrounds

Each background must be exactly **1024 × 576 pixels** (64×16 tiles × 64×9 tiles).

Generate or create 5 backgrounds:
1. Cozy bedroom (warm colors, desk, bed, window, bookshelf)
2. Computer lab (blue/gray, multiple screens, whiteboards)
3. Art studio (colorful, easels, paint splashes)
4. Office (professional, desks, bulletin board, plants)
5. Trophy hall (dark, dramatic, spotlights, pedestals)

Place in `img/backgrounds/` and update the background `imageSrc` paths in each room's init().

**IMPORTANT:** If your backgrounds have different wall/floor positions than the current backgrounds, you'll also need to update the collision data in `js/data/collisions.js`. Tell Claude Code:

```
I've added new background images in img/backgrounds/. The wall and floor positions
have changed. Look at each background image and help me create new collision maps
that match where the walls and floors are in each image. Each collision map is a
16×9 grid of 64px tiles where non-zero values are solid.
```

### 10C — Generate collectible sprites (optional)

If you want actual pixel art instead of colored rectangles:
- Create 6 small PNG images (32×32 px, transparent background)
- Coffee mug, crown, palette, circuit board, controller, star
- Place in `img/collectibles/` and update Collectible class to use image sprites

---

## SUMMARY: The Exact Order

```
Step 0: Setup (clone repo, install Claude Code)              — 5 min
Step 1: Session 1 in Claude Code (cleanup + rooms)           — 20-30 min
Step 2: Session 2 in Claude Code (interactables + content)   — 20-30 min
Step 3: Session 3 in Claude Code (collectibles + trophy)     — 15-20 min
Step 4: Session 4 in Claude Code (mobile controls)           — 15-20 min
Step 5: Session 5 in Claude Code (visual polish)             — 15-20 min
Step 6: Session 6 in Claude Code (secret room + easter eggs) — 20-30 min
Step 7: Generate audio assets + Session 7 in Claude Code     — 30-45 min
Step 8: Session 8 in Claude Code (QA + deploy prep)          — 15-20 min
Step 9: Deploy to GitHub Pages                               — 5 min
Step 10: Custom art assets (optional, anytime)               — your pace
```

**Total coding time: ~3-4 hours spread across sessions**
**You can stop after any session and pick up later — each session produces a working game.**

---

## IF THINGS BREAK

If Claude Code makes a change that breaks the game:

1. Don't panic. Type this into Claude Code:
```
Something is broken. [describe what's happening — e.g., "the game shows a blank canvas" or "walking right doesn't transition to the next room"]. 

Open the browser console and check for errors. Read the relevant files and fix the issue.
```

2. If it's really messed up, you can always revert:
```bash
git checkout .   # Revert all changes since last commit
```

3. If you need to start a session over:
```bash
git log --oneline   # See your commits
git reset --hard HEAD~1   # Undo the last commit
```

---

## QUESTIONS TO ANSWER BEFORE STARTING

These are things only you know. Have answers ready:

1. Do you want the world to loop (Trophy Hall right edge → back to Kushagra's Room) or dead-end at both sides?
2. For Room 0, do you have a window position in the current backgroundLevel1.png? (Check the screenshot — looks like there are window-like openings in the brick wall)
3. Any projects you want to ADD or REMOVE from the list I pulled from your resume?
4. Do you want your email/phone visible on the site, or just email?
