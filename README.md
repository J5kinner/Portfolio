# Portfolio

Each folder is one version of the site, oldest to newest. Older versions are kept as history and should not change.

| Folder | Stack | Status |
| --- | --- | --- |
| `portfolio1.0/` | HTML, CSS (SASS), JS | Archived |
| `portfolio2.0/` | React, TypeScript | Archived |
| `portfolio3.0/` | React, TypeScript | **Live** |

`Files/` holds shared assets (the resume PDF) linked from every version.

## Adding a new version
1. Copy the live folder to `portfolio<next>.0/`.
2. Update the table above: set the old one to Archived, the new one to Live.
3. Update `src/config/versions.ts` in each React version so the switcher lists it.
4. In `scripts/build.sh`, build the new version at `/` and move the old live one to `/v<N>/` (set `PUBLIC_URL` for it, and use `process.env.PUBLIC_URL` for its image paths).

## Deployment (Vercel)
Vercel Root Directory is the repo root. `vercel.json` runs `scripts/build.sh`, which publishes:

- `/` is 3.0 (live)
- `/v2/` is 2.0
- `/v1/` is 1.0

The switcher button links between these paths, so it only works on the deployed build, not in `npm start`.

## Running
- 1.0: open `portfolio1.0/index.html` with Live Server. Use a SASS watcher for `css/main.scss`.
- 2.0 and 3.0: `cd portfolio<N>.0 && npm install && npm start`.
