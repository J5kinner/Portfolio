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
4. Point the Vercel root directory at the new folder.

## Running
- 1.0: open `portfolio1.0/index.html` with Live Server. Use a SASS watcher for `css/main.scss`.
- 2.0 and 3.0: `cd portfolio<N>.0 && npm install && npm start`.
