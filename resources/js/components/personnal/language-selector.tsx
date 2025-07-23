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
                    className="border-gray-600 hover:bg-yellow-400/20 hover:border-yellow-400/50"
                >
                    <Globe className="w-4 h-4 mr-2 text-yellow-400" />
                    { currentLanguage?.flag }
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-gray-800 border-gray-700">
                { languages.map(lang => {
                    return (
                        <DropdownMenuItem
                            key={lang.code}
                            onClick={() => setLanguage(lang.code)}
                            className="text-white hover:bg-gray-700 cursor-pointer"
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