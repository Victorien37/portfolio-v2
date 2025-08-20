import { DeleteModal } from "@/components/modals/delete-modal";
import { CreateExperienceModal } from "@/components/modals/experience/create-experience-modal";
import { EditExperienceModal } from "@/components/modals/experience/edit-experience-modal";
import { CreateProjectModal } from "@/components/modals/project/create-project-modal";
import { ShowProjectModal } from "@/components/modals/project/show-project-modal";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import AppLayout from "@/layouts/app-layout"
import { frenchDate } from "@/lib/utils";
import { BreadcrumbItem, Company, Experience, SharedData } from "@/types"
import { Head, usePage } from "@inertiajs/react";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Expériences',
        href: '/experiences',
    }
];

export default function Experiences() {

    const { experiences }   = usePage<SharedData & { experiences: Experience[] }>().props;
    const { companies }     = usePage<SharedData & { companies: Company[] }>().props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Formations" />
            <div className="flex flex-col gap-6 p-4">
                <div className="flex justify-end">
                    <CreateExperienceModal companies={companies} />
                </div>
                <div className="w-full overflow-x-auto">
                    <Table className="w-full">
                        <TableHeader>
                            <TableRow>
                                <TableHead className="text-start">Entreprise</TableHead>
                                <TableHead className="text-center">Métier</TableHead>
                                <TableHead className="text-center">Période</TableHead>
                                <TableHead className="text-center">Contrat</TableHead>
                                <TableHead className="text-end">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            { experiences.map(experience => {
                                return (
                                    <>
                                        <TableRow key={`experience-${experience.id}`}>
                                            <TableCell className="text-start">
                                                { experience?.company?.image && <img src={experience.company.image} width={25} className="inline mr-2" /> }
                                                {experience?.company.name}
                                            </TableCell>
                                            <TableCell className="text-center">{experience.job.fr}</TableCell>
                                            <TableCell className="text-center">Du {frenchDate(new Date(experience.start))} {experience?.end ? `au ${frenchDate(new Date(experience.end))}` : `à aujourd'hui`}</TableCell>
                                            <TableCell className="text-center">{experience.contract}</TableCell>
                                            <TableCell className="text-end">
                                                <CreateProjectModal experience={experience} />
                                                { experience?.projects && experience.projects.length > 0 && <ShowProjectModal experience={experience} />  }
                                                <EditExperienceModal experience={experience} />
                                                <DeleteModal
                                                    id={experience.id}
                                                    routeName="experience.destroy"
                                                    message={`Voulez-vous vraiment supprimer ${experience.job.fr} ?`}
                                                />
                                            </TableCell>
                                        </TableRow>
                                    </>
                                )
                            }) }
                        </TableBody>
                    </Table>
                </div>
            </div>
        </AppLayout>
    )
}