import { botConfig } from "../config.ts";
import en from "../locales/en.ts";
import zh from "../locales/zh.ts";

const locales = { en, zh };

type Locale = typeof en;

let currentLocale: Locale = locales[botConfig.language as keyof typeof locales] || en;

export function setLanguage(lang: keyof typeof locales) {
  currentLocale = locales[lang] || en;
}

export function t(key: keyof Locale, ...args: any[]): string {
  const template = currentLocale[key];
  if (typeof template === "function") {
    return (template as (...args: any[]) => string)(...args);
  }
  return String(template);
}