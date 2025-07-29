import { Navbar } from '@/components/front/navbar';
import { ContactSection } from '@/components/sections/welcome/contact-section';
import { ExperienceSection } from '@/components/sections/welcome/experience-section';
import { ProfileSection } from '@/components/sections/welcome/profile-section';
import { SideProjectSection } from '@/components/sections/welcome/side-project-section';
import { SkillSection } from '@/components/sections/welcome/skill-section';
import { StudySection } from '@/components/sections/welcome/study-section';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTranslation } from '@/hooks/use-translation';
import { Config, Experience, Interest, Language, Project, SkillCategory, Study, User, type SharedData } from '@/types';
import { Head, usePage } from '@inertiajs/react';

export default function Welcome() {
    // const { auth } = usePage<SharedData>().props;
    const { config }        = usePage<SharedData & { config: Config }>().props;
    const { user }          = usePage<SharedData & { user: User }>().props;
    const { experiences }   = usePage<SharedData & { experiences: Experience[] }>().props;
    const { skillCategories } = usePage<SharedData & { skillCategories: SkillCategory[] }>().props;
    const { interests }     = usePage<SharedData & { interests: Interest[] }>().props;
    const { languages }     = usePage<SharedData & { languages: Language[] }>().props;
    const { sides }         = usePage<SharedData & { sides: Project[] }>().props;
    const { studies }       = usePage<SharedData & { studies: Study[] }>().props;
    const { language }      = useLanguage();
    const { t }             = useTranslation();

    return (
        <>
            <Head title={`${user.firstname} ${user.lastname}`}>
                {/* <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" /> */}
            </Head>
            <Navbar config={config} />
            <ProfileSection user={user} config={config} />
            <ExperienceSection experiences={experiences} />
            <SkillSection skillCategories={skillCategories} interests={interests} languages={languages} />
            <StudySection studies={studies} />
            <SideProjectSection projects={sides} />
            <ContactSection user={user} />
        </>
    );
}
