import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus } from "lucide-react";
import { useForm } from "@inertiajs/react";
import { FormEvent } from "react";
import { toast } from "sonner";
import { ModalProps } from "@/types/props";
import { Input } from "@/components/ui/input";
import { levels } from "@/lib/utils";

export function CreateLanguageModal({ open, setOpen }: ModalProps) {

    const { data, setData, post, processing, reset, errors } = useForm<{name: string, level: string | null}>({
        name: "",
        level: null,
    })

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        post(route('language.store'), {
            onSuccess: () => {
                reset();
                setOpen(false);
                toast.success("Langue ajouté");
            },
            onError: () => {
                toast.error("Une erreur s'est produite lors de la création de la langue.");
            }
        });
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>
                    <Plus />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] max-h-[90vh] overflow-y-auto">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Ajouter une langue</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4">
                        <div className="grid gap-3">
                            <Label htmlFor="language-name">Nom</Label>
                            <Input id="language-name" name="name" onChange={e => setData('name', e.target.value)} />
                            { errors?.name && <p className="text-red-500">{errors.name}</p> }
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="language-level">Niveau</Label>
                            <Select
                                value={data.level ?? ""}
                                onValueChange={value => setData('level', value)}
                            >
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        { levels.map(level => {
                                            return <SelectItem key={`level-${level}`} value={level} >{level}</SelectItem>
                                        }) }
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                            { errors?.level && <p className="text-red-500">{ errors?.level }</p> }
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