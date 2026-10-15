# CRISPER Studio: Deployment and Troubleshooting

## GitHub Pages

The static browser app is built from this directory and deployed by the repository workflow:

- Workflow: [`.github/workflows/crisper-studio-pages.yml`](../../.github/workflows/crisper-studio-pages.yml)
- Expected project URL: <https://arkansasio.github.io/Program-test/>
- Vite project base: `/Program-test/`

### Required repository setting

Open **Settings → Pages → Build and deployment** and select **GitHub Actions** as the source. The Pages workflow needs repository Pages write permission and an Actions deployment environment.

### Deploy manually through Actions

1. Open the repository's Actions page.
2. Select **Deploy CRISPER Studio to GitHub Pages**.
3. Choose **Run workflow** on `main`.
4. Wait for both the build and deploy jobs to complete successfully.
5. Open the published URL from the deployment job.

A queued or cancelled run is not a successful deployment. Check the latest completed run and read the failing job logs before deciding the site is live.

## Local development

Use Node.js 20+ and npm:

```sh
cd projects/crisper-studio
npm install
npm test
npm run build
npm run dev
```

Vite prints the local development address. For a static production preview, run `npm run preview` after a successful build.

## Windows desktop build

The Electron app uses `better-sqlite3`, a native dependency. Build the Windows installer on a Windows runner or Windows development machine:

```sh
npm install
npm run desktop
npm run package:win
```

If Electron reports a native-module ABI mismatch, rebuild the native module against the Electron version installed by the project. Follow the Electron and better-sqlite3 platform requirements; the browser-only GitHub Pages build does not bundle Electron or expose the desktop SQLite bridge.

## Common issues

### Pages returns 404

- Confirm Pages source is set to **GitHub Actions**.
- Confirm the workflow completed both build and deploy jobs successfully.
- Use the project URL, including the repository path: `https://arkansasio.github.io/Program-test/`.
- Confirm `vite.config.ts` uses `base: '/Program-test/'`.
- Wait until the deployment job reports its page URL; a committed workflow alone does not prove deployment.

### Blank page or missing JavaScript/CSS assets

Inspect browser developer tools for failed requests. Project Pages requires asset URLs to include `/Program-test/`; rebuilding with the wrong Vite base can produce a page shell whose assets return 404.

### CI tests or builds fail

Run `npm test` and `npm run build` locally with the supported Node.js version. Read the first failing compiler/test output rather than relying on a later generic failure message.

### Browser data differs from desktop data

The browser build uses browser storage. The Electron desktop app uses a local SQLite database. These stores are separate and data is not automatically synchronized or uploaded.

## Data handling and intended use

Treat sequence data as potentially sensitive. The application is a computational prototype; sequence-window scores are illustrative heuristics and not experimentally or clinically validated predictions. Do not use the app as a substitute for expert scientific review or institutional data-handling requirements.
