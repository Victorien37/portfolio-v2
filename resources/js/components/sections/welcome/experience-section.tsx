import { Button } from "@/components/ui/button";
import { useTranslation } from "@/hooks/use-translation";
import { Experience } from "@/types";
import { ArrowRight, Calendar, Plus } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

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

    const getEndDate = (experience: Experience) => {
        if (experience?.end) {
            let start   = new Date(experience.start);
            let end     = new Date(experience.end);
            
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
                        {t('expro')} <span className="text-primary"></span>
                    </h2>
                    <div className="w-24 h-1 bg-primary mx-auto"></div>
                </div>

                <div className="max-w-4xl mx-auto">
                    <div className="relative">
                        {/* Timeline line */}
                        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary to-primary-dark"></div>
                        
                        { experiences.slice(0, showAll ? experiences.length : 3).map((experience, index) => {
                            return (

                                <div
                                    key={index}
                                    ref={element => itemRefs.current[index] = element}
                                    className={`relative pl-12 pb-12 last:pb-0 transition-all duration-700 ${visibleItems.includes(index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                                    style={{ transitionDelay: `${index * 200}ms` }}
                                >
                                    {/* Timeline dot */}
                                    <div className={`absolute left-2 w-4 h-4 bg-primary rounded-full border-4 border-background shadow-lg transition-all duration-500 ${visibleItems.includes(index) ? 'scale-100' : 'scale-0'}`}></div>

                                    <div 
                                        className="bg-background/50 p-6 rounded-lg border border-secondary/30 hover:border-primary/50 hover:bg-background/70 transition-all duration-300 cursor-pointer group"
                                        onClick={() => route('experience.show', experience.id)}
                                    >
                                        <div className="flex flex-wrap items-center gap-2 mb-4">
                                            <Calendar className="w-4 h-4" />
                                            <span className="bg-primary/20 text-primary px-3 py-1 rounded-full text-sm font-medium">
                                                {new Date(experience.start).getFullYear()}{getEndDate(experience)}
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
                                    </div>
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