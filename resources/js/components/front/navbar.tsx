import React from "react";
import { LanguageSelector } from "../personnal/language-selector";
import { ThemeToggle } from "../personnal/theme-toggle";


export const Navbar: React.FC = () => {
    return (
        <nav className="fixed top-4 right-4 z-50 flex gap-2">
            <LanguageSelector />
            <ThemeToggle />
        </nav>
    )
}