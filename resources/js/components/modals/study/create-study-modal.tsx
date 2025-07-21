import { DatePicker } from "@/components/personnal/date-picker";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { mentions } from "@/lib/utils";
import { MentionType } from "@/types";
import { ModalProps } from "@/types/props";
import { useForm } from "@inertiajs/react";
import { Plus } from "lucide-react";
import { FormEvent } from "react";
import { toast } from "sonner";


export function CreateStudyModal({ open, setOpen }: ModalProps) {
    const { data, setData, post, processing, reset, errors } = useForm<{start: Date, end: Date | null, name: string, school: string, full_name: string, obtained: boolean, mention: MentionType}>({
        start:      new Date(),
        end:        null,
        name:       '',
        school:     '',
        full_name:  '',
        obtained:   false,
        mention:    null
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();  
        post(route('study.store'), {
            onSuccess: () => {
                reset();
                setOpen(false);
                toast.success("La formation a été ajouté");
            },
            onError: () => {
                toast.error("Une erreur s'est produite lors de la création de la formation.");
            }
        });
    }

    return (
        <Dialog open={open} onOpenChange={setOpen} modal={false}>
            <DialogTrigger asChild>
                <Button title="Ajouter une formation">
                    <Plus />
                </Button>
            </DialogTrigger>
            {open && (
                <div className="fixed inset-0 bg-black/50 z-40" />
            )}
            <DialogContent className="sm:max-w-[425px] max-h-[90vh] overflow-y-auto">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Ajouter une formation</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4">
                        <div className="grid grid-cols-2 gap-3 pt-4">
                            <DatePicker date={data.start} setDate={date => setData('start', date)} title="Début" />
                            <DatePicker date={data.end} setDate={date => setData('end', date)} title="Fin" />
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="study-name">Nom</Label>
                            <Input id="study-name" name="name" onChange={e => setData('name', e.target.value)} />
                            { errors?.name && <p className="text-red-500">{errors.name}</p> }
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="study-full_name">Nom complet</Label>
                            <Input id="study-full_name" name="full_name" onChange={e => setData('full_name', e.target.value)} />
                            { errors?.full_name && <p className="text-red-500">{errors.full_name}</p> }
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="study-school">Ecole</Label>
                            <Input id="study-school" name="school" onChange={e => setData('school', e.target.value)} />
                            { errors?.name && <p className="text-red-500">{errors.name}</p> }
                        </div>
                        <div className="grid grid-cols-2 gap-3 pb-4">
                            <div className="flex items-center space-x-2">
                                <Switch
                                    id="study-obtained"
                                    checked={data.obtained}
                                    onCheckedChange={bool => setData('obtained', bool)}
                                />
                                <Label htmlFor="study-obtained">Obtenu</Label>
                            </div>
                            <div>
                                <Select
                                    value={data.mention ?? ""}
                                    onValueChange={value => setData('mention', value as MentionType)}
                                >
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Mention" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            { Array.from(mentions.entries()).map(([value, key], index) => {
                                                return (
                                                    <SelectItem key={`mention-${index}`} value={value}>{key}</SelectItem>
                                                )
                                            }) }
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
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