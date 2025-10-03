import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslation } from "@/hooks/use-translation";
import { Project } from "@/types";
import { Award } from "lucide-react";
import React from "react";
import { SectionHeader } from "./common/section-header";
import { ContentCard } from "./common/content-card";

type SideProjectSectionProps = {
    projects: Project[];
}

export const SideProjectSection: React.FC<SideProjectSectionProps> = ({ projects }) => {
    const { t } = useTranslation();
    const { language } = useLanguage();

    // Determine grid layout based on number of projects
    const getGridClass = () => {
        const count = projects.length;
        if (count === 1) return "flex justify-center max-w-4xl mx-auto"; // Center single card
        if (count === 2) return "grid md:grid-cols-2 max-w-4xl mx-auto";
        if (count === 3) return "grid md:grid-cols-3";
        if (count === 4) return "grid md:grid-cols-2 max-w-4xl mx-auto";
        return "grid md:grid-cols-2 lg:grid-cols-3"; // 5+
    };

    const getCardClass = () => {
        const count = projects.length;
        if (count === 1) return "w-full md:w-1/2"; // Half width of container when alone
        return "";
    };

    return (
        <section className="py-20 bg-background overflow-x-hidden">
            <div className="container mx-auto px-6 lg:px-12 max-w-full">
                <SectionHeader
                    title={<>{t(language === "en" ? 'side' : 'projects')} <span className="text-primary">{t(language === 'en' ? 'projects' : 'side')}</span></>}
                    className="mb-12"
                />

                <div className={`${getGridClass()} gap-8 max-w-full`}>
                    {projects.map((project, index) => (
                        <ContentCard
                            key={index}
                            onClick={() => project?.url ? window.open(project?.url, '_blank') : undefined}
                            className={`h-full ${getCardClass()} ${projects.length === 1 ? "text-center" : ""}`}
                        >
                            <div className={`flex items-center gap-3 mb-4 ${projects.length === 1 ? "justify-center" : ""}`}>
                                <div className="p-2 bg-primary/20 rounded-lg text-primary">
                                    <Award className="w-5 h-5" />
                                </div>
                                <h4 className="text-lg font-semibold text-secondary">{t(project.title)}</h4>
                            </div>
                            <p className={`text-secondary mb-4 break-words ${projects.length === 1 ? "text-center" : ""}`}>
                                {t(project.description_long)}
                            </p>
                        </ContentCard>
                    ))}
                </div>
            </div>
        </section>
    )
}