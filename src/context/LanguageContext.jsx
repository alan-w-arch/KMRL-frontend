import { createContext, useContext, useState } from "react";
import en from "../locales/en.json";
import ml from "../locales/ml.json";

const translations = { en, ml };
const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState("en");

  const t = translations[language] || translations.en;

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

// custom hook for easier usage
export function useLanguage() {
  return useContext(LanguageContext);
}
