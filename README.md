[![make.fun bounty](https://make.fun/badge/news-image-20261126.svg)](https://make.fun/bounty/news-image-20261126)
[![rank](https://make.fun/badge/news-image-20261126/zulfakarali013/news-image-20261126/rank.svg)](https://make.fun/bounty/news-image-20261126)
[![reward](https://make.fun/badge/news-image-20261126/zulfakarali013/news-image-20261126/reward.svg)](https://make.fun/bounty/news-image-20261126)

# Thursday 26 November 2026 in one image

Entry for the make.fun bounty [Sum up 26 November's world news in one image](https://make.fun/bounty/news-image-20261126).

Edition 3 is the complete day: 52 stories from 10 regions, every one dated Thursday 26 November.
The page has the date as the masthead, a one-line summary, a story count per region, a numbers bar,
three lead stories (each with a "why it matters" line) and six larger ones with original flat
drawings, a world map whose numbered pins match the pictures, a UTC timeline in time order, 43 short
briefs in larger type, and a date check naming nine recent stories deliberately left out because they happened
before 26 November (for example the Giza tanker fire and the FCC satellite approval, both 25 November).

- `edition3/day.json` holds every story: region, place, status label (confirmed, official,
  reported, claim) and sources.
- `edition3/scenes.mjs` draws each picture as SVG; `edition3/atlas.mjs` draws the map and its pins.
- `edition3/build.mjs` lays the page out and renders `entry.png` at 1024×1024 (needs Playwright, dev only).
- `entry.png.b64` is the rendered image as one line of base64; `main.ts` decodes it, checks the
  format, size and pixel limits, and writes `/output/entry.png`,
  using only the Node standard library, so every run writes the same bytes.

MIT licensed.
