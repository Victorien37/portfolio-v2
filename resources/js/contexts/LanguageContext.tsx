import { languages } from "@/lib/utils";
import { LanguageType } from "@/types";
import React, { createContext, useContext, useState } from "react";

interface LanguageContextType {
    language:       LanguageType;
    setLanguage:    (lang: LanguageType) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const getInitialLang = (): LanguageType => {
        const saved = localStorage.getItem("lang") as LanguageType | null;
        if (saved && languages.includes(saved)) return saved;

        const navLang = navigator.language.slice(0, 2);
        if (languages.includes(navLang)) return navLang as LanguageType;

        return "fr";
    }

    const [language, setLanguageState] = useState<LanguageType>(getInitialLang);

    const setLanguage = (lang: LanguageType) => {
        localStorage.setItem("lang", lang);
        document.cookie = `lang=${lang}; path=/; max-age=31536000;`
        setLanguageState(lang)
    }

    return (
        <LanguageContext.Provider value={{ language, setLanguage }}>
            { children }
        </LanguageContext.Provider>
    )
}

export const useLanguage = (): LanguageContextType => {
    const context = useContext(LanguageContext);
    if (!context) throw new Error("useLanguage must be used within a LanguageProvider");
    return context;
};