import i18n from "i18n";
import path from "path";

export default i18n;

export const createI18nInstance = (namespace: string) => {
  const instance = new i18n.I18n();

  const localesPath = path.join(process.cwd(), "src", "locales", namespace);

  instance.configure({
    locales: ["en"],
    directory: localesPath,
    objectNotation: true,
    defaultLocale: "en",
    retryInDefaultLocale: true,
    updateFiles: false,
    syncFiles: false,
    register: global,
  });

  return instance;
};
