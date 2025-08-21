import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Project } from "@/types";
import { useForm } from "@inertiajs/react";
import { Pencil } from "lucide-react";
import { FormEvent, useState } from "react";
import { toast } from "sonner";

interface EditSideProjectModalProps {
    project: Project;
}

export function EditSideProjectModal({ project } : EditSideProjectModalProps) {

    const [open, setOpen] = useState<boolean>(false);
    const { data, setData, post, processing, reset, errors } = useForm<{ title: string, description_short: string, description_long: string, url: string | null, in_progress: boolean, _method: string }>({
        title:              project.title.fr,
        description_short:  project.description_short.fr,
        description_long:   project.description_long.fr,
        url:                project.url,
        in_progress:        project.in_progress,
        _method:            "PUT",
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        post(route('project.update', project.id), {
            onSuccess: () => {
                reset();
                setOpen(false);
                toast.success("Side Project modifié !");
            },
            onError: () => {
                toast.error("Une erreur s'est produite lors de la modification du side project !");
            }
        });
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>
                    <Pencil />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] max-h-[90vh] overflow-y-auto">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Modifier un side project</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4">
                        <div className="grid gap-3">
                            <Label htmlFor="side-project-title">Nom</Label>
                            <Input id="side-project-title" name="title" value={data.title} onChange={e => setData('title', e.target.value)} />
                            { errors?.title && <p className="text-red-500">{errors.title}</p> }
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="side-project-description_short">Description courte</Label>
                            <Input id="side-project-description_short" name="description_short" value={data.description_short} onChange={e => setData('description_short', e.target.value)} />
                            { errors?.description_short && <p className="text-red-500">{errors.description_short}</p> }
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="side-project-description_long">Description longue</Label>
                            <Textarea
                                id="side-project-description_long"
                                placeholder="Description"
                                onChange={e => setData('description_long', e.target.value)}
                            >
                                { data.description_long }
                            </Textarea>
                            { errors?.description_long && <p className="text-red-500">{ errors.description_long }</p> }
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="side-project-url">Url</Label>
                            <Input type="url" id="side-project-url" name="url" value={data?.url ?? ""} onChange={e => setData('url', e.target.value)} />
                        </div>
                        <div className="grid gap-3">
                            <div className="flex items-center space-x-2">
                                <Switch
                                    id="side-project-in_progress"
                                    checked={data.in_progress}
                                    onCheckedChange={bool => setData('in_progress', bool)}
                                />
                                <Label htmlFor="side-project-in_progress">En cours</Label>
                            </div>
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Fermer</Button>
                        </DialogClose>
                        <Button type="submit">modifier</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}