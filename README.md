# SAST Dashboard UI

Next.js App Router frontend for SAST Dashboard.

## Local development

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Container build and run

Build and run the UI with Docker Compose:

```bash
docker compose -f compose.yml up --build -d
```

The UI is exposed on http://localhost:3001.

Stop it with:

```bash
docker compose -f compose.yml down
```

## Notes

- The container uses a multi-stage build in Containerfile.
- Next.js runs in standalone production mode.
- Compose is configured with pull_policy: missing, so Docker only pulls if the image is not already present locally.
