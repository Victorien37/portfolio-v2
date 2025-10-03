import { DynamicIcon } from "@/components/personnal/dynamic-icon";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from "@/hooks/use-translation";
import { Interest, Language, SkillCategory } from "@/types";
import { Emoji } from "emoji-picker-react";
import React from "react";
import { SectionHeader } from "./common/section-header";
import { ContentCard } from "./common/content-card";

type SkillSectionProps = {
    skillCategories:    SkillCategory[];
    interests:          Interest[];
    languages:          Language[];
}

export const SkillSection: React.FC<SkillSectionProps> = ({ skillCategories, interests, languages }) => {
    const { t } = useTranslation();

    return (
        <section className="py-20 bg-background overflow-x-hidden">
            <div className="container mx-auto px-6 lg:px-12 max-w-full">
                <div className="grid lg:grid-cols-3 gap-12 max-w-full">
                    {/* Compétences technique */}
                    <div className="lg:col-span-2 max-w-full overflow-hidden">
                        <SectionHeader
                            title={<span className="text-primary">{t('skills')}</span>}
                            centered={false}
                            className="mb-12"
                        />

                        <div className="space-y-8">
                            { skillCategories.map((category, index) => {
                                return (
                                    <ContentCard key={index}>
                                        <div className="flex items-center gap-3 mb-6">
                                            <div className="p-2 bg-primary/20 rounded-lg text-primary">
                                                <DynamicIcon name={category.svg} />
                                            </div>
                                            <h3 className="text-xl font-semibold">{t(category.name)}</h3>
                                        </div>

                                        <div className="flex flex-wrap gap-3">
                                            { category?.skills?.map((skill, i) => {
                                                return (
                                                    <Badge
                                                        key={i}
                                                        variant="outline"
                                                        className="bg-background text-secondary border-secondary"
                                                    >
                                                        {t(skill.name)}
                                                    </Badge>
                                                )
                                            }) }
                                        </div>
                                    </ContentCard>
                                )
                            }) }
                        </div>
                    </div>

                    {/* Sidebar avec infos supplémentaires */}
                    <div className="space-y-8 max-w-full overflow-hidden">
                        {/* Langues */}
                        <ContentCard>
                            <h3 className="text-lg font-bold mb-6 text-primary">{t('languages')}</h3>
                            <div className="space-y-3">
                                { languages.map((lang, index) => {
                                    return (
                                        <div key={index} className="flex justify-between items-center">
                                            <span>{t(lang.name)}</span>
                                            <Badge
                                                variant="outline"
                                                className="bg-primary/20 text-primary border-primary/50"
                                            >
                                                {lang.level}
                                            </Badge>
                                        </div>
                                    )
                                }) }
                            </div>
                        </ContentCard>

                        {/* Centres d'intérêts */}
                        <ContentCard>
                            <h3 className="text-lg font-bold mb-6 text-primary">{t('interests')}</h3>
                            <div className="space-y-3">
                                { interests.map((interest, index) => {
                                    return (
                                        <div key={index} className="flex items-center gap-3 text-secondary">
                                            <Emoji unified={interest.emoji} />
                                            <span>{t(interest.name)}</span>
                                        </div>
                                    )
                                }) }
                            </div>
                        </ContentCard>
                    </div>
                </div>
            </div>
        </section>
    )
}