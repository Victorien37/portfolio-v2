import { useEffect, useMemo, useState } from "react";
import tinycolor from "tinycolor2";

type ThemeMode = "light" | "dark";

interface RawThemeConfig {
    [key: string]: string;
}

type ThemeColors = {
    background: string;
    primary:    string;
    secondary:  string;
}

const FRONT_THEME_KEY = "front-theme";

const getStoredTheme = (): ThemeMode => {
    const stored = localStorage.getItem(FRONT_THEME_KEY);
    return (stored === "light" || stored === "dark") ? stored : "dark";
};

export const useThemeConfig = (config?: RawThemeConfig) => {
    const [theme, setTheme] = useState<ThemeMode>(() => {
        return getStoredTheme();
    });

    const toggleTheme = () => {
        setTheme(theme === "light" ? "dark" : "light");
    };

    useEffect(() => {
        localStorage.setItem(FRONT_THEME_KEY, theme);
    }, [theme]);

    const colors: ThemeColors | null = useMemo(() => {
        if (!config) return null;
        
        return {
            background: config[`${theme}_background`],
            primary:    config[`${theme}_primary`],
            secondary:  config[`${theme}_secondary`],
        }
    }, [config, theme]);

    useEffect(() => {
        document.documentElement.classList.remove("light", "dark");
        document.documentElement.classList.add(theme);

        if (!config) return;

        document.documentElement.style.setProperty("--color-background", config[`${theme}_background`]);
        document.documentElement.style.setProperty("--color-primary", config[`${theme}_primary`]);
        document.documentElement.style.setProperty("--color-primary-dark", tinycolor(config[`${theme}_primary`]).darken(10).toString());
        document.documentElement.style.setProperty("--color-secondary", config[`${theme}_secondary`]);
    }, [theme, config]);

    return { theme, setTheme, toggleTheme, colors };
}