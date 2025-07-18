import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { PackagePlus } from "lucide-react";
import { useForm } from "@inertiajs/react";
import { FormEvent } from "react";
import { toast } from "sonner";
import { ModalProps } from "@/types/props";
import { Input } from "@/components/ui/input";
import { IconPicker } from "@/components/personnal/icon-picker";

export function CreateSkillCategoryModal({ open, setOpen }: ModalProps) {

    const { data, setData, post, processing, reset, errors } = useForm<{svg: string, name: string}>({
        svg: "",
        name: "",
    })

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (data.svg !== "" && data.name !== "") {
            post(route('skill.category.store'), {
                onSuccess: () => {
                    reset();
                    setOpen(false);
                    toast.success("La catégorie de compétence à bien été ajouté");
                },
                onError: () => {
                    toast.error("Une erreur s'est produite lors de la création de la catégorie de compétence.");
                }
            });
        } else {
            toast.info("L'icone et le nom sont obligatoires");
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button title="Ajouter une catégorie de compétence">
                    <PackagePlus />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] max-h-[90vh] overflow-y-auto">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Ajouter une compétence</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4">
                        <div className="grid gap-3">
                            
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="language-name">Nom</Label>
                            <Input id="language-name" name="name" onChange={e => setData('name', e.target.value)} />
                            { errors?.name && <p className="text-red-500">{errors.name}</p> }
                        </div>
                        <div className="grid gap-3">
                            <IconPicker value={data.svg} onChange={svg => setData('svg', svg)} />
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