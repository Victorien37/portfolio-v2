import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { SkillType } from "@/types";
import { useForm } from "@inertiajs/react";
import { Type } from "lucide-react";
import { FormEvent } from "react";
import { toast } from "sonner";
import { DeleteModal } from "../delete-modal";

interface SkillTypeModalProps {
    skillTypes: SkillType[];
    open: boolean;
    setOpen: (value: boolean) => void;
}

export function SkillTypeModal({ skillTypes, open, setOpen }: SkillTypeModalProps) {

    const { data, setData, post, processing, reset, errors } = useForm<{name: string | null}>({name: null});

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        post(route('skill.type.store'), {
            onSuccess: () => {
                reset();
                setOpen(false);
                toast.success("Compétence ajouté");
            },
            onError: () => {
                toast.error("Erreur lors de l'ajout de la compétence");
            }
        });
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>
                    <Type />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] max-h-[90vh] overflow-y-auto">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Ajouter un type de compétence</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4">
                        <div className="grid gap-3">
                            <Label htmlFor="skill-type-name">Nom</Label>
                            <Input id="skill-type-name" name="name" onChange={e => setData('name', e.target.value)} />
                            { errors?.name && <p className="text-red-500">{ errors.name }</p> }
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                        <Button variant="outline">Fermer</Button>
                        </DialogClose>
                        <Button type="submit">Ajouter</Button>
                    </DialogFooter>
                </form>

                { skillTypes.length > 0 && (
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="text-start">Type</TableHead>
                                <TableHead className="text-end">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            { skillTypes.map(skillType => {
                                return (
                                    <TableRow key={`skill-type-${skillType.id}`}>
                                        <TableCell className="text-start">{ skillType.name.fr }</TableCell>
                                        <TableCell className="text-end">
                                            <DeleteModal id={skillType.id} routeName="skill.type.destroy" message={`Voulez-vous vraiment supprimer ${skillType.name.fr}`} />
                                        </TableCell>
                                    </TableRow>
                                )
                            }) }
                        </TableBody>
                    </Table>
                ) }
            </DialogContent>
        </Dialog>
    )

}