import { Navbar } from "@/components/front/navbar";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/hooks/use-translation";
import { Config, Experience as ExperienceType, SharedData } from "@/types";
import { Head, Link, usePage } from "@inertiajs/react";
import { ArrowLeft, MapPin } from "lucide-react";


export default function Experience() {
    const { config } = usePage<SharedData & { config: Config }>().props;
    const { experience } = usePage<SharedData & { experience: ExperienceType }>().props;
    const { t } = useTranslation();

    const getEndDate = (experience: ExperienceType) => {
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
            <Head title=""></Head>
            <Navbar config={config} />

            <section className={`bg-background text-secondary ${experience?.projects?.length === 0 ? 'min-h-screen' : ''}`}>
                <div className="py-8 px-6 lg:px-12">
                    <div className="container mx-auto pb-4">
                        <Link
                            href={route('home')}
                        >
                            <Button
                                variant="link"
                                className="flex items-center gap-2 text-primary"
                            >
                                <ArrowLeft className="w-5 h-5" />
                                Retour au portfolio
                            </Button>
                        </Link>
                    </div>
                    <div className="flex flex-wrap items-center gap-4 mb-4">
                        <span className="bg-primary text-background px-4 py-2 rounded-full text-sm font-medium">
                            { new Date(experience.start).getFullYear() }{ getEndDate(experience) }
                        </span>
                        <div className="flex items-center gap-2 text-secondary">
                            <MapPin className="w-4 h-4" />
                            <span className="text-sm">{experience.company.city}</span>
                        </div>
                    </div>
                    <h1 className="text-4xl font-bold mb-2">{experience.company.name}</h1>
                    <h2 className="text-xl text-primary font-medium mb-4">{t(experience.job)}</h2>
                    <p className="text-secondary text-lg max-w-3xl">{t(experience.description)}</p>
                </div>
            </section>

            { experience?.projects?.length > 0 && (

                <section className="bg-background text-secondary">
                    <div className="py-12">
                        <div className="container mx-auto px-6 lg:px-12">
                            <h3 className="text-2xl font-bold mb-8">Projets réalisés</h3>
                            <div className="space-y-8">
                                { experience?.projects?.map((project, index) => (
                                    <div key={index} className={`p-8 rounded-lg border border-secondary ${ project?.url ? 'hover:border-primary' : '' }`}>
                                        <a href={project?.url ?? '#'} target="_blank">
                                            <h4 className="text-xl font-bold text-primary mb-4">{ t(project.title) }</h4>
                                            <p className="text-secondary mb-6">{t(project.description_short)}</p>

                                            <div className="grid md:grid-cols-2 gap-6">
                                                <div>
                                                    <h5 className="font-semibold mb-3">Technologies utilisées</h5>
                                                    <div className="flex flex-wrap gap-2">
                                                        {/* { project.technologies.map((tech, i) => (
                                                        )) } */}
                                                    </div>

                                                    <div>
                                                        <h5 className="font-semibold mb-3">Réalisations clés</h5>
                                                        <ul className="space-y-2">
                                                            {/* { project. } */}
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                )) }
                            </div>
                        </div>
                    </div>
                </section>
            ) }
        </>
    )
}