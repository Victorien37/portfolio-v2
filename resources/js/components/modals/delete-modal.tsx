import { useForm } from "@inertiajs/react";
import { setSourceMapsEnabled } from "process";
import { FormEvent, useState } from "react";
import { toast } from "sonner";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Button } from "../ui/button";
import { Trash2 } from "lucide-react";


interface DeleteModalProps {
    message: string;
    routeName: string;
    id: number;
}

export function DeleteModal({ message, routeName, id }: DeleteModalProps) {

    const { data, setData, post, processing, reset, errors } = useForm<{_method: string}>({_method: 'DELETE'});
    const [open, setOpen] = useState<boolean>(false);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        post(route(routeName, id), {
            onSuccess: () => {
                reset();
                setOpen(false);
                toast.success("L'objet à bien été supprimé");
            },
            onError: () => {
                toast.error("Une erreur s'est produite lors de la suppression de l'objet");
            }
        });
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="destructive">
                    <Trash2 />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] max-h-[90vh] overflow-y-auto">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Supprimer un objet</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4">
                        <div className="grid gap-3">
                            <p>{ message }</p>
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                        <Button variant="outline">Fermer</Button>
                        </DialogClose>
                        <Button type="submit" variant="destructive">Supprimer</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}