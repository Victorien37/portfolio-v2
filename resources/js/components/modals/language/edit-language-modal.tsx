import { levels } from "@/lib/utils";
import { Language } from "@/types";
import { useForm } from "@inertiajs/react";
import { FormEvent, useState } from "react";
import { toast } from "sonner";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface EditLanguageModalProps {
    language: Language;
}

export function EditLanguageModal({ language }: EditLanguageModalProps) {
    
    const { data, setData, post, processing, reset, errors } = useForm<{name: string, level: string, _method: string}>({
        name: language.name.fr,
        level: language.level,
        _method: 'PUT',
    });

    const [open, setOpen] = useState<boolean>(false);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        post(route('language.update', language.id), {
            onSuccess: () => {
                reset();
                setOpen(false);
                toast.success("Langue modifié");
            },
            onError: () => {
                toast.error("Une erreur s'est produite lors de la modification de la langue");
            }
        });
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline">
                    <Pencil />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] max-h-[90vh] overflow-y-auto">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Modifier une langue</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4">
                        <div className="grid gap-3">
                            <Label htmlFor="edit-language-name">Nom</Label>
                            <Input id="edit-language-name" name="name" onChange={e => setData('name', e.target.value)} value={data.name} />
                            { errors?.name && <p className="text-red-500">{ errors?.name }</p> }
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="edit-language-level">Niveau</Label>
                            <Select
                                value={data.level}
                                onValueChange={value => setData('level', value)}
                            >
                                <SelectTrigger>
                                    <SelectValue  />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        { levels.map(level => {
                                            return <SelectItem key={`edit-level-${level}`} value={level}>{level}</SelectItem>
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
                        <Button type="submit">Modifier</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )

}