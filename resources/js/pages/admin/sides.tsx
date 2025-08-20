import { Navbar } from "@/components/front/navbar";
import { DeleteModal } from "@/components/modals/delete-modal";
import { CreateProjectModal } from "@/components/modals/project/create-project-modal";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem, Config, Project, SharedData } from "@/types";
import { Head, usePage } from "@inertiajs/react";
import { Check, X } from "lucide-react";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Side Projects',
        href: '/side-projects',
    }
];

export default function Sides() {

    const { projects } = usePage<SharedData & { projects: Project[] }>().props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Side Projects" />
            <div className="flex flex-col gap-6 p-4">
                <div className="flex justify-end">
                    <CreateProjectModal />
                </div>
                <div className="w-full overflow-x-auto">
                    <Table className="w-full">
                        <TableHeader>
                            <TableRow>
                                <TableHead className="text-start">Nom</TableHead>
                                <TableHead className="text-center">Description courte</TableHead>
                                <TableHead className="text-center">Conteint une description longue</TableHead>
                                <TableHead className="text-center">Conteint une URL</TableHead>
                                <TableHead className="text-center">En cours</TableHead>
                                <TableHead className="text-end">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            { projects.map(project => {
                                return (
                                    <TableRow key={`study-${project.id}`}>
                                        <TableCell className="text-start">{project.title.fr}</TableCell>
                                        <TableCell className="text-center">{project.description_short.fr}</TableCell>
                                        <TableCell className="text-center">
                                            { project.description_long ? (
                                                <Check />
                                            ) : (
                                                <X />
                                            ) }
                                        </TableCell>
                                        <TableCell className="text-center">
                                            { project.url ? (
                                                <Check />
                                            ) : (
                                                <X />
                                            ) }
                                        </TableCell>
                                        <TableCell className="text-center">
                                            { project.in_progress ? (
                                                <Check />
                                            ) : (
                                                <X />
                                            ) }
                                        </TableCell>
                                        <TableCell className="text-end">
                                            {/* <EditStudyModal study={study} /> */}
                                            <DeleteModal
                                                id={project.id}
                                                routeName="project.side.destroy"
                                                message={`Voulez-vous vraiment supprimer ${project.title.fr} ?`}
                                                title="Supprimer un side project"
                                            />
                                        </TableCell>
                                    </TableRow>
                                )
                            }) }
                        </TableBody>
                    </Table>
                </div>
            </div>
        </AppLayout>
    )
}