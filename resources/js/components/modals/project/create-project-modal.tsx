import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Experience } from "@/types";
import { ModalProps } from "@/types/props";
import { useForm } from "@inertiajs/react";
import { FolderPlus } from "lucide-react";
import { FormEvent, useState } from "react";
import { toast } from "sonner";

interface CreateProjectModalProps {
    experience?: Experience;
}

export function CreateProjectModal({ experience }: CreateProjectModalProps) {

    const [open, setOpen] = useState<boolean>(false);
    const { data, setData, post, processing, reset, errors } = useForm<{ title: string, description_short: string, description_long: string, url: string | null, experience_id: number | null, side: boolean, in_progress: boolean }>({
        title:              "",
        description_short:  "",
        description_long:   "",
        url:                null,
        experience_id:      experience?.id ?? null,
        side:               experience ? false : true,
        in_progress:        false,
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        post(route('project.store'), {
            onSuccess: () => {
                reset();
                setOpen(false);
                toast.success("Projet ajouté");
            },
            onError: () => {
                toast.error("Une erreur s'est produite lors de l'ajout du projet");
            }
        });
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>
                    <FolderPlus />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] max-h-[90vh] overflow-y-auto">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Ajouter un projet</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4">
                        <div className="grid gap-3">
                            <Label htmlFor="project-title">Nom</Label>
                            <Input id="project-title" name="title" onChange={e => setData('title', e.target.value)} />
                            { errors?.title && <p className="text-red-500">{errors.title}</p> }
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="project-description_short">Description courte</Label>
                            <Input id="project-description_short" name="description_short" onChange={e => setData('description_short', e.target.value)} />
                            { errors?.description_short && <p className="text-red-500">{ errors.description_short }</p> }
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="project-description_long">Description longue</Label>
                            <Textarea
                                id="project-description_long"
                                placeholder="Description"
                                onChange={e => setData('description_long', e.target.value)}
                            >
                                { data.description_long }
                            </Textarea>
                            { errors?.description_long && <p className="text-red-500">{ errors.description_long }</p> }
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="project-url">Url</Label>
                            <Input type="url" id="project-url" name="url" onChange={e => setData('url', e.target.value)} />
                        </div>
                        <div className="grid gap-3">
                            <div className="flex items-center space-x-2">
                                <Switch
                                    id="project-in_progress"
                                    checked={data.in_progress}
                                    onCheckedChange={bool => setData('in_progress', bool)}
                                />
                                <Label htmlFor="project-in_progress">En cours</Label>
                            </div>
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                        <Button variant="outline">Fermer</Button>
                        </DialogClose>
                        <Button type="submit">Ajouter</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )

}