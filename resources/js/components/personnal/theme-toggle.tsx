import { Button } from "../ui/button";
import { Moon, Sun } from "lucide-react";
import React from "react";
import { Config } from "@/types";
import { useThemeConfig } from "@/hooks/use-theme-config";


export const ThemeToggle: React.FC<{ config: Config }> = ({ config }) => {
    const { theme, toggleTheme } = useThemeConfig(config);

    return (
        <Button
            variant="outline"
            size="sm"
            onClick={toggleTheme}
            className="border-secondary hover:bg-primary/20 hover:border-primary/50"
        >
            {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-primary" />
            ) : (
                <Moon className="w-4 h-4 text-secondary" />
            )}
        </Button>
    )
}