import { DynamicIcon } from "@/components/personnal/dynamic-icon";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from "@/hooks/use-translation";
import { Interest, Language, SkillCategory } from "@/types";
import { Emoji } from "emoji-picker-react";
import React from "react";

type SkillSectionProps = {
    skillCategories:    SkillCategory[];
    interests:          Interest[];
    languages:          Language[];
}

export const SkillSection: React.FC<SkillSectionProps> = ({ skillCategories, interests, languages }) => {

    const { t } = useTranslation();

    return (
        <section className="py-20 bg-background">
            <div className="container mx-auto px-6 lg:px-12">
                <div className="grid lg:grid-cols-3 gap-12">
                    {/* Compétences technique */}
                    <div className="lg:col-span-2">
                        <div className="mb-12">
                            <h2 className="text-4xl font-bold mb-4">
                                <span className="text-primary">{t('skills')}</span>
                            </h2>
                            <div className="w-24 h-1 bg-primary"></div>
                        </div>

                        <div className="space-y-8">
                            { skillCategories.map((category, index) => {
                                return (
                                    <div key={index} className="bg-background/50 p-6 rounded-lg border border-secondary/50">
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
                                    </div>
                                )
                            }) }
                        </div>
                    </div>

                    {/* Sidebar avec infos supplémentaires */}
                    <div className="space-y-8">
                        {/* Langues */}
                        <div className="bg-background/50 p-6 rounded-lg border border-secondary/50">
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
                        </div>

                        {/* Centres d'intérêts */}
                        <div className="bg-background/50 p-6 rounded-lg border border-secondary/50">
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
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}