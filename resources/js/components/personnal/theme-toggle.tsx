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
            className="border-gray-600 hover:bg-yellow-400/20 hover:border-yellow-400/50"
        >
            {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-yellow-400" />
            ) : (
                <Moon className="w-4 h-4 text-gray-600" />
            )}
        </Button>
    )
}