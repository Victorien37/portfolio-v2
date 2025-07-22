import { DatePicker } from "@/components/personnal/date-picker";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { contracts } from "@/lib/utils";
import { ContractType, Experience } from "@/types";
import { useForm } from "@inertiajs/react";
import { Pencil } from "lucide-react";
import { FormEvent, useState } from "react";
import { toast } from "sonner";

interface EditExperienceModal {
    experience: Experience;
}

export function EditExperienceModal({ experience }: EditExperienceModal) {
    const [open, setOpen] = useState<boolean>(false);

    const { data, setData, post, reset, processing, errors } = useForm<{start: Date, end: Date | null, job: string, description: string, contract: ContractType, _method: string}>({
        start:          new Date(experience.start),
        end:            experience?.end ? new Date(experience.end) : null,
        job:            experience.job.fr,
        description:    experience.description.fr,
        contract:       experience.contract,
        _method:        'PUT'
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        post(route('experience.update', experience.id), {
            onSuccess: () => {
                reset();
                setOpen(false);
                toast.success("Expérience modifié");
            },
            onError: () => {
                toast.error("Erreur lors de la modification de l'expérience");
            }
        });
    }


    return (
        <Dialog open={open} onOpenChange={setOpen} modal={false}>
            <DialogTrigger asChild>
                <Button>
                    <Pencil />
                </Button>
            </DialogTrigger>
            { open && (
                <div className="fixed inset-0 bg-black/50 z-40" />
            ) }
            <DialogContent className="overflow-y-auto max-h-screen">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Modifier une expérience</DialogTitle>
                    </DialogHeader>

                    <div className="grid gap-4">
                        <div className="grid grid-cols-2 gap-3 pt-4">
                            <DatePicker date={new Date(data.start)} setDate={date => setData('start', date)} title="Début" />
                            <DatePicker date={data?.end ? new Date(data.start) : null} setDate={date => setData('end', date)} title="Fin" />
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="experience-job">Métier</Label>
                            <Input id="experience-job" value={data.job} onChange={e => setData("job", e.target.value)} />
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="description">Description</Label>
                            <Textarea id="description" value={data.description} onChange={e => setData('description', e.target.value)} />
                        </div>
                        <div className="grid gap-3 pb-3">
                            <Select
                                value={data.contract}
                                onValueChange={value => setData('contract', value as ContractType)}
                            >
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Contrat" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        { contracts.map((contract, index) => {
                                            return (
                                                <SelectItem key={`contract-${index}`} value={contract}>{contract}</SelectItem>
                                            )
                                        }) }
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
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