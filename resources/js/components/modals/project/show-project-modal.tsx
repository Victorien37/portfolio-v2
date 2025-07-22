import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Experience, Project } from "@/types";
import { Folders } from "lucide-react";
import { useState } from "react";
import { DeleteModal } from "../delete-modal";


interface ShowProjectModalProps {
    experience: Experience;
}

export function ShowProjectModal({ experience }: ShowProjectModalProps) {

    const [open, setOpen] = useState<boolean>(false);
    
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button title="Voir les projets">
                    <Folders />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>Projets liés à {experience.company.name}</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4">
                        <Table className="w-full">
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="text-start">Titre</TableHead>
                                    <TableHead className="text-center">Description courte</TableHead>
                                    <TableHead className="text-center">En cours</TableHead>
                                    <TableHead className="text-end">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                { experience?.projects?.map(project => {
                                    return (
                                        <TableRow key={`project-${project.id}`}>
                                            <TableCell>{ project.title.fr }</TableCell>
                                            <TableCell>{ project.description_short.fr }</TableCell>
                                            <TableCell>{ project.in_progress ? 'En cours' : 'Fini' }</TableCell>
                                            <TableCell>
                                                <DeleteModal
                                                    message={`Voulez-vous vraiment supprimer le projet ${project.title.fr}`}
                                                    routeName="project.destroy"
                                                    id={project.id}
                                                    title="Supprimer un projet"
                                                />
                                            </TableCell>
                                        </TableRow>
                                    )
                                }) }
                            </TableBody>
                        </Table>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Fermer</Button>
                        </DialogClose>
                    </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}