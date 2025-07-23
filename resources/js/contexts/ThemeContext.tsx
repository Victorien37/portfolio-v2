import React, { createContext, useContext, useEffect, useState } from "react";


type ThemeMode = "light" | "dark";

interface RawThemeConfig {
    [key: string]: string;
}

type ThemeColors = {
    background: string;
    primary:    string;
    secondary:  string;
}

interface ThemeContextType {
    theme:      ThemeMode;
    colors:     ThemeColors;
    setTheme:   (theme: ThemeMode) => void;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const extractColors = (config: RawThemeConfig, mode: ThemeMode): ThemeColors => ({
    background: config[`${mode}_background`] || "#fff",
    primary:    config[`${mode}_primary`] || "#000",
    secondary:  config[`${mode}_secondary`] || "#888",
});

export const ThemeProvider: React.FC<{ children: React.ReactNode, config: RawThemeConfig }> = ({ children, config }) => {
    const [theme, setThemeState] = useState<ThemeMode>(() => {
        return (localStorage.getItem("theme") as ThemeMode) || "dark";
    });

    const setTheme = (newTheme: ThemeMode) => {
        setThemeState(newTheme);
        localStorage.setItem("theme", newTheme);
    }

    useEffect(() => {
        const root = document.documentElement;
        root.classList.remove("light", "dark");
        root.classList.add(theme);
    }, [theme]);

    useEffect(() => {
        const root = document.documentElement;

        root.style.setProperty('--color-background', config[`${theme}_background`]);
        root.style.setProperty('--color-primary', config[`${theme}_primary`]);
        root.style.setProperty('--color-secondary', config[`${theme}_secondary`]);
    }, [theme, config]);


    const colors = extractColors(config, theme);

    const toggleTheme = () => {
        setTheme(theme === "light" ? "dark" : "light");
    };


    return (
        <ThemeContext.Provider value={{ theme, colors, setTheme, toggleTheme }}>
            { children }
        </ThemeContext.Provider>
    )
}

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) throw new Error("useTheme must be used within ThemeProvider");
    return context;
}