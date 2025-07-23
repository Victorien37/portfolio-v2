import { Navbar } from '@/components/front/navbar';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAppearance } from '@/hooks/use-appearance';
import { useTranslation } from '@/hooks/use-translation';
import { Config, User, type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { differenceInDays, differenceInYears } from 'date-fns';
import { Github, Linkedin, Mail, Phone } from 'lucide-react';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    const { user } = usePage<SharedData & { user: User }>().props;
    const { config } = usePage<SharedData & { config: Config }>().props;

    const { t } = useTranslation();
    const { language } = useLanguage();

    return (
        <>
            <Head title={`${user.firstname} ${user.lastname}`}>
                {/* <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" /> */}
            </Head>
            <Navbar />
            <section className="relative bg-background min-h-screen flex items-center">
                <div className="container mx-auto px-6 lg:px-12">
                    <div className="grid lg:grid-cols-3 gap-12 items-center">
                    {/* Photo et info de base */}
                    <div className="lg:col-span-1 text-center lg:text-left">
                        <div className="relative inline-block mb-6">
                        <img 
                            src="/lovable-uploads/10a51c49-cf3d-4900-a779-aeb08e1de6d4.png" 
                            alt="Photo de profil" 
                            className="w-48 h-48 rounded-2xl object-cover shadow-2xl border-4 border-yellow-400/20"
                        />
                        <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full animate-pulse"></div>
                        </div>
                        
                        <h1 className="text-3xl lg:text-4xl font-bold mb-2">
                            {user.firstname.toUpperCase()}<br />
                            <span className="text-primary">{user.lastname.toUpperCase()}</span>
                        </h1>
                        
                        <div className="space-y-2 text-gray-300 mb-6">
                        <div className="flex items-center justify-center lg:justify-start gap-2">
                            <span className="text-yellow-400">🎂</span>
                            <span>{differenceInYears(new Date(), new Date(user.birthday))} { t('years') }</span>
                        </div>
                        <div className="flex items-center justify-center lg:justify-start gap-2">
                            <span className="text-yellow-400">🚗</span>
                            <span>Permis B et véhicule</span>
                        </div>
                        <div className="flex items-center justify-center lg:justify-start gap-2">
                            <Phone className="w-4 h-4 text-yellow-400" />
                            <span>{ language === 'fr' ? user.tel : `+33${user.tel.slice(1)}` }</span>
                        </div>
                        <div className="flex items-center justify-center lg:justify-start gap-2">
                            <Mail className="w-4 h-4 text-yellow-400" />
                            <span>{ user.email }</span>
                        </div>
                        </div>

                        <div className="flex justify-center lg:justify-start gap-4">
                        <a href="#" className="p-3 bg-yellow-400/10 border border-yellow-400/20 rounded-lg hover:bg-yellow-400/20 transition-colors">
                            <Github className="w-5 h-5 text-yellow-400" />
                        </a>
                        <a href="#" className="p-3 bg-yellow-400/10 border border-yellow-400/20 rounded-lg hover:bg-yellow-400/20 transition-colors">
                            <Linkedin className="w-5 h-5 text-yellow-400" />
                        </a>
                        </div>
                    </div>

                    {/* Titre principal */}
                    <div className="lg:col-span-2">
                        <div className="relative">
                        <h2 className="text-4xl lg:text-6xl font-bold mb-4">{ t(config.job) }</h2>
                        <div className="w-32 h-1 bg-gradient-to-r from-yellow-400 to-yellow-600 mb-6"></div>
                        
                        <p className="text-xl lg:text-2xl text-gray-300 mb-8 leading-relaxed">{ t(config.description) }</p>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700/50">
                            <h3 className="text-yellow-400 font-semibold mb-2">Expertise Frontend</h3>
                            <p className="text-gray-300">React, TypeScript, Tailwind CSS</p>
                            </div>
                            <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700/50">
                            <h3 className="text-yellow-400 font-semibold mb-2">Expertise Backend</h3>
                            <p className="text-gray-300">Node.js, PHP, Bases de données</p>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                
                {/* Geometric decoration */}
                {/* <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-gray-800 to-transparent"></div> */}
            </section>
        </>
    );
}
