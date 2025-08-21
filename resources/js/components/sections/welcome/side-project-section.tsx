import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslation } from "@/hooks/use-translation";
import { Project } from "@/types";
import { Award } from "lucide-react";
import React from "react";

type SideProjectSectionProps = {
    projects: Project[];
}

export const SideProjectSection: React.FC<SideProjectSectionProps> = ({ projects }) => {

    const { t } = useTranslation();
    const { language } = useLanguage();

    return (
        <section className="py-20 bg-background">
            <div className="container mx-auto px-6 lg:px-12">
                <div className="text-center mb-12">
                    <h3 className="text-3xl font-bold mb-4">
                        {t(language === "en" ? 'side' : 'projects')} <span className="text-primary">{t(language === 'en' ? 'projects' : 'side')}</span>
                    </h3>
                    <div className="w-20 h-1 bg-primary mx-auto"></div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {projects.map((project, index) => (
                        <div 
                            key={index} 
                            className="p-6 rounded-lg border border-secondary/50 hover:border-primary/30 transition-all duration-300 cursor-pointer"
                            onClick={() => project?.url ? window.open(project?.url, '_blank') : ''}
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 bg-primary/20 rounded-lg text-primary">
                                    <Award className="w-5 h-5" />
                                </div>
                                <h4 className="text-lg font-semibold text-white">{t(project.title)}</h4>
                            </div>
                            <p className="text-gray-300 mb-4">
                                {t(project.description_long)}
                            </p>
                            {/* <div className="flex flex-wrap gap-2">
                                {project.technologies.map((tech, techIndex) => (
                                <span key={techIndex} className="bg-yellow-400/20 text-yellow-400 px-2 py-1 rounded text-sm">
                                    {tech}
                                </span>
                                ))}
                            </div> */}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}