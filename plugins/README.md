# Config plugins (optional)

This directory is **empty of code on purpose** for a **project-agnostic** template.

Older copies of this repo may have contained **app-specific** Expo config plugins (Android product flavors, Notifee Maven path, hard-coded bundle IDs). Those are removed so a new project does not inherit another product’s native wiring.

## When you need a custom plugin

Use the official **Expo config plugins** system so changes survive `npx expo prebuild`:

- [Introduction to config plugins](https://docs.expo.dev/config-plugins/introduction/)
- [Creating a plugin](https://docs.expo.dev/config-plugins/plugins-and-mods/#creating-a-plugin)
- [Mods for Android and iOS](https://docs.expo.dev/config-plugins/mods/)

Add a local plugin file here (e.g. `withMyApp.cjs`) and reference it from **`app.config.ts`**:

```ts
// Example only — implement your own plugin or use a community package.
// const withMyApp = require('./plugins/withMyApp.cjs');
// export default (ctx) => withMyApp(yourConfig(ctx));
```

Prefer **published config plugins** from npm when they exist instead of copying Gradle snippets from random repos.

## Staging vs production (recommended pattern)

Avoid baking multiple **applicationIds** into a template. Use:

- [EAS Build profiles](https://docs.expo.dev/build/eas-json/) (`preview`, `production`, etc.) and **environment variables** in the Expo dashboard, or  
- [Environment variables in Expo](https://docs.expo.dev/guides/environment-variables/) with `EXPO_PUBLIC_*` for client-safe values.

This template already reads **`extra.apiBaseUrl`** / **`extra.appEnv`** from **`app.config.ts`** (see root **`.env.example`**).

## Android signing in CI

Do not commit keystores. Follow Expo / Google documentation:

- [App signing credentials](https://docs.expo.dev/app-signing/app-credentials/)
- [Google Play App Signing](https://support.google.com/googleplay/android-developer/answer/9842756)

## Push notifications (example)

If you add **Notifee** or **FCM**, use the library’s Expo install docs and official config plugins — do not resurrect copy-pasted `withNotifeeGradle` from another app without verifying versions.

## Community help

- [Expo forums](https://forums.expo.dev/)  
- [React Native Community Discord](https://reactnative.dev/community/overview#other-communities) (link as listed on reactnative.dev)
