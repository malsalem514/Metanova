import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;
  if (!locale || !routing.locales.includes(locale as "fr" | "en")) {
    locale = routing.defaultLocale;
  }
  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default as IntlMessages,
  };
});

// Type augmentation for next-intl
type Messages = typeof import("../../messages/en.json");
declare global {
  interface IntlMessages extends Messages {}
}
