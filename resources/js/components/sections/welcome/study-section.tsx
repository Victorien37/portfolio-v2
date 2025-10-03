import { useTranslation } from "@/hooks/use-translation";
import { Study } from "@/types";
import { GraduationCap } from "lucide-react";
import React from "react";
import { SectionHeader } from "./common/section-header";
import { ContentCard } from "./common/content-card";
import { TimelineDot, TimelineLine } from "./common/timeline-dot";
import { getEndDate } from "@/lib/date-utils";

type StudySectionProps = {
    studies: Study[];
}

export const StudySection: React.FC<StudySectionProps> = ({ studies }) => {
    const { t } = useTranslation();

    return (
        <section className="py-20 bg-background overflow-x-hidden">
            <div className="container mx-auto px-6 lg:px-12 max-w-full">
                <SectionHeader title={<span className="text-primary">{t('studies')}</span>} />

                <div className="max-w-4xl mx-auto">
                    <div className="relative">
                        <TimelineLine className="from-primary/40 to-primary/60" />

                        {studies.map((study, index) => (
                            <div key={index} className="relative pl-12 pb-12 last:pb-0">
                                <TimelineDot />

                                <ContentCard>
                                    <div className="flex flex-wrap items-center gap-4 mb-4">
                                        <span className="bg-primary/20 text-primary px-3 py-1 rounded-full text-sm font-medium">{new Date(study.start).getFullYear()}{getEndDate(study.start, study.end)}</span>
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
                                    
                                </ContentCard>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}