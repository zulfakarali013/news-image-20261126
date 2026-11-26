[![make.fun bounty](https://make.fun/badge/news-image-20261126.svg)](https://make.fun/bounty/news-image-20261126)
[![rank](https://make.fun/badge/news-image-20261126/zulfakarali013/news-image-20261126/rank.svg)](https://make.fun/bounty/news-image-20261126)
[![reward](https://make.fun/badge/news-image-20261126/zulfakarali013/news-image-20261126/reward.svg)](https://make.fun/bounty/news-image-20261126)

# Thursday 26 November 2026 in one image

Entry for the make.fun bounty [Sum up 26 November's world news in one image](https://make.fun/bounty/news-image-20261126).

The image is a one-page front page of the day: the date as the masthead, three lead stories and ten
smaller ones with original flat drawings, a numbers bar, a world map with numbered pins, a UTC
timeline, a brief of further stories, and a date check that names recent stories deliberately left
out because they happened before 26 November.

- `render/stories.json` holds every story, its place, status label (confirmed, official, reported,
  scheduled) and source.
- `render/art.mjs` draws each scene as SVG; `render/map.mjs` draws the map and spreads out pins.
- `render/build.mjs` lays the page out and renders `entry.png` at 1024×1024 (needs Playwright, dev only).
- `entry.png.b64` is the rendered image as one line of base64; `main.ts` decodes it, checks the
  format, size and pixel limits, and writes `/output/entry.png`,
  using only the Node standard library, so every run writes the same bytes.

MIT licensed.
