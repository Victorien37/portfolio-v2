import { useLanguage } from "@/contexts/LanguageContext"
import en from "@/lang/en";
import fr from "@/lang/fr";
import pt from "@/lang/pt";

const translations = { fr, en, pt };

export const useTranslation = () => {
    const { language } = useLanguage();

    const t = (obj: string | Record<string, string> | null | undefined): string => {
        if (typeof obj === "string") {
            const parts = obj.split(".");
            let value: any = translations[language];

            for (const part of parts) {
                value = value?.[part];
            }

            return typeof value === "string" ? value : obj;
        }

        return obj?.[language] ?? obj?.fr ?? "";
    }

    return { t };
}