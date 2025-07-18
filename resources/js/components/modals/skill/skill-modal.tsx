import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Lightbulb, PackagePlus } from "lucide-react";
import { useForm } from "@inertiajs/react";
import { FormEvent } from "react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { IconPicker } from "@/components/personnal/icon-picker";
import { Skill, SkillCategory } from "@/types";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DeleteModal } from "../delete-modal";

interface CreateSkillModalProps {
    skills:     Skill[];
    open:       boolean;
    setOpen:    (value: boolean) => void;
}

export function SkillModal({ skills, open, setOpen }: CreateSkillModalProps) {

    const { data, setData, post, processing, reset, errors } = useForm<{name: string}>({
        name: "",
    })

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        post(route('skill.store'), {
            onSuccess: () => {
                reset();
                setOpen(false);
                toast.success("Compétence ajouté");
            },
            onError: () => {
                toast.error("Une erreur s'est produite lors de la création de la compétence.");
            }
        });
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button title="Compétences">
                    <Lightbulb />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] max-h-[90vh] overflow-y-auto">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Ajouter une compétence</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4">
                        <div className="grid gap-3">
                            <Label htmlFor="language-name">Nom</Label>
                            <Input id="language-name" name="name" onChange={e => setData('name', e.target.value)} />
                            { errors?.name && <p className="text-red-500">{errors.name}</p> }
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                        <Button variant="outline">Fermer</Button>
                        </DialogClose>
                        <Button type="submit">Ajouter</Button>
                    </DialogFooter>
                </form>
                { skills.length > 0 && (
                    <div className="grid gap-3">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="text-start">Compétence</TableHead>
                                    <TableHead className="text-end">Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                { skills.map(skill => {
                                    return (
                                        <TableRow key={`skill-${skill.id}`}>
                                            <TableCell className="text-start">{ skill.name.fr }</TableCell>
                                            <TableCell className="text-end">
                                                <DeleteModal id={skill.id} routeName="skill.destroy" message={`Voulez-vous vraiment supprimer ${skill.name.fr} ?`} />
                                            </TableCell>
                                        </TableRow>
                                    )
                                }) }
                            </TableBody>
                        </Table>
                    </div>
                ) }
            </DialogContent>
        </Dialog>
    )
}