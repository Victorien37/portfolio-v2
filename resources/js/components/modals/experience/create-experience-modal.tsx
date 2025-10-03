import { DatePicker } from "@/components/personnal/date-picker";
import { ImagePicker } from "@/components/personnal/image-picker";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { contracts } from "@/lib/utils";
import { Company, ContractType } from "@/types";
import { useForm } from "@inertiajs/react"
import React, { useEffect, useState } from "react"
import { toast } from "sonner";


const StepIndicator = ({ currentStep }: { currentStep: number }) => (
  <div className="flex justify-center gap-2 mb-4">
    {[0, 1].map(i => (
      <div key={i} className={`w-3 h-3 rounded-full ${i <= currentStep ? 'bg-primary' : 'bg-gray-300'}`} />
    ))}
  </div>
)

type ExperienceForm = {
    company: {
        name:       string;
        address:    string;
        city:       string;
        road:       string;
        zipcode:    number;
        image:      File | null;
    } | null;
    experience: {
        start:          Date;
        end:            Date | null;
        job:            string;
        description:    string;
        contract:       ContractType;
    };
}

type CreateExperienceModalProps = {
    companies: Company[];
}

export const CreateExperienceModal: React.FC<CreateExperienceModalProps> = ({ companies }) => {
    const [open, setOpen] = useState<boolean>(false);
    const [step, setStep] = useState<0 | 1>(0);
    const [hasCompany, setHasCompany] = useState<boolean>(false);

    const { data, setData, post, errors, reset, processing } = useForm<{
        company: {
            id:         number | null;
            name:       string;
            address:    string;
            city:       string;
            zipcode:    number;
            image:      Blob | null;
        };
        experience: {
            start:          Date;
            end:            Date | null;
            job:            string;
            description:    string;
            contract:       ContractType;
        };
    }>({
        company: {
            id:         null,
            name:       "",
            address:    "",
            city:       "",
            zipcode:    0,
            image:      null,
        },
        experience: {
            start:          new Date(),
            end:            null,
            job:            "",
            description:    "",
            contract:       'CDI',
        }
    });

    function updateData<
        Section extends keyof ExperienceForm,
        Field extends keyof ExperienceForm[Section],
    >(
        section: Section,
        field: Field,
        value: ExperienceForm[Section][Field]
    ) {
        setData(prev => ({
            ...prev,
            [section]: {
                ...prev[section],
                [field]: value,
            },
        }));
    }

    const nextStep = () => setStep(s => (s === 0 ? 1 : 1));
    const prevStep = () => setStep(s => (s === 1 ? 0 : 0));

    const nextStepDisabled = () =>  {
        if (step === 0) {
            if (!hasCompany && data.company.id !== null) {
                return false;
            } else if (hasCompany && data.company.id === null) {
                return data.company?.address === "" || data.company?.city === "" || data.company?.name === "" || data.company?.zipcode === 0;
            } else {
                return true;
            }
        } else if (step === 1) {
            return data.experience.job === "" || data.experience.description === "";
        } else {
            return false;
        }
    }

    const handleSwitchHasCompany = (bool: boolean) => {
        updateData('company', 'id', null);
        setHasCompany(bool);
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        post(route("experience.store"), {
            onSuccess: () => {
                reset();
                setStep(0);
                setOpen(false);
                toast.success("Expérience ajouté");
            },
            onError: () => {
                toast.error("Une erreur s'est produite");
            }
        });
    }

    return (
        <Dialog open={open} onOpenChange={setOpen} modal={false}>
            <DialogTrigger asChild>
                <Button>Créer</Button>
            </DialogTrigger>
            { open && (
                <div className="fixed inset-0 bg-black/50 z-40" />
            ) }
            <DialogContent className="overflow-y-auto max-h-screen">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Créer une expérience</DialogTitle>
                    </DialogHeader>

                    <StepIndicator currentStep={step} />

                    <div className="grid gap-4">
                        {step === 0 && (
                            <>
                                <p><strong>Entreprise</strong></p>
                                <div className="flex items-center space-x-2">
                                    <Switch
                                        id="has-company"
                                        checked={hasCompany}
                                        onCheckedChange={bool => handleSwitchHasCompany(bool)}
                                    />
                                    <Label htmlFor="has-company">Ajouter une entreprise ?</Label>
                                </div>
                                { hasCompany ? (
                                    <>
                                        <div className="grid gap-3 pt-4">
                                            <Label htmlFor="company-name">Nom</Label>
                                            <Input id="company-name" value={data.company?.name ?? ""} onChange={e => updateData("company", "name", e.target.value)} />
                                        </div>
                                        <div className="grid gap-3">
                                            <Label htmlFor="company-address">Adresse</Label>
                                            <Input id="company-address" value={data.company?.address ?? ""} onChange={e => updateData("company", "address", e.target.value)} />
                                        </div>
                                        <div className="grid gap-3">
                                            <Label htmlFor="company-city">Ville</Label>
                                            <Input id="company-city" value={data.company?.city ?? ""} onChange={e => updateData("company", "city", e.target.value)} />
                                        </div>
                                        <div className="grid gap-3">
                                            <Label htmlFor="company-zipcode">Code postal</Label>
                                            <Input id="company-zipcode" type="number" value={data.company?.zipcode ?? 0} onChange={e => updateData("company", "zipcode", e.target.value)} />
                                        </div>
                                        <div className="grid gap-3 pb-3">
                                            <ImagePicker
                                                onFileSelected={(file) => updateData("company", "image", file)}
                                                initialFile={data.company?.image ? new File([data.company.image], "image.jpg", { type: data.company.image.type }) : null}
                                            />
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="grid gap-3 pt-4 pb-3">
                                            <Select
                                                value={data.company?.id?.toString()}
                                                onValueChange={e => updateData('company', 'id', parseInt(e))}
                                            >
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Selectionnez une entreprise" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectGroup>
                                                        { companies.map(company => {
                                                            return (
                                                                <SelectItem key={`company-${company.id}`} value={company.id.toString()}>{company.name}</SelectItem>
                                                            )
                                                        }) }
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </>
                                ) }
                            </>
                        )}

                        {step === 1 && (
                            <>
                                <p><strong>Expérience</strong></p>
                                <div className="grid grid-cols-2 gap-3 pt-4">
                                    <DatePicker date={new Date(data.experience.start)} setDate={date => updateData('experience', 'start', date)} title="Début" />
                                    <DatePicker date={data.experience?.end ? new Date(data.experience.start) : null} setDate={date => updateData('experience', 'end', date)} title="Fin" />
                                </div>
                                <div className="grid gap-3">
                                    <Label htmlFor="experience-job">Métier</Label>
                                    <Input id="experience-job" value={data.experience.job} onChange={e => updateData("experience", "job", e.target.value)} />
                                </div>
                                <div className="grid gap-3">
                                    <Label htmlFor="description">Description</Label>
                                    <Textarea id="description" value={data.experience.description} onChange={e => updateData('experience', 'description', e.target.value)} />
                                </div>
                                <div className="grid gap-3 pb-3">
                                    <Select
                                        value={data.experience.contract}
                                        onValueChange={value => updateData('experience', 'contract', value as ContractType)}
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
                            </>
                        )}
                    </div>


                    <DialogFooter>
                        {step > 0 && <Button type="button" onClick={prevStep} disabled={processing}>Précédent</Button>}
                        {step < 1 ? (
                            <Button type="button" onClick={nextStep} disabled={nextStepDisabled() || processing}>Suivant</Button>
                        ) : (
                            <Button type="submit" disabled={nextStepDisabled() || processing}>
                                {processing ? "Création..." : "Créer"}
                            </Button>
                        )}
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}