import { Button } from "@/components/ui/button";
import { useTranslation } from "@/hooks/use-translation";
import { Experience } from "@/types";
import { router } from "@inertiajs/react";
import { ArrowRight, Calendar, Plus } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { SectionHeader } from "./common/section-header";
import { ContentCard } from "./common/content-card";
import { TimelineDot, TimelineLine } from "./common/timeline-dot";
import { getEndDate } from "@/lib/date-utils";

type ExperienceSectionProps = {
    experiences: Experience[];
}

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({ experiences }) => {

    const [showAll, setShowAll]             = useState<boolean>(false);
    const [visibleItems, setVisibleItems]   = useState<number[]>([]);
    const itemRefs                          = useRef<(HTMLDivElement | null)[]>([]);
    const { t }                             = useTranslation();
    
    useEffect(() => {
        const observers = itemRefs.current.map((ref, index) => {
            if (!ref) return null;

            const observer = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) {
                        setVisibleItems(prev => [...prev, index]);
                    }
                },
                { threshold: 0.2, rootMargin: '0px 0px -50px 0px' }
            );

            observer.observe(ref);
            return observer;
        });

        return () => {
            observers.forEach(observer => observer?.disconnect());
        }
    }, [showAll]);

    return (
        <section className="py-20 bg-background overflow-x-hidden">
            <div className="container mx-auto px-6 lg:px-12 max-w-full">
                <SectionHeader title={t('expro')} />

                <div className="max-w-4xl mx-auto">
                    <div className="relative">
                        <TimelineLine />
                        
                        { experiences.slice(0, showAll ? experiences.length : 3).map((experience, index) => {
                            return (

                                <div
                                    key={index}
                                    ref={element => itemRefs.current[index] = element}
                                    className={`relative pl-12 pb-12 last:pb-0 transition-all duration-700 ${visibleItems.includes(index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                                    style={{ transitionDelay: `${index * 200}ms` }}
                                >
                                    <TimelineDot animated visible={visibleItems.includes(index)} />

                                    <ContentCard
                                        className="hover:bg-background/70 group"
                                        onClick={() => router.visit(
                                            route('experience.show', { companyName: experience.company.name, start: experience.start })
                                        )}
                                    >
                                        <div className="flex flex-wrap items-center gap-2 mb-4">
                                            <Calendar className="w-4 h-4" />
                                            <span className="bg-primary/20 text-primary px-3 py-1 rounded-full text-sm font-medium">
                                                {new Date(experience.start).getFullYear()}{getEndDate(experience.start, experience.end)}
                                            </span>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <div className="flex-1">
                                                <h3 className="text-xl font-bold text-secondary mb-2">{experience.company.name}</h3>
                                                <h4 className="text-primary font-medium mb-4">{t(experience.job)}</h4>
                                                
                                                <ul className="space-y-2">
                                                    {experience?.projects?.map((project, i) => {
                                                        return (
                                                            <li key={i} className="flex items-start gap-3 text-gray-300">
                                                                <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                                                                <span>{t(project.title)}</span>
                                                            </li>
                                                        )
                                                    })}
                                                </ul>
                                            </div>
                                            <ArrowRight className="w-5 h-5 text-primary opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
                                        </div>
                                    </ContentCard>
                                </div>
                            )
                        }) }
                        {!showAll && experiences.length > 3 && (
                            <div className="text-center mt-8">
                                <Button
                                    onClick={() => setShowAll(true)}
                                    variant="secondary"
                                    className="bg-background border border-primary text-primary hover:bg-primary hover:text-background"
                                >
                                    <Plus className="w-4 h-4 mr-2" />
                                    {t('more')}
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    )
}