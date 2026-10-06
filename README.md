
## Editing projects

Project data lives in `scripts/projects.mjs`. After editing, regenerate the pages:

```bash
node scripts/build.mjs
```

This rewrites `index.html` and `projects/<slug>/index.html`. Screenshots live in `assets/shots/`.
