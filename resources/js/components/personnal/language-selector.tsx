import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageType } from "@/types";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { Globe } from "lucide-react";


export function LanguageSelector() {
    const { language, setLanguage } = useLanguage();

    const languages: Array<{code: LanguageType, name: string, flag: string}> = [
        { code: 'fr', name: 'Français', flag: '🇫🇷' },
        { code: 'en', name: 'English', flag: '🇬🇧' },
        { code: 'pt', name: 'Português', flag: '🇵🇹' },
    ];

    const currentLanguage = languages.find(lang => lang.code === language);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="outline"
                    size="sm"
                    className="border-secondary hover:bg-primary/20 hover:border-primary/50"
                >
                    <Globe className="w-4 h-4 mr-2 text-primary" />
                    { currentLanguage?.flag }
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-background border-background">
                { languages.map(lang => {
                    return (
                        <DropdownMenuItem
                            key={lang.code}
                            onClick={() => setLanguage(lang.code)}
                            className="text-secondary hover:bg-secondary cursor-pointer"
                        >
                            <span className="mr-2">{lang.flag}</span>
                            { lang.name }
                        </DropdownMenuItem>
                    )
                }) }
            </DropdownMenuContent>
        </DropdownMenu>
    )
}