import { useLayoutEffect } from "react";
import { useTranslation } from "react-i18next";

export function usePublicDocumentLanguage() {
  const { i18n, t } = useTranslation();
  const language = i18n.resolvedLanguage === "ar" ? "ar" : "en";
  const direction = i18n.dir(language);
  const title = t("marketing.siteTitle");

  useLayoutEffect(() => {
    const root = document.documentElement;
    const previousLanguage = root.lang;
    const previousDirection = root.dir;
    const previousTitle = document.title;

    root.lang = language;
    root.dir = direction;
    document.title = title;

    return () => {
      root.lang = previousLanguage;
      root.dir = previousDirection;
      document.title = previousTitle;
    };
  }, [language, direction, title]);
}
