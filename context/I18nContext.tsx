import { featureFlags } from "@/config/featureFlags";
import { resolveLocale, translate, type I18nKey, type LocaleCode } from "@/i18n";
import * as Localization from "expo-localization";
import React, { createContext, useContext, useMemo } from "react";

type I18nContextValue = {
  locale: LocaleCode;
  t: (key: I18nKey, vars?: Record<string, string>) => string;
};

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const i18nOn = featureFlags.enableI18n;
  const locale = useMemo((): LocaleCode => {
    if (!i18nOn) return "en";
    return resolveLocale(Localization.getLocales()[0]?.languageTag);
  }, [i18nOn]);

  const value = useMemo<I18nContextValue>(
    () => ({
      locale,
      t: (key, vars) => translate(locale, key, vars),
    }),
    [locale],
  );

  return (
    <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
  );
}

export function useI18n(): I18nContextValue {
  const ctx = useContext(I18nContext);
  if (!ctx) {
    throw new Error("useI18n must be used within I18nProvider");
  }
  return ctx;
}
