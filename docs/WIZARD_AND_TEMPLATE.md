# Web wizard ↔ Expo template

The **RN Init** wizard lives in a separate Next.js app (e.g. repo path `rn-init/react-native-init`). It is the UI for choosing identifiers and env flags that match **this** template.

## Single source of truth

- **Runtime behavior** — this Expo repo (`app/`, `store/`, `services/`, `api/`, etc.).
- **Env contract** — `.env.example` at the template root + `app.config.ts` `extra` keys.

The wizard’s **“Copy .env”** output uses the **same names** as `.env.example` so you can paste into a clone without guessing. The **Backend & auth** step can also emit `EXPO_PUBLIC_BACKEND_PROVIDER`, Supabase placeholders, or a prefilled `EXPO_PUBLIC_API_BASE_URL` for a custom API — wire those in JS when you add clients (the template does not bundle Supabase by default). **State / API** steps write **`EXPO_PUBLIC_STATE_MODE`** and **`EXPO_PUBLIC_HTTP_CLIENT`**, which `app.config.ts` passes into `extra` and `config/featureFlags.ts` exposes as **`runtimeModes`** (`fetch` uses **`api/fetchClient.ts`**).

## When ZIP generation lands

`POST /api/generate` in the wizard will assemble a downloadable project. Until then, use **git clone** + pasted `.env` + `npx expo prebuild` as documented in the root README.

## Wizard flow doc

See the wizard repo: `docs/WIZARD_FLOW.md`.
