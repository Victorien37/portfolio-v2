import { DatePicker } from "@/components/personnal/date-picker";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { mentions } from "@/lib/utils";
import { MentionType, Study } from "@/types";
import { useForm } from "@inertiajs/react";
import { Pencil } from "lucide-react";
import { FormEvent, useState } from "react";
import { toast } from "sonner";


interface EditStudyModalProps {
    study:      Study;
}

export function EditStudyModal({ study }: EditStudyModalProps) {
    const { data, setData, post, processing, reset, errors } = useForm<{start: Date, end: Date | null, name: string, school: string, full_name: string, obtained: boolean, mention: MentionType, _method: string}>({
        start:      new Date(study.start),
        end:        study?.end ? new Date(study.end) : null,
        name:       study.name.fr,
        school:     study.school.fr,
        full_name:  study.full_name.fr,
        obtained:   study.obtained,
        mention:    study.mention,
        _method:    'PUT'
    });
    const [open, setOpen] = useState<boolean>(false);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        post(route('study.update', study.id), {
            onSuccess: () => {
                reset();
                setOpen(false);
                toast.success(`La formation ${data.name} à été modifié`);
            },
            onError: () => {
                toast.error(`Une erreur s'est produite lors de la modification de la formation ${study.name}`);
            }
        });
    }

    return (
        <Dialog open={open} onOpenChange={setOpen} modal={false}>
            <DialogTrigger asChild>
                <Button title="modifier une formation">
                    <Pencil />
                </Button>
            </DialogTrigger>
            { open && (
                <div className="fixed inset-0 bg-black/50 z-40" />
            ) }
            <DialogContent className="sm:max-w-[425px] max-h[90%] overflow-y-auto">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Modifier une formation</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4">
                        <div className="grid grid-cols-2 gap-3 pt-4">
                            <DatePicker date={data.start} setDate={date => setData('start', date)} title="Début" />
                            <DatePicker date={data.end} setDate={date => setData('end', date)} title="Fin" />
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="study-name">Nom</Label>
                            <Input id="study-name" name="name" onChange={e => setData('name', e.target.value)} value={data.name} />
                            { errors?.name && <p className="text-red-500">{errors.name}</p> }
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="study-full_name">Nom complet</Label>
                            <Input id="study-full_name" name="full_name" onChange={e => setData('full_name', e.target.value)} value={data.full_name} />
                            { errors?.full_name && <p className="text-red-500">{errors.full_name}</p> }
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="study-school">Ecole</Label>
                            <Input id="study-school" name="school" onChange={e => setData('school', e.target.value)} value={data.school} />
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
                                            <SelectItem value="null" onClick={() => setData('mention', null)}>Mention</SelectItem>
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
                        <Button type="submit">Modifier</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}