import { DeleteModal } from "@/components/modals/delete-modal";
import { CreateStudyModal } from "@/components/modals/study/create-study-modal";
import { EditStudyModal } from "@/components/modals/study/edit-study-modal";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import AppLayout from "@/layouts/app-layout";
import { frenchDate } from "@/lib/utils";
import { BreadcrumbItem, SharedData, Study } from "@/types";
import { Head, usePage } from "@inertiajs/react";
import { useState } from "react";


const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Formations',
        href: '/studies',
    }
];

export default function Studies() {
    const { studies }                                       = usePage<SharedData & { studies: Study[] }>().props;
    const [createStudyModalOpen, setCreateStudyModalOpen]   = useState<boolean>(false);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Formations" />
            <div className="flex flex-col gap-6 p-4">
                <div className="flex justify-end">
                    <CreateStudyModal open={createStudyModalOpen} setOpen={setCreateStudyModalOpen} />
                </div>
                <div className="w-full overflow-x-auto">
                    <Table className="w-full">
                        <TableHeader>
                            <TableRow>
                                <TableHead className="text-start">Titre</TableHead>
                                <TableHead className="text-center">Ecole</TableHead>
                                <TableHead className="text-center">Période</TableHead>
                                <TableHead className="text-end">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            { studies.map(study => {
                                return (
                                    <TableRow key={`study-${study.id}`}>
                                        <TableCell className="text-start">{study.name.fr}</TableCell>
                                        <TableCell className="text-center">{study.school.fr}</TableCell>
                                        <TableCell className="text-center">Du {frenchDate(new Date(study.start))} { study?.end ? `au ${frenchDate(new Date(study.end))}` : "à aujourd'hui" }</TableCell>
                                        <TableCell className="text-end">
                                            <EditStudyModal study={study} />
                                            <DeleteModal
                                                id={study.id}
                                                routeName="study.destroy"
                                                message={`Voulez-vous vraiment supprimer ${study.name.fr} ?`}
                                                title="Supprimer une formation"
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