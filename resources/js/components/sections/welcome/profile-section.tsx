import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslation } from "@/hooks/use-translation";
import { Config, User } from "@/types";
import { differenceInYears } from "date-fns";
import { Download, Github, Gitlab, Linkedin, Mail, Phone } from "lucide-react";
import React from "react";

type ProfileSectionProps = {
    user:   User;
    config: Config;
}

export const ProfileSection: React.FC<ProfileSectionProps> = ({ user, config }) => {

    const { language }      = useLanguage();
    const { t }             = useTranslation();

    return (
        <section className="relative bg-background min-h-screen flex items-center">
            <div className="container mx-auto px-6 lg:px-12">
                <div className="grid lg:grid-cols-3 gap-12 items-center">
                {/* Photo et info de base */}
                <div className="lg:col-span-1 text-center lg:text-left">
                    <div className="relative inline-block mb-6">
                    <img 
                        src="https://media.licdn.com/dms/image/v2/D4E03AQHBidsKlaLPeA/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1684663167119?e=2147483647&v=beta&t=FoxF_8VJDNKPVwzhMHV0pyXuC7lbV2DJfVkk_eOVe2c" 
                        alt="Photo de profil" 
                        className="w-48 h-48 rounded-2xl object-cover shadow-2xl border-4 border-primary/20"
                    />
                    <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-primary rounded-full animate-pulse"></div>
                    </div>
                    
                    <h1 className="text-3xl lg:text-4xl font-bold mb-2">
                        <span className='text-secondary'>{user.firstname.toUpperCase()}</span><br />
                        <span className="text-primary">{user.lastname.toUpperCase()}</span>
                    </h1>
                    
                    <div className="space-y-2 text-gray-300 mb-6">
                    <div className="flex items-center justify-center lg:justify-start gap-2">
                        <span className="text-primary">🎂</span>
                        <span className='text-secondary'>{differenceInYears(new Date(), new Date(user.birthday))} { t('years') }</span>
                    </div>
                    <div className="flex items-center justify-center lg:justify-start gap-2">
                        <span className="text-primary">🚗</span>
                        <span className='text-secondary'>{t('car')}</span>
                    </div>
                    <div className="flex items-center justify-center lg:justify-start gap-2">
                        <Phone className="w-4 h-4 text-primary" />
                        <span className='text-secondary'>{ language === 'fr' ? user.tel : `+33${user.tel.slice(1)}` }</span>
                    </div>
                    <div className="flex items-center justify-center lg:justify-start gap-2">
                        <Mail className="w-4 h-4 text-primary" />
                        <span className='text-secondary'>{ user.email }</span>
                    </div>
                    </div>

                    <div className="flex justify-center lg:justify-start gap-4">
                        { user?.github && (
                            <a href={user.github} target='_blank' className="p-3 bg-primary/10 border border-primary/20 rounded-lg hover:bg-primary/20 transition-colors">
                                <Github className="w-5 h-5 text-primary" />
                            </a>
                        ) }
                        { user?.gitlab && (
                            <a href={user.gitlab} target='_blank' className="p-3 bg-primary/10 border border-primary/20 rounded-lg hover:bg-primary/20 transition-colors">
                                <Gitlab className="w-5 h-5 text-primary" />
                            </a>
                        ) }
                        { user?.linkedin && (
                            <a href={user.linkedin} target='_blank' className="p-3 bg-primary/10 border border-primary/20 rounded-lg hover:bg-yellow-400/20 transition-colors">
                                <Linkedin className="w-5 h-5 text-primary" />
                            </a>
                        ) }
                        { user?.cv && (
                            <a href={user.cv} download title={t('cv')} className="p-3 bg-primary/10 border border-primary/20 rounded-lg hover:bg-primary/20 transition-colors">
                                <Download className="w-5 h-5 text-primary" />
                            </a>
                        ) }
                    </div>
                </div>

                {/* Titre principal */}
                <div className="lg:col-span-2">
                    <div className="relative">
                        <h2 className="text-4xl lg:text-6xl font-bold text-secondary mb-4">{ t(config.job) }</h2>
                        <div className="w-100 h-1 bg-gradient-to-r from-primary to-primary-dark mb-6"></div>
                            <p className="text-xl lg:text-2xl text-secondary mb-8 leading-relaxed">{ t(config.description) }</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}