import * as LucideIcons from "lucide-react";

export const DisplayIcon = ({ icon }: { icon: string }) => {
    const LucideIcon = LucideIcons[icon as keyof typeof LucideIcons];
    return LucideIcon ? <LucideIcon className="w-6 h-6" /> : null;
}