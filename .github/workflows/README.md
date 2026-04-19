# GitHub Actions (template defaults)

This folder ships **one** workflow that works for **any** clone with **no** repository secrets.

## Included

| File     | Purpose |
| -------- | ------- |
| `ci.yml` | `npm ci` + `npm run lint` + `npx tsc --noEmit` on PR / push to `main` or `master` |

Rename your default branch if you use something else and update the `branches:` lists in `ci.yml`.

## Official references (add more in your fork)

- **Expo app config** — [Configuration with app.config.js](https://docs.expo.dev/workflow/configuration/)
- **EAS (optional)** — [Run EAS Build in a GitHub Action](https://docs.expo.dev/build-reference/github-actions/), [EAS Workflows](https://docs.expo.dev/eas/workflows/get-started/) — only after `eas init` in your repo
- **Expo environment variables** — [Environment variables in Expo](https://docs.expo.dev/guides/environment-variables/)
- **GitHub Actions + Node** — [Building and testing Node.js](https://docs.github.com/en/actions/automating-builds-and-tests/building-and-testing-nodejs)
- **React Native** — [Get started with React Native](https://reactnative.dev/docs/getting-started), [Set up your environment](https://reactnative.dev/docs/set-up-your-environment)
- **Help** — [Expo forums](https://forums.expo.dev/), [React Native Community](https://github.com/react-native-community/discussions)

## Optional next steps (not in this template)

1. **EAS Build (optional)** — Run `eas init` in your fork, then use Expo’s EAS workflow + `expo-token` secret if you want cloud builds instead of local `expo run:*` / Xcode / Gradle.
2. **Typecheck** — Already in `ci.yml` (`npx tsc --noEmit`).
3. **Tests** — Add `npm test` and a Jest (or Maestro) workflow when you have tests.

Copy any vendor-specific workflow (Firebase App Distribution, Play upload, etc.) from their docs into **new** files in this directory; do not commit real `appId`, package names, or keystore paths in a public template.
