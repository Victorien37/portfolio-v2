import { useTranslation } from "@/hooks/use-translation";
import { Study } from "@/types";
import { Award, GraduationCap } from "lucide-react";
import React from "react";

type StudySectionProps = {
    studies: Study[];
}


export const StudySection: React.FC<StudySectionProps> = ({ studies }) => {

    const { t } = useTranslation();

    const getEndDate = (study: Study) => {
        if (study?.end) {
            let start   = new Date(study.start);
            let end     = new Date(study.end);
            
            if (end.getFullYear() !== start.getFullYear()) {
                return ` - ${end.getFullYear()}`;
            }
        }
        
        return '';
    }

    return (
        <section className="py-20 bg-background">
            <div className="container mx-auto px-6 lg:px-12">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold mb-4">
                        <span className="text-primary">{t('studies')}</span>
                    </h2>
                    <div className="w-24 h-1 bg-primary mx-auto"></div>
                </div>

                <div className="max-w-4xl mx-auto">
                    <div className="relative">
                        {/* Timeline line */}
                        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/40 to-primary/60"></div>
                        
                        {studies.map((study, index) => (
                            <div key={index} className="relative pl-12 pb-12 last:pb-0">
                                {/* Timeline dot */}
                                <div className="absolute left-2 w-4 h-4 bg-primary rounded-full border-4 border-background shadow-lg"></div>
                                
                                <div className="bg-background/50 p-6 rounded-lg border border-secondary/50 hover:border-primary/30 transition-all duration-300">
                                    <div className="flex flex-wrap items-center gap-4 mb-4">
                                        <span className="bg-primary/20 text-primary px-3 py-1 rounded-full text-sm font-medium">{new Date(study.start).getFullYear()}{getEndDate(study)}</span>
                                        { study.obtained && (
                                            <div className="flex items-center gap-2 text-primary">
                                                <GraduationCap className="w-4 h-4" />
                                            </div>
                                        ) }
                                    </div>
                                    
                                    <h3 className="text-secondary mb-2">
                                        <span className="text-xl font-bold">{t(study.name)}</span> - <i>{t(study.school)}</i>
                                    </h3>
                                    <h4 className="text-primary font-medium mb-2">{t(study.full_name)}</h4>
                                    
                                    {/* {study. && (
                                        <p className="text-gray-300">{formation.details}</p>
                                    )} */}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}