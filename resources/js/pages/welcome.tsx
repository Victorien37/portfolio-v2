import { Navbar } from '@/components/front/navbar';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTranslation } from '@/hooks/use-translation';
import { Config, Experience, Project, Study, User, type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { differenceInYears } from 'date-fns';
import { ArrowRight, Calendar, Github, Linkedin, Mail, Phone, Plus } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export default function Welcome() {
    // const { auth } = usePage<SharedData>().props;
    const { config }        = usePage<SharedData & { config: Config }>().props;
    const { user }          = usePage<SharedData & { user: User }>().props;
    const { experiences }   = usePage<SharedData & { experiences: Experience[] }>().props;
    const { sides }         = usePage<SharedData & { sides: Project[] }>().props;
    const { studies }       = usePage<SharedData & { studies: Study[] }>().props;
    const { language }      = useLanguage();
    const { t }             = useTranslation();

    // experiences card transitions
    const [showAll, setShowAll]             = useState<boolean>(false);
    const [visibleItems, setVisibleItems]   = useState<number[]>([]);
    const itemRefs                          = useRef<(HTMLDivElement | null)[]>([]);

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
        <>
            <Head title={`${user.firstname} ${user.lastname}`}>
                {/* <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" /> */}
            </Head>
            <Navbar config={config} />


            {/* PROFIL PRESENTATION */}
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
                            <span className='text-secondary'>Permis B et véhicule</span>
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
                        <a href="https://github.com/Victorien37" target='_blank' className="p-3 bg-primary/10 border border-primary/20 rounded-lg hover:bg-primary/20 transition-colors">
                            <Github className="w-5 h-5 text-primary" />
                        </a>
                        <a href="https://www.linkedin.com/in/victorien-rodrigues-86a46a1a1/?original_referer=https%3A%2F%2Fwww%2Egoogle%2Ecom%2F&originalSubdomain=fr" target='_blank' className="p-3 bg-primary/10 border border-primary/20 rounded-lg hover:bg-yellow-400/20 transition-colors">
                            <Linkedin className="w-5 h-5 text-primary" />
                        </a>
                        </div>
                    </div>

                    {/* Titre principal */}
                    <div className="lg:col-span-2">
                        <div className="relative">
                            <h2 className="text-4xl lg:text-6xl font-bold text-secondary mb-4">{ t(config.job) }</h2>
                            <div className="w-100 h-1 bg-gradient-to-r from-primary to-primary-dark mb-6"></div>
                            
                            <p className="text-xl lg:text-2xl text-secondary mb-8 leading-relaxed">{ t(config.description) }</p>

                            {/* <div className="grid md:grid-cols-2 gap-6">
                                <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700/50">
                                    <h3 className="text-yellow-400 font-semibold mb-2">Expertise Frontend</h3>
                                    <p className="text-gray-300">React, TypeScript, Tailwind CSS</p>
                                </div>
                                <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700/50">
                                    <h3 className="text-yellow-400 font-semibold mb-2">Expertise Backend</h3>
                                    <p className="text-gray-300">Node.js, PHP, Bases de données</p>
                                </div>
                            </div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            {/* PROFESSIONNAL EXPERIENCES */}
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
                                            className="bg-background/50 p-6 rounded-lg border border-primary/30 hover:border-primary/50 hover:bg-background/70 transition-all duration-300 cursor-pointer group"
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
                                        Voir plus d'expériences
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* COMPETENCES */}
            
        </>
    );
}
