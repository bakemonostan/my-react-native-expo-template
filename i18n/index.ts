import type { I18nKey } from "./locales/en";
import { en } from "./locales/en";
import { es } from "./locales/es";

export type { I18nKey };

const catalogs = { en, es } as const;

export type LocaleCode = keyof typeof catalogs;

export function resolveLocale(languageTag: string | undefined): LocaleCode {
  if (!languageTag) return "en";
  const base = languageTag.split("-")[0]?.toLowerCase();
  if (base === "es") return "es";
  return "en";
}

export function getCatalog(locale: LocaleCode): Record<I18nKey, string> {
  return catalogs[locale];
}

export function translate(
  locale: LocaleCode,
  key: I18nKey,
  vars?: Record<string, string>,
): string {
  let s = getCatalog(locale)[key];
  if (vars) {
    for (const [k, v] of Object.entries(vars)) {
      s = s.replaceAll(`{{${k}}}`, v);
    }
  }
  return s;
}

export { en, es };
